module.exports = (app) => {
    return class ProjectController {
        /**
         * 获取项目列表
         * @param ctx
         */
        async getList(ctx){
            const { project: ProjectService } = app.service;
            const res = await ProjectService.getList();
            ctx.status = 200;
            ctx.body = {
                success: true,
                data: res,
                metadata:{}
            }
        }

    }

}