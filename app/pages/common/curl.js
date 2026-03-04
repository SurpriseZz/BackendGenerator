const md5 = require('md5');
import { ElMessage } from 'element-plus'
import axios from 'axios'
/**
 * 前端封装的curl 方法
 */
const curl = ({
    url,// 请求地址
    method = 'post',// 请求方法
    headers = {},// 请求头
    query = {},// 请求数据
    data = {},// 请求数据
    responseType = 'json',// 响应数据类型
    timeout = 60000,// 超时时间
    errorMessage = '请求超时',// 失败提示语
}) => {
    // 接口动态签名处理
    const signKey = 'asd23rasd33rferf23rf23234';
    const st = Date.now();

    const dtoHeaders = {
        ...headers,
        s_t: st,
        s_sign: md5(`${signKey}_${st}`)
    }
    if (url.indexOf('/api/proj/') > -1 && window.projKey) {
        dtoHeaders.proj_key = window.projKey;
    }

    // 构造请求参数 (把参数转换为 axios 参数
    const ajaxStting = {
        url,
        method,
        params: query,
        data,// 请求数据
        responseType,// 响应数据类型
        timeout,// 超时时间
        headers: dtoHeaders
    }


    return axios.request(ajaxStting).then((response) => {
        const resData = response.data || {};
        // 后端api返回格式
        const { success } = resData;

        //失败
        if (!success) {
            const { code, message } = resData;

            if (code === 442) {
                ElMessage.error('请求参数异常');
            } else if (code === 445) {
                ElMessage.error('请求不合法');
            } else if (code === 446) {
                ElMessage.error('缺少项目必要参数');
            } else if (code === 50000) {
                ElMessage.error(message);
            } else {
                ElMessage.error(errorMessage);
            }

            console.error(message);

            return Promise.resolve({
                success,
                code,
                message
            });
        }
        //成功
        const { data, metadata } = resData;
        return Promise.resolve({ success, data, metadata })
    }).catch((error) => {
        const { message } = error;
        if (message.match(/timeout/)) {
            return Promise.resolve({
                message: 'Request Timeout',
                code: 504
            });
        }
        return Promise.resolve(error);
    })
}

export default curl;