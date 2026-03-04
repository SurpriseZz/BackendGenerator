const path = require("path");
const { sep } = path;
const glob = require("glob");

/**
 *
 * @param {object} app Koa实例
 *
 * 加载所有 service，可透过 app.service.${目录}.${文件} 访问
 */
module.exports = (app) => {
  // 遍历所有文件目录 ， 加载所有 app.middleware 下
  const service = {};

  // 读取 app/service/**/**.js 目录下的所有文件
  const elpisServicePath = path.resolve(
    __dirname,
    `..${sep}..${sep}app${sep}service`
  );
  const elpisFileList = glob.sync(
    path.resolve(elpisServicePath, `.${sep}**${sep}*.js`)
  );

  elpisFileList.forEach((file) => {
    handleFile(file);
  });
  // 读取 app/service/**/**.js 目录下的所有文件
  const businessServicePath = path.resolve(app.businessPath, `.${sep}service`);
  const businessFileList = glob.sync(
    path.resolve(businessServicePath, `.${sep}**${sep}*.js`)
  );

  businessFileList.forEach((file) => {
    handleFile(file);
  });
  function handleFile(file) {
    // 提取文件名称
    let name = path.resolve(file);
    // 截取路径

    name = name.substring(
      name.lastIndexOf(`service${sep}`) + `service${sep}`.length,
      name.lastIndexOf(".")
    );
    // 把 '-' 统一改成驼峰
    name = name.replace(/[_-][a-z]/gi, (s) => s.substring(1).toUpperCase());
    // 挂载middleware 到内存 app 对象中

    let tempService = service;
    const names = name.split(sep);
    //将 app/middleware/a/b/c.js 转换成 app.service.a.b.c
    for (let i = 0; i < names.length; i++) {
      if (i === names.length - 1) {
        const ServiceMoule = require(path.resolve(file))(app);
        tempService[names[i]] = new ServiceMoule();
      } else {
        if (!tempService[names[i]]) tempService[names[i]] = {};
        tempService = tempService[names[i]];
      }
    }
  }
  app.service = service;
};
