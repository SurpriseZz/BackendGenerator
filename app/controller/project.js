module.exports = (app) => {
    const BaseController = require('./base')(app)
    return class ProjectController extends BaseController {
        /**
         * 根据 proj_key 获取项目配置
         * @param {*} ctx 
         */
        get(ctx) {
            const { proj_key: projKey } = ctx.request.query;
            const { project: projectService } = app.service;
            const projConfig = projectService.get(projKey);

            if(!projConfig){
                this.fail(ctx,'获取项目异常',50000);
                return;
            }

            this.success(ctx,projConfig);
        }
        /**
         * 获取当前projectKey 对应模型下的列表，如果没有传参就拿到所有的
         * @param {*} ctx 
         */
        getList(ctx) {
            const { proj_key: projKey } = ctx.request.query;
            const { project: projectService } = app.service;
            const projectList = projectService.getList({ projKey });

            const dtoProjectList = projectList.map(item => {
                const { modelKey, key, name, desc, homePage } = item;
                return { modelKey, key, name, desc, homePage }
            })

            this.success(ctx, dtoProjectList);
        }

        /**
         * 获取所有模型和项目的结构化数据
         * 将全部的数据先获取到，在通过自己的规则筛选出需要的数据
         * @param {*} ctx 
         * @returns 
         */
        async getModelList(ctx) {
            const { project: projectService } = app.service;
            const modelList = await projectService.getModelList();

            // 构造返回结果，只返回关键数据
            const dtoModelList = modelList.reduce((preList, item) => {
                const { model, project } = item;   //拿到模型和项目的数据
                // 构造 model 关键数据
                const { key, name, dosc } = model;
                const dtoModel = { key, name, dosc };
                // 构造 project 关键数据
                const dtoProject = {};
                /*
                project是拿到的所有的项目 
                buiness: { 
                    project: {
                        pdd: {key, name, desc, homePage }, 
                        taobao: {key, name, desc, homePage } 
                    }, 
                    model 
                }
                    projKey就是项目名称，如pdd，taobao
                */
                for (const projKey in project) {
                    const { key, name, desc, homePage } = project[projKey];
                    dtoProject[projKey] = { key, name, desc, homePage };//重新封转返回数据
                }

                preList.push({
                    model: dtoModel,
                    project: dtoProject
                })

                return preList;

            }, [])


            this.success(ctx, dtoModelList);
        }
    }

}

/**
 * 学到这里有点想法记录下来：
 * 有些时候一个接口里面返回很多数据，但前端不需要这么多数据，那么学完这个我的想法是
 * 前端在controller层筛选，前端自己定义页面上需要的数据
 * 
 * 
 * 优化：
 * 前端可以在router设置多个接口，但调用的都是从同一个后端接口拿数据，这里就会有一个问题，一个页面原本只要一个接口就能拿完数据，现在就变成调用多个后端接口才能拿到，我的想法
 * 1、前端在第一次调用后端接口的时候其实拿到了所有的数据（我说的是对于同一个后端接口来说）
 * 2、拿到了前端可以把这些数据存入缓存或者哪里，之后调用同一个后端接口的前端接口都可以从缓存中拿数据，然后在controller中进行筛选前端接口需要的数据，这样前端调用的接口有很多个，但后端调用接口只调用了一次
 * 3、数据更新问题，我想到一个 这样的方法不知道能不能实现，前端在调用后端接口的时候，后端在调用完后给这个接口设置一个熟悉为true表示已经前端已经有最新的数据了（只是这个接口最新的数据），下次前端再调用后端这个接口的时候，后端检测这个接口的属性为true，则返回一个字段告诉前端，前端已经有这个缓存了。在前端调用那些修改数据的接口的时候，只要修改的数据涉及到这个获取数据的接口，数据造成了变化，那这个接口的字段就得变成false代表数据更新了已经不再是最新的数据了，下次调用获取接口的时候，前端就不能用之前的缓存了，就得更新缓存
 */