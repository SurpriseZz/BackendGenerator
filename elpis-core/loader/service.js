const path = require('path');
const { sep } = path;
const glob = require('glob');

/**
 *
 * @param {object} app Koa实例
 *
 * 加载所有 service，可透过 app.service.${目录}.${文件} 访问
 */
module.exports = (app) => {
    // 读取 app/service/**/**.js 目录下的所有文件
    const servicePath = path.resolve(app.businessPath, `.${sep}middleware`);
    const fileList = glob.sync(path.resolve(servicePath, `.${sep}**${sep}*.js`));

    // 遍历所有文件目录 ， 加载所有 app.middleware 下
    const service = {};
    fileList.forEach(file => {
        // 提取文件名称
        let name = path.resolve(file);
        // 截取路径

        name = name.substring(name.lastIndexOf(`service${sep}`) + `service${sep}`.length, name.lastIndexOf('.'))
        // 把 '-' 统一改成驼峰
        name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase())
        // 挂载middleware 到内存 app 对象中

        let tempService = service;
        const names = name.split(sep);
        //将 app/middleware/a/b/c.js 转换成 app.service.a.b.c
        for (let i = 0; i < names.length; i++) {
            if (i === names.length - 1) {
                const ServiceMoule = require(path.resolve(file))(app)
                tempService[names[i]] = new ServiceMoule();
            } else {
                if (!tempService[names[i]]) tempService[names[i]] = {};
                tempService = tempService[names[i]];
            }
        }


    })
    app.service = service
}