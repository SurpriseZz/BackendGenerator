const path = require('path');
const { sep } = path;
const glob = require('glob');

/**
 *
 * @param {object} app Koa实例
 *
 * 加载所有 controller，可透过 app.controller.${目录}.${文件} 访问
 */
module.exports = (app) => {
    // 读取 app/controller/**/**.js 目录下的所有文件
    const controllerPath = path.resolve(app.businessPath, `.${sep}middleware`);
    const fileList = glob.sync(path.resolve(controllerPath, `.${sep}**${sep}*.js`));

    // 遍历所有文件目录 ， 加载所有 app.middleware 下
    const controller = {};
    fileList.forEach(file => {
        // 提取文件名称
        let name = path.resolve(file);
        // 截取路径

        name = name.substring(name.lastIndexOf(`controller${sep}`) + `controller${sep}`.length,name.lastIndexOf('.'))
        // 把 '-' 统一改成驼峰
        name = name.replace(/[_-][a-z]/ig,(s) => s.substring(1).toUpperCase())
        // 挂载middleware 到内存 app 对象中

        let tempController = controller;
        const names = name.split(sep);
        //将 app/middleware/a/b/c.js 转换成 app.controller.a.b.c
        for (let i = 0; i < names.length; i++){
            if (i === names.length - 1){
                const ControllerMoule = require(path.resolve(file))(app);
                tempController[names[i]] =  new ControllerMoule();
            } else {
                if(!tempController[names[i]]) tempController[names[i]] = {};
                tempController = tempController[names[i]];
            }
        }


    })
    app.controller = controller;
}