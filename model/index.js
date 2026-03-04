const path = require('path');
const glob = require('glob');
const { sep } = path;
const _ = require('lodash');
/**
 * project 继承 model 方法
 * @param {*} model 
 * @param {*} project 
 */
const projectExtendModel = (model,project) => {
    return _.mergeWith({},model,project,(modelValue,projValue) =>{
        //处理数组合并的特殊情况
        if(Array.isArray(modelValue) && Array.isArray(projValue)){
            let result = [];

            // 因为project继承 model，所以需要处理修和新增内容的情况
            // project有的健值，model也有 => 修改（重载）
            // project有的健值，model没有 => 新增 (拓展)
            // model有的健值，project没有 => 保留 （继承）

            //处理修改
            for(let i = 0; i < modelValue.length; i++){
                let modelItem = modelValue[i];
                let projItem = projValue.find(projItem => projItem.key === modelItem.key);
                // project有的健值，model也有,则递归调用 projectExtendModel 方法覆盖修改
                result.push(projItem ?  projectExtendModel(modelItem, projItem) : modelItem);
            }
            //处理新增
            for(let i = 0; i < projValue.length; i++){
                let projItem = projValue[i];
                let modelItem = modelValue.find(modelItem => modelItem.key === projItem.key);
                // project有的健值，model没有,则添加
                if(!modelItem){
                    result.push(projItem);

                }
            }

            return result;
        }
    })
}
/**
 * 解析 model 配置，并返回组织且继承后的数据结构
 * [{
 *      model:${model}
 *      project:{
 *          proj1:${proj1},
 *          proj2:${proj2}
 *      }
 * },...]
 * @param {*} app 
 */
module.exports = (app) => {
    const modelList = [];
    // 遍历当前文件夹，构建模型数据结构，挂载到modelList上
    const modelPath = path.resolve(process.cwd(), `.${sep}model`);
    const fileList = glob.sync(path.resolve(modelPath, `.${sep}**${sep}**.js`));
    fileList.forEach(file => {
        if (file.indexOf('index.js') > -1) {
            return;
        }
        // console.log('file:', file);

        // 区分配置类型（model/project）
        const type = path.resolve(file).indexOf(`${sep}project${sep}`) > -1 ? 'project' : 'model';

        if (type === 'project') {
            const modelKey = file.match(/\/model\/(.*?)\/project/)?.[1];
            const projKey = file.match(/\/project\/(.*?)\.js/)?.[1];
            // console.log('modelKey:', modelKey);
            // console.log('projKey:', projKey);

            const modelItem = modelList.find(item => item.model.key === modelKey)
            if (!modelItem) {
                // 初始化 modelItem
                modelItem = {};
                modelList.push(modelItem);
            }
            if (!modelItem.project) {
                // 初始化 projects 数据结构
                modelItem.project = {};

            }

            modelItem.project[projKey] = require(path.resolve(file));
            modelItem.project[projKey].key = projKey;//注入 projectKey
            modelItem.project[projKey].modelKey = modelKey;
        }
        if (type === 'model') {
            const modelKey = file.match(/\/model\/(.*?)\/model\.js/)?.[1]
            let modelItem = modelList.find(item => item.model?.key === modelKey);
            if (!modelItem) {
                modelItem = {};
                modelList.push(modelItem);
            }
            modelItem.model = require(path.resolve(file))
            modelItem.model.key = modelKey //注入 modelKey
        }
    });

    // 数据整理： project => 继承 model
    modelList.forEach(item => {
        const {model,project} = item;
        for(const key in project){
            project[key] = projectExtendModel(model,project[key])
        }
    })


    return modelList;
}