const ElpisCore = require("./elpis-core");

// 引入前端工程化构建方法
const FEBuildDev = require("./app/webpack/dev.js");
const FEBuildProd = require("./app/webpack/prod.js");

module.exports = {
  /**
   * 服务端基础
   */
  Controller:{
    Base:require("./app/controller/base.js"),
  },
  Service:{
    Base:require("./app/service/base.js"),
  },
  /**
   * 启动前端工程化
   * @param {*} options 配置项
   * @returns
   * @memberof ElpisCore
   */
  frontendBuild(env) {
    if (env === "local") {
      FEBuildDev();
    } else if (env === "production") {
      FEBuildProd();
    }
  },

  /**
   * 启动 elpis
   * @param {*} options 项目配置， 透传到 elpis-demo
   * @returns
   */
  serverStart(options = {}) {
    const app = ElpisCore.start(options);
    return app;
  },
};
