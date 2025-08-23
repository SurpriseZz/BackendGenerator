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
                        label: '',// 字段中文名称
                        // 字段在 table 中的相关配置
                        tableOption:{
                            ...elTableColumnConfig, //标准的 el-table-conlumn 配置
                            toFixed:0,
                            visiable:true, //是否在 table 中显示 默认为true，为false时不在啊表单中展示
                        },
                        searchOption:{
                            ...eleComponentConfig, //标准的 el-input 配置
                            comType:'',// 配置组件类型 input/select
                            default: ''//默认值
                        },
                    }
                    ...
                }
            },
            tableConfig: {},//table相关配置
            searchConfig: {},//search相关配置
            components: {},//模块组件
        },
        //table 相关配置
        tableConfig:{
            headerButtons:[{
                lable:'',//按钮中文名
                eventKey:'',//按钮时间名
                eventOption:{},//按钮事件具体配置
                ...elButtonConfig, //标准的 el-button 配置

            },...],
            rowButtons:[{
                lable:'',//按钮中文名
                eventKey:'',//按钮时间名
                eventOption:{
                    // 当 paramKey = ‘remove’
                    params:{
                        //paramKey = 参数的值
                        // rowValueKey = 参数值（当格式为 schema::tableKey的时候，到table种找响应的字段）
                        paramKey:rowValueKey
                    }


                },//按钮事件具体配置
                ...elButtonConfig, //标准的 el-button 配置
            },...]
        },
        serchOption:{},
        formOption:{}

    }, ...]

}