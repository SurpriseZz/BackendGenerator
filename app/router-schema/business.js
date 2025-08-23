module.exports = {
    '/api/proj/business/list': {
        get: {
            query: {
                type: 'object',
                properties: {
                    page: {
                        type: 'string'
                    },
                    size: {
                        type: 'string'
                    }
                },
                required: ['page', 'size']
            }
        }
    },
    '/api/proj/product':{
        delete:{
            body:{
                type:'object',
                properties:{
                    product_id:{
                        type:'string'
                    }
                },
                required:['product_id']
            }
        }
    },
    '/api/proj/product_enum/list':{
        get:{}
    }

}