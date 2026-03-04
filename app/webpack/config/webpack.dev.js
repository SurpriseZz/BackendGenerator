const path = require("path");
const merge = require('webpack-merge');
const webpack = require('webpack');
// 基类配置
const baseConfig = require('./webpack.base.js');

const DEV_SERVER_CONFIG = {
    HOST:'127.0.0.1',
    PORT: 9002,
    HMR_PATH: '__webpack_hrm',//官方配置 热更新
    TIMEOUT:20000
};

// 开发阶段的 entry 配置需要加入 hmr
Object.keys(baseConfig.entry).forEach(v => {
    // 第三方报不作为hmr 入口
    if(v !== 'vendor') {
        baseConfig.entry[v] = [
            // 住入口文件
            baseConfig.entry[v],
            // hmr 更新入口，官方指定的hmr路径
            `${require.resolve('webpack-hot-middleware/client')}?path=http://${DEV_SERVER_CONFIG.HOST}:${DEV_SERVER_CONFIG.PORT}/${DEV_SERVER_CONFIG.HMR_PATH}&time=${DEV_SERVER_CONFIG.TIMEOUT}&reload=true`,
        ]
    }


})
// 生成环境webpack 配置
const webpackConfig = merge.smart(baseConfig, {
    // 指定开发环境
    mode: 'development',
    // source-map 呈现代码的映射更新
    devtool: 'eval-cheap-module-source-map',
    // 生产环境的output配置
    output: {
        filename: "js/[name]_[chunkhash:8].bundle.js",
        path: path.resolve(process.cwd(), './app/public/dist/dev/'),//输出文件存储路径
        publicPath: `http://${DEV_SERVER_CONFIG.HOST}:${DEV_SERVER_CONFIG.PORT}/public/dist/dev/`,//外部资源路径
        globalObject: 'this',
    },
    plugins:[
        // 用于实现热模块替换
        new webpack.HotModuleReplacementPlugin({
            multiStep: true,
        }),
    ]
})

module.exports = {
    // webpack配置
    webpackConfig,
    //devServer配置 暴露给dev.js使用
    DEV_SERVER_CONFIG,
};