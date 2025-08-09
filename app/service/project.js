module.exports = (app) => {
    const BaseService = require('./base')(app)
    const modelList = require('../../model/index.js')(app);
    // console.log(JSON.stringify(modelList) );

    return class ProjectService extends BaseService {
        /**
         * 获取所有模型和项目的结构化数据
         * @returns 
         */
        async getModelList() {
            return modelList;
        }
    }
}
