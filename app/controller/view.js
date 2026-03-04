module.exports = (app) => {
    return class ViewController {
        /**
         * 渲染页面
         * @param ctx
         */
        async renderPage(ctx) {
            const { query, params } = ctx.request;

            app.logger.info(`[ViewController] query: ${JSON.stringify(query)}`)
            app.logger.info(`[ViewController] params: ${JSON.stringify(params)}`)
            
            await ctx.render(`dist/entry.${ctx.params.page}`, {
                projKey: ctx.query?.proj_key,
                name: app.options?.name,
                env: app.env.getEnv(),
                options: JSON.stringify(app.options)
            })
        }

    }

}