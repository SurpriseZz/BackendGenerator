module.exports = (app) => {
  return class ViewController {
      /**
       * 渲染页面
       * @param ctx
       */
      async renderPage(ctx){
          await ctx.render(`dist/entry.${ctx.params.page}`,{
              name: app.options?.name,
              env: app.env.getEnv(),
              options:JSON.stringify(app.options)
          })
      }

  }

}