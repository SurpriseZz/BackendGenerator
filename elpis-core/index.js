const Koa = require('koa');
const path = require('path');
const { sep } = path; //兼容不同操作系统上的斜杆
const env = require('./env');

// 引入loader
const middlewareLoader = require('./loader/middleware');
const routerSchemaLoader = require('./loader/router-schema');
const routerLoader = require('./loader/router');
const controllerLoader = require('./loader/controller');
const serviceLoader = require('./loader/service');
const configLoader = require('./loader/config');
const extendLoader = require('./loader/extend');


module.exports = {
    /**
     * 启动服务
     * @param {*} option 配置项目
     * options = {
     *     name //项目名称
     *     homePath //项目首页
     * }
     */
    start: (options = {}) => {

        // koa 实例
        const app = new Koa();
        // 应用配置  
        app.options = options;


        // 基础路径
        app.baseDir = process.cwd();


        // 业务文件路径
        app.businessPath = path.resolve(app.baseDir, `.${sep}app`);

        // 环境配置
        app.env = env();
        console.log('环境：', app.env.getEnv())

        // 加载loader
        configLoader(app);
        // console.log('加载配置（config）完成', app.config)
        middlewareLoader(app);
        // console.log('加载中间（middleware）件完成', app.middlewares)
        serviceLoader(app);
        // console.log('加载服务（service）完成', app.service)
        controllerLoader(app);
        // console.log('加载控制器(controller)完成', app.controller)
        routerSchemaLoader(app);
        // console.log('加载路由规则(routerSchema)完成', app.routerSchema)
        extendLoader(app);
        // console.log('加载扩展完成', app)

        // 注册elpis全局中间件
        const elpisMiddlewarePath = path.resolve(__dirname,`..${sep}app${sep}middleware.js`)
        const elpisMiddleware = require(elpisMiddlewarePath)
        elpisMiddleware(app);
        console.log('注册elpis全局中间件完成==>');
        
        // 注册业务全局中间件
        // app/middleware.js
        try {
            require(`${app.businessPath}${sep}middleware.js`)(app)
            // console.log('注册业务全局中间件完成', app.middleware)
        } catch (e) {
            // console.log('没有找到业务全局中间件')
        }
        // 注册路由
        routerLoader(app);
        // console.log('注册路由完成', app.routes)
        // 启动服务
        try {
            const port = process.env.PORT || 8080;
            const host = process.env.IP || '0.0.0.0';
            app.listen(port, host)
            console.log(`Server listening on ${host}:${port}`)
        } catch (e) {
            console.log(e)
        }

        return app;
    }

}