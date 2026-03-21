# Backend Generator

## 一个企业级应用，使用全栈实现

### model 配置

```javascript
{
    mode: 'dashboard',//模板类型，不同模板类型对应不一样的模板数据结构
    name: '', // 名称
    desc: '', // 描述
    icon: '',//icon
    homePage: '',//首页(项目配置)

    //头部菜单
    menu: [{
        key: '', // 菜单唯一描述
        name: '', // 菜单名称
        menuType: '', // 枚举值，group / moduel

        //当 menuType == group时，可填
        subMenu: [{
            //可递归 menuItem
        }, /* ... */],

        //当 menuType == module时，可填
        moduleType: '', // 枚举值，sider/iframe/custom/schema

        //当modelType == sider时，可填
        siderConfig: {
            menu: [{
                //可递归 menuItem(除 moduleType == sider)
            }]
        },

        //当modelType == iframe时，可填
        iframeConfig: {
            path: '', // iframe 路径
        },

        //当modelType == custom时，可填
        customConfig: {
            path: '', // 自定义路由路径
        },

        //当modelType == schema时，可填
        schemaConfig: {
            api: '', //数据源 （遵循 RESTFUL 规范）
            schema: { //版块数据结构
                type: 'object',
                properties: {
                    key: {
                        // ...schema, //标准schema配置
                        type: '',// 字段类型
                        label: '',//字段的中文名
                        //字段在table中的配置
                        tebleOption: {
                            // ...ElTableColumnConfig, //标准el-table-column配置
                            toFixed: 0,//保留几位小数
                            visible: true,//默认为true(false 时，表示不在表单显示)
                        },
                        //字段在 search-bar中放入配置
                        searchOption: {
                            // ...eleComponentConfig,// 标准el-component-column配置
                            comType: '',//配置组件类型 input/select
                            default: '',//默认值

                            //当comType == select时，可填
                            enumList: [],//下拉框可选项

                            //当comType == dynamicSelect时，可填
                            api: '',//数据源 （遵循 RESTFUL 规范）
                        },
                        //字段在不同动态 component 中的相关配置，前缀对应 componentComfig 中的键值
                        //如：componentConfig.createForm，这里对应 createFormOption
                        //字段在 createForm 中的相关配置
                        createFormOption: {
                            // ...eleComponentConfig,// 标准el-component-column配置
                            comType: '',//控件类型 input/select等
                            visible: true,//是否展示 (true/false) 默认为true
                            disabled: false,//是否禁用 (true/false) 默认为false
                            default: '',//默认值

                            // comType === 'select'时生效
                            enumList: [] //枚举列表，即下拉菜单项

                        },
                        //字段在 editForm 中的相关配置
                        editFormOption: {
                            // ...eleComponentConfig,// 标准el-component-column配置
                            comType: '',//控件类型 input/select等
                            visible: true,//是否展示 (true/false) 默认为true
                            disabled: false,//是否禁用 (true/false) 默认为false
                            default: '',//默认值

                            // comType === 'select'时生效
                            enumList: [] //枚举列表，即下拉菜单项

                        },
                        //字段在 detailPanel 中的相关配置
                        detailPanelOption: {
                            // ...eleComponentConfig,// 标准el-component-column配置
                        },
                    },
                    /* ... */
                },
                requirecd: [],//标记哪些字段是必填项
            },
            //table相关配置
            tableConfig: {
                headerButtons: [{
                    label: '',//按钮中文名
                    eventKey: '',//按钮事件名
                    eventOption: {
                        //当eventKey === 'showComponent'
                        comName: '',//组件名称 ->需要显示的组件
                    },//按钮事件具体配置
                    // ...elButtonConfig//标准el-button配置
                }, /* ... */],
                rowButtons: [{
                    label: '',//按钮中文名
                    eventKey: '',//按钮事件名
                    eventOption: {
                        //当eventKey === 'showComponent'
                        comName: '',//组件名称 ->需要显示的组件
                    },//按钮事件具体配置

                    //当eventKey === 'remove'时
                    params: {
                        //paramKey = 参数的键值
                        //rowValueKey = 参数值，格式为 schema::tableKey ，到table中找相应的字段）—
                        paramKey: 'rowValueKey'
                    }
                }, /* ... */]
            }, //表格配置
            //search-bar配置
            searchConfig: {},
            //动态组件相关配置
            componentConfig: {
                //create-form 相关配置
                createForm: {
                    title: '',//表单标题
                    saveBtnText: '',//保存按钮文本
                },
                //edit-form 相关配置
                editForm: {
                    mainKey: '', //表单主键，用于标识要修改的数据对象
                    title: '',//表单标题
                    saveBtnText: '',//保存按钮文本
                },
                //detail-panel 相关配置
                detailPanel: {
                    title: '',//表单标题
                    mainKey: '', //表单主键，用于标识要修改的数据对象
                },
                //...支持用户动态扩展
            }
        }
    }, /* ... */]
}
```

### 服务端启动

```javascript
const { serverStart } = require("eustis/backend-generator");

//启动 backend-generator 服务
const app = serverStart({});
```

### 自定义服务端

- router-schema
- router
- controller
- service
- extend
- config

### 前端构建

```javascript
const { frontendBuild } = require("eustis/backend-generator");

// 编译构建前端工程
frontendBuild(process.env._ENV);
```

### 自定义页面扩展

- 在 `app/pages/` 目录下写入口 entry.xxx.js

### dashboard / custom-view 自定义页面扩展

- 在 `app/pages/dashboard/xxxx` 下写页面

### dashboard / shcema-view / components 动态组件扩展

1.在 `app/pages/dashboard/complex-view/shcema-view/components` 下写控件 2.配置到 `app/pages/dashboard/complex-view/shcema-view/components/components-config.js`

### schema-form 控件扩展

1. 在 `app/widgets/schema-form/complex-view` 下写控件
2. 配置到 `app/widgets/schema-form/form-item-config.js`

### schema-search-bar 控件扩展

1. 在 `app/widgets/schema-search-bar/complex-view` 下写控件
2. 配置到 `app/widgets/schema-search-bar/search-item-config.js`
