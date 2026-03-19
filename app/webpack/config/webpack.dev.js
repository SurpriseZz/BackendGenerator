const path = require("path");
const merge = require('webpack-merge');
const webpack = require('webpack');
// 基类配置
const baseConfig = require('./webpack.base.js');

const DEV_SERVER_CONFIG = {
    HOST:'127.0.0.1',
    PORT: 9002,
    HMR_PATH: '__webpack_hmr',//官方配置 热更新
    TIMEOUT:20000
};

const hotClient = `webpack-hot-middleware/client?path=http://${DEV_SERVER_CONFIG.HOST}:${DEV_SERVER_CONFIG.PORT}/${DEV_SERVER_CONFIG.HMR_PATH}&timeout=${DEV_SERVER_CONFIG.TIMEOUT}&reload=true`;

// 开发阶段的 entry 配置需要加入 hmr（避免直接修改 baseConfig）
const devEntries = Object.keys(baseConfig.entry).reduce((result, entryName) => {
    const entryValue = baseConfig.entry[entryName];
    result[entryName] = Array.isArray(entryValue) ? [...entryValue] : [entryValue];
    if (entryName !== 'vendor') {
        result[entryName].push(hotClient);
    }
    return result;
}, {});
// 生成环境webpack 配置
const webpackConfig = merge.smart(baseConfig, {
    // 指定开发环境
    mode: 'development',
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename]
        }
    },
    entry: devEntries,
    // source-map 呈现代码的映射更新
    devtool: 'eval-cheap-module-source-map',
    // 生产环境的output配置
    output: {
        filename: "js/[name].bundle.js",
        chunkFilename: "js/[name].chunk.js",
        path: path.resolve(process.cwd(), './app/public/dist/dev/'),//输出文件存储路径
        publicPath: `http://${DEV_SERVER_CONFIG.HOST}:${DEV_SERVER_CONFIG.PORT}/public/dist/dev/`,//外部资源路径
        globalObject: 'this',
    },
    plugins:[
        // 用于实现热模块替换
        new webpack.HotModuleReplacementPlugin(),
    ]
})

module.exports = {
    // webpack配置
    webpackConfig,
    //devServer配置 暴露给dev.js使用
    DEV_SERVER_CONFIG,
};
