const superagent = require('superagent'); // Added missing semicolon
module.exports = (app) => class BaseController {
    /**
     * sevice 基类
     * 统一收拢 service 的公共方法
     */
    constructor() {
        this.app = app;
        this.config = app.config;
        this.curl = superagent;
    }
}