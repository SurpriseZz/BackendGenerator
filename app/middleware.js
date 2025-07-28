const path = require('path');
/**
 *
 * @param app
 */
module.exports = (app) => {
    // 模板渲染引擎
    const koaNunjucks = require('koa-nunjucks-2');
    app.use(koaNunjucks({
        ext: 'tpl',
        path: path.resolve(process.cwd(),'./app/public'),
        nunjucksConfig: {
            trimBlocks: true
        }
    }));
}