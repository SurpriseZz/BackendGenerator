const md5 = require('md5');
/**
 * api签名合法性校验
 * @param app
 * @returns {{new(): ApiSignView, prototype: ApiSignView}}
 */
module.exports = (app) => {
    return async (ctx, next) => {
        // 不是api调用直接跳过
        if (ctx.path.indexOf('/api') < 0) {
            return await next();
        }

        const {path, method} = ctx;
        const {headers} = ctx.request;
        const {s_sign: sSgin, s_t: st} = headers;

        const signKey = 'asd23rasd33rferf23rf23234'//密钥
        const signature = md5(`${signKey}_${st}`);
        app.logger.info(`[${method} ${path}] signature:${signature}`)

        // 签名校验 没有签名 没有时间 签名不正确 时间在600s内
        if (!sSgin || !st || signature !== sSgin.toLocaleString() || Date.now() - st > 600000) {
            ctx.status = 200;
            ctx.body = {
                success: false,
                message: '签名错误',
                code: 445
            }
            return;
        }
        await next();
    }
};