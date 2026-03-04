module.exports = (app) => {
    const BaseService = require('./base')(app)
    const modelList = require('../../model/index.js')(app);
    // console.log(JSON.stringify(modelList) );

    return class ProjectService extends BaseService {
        /**
         * 根据projKey 获取项目配置
         */
        get(projKey){
            let projConfig;

            modelList.forEach(modelItem => {
                if(modelItem.project[projKey]){
                    projConfig = modelItem.project[projKey];
                }
            })

            return projConfig;
        }
        /**
         * 获取统一模型下的项目列表
         * @param {*} param0 
         */
        getList({ projKey }) {
            return modelList.reduce((preList, modelItem) => {
                const { project } = modelItem;
                if (projKey && !project[projKey]) {
                    return preList;
                }
                // 如果有传projKey，则只返回projKey对应的项目，不传的时候取所有
                for (const pKey in project) {
                    preList.push(project[pKey])
                }

                return preList;

            }, [])

        }

        /**
         * 获取所有模型和项目的结构化数据
         * @returns 
         */
        async getModelList() {
            return modelList;
        }
    }
}
