const Ajv = require('ajv');
const ajv = new Ajv();
/**
 * API 参数校验
 * @param app
 * @returns {(function(*, *): Promise<*|undefined>)|*}
 */
module.exports = (app) => {
    const $schema = 'http://json-schema.org/draft-07/schema#';
    return async (ctx, next) => {
        // 不是api调用直接跳过
        if (ctx.path.indexOf('/api/') < 0) {
            return await next();
        }
        // 获取请求参数
        const {body, query, headers} = ctx.request;
        const {params, path, method} = ctx;

        // app.logger.info(`[${method} ${path}] body: ${JSON.stringify(body)}`)
        // app.logger.info(`[${method} ${path}] body: ${JSON.stringify(query)}`)
        // app.logger.info(`[${method} ${path}] body: ${JSON.stringify(params)}`)
        // app.logger.info(`[${method} ${path}] body: ${JSON.stringify(headers)}`)

        const schema = app.routerSchema[path]?.[method.toLowerCase()];
        if (!schema) {
            return await next();
        }

        let valid = true

        // ajv 校验器
        let validate;
        // 校验headers
        if (valid && headers && schema.headers) {
            schema.headers.$schema = $schema; // 添加schema 的版本
            validate = ajv.compile(schema.headers); // 利用这个ajv解析这个schema 得到这个validate-->校验器
            valid = validate(headers); // 用这个validate去校验headers
        }

        // 校验body
        if (valid && body && schema.body) {
            schema.body.$schema = $schema;
            validate = ajv.compile(schema.body);
            valid = validate(body);
        }

        // 校验query
        if (valid && query && schema.query) {
            schema.query.$schema = $schema;
            validate = ajv.compile(schema.query);
            valid = validate(query);
        }

        // 校验 params
        if (valid && query && schema.params) {
            schema.query.$schema = $schema;
            validate = ajv.compile(schema.params);
            valid = validate(params);
        }
        // 校验失败
        if (!valid) {
            ctx.status = 200;
            ctx.body = {
                success: false,
                message: `request validate fail: ${ajv.errorsText(validate.errors)}`,
                code: 442,
            }
            return;
        }
        await next()
    }
};