const path = require('path')
const {sep} = path;

/**
 * config loader
 * 配置加载器
 * @param 「objiect」app koa 实例
 * 配置区分 开发/测试/本地 ,通过env环境读取不同文件配置 evn.config
 * 同env。config 覆盖default.config 加载到app.config中
 *
 * 目录下对应的 conifg 配置
 * 默认配置 config/config.default.js
 * 本地配置 config/config.local.js
 * 测试配置 config/config.beta.js
 * 生产配置 config/config.prod.js
 */
module.exports = (app) => {
    // 1、找到config/ 目录
    const configPath = path.resolve(app.baseDir, `.${sep}config`);

    // 获取default.config
    let defaultConfig = {};
    try {
        defaultConfig = require(path.resolve(configPath, `.${sep}config.default.js```))
    } catch (e) {
        console.log('没有找到默认配置文件')
    }
    // 获取 env.config
    let envConfig = {};
    try {
        if (app.env.isLocal()) {
            // 本地环境
            envConfig = require(path.resolve(configPath, `.${sep}config.local.js`))
        } else if (app.env.isBeta()) {
            // 测试环境
            envConfig = require(path.resolve(configPath, `.${sep}config.beta.js`))
        } else if (app.env.isProduction) {
            // 生产环境
            envConfig = require(path.resolve(configPath, `.${sep}config.prod.js`))
        }
    } catch (e) {
        console.log('没有找到当前环境配置文件')
    }
    // 覆盖并加载 config 配置

    app.config = Object.assign({}, defaultConfig, envConfig);
}