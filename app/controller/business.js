module.exports = (app) => {
    const baseController = require('./base')(app);

    return class BusinessController extends baseController {
        remove(ctx) {
            const { product_id: productId } = ctx.request.body;

            this.success(ctx, {
                proj_key: ctx.projKey,
                product_id: productId,
            })
        }


        getList(ctx) {
            const { page, size } = ctx.request.query;

            this.success(ctx, [{
                product_id: '1',
                product_name: `${ctx.projKey} - 《大前端面试宝典》`,
                price: 39.9,
                inventory: 9999,
                create_time: '2023-01-01 10:55:00'
            }, {
                product_id: '2',
                product_name: `${ctx.projKey} - 《前端求职之道》`,
                price: 199,
                inventory: 9999,
                create_time: '2023-01-01 13:22:00'
            }, {
                product_id: '3',
                product_name: `${ctx.projKey} - 《大前端全栈实践》`,
                price: 699,
                inventory: 9999,
                create_time: '2023-01-01 11:22:00'

            }], {
                total: 3,
                page,
                size
            })
        }
    }

}