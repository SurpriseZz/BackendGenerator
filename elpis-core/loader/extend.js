const path = require("path");
const { sep } = path;
const glob = require("glob");

/**
 *
 * @param {object} app Koa实例
 *
 * 加载所有 extend，可透过 app.extend.${目录}.${文件} 访问
 */
module.exports = (app) => {
  // 读取elpis app/extend/**/**.js 目录下的所有文件
  const elpisExtendPath = path.resolve(
    __dirname,
    `..${sep}..${sep}app${sep}extend`
  );
  const elpisFileList = glob.sync(
    path.resolve(elpisExtendPath, `.${sep}**${sep}*.js`)
  );

  // 遍历所有文件目录 ， 加载所有 app.middleware 下
  elpisFileList.forEach((file) => {
    handleFile(file);
  });

  // 读取业务 app/extend/**/**.js 目录下的所有文件
  const businessExtendPath = path.resolve(app.businessPath, `.${sep}extend`);
  const businessFileList = glob.sync(
    path.resolve(businessExtendPath, `.${sep}**${sep}*.js`)
  );

  businessFileList.forEach((file) => {
    handleFile(file);
  });

  function handleFile(file) {
    // 提取文件名称
    let name = path.resolve(file);
    // 截取路径
    name = name.substring(
      name.lastIndexOf(`extend${sep}`) + `extend${sep}`.length,
      name.lastIndexOf(".")
    );
    // 把 '-' 统一改成驼峰
    name = name.replace(/[_-][a-z]/gi, (s) => s.substring(1).toUpperCase());
    // 过滤app已经存在的key
    for (const key in app) {
      if (key === name) {
        console.log(`key:${key}已经存在了`);
        return;
      }
    }

    // 挂载 extend 到 app 上
    app[name] = require(path.resolve(file))(app);
  }
};
