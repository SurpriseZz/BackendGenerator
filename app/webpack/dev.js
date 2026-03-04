// 本地开发启动dev
const express = require("express");
const path = require("path");
const webpack = require("webpack");
const consoler = require("consoler");
const devMiddleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");

module.exports = () => {
  // 从 webpack.dev.js 获取 webpack 配置 和devServer 配置
  const {
    webpackConfig,
    DEV_SERVER_CONFIG,
  } = require("./config/webpack.dev.js");
  

  const app = express();

  const compiler = webpack(webpackConfig);

  // 静态文件目录
  app.use(express.static(path.resolve(__dirname, "../public/dist")));
  //引入 devMiddleware中间件（监控文件改动）
  app.use(
    devMiddleware(compiler, {
      // 落地文件
      writeToDisk: (filePath) => filePath.endsWith(".tpl"),

      // 资源路径
      publicPath: webpackConfig.output.publicPath,

      // headers 配置
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },

      stats: {
        colors: true,
      },
    })
  );
  // 引用 hotMiddleware 中间件 （实现热更新）
  app.use(
    hotMiddleware(compiler, {
      path: `/${DEV_SERVER_CONFIG.HMR_PATH}`,
      log: () => {},
    })
  );

  consoler.info("请等待webpack初次构造完成提示...");

  const port = DEV_SERVER_CONFIG.PORT;

  app.listen(port, () => {
    console.log(`服务启动成功，请访问：http://localhost:${port}`);
  });
};
