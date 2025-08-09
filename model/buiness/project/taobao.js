/**
 * 针对不同的系统进行配置
 */
module.exports = {
    name: '淘宝',
    desc: '淘宝电商系统',
    homePage: '',
    menu: [
        {
        key:'order',
        moduleType:'iframe',
        iframeConfig:{
            path:'http://www.taobao.com'
        }
    },
        {
            key: 'operating',
            name: '运营活动',
            menuType: 'module',
            moduleType: 'sider',
            siderConfig: {
                menu: [{
                    key: 'coupon',
                    name: '优惠卷',
                    menuType: 'module',
                    customConfig: {
                        path: '/todo'
                    }
                }, {
                    key: 'limited',
                    name: '限量购',
                    menuType: 'module',
                    customConfig: {
                        path: '/todo'
                    }
                }, {
                    key: 'festival',
                    name: '节日活动',
                    menuType: 'module',
                    customConfig: {
                        path: '/todo'
                    }
                }]
            }
        }
    ]
}