const path = require('path')
const glob = require('glob')
const {sep} = path

/**
 * roter-schema loader
 * 路由规则
 * @param {object} app koa实例
 *
 * 通过 ‘json-schema & ajv’ 对 API规则进行约束，配合api-params-verify中间件使用
 *
 * app/router-schema/**.js
 *
 * 输出：
 * app.rouSchema = {
 *    '${api1}':${jsonSchema}
 *    '${api2}':${jsonSchema}
 *    '${api3}':${jsonSchema}
 *    '${api4}':${jsonSchema}
 */
module.exports = (app) => {
    // 读取目录下所有的文件
    const routerSchemaPath = path.resolve(app.businessPath, `.${sep}router-schema`);
    const fileList = glob.sync(path.resolve(routerSchemaPath, `.${sep}**${sep}*.js`));

    // 注册所有router-schema ，是的可以 'app.routerSchema' 这样访问
    let routerSchema = {}

    fileList.forEach(file => {
        routerSchema = {
            ...routerSchema,
            ...require(path.resolve(file))
        }
    })

    app.routerSchema = routerSchema

}