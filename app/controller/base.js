module.exports = (app) =>
    class BaseController {

        /**
         * controller 基类
         * 统一收拢 controller 的公共方法
         */
        constructor() {
            this.app = app;
            this.config = app.config;
            this.service = app.service;
        }

        /**
         * API处理成功时统一返回结构
         * @param ctx  上下文
         * @param data 核心数据
         * @param metadata 附加数据
         * @returns {{metadata: *, code: number, data: {}}}
         */
        success(ctx, data = {}, metadata = {}) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                data,
                metadata
            };
        }

        /**
         * API处理失败时统一返回结构
         * @param ctx  上下文
         * @param message 错误信息
         * @param code c错误码
         * @returns {{message: *, code: number}}
         */
        fail(ctx, message, code) {
            ctx.status = 500;
            ctx.body = {
                success: false,
                message,
                code
            };
        }

    }



