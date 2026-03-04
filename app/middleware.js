const path = require('path');
/**
 *
 * @param app
 */
module.exports = (app) => {
    // 配置静态根目录
    const koaStatic = require('koa-static');
    app.use(koaStatic(path.resolve(process.cwd(), './app/public')));
    // 模板渲染引擎
    const koaNunjucks = require('koa-nunjucks-2');
    app.use(koaNunjucks({
        ext: 'tpl',
        path: path.resolve(process.cwd(), './app/public'),
        nunjucksConfig: {
            trimBlocks: true
        }
    }));

    // 引入使用 koa ctx.body 解析中间件
    const bodyParser = require('koa-bodyparser');
    app.use(bodyParser({
        formList: '1000mb',
        enabledTypes: ['form', 'json', 'text']
    }));
    // 引入异常捕获中间件
    app.use(app.middlewares.errorHandler)
    // 引入api签名合法性校验
    app.use(app.middlewares.apiSignVerify)
    //api参数校验
    app.use(app.middlewares.apiParamsVerify)
    //项目处理中间件
    app.use(app.middlewares.projectHandler)

}