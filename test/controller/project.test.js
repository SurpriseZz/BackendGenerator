const assert = require('assert');
const supertest = require('supertest');
const md5 = require('md5');
const elpisCore = require('../../elpis-core');

const signKey = 'asd23rasd33rferf23rf23234';

const st = Date.now()

describe('测试project相关接口', function () {
    this.timeout(60000);

    let request;

    //用例
    it('启动服务', async () => {
        const app = await elpisCore.start();
        request = supertest(app.listen());
    })

    it('GET /api/project/model_list', async () => {
        let tmpRequest = request.get('/api/project/model_list');
        tmpRequest.set('s_t', st);
        tmpRequest.set('s_sign', md5(`${signKey}_${st}`));
        const res = await tmpRequest;
        assert(res.body.success === true);//断言，其实就是让我们明确数据返回是否符合我们的预期 相当if判断 如果不符合预期就好打印告诉我们 符合预期的话就继续执行

        const resData = res.body.data;
        assert(resData.length > 0);
        // console.log('resData:',JSON.stringify(resData));
        
        for (let i = 0; i < resData.length; i++) {
            const item = resData[i];
            assert(item.model);
            assert(item.model.key);
            assert(item.model.name);
            assert(item.project)

            for (const projKey in item.project) {
                const project = item.project[projKey];
                assert(project.key);
                assert(project.name);
            }
        }
    })
});


