module.exports = (app) => {
    const BaseController = require('./base')(app)
    return class ProjectController extends BaseController{
        /**
         * 获取项目列表
         * @param ctx
         */
        async getList(ctx){
            const { proj_key: projKey} = ctx.request.query
            console.log('projKey',projKey)
            const { project: ProjectService } = this.service;
            const projectList = await ProjectService.getList();
            this.success(ctx,projectList);
        }

    }

}