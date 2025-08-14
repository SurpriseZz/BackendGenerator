{
    mode: 'dashboard', // 模板类型，不同模版类型对应不一样的数据结构
    name: '',//名称
    desc: '',//描述icon:''//图标
    homePage: '',// 首页
    // 头部菜单
    menu: [{
        key: '',//菜单唯一描述
        name: '',//菜单名称
        menuType: '',// 枚举值， group / module
        //当 menuType == group 时，可填
        subMenu: [{
            //可递归menuItem
        }, ...],
        //当 menuType == module 时，可填
        moduleType: '',//枚举值：sider/iframe/custom/schema

        // 当moduleType == sider 时  有侧边栏菜单
        siderConfig: {
            menu: [{
                // 可递归menuItem
            }, ...]
        },

        // 当 moduleType == iframe 时 内嵌外部页面
        iframConfig: {
            path: '' // iframe 路径
        },

        // 当moduleType == custom 时
        customConfig: {
            path: '' // 自定义组件路径
        },

        // 当moduleType == schema 时
        schemaConfig: {
            api: '',//数据源api（遵循RESTFUL规范）
            schema: {
                type: 'object',
                properties: {
                    key: {
                        ...schma,//标准 schema 配置
                        type: '',//字段类型
                        label: ''// 字段中文名称
                    }
                }
            },
            tableConfig: {},//table相关配置
            searchConfig: {},//search相关配置
            components: {},//模块组件
        },


    }, ...]

}