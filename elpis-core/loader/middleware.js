const path = require("path");
const { sep } = path;
const glob = require("glob");

/**
 *
 * @param {object} app Koa实例
 *
 * 加载所有 middleware，可透过 app.middleware.${目录}.${文件} 访问
 */
module.exports = (app) => {
  // 遍历所有文件目录 ， 加载所有 app.middleware 下
  const middlewares = {};
  // 读取  /elpis/app/middleware 目录下的所有文件
  const elpismiddlewarePath = path.resolve(
    __dirname,
    `..${sep}..${sep}app${sep}middleware`
  );
  const elpisfileList = glob.sync(
    path.resolve(elpismiddlewarePath, `.${sep}**${sep}*.js`)
  );

  elpisfileList.forEach((file) => {
    handleFile(file);
  });

  // 读取业务目录  /app/middleware 目录下的所有文件
  const businessMiddlewarePath = path.resolve(
    app.businessPath,
    `.${sep}middleware`
  );
  const businessFileList = glob.sync(
    path.resolve(businessMiddlewarePath, `.${sep}**${sep}*.js`)
  );

  businessFileList.forEach((file) => {
    handleFile(file);
  });

  function handleFile(file) {
    // 提取文件名称
    let name = path.resolve(file);
    // 截取路径

    //将 app/middleware/a/b/c.js 转换成 app.middleware.a.b.c
    name = name.substring(
      name.lastIndexOf(`middleware${sep}`) + `middleware${sep}`.length,
      name.lastIndexOf(".")
    );
    // 把 '-' 统一改成驼峰
    name = name.replace(/[_-][a-z]/gi, (s) => s.substring(1).toUpperCase());
    // 挂载middleware 到内存 app 对象中
    //     a/b/c 转换成 a.b.c
    let tempMiddleware = middlewares;
    // a/b/c ==>  [a,b,c]
    const names = name.split(sep);
    for (let i = 0; i < names.length; i++) {
      if (i === names.length - 1) {
        tempMiddleware[names[i]] = require(path.resolve(file))(app);
      } else {
        if (!tempMiddleware[names[i]]) tempMiddleware[names[i]] = {};
        tempMiddleware = tempMiddleware[names[i]];
      }
    }
  }
  app.middlewares = middlewares;
};
