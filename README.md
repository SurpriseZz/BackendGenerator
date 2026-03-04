# Elpis

## 项目简介

Elpis 是一个现代化的企业级低代码应用平台，采用前沿的技术栈构建，旨在为企业提供高效、稳定、可扩展的解决方案。通过强大的配置化能力和丰富的扩展机制，帮助开发者快速构建企业级应用。

## 技术栈

- **前端框架**: Vue.js - 渐进式JavaScript框架
- **开发语言**: JavaScript/TypeScript
- **构建工具**: 现代化构建工具链
- **架构模式**: 组件化、模块化设计
- **UI组件**: Element Plus - 企业级UI组件库

## 特性

- 🚀 **高性能**: 优化的代码结构和渲染机制
- 🔧 **可维护**: 清晰的代码架构和规范
- 📱 **响应式**: 适配各种设备和屏幕尺寸
- 🔒 **安全性**: 企业级安全标准
- 🎨 **现代化UI**: 简洁美观的用户界面
- ⚡ **快速开发**: 丰富的组件库和工具
- 📋 **配置化**: 通过JSON配置快速构建页面
- 🔌 **可扩展**: 支持自定义组件和服务器扩展

## 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发环境启动

```bash
npm run dev
# 或
yarn dev
```

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

## 自定义服务器介绍

Elpis 提供了灵活的服务器扩展机制，支持开发者根据业务需求定制后端服务：

- **API 扩展**: 支持自定义REST API接口
- **数据源连接**: 支持多种数据库和外部系统集成
- **业务逻辑**: 可扩展的业务处理中间件
- **认证授权**: 可配置的权限管理系统

## 前端构建

### 构建配置

项目支持多环境构建配置：

```bash
# 开发环境构建
npm run build:dev

# 测试环境构建
npm run build:test

# 生产环境构建
npm run build:prod
```

### 构建优化

- 代码分割和懒加载
- 静态资源压缩和优化
- Tree-shaking 去除无用代码
- CDN 资源配置支持

## 自定义页面扩展

### Custom View 自定义页面扩展

Elpis 支持完全自定义的页面开发，通过 `custom-view` 模式可以创建个性化的业务页面：

```javascript
{
  moduleType: 'custom',
  customConfig: {
    path: '/src/views/custom/MyCustomPage.vue' // 自定义组件路径
  }
}
```

**特性:**
- 完全的Vue组件开发体验
- 支持所有Vue生态系统工具
- 可复用的组件库
- 灵活的状态管理

### Dashboard 仪表板扩展

Dashboard 模式提供了丰富的数据可视化和监控功能：

```javascript
{
  mode: 'dashboard',
  dashboardConfig: {
    layout: 'grid', // 布局模式：grid/flex
    widgets: [
      {
        type: 'chart',
        chartType: 'line', // 图表类型
        dataSource: '/api/dashboard/data'
      }
    ]
  }
}
```

**支持的组件:**
- 📊 图表组件（折线图、柱状图、饼图等）
- 📈 数据指标卡片
- 📋 数据表格
- 🔔 通知中心
- 📅 日历组件

## Schema View 配置化页面

### Schema 配置说明

Schema View 是 Elpis 的核心功能，通过JSON配置快速生成CRUD页面：

```javascript
{
  moduleType: 'schema',
  schemaConfig: {
    api: '/api/users', // RESTful API 基础路径
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          label: '用户名',
          tableOption: {
            sortable: true,
            visible: true
          },
          searchOption: {
            comType: 'input',
            placeholder: '请输入用户名'
          }
        }
      }
    }
  }
}
```

## 动态组件扩展

### Components 组件系统

Elpis 提供了强大的组件扩展机制：

```javascript
// 注册自定义组件
{
  components: {
    'custom-uploader': {
      component: () => import('@/components/CustomUploader.vue'),
      props: {
        multiple: Boolean,
        accept: String
      }
    }
  }
}
```

**组件类型:**
- 表单控件组件
- 数据展示组件
- 业务逻辑组件
- 第三方集成组件

### 组件开发规范

```vue
<template>
  <div class="custom-component">
    <!-- 组件内容 -->
  </div>
</template>

<script>
export default {
  name: 'CustomComponent',
  props: {
    value: [String, Number, Object],
    config: Object
  },
  emits: ['update:value', 'change']
}
</script>
```

## Schema Form 控件扩展

### 表单控件配置

支持丰富的表单控件类型和自定义扩展：

```javascript
{
  formConfig: {
    controls: {
      'rich-editor': {
        component: 'RichTextEditor',
        props: {
          height: 300,
          toolbar: ['bold', 'italic', 'link']
        }
      }
    }
  }
}
```

**内置控件:**
- 📝 文本输入框 (input)
- 🔢 数字输入框 (number)
- 📅 日期选择器 (date)
- 📋 下拉选择器 (select)
- ✅ 复选框 (checkbox)
- 📎 文件上传 (upload)

### 自定义表单控件

```javascript
// 自定义控件注册
app.component('CustomFormControl', {
  props: ['modelValue', 'config'],
  emits: ['update:modelValue'],
  template: `
    <div class="custom-control">
      <!-- 自定义控件模板 -->
    </div>
  `
})
```

## Schema Search Bar 搜索控件扩展

### 搜索配置

灵活的搜索栏配置支持多种搜索方式：

```javascript
{
  searchConfig: {
    layout: 'inline', // 布局：inline/block
    controls: [
      {
        field: 'keyword',
        label: '关键词',
        comType: 'input',
        placeholder: '请输入搜索关键词'
      },
      {
        field: 'status',
        label: '状态',
        comType: 'select',
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ]
      }
    ]
  }
}
```

**搜索控件类型:**
- 🔍 关键词搜索
- 📅 日期范围选择
- 📋 下拉筛选
- 🔢 数值范围
- 🏷️ 标签选择

### 高级搜索功能

```javascript
{
  advancedSearch: {
    enabled: true,
    conditions: [
      {
        field: 'createTime',
        operator: 'between',
        comType: 'date-range'
      }
    ]
  }
}
```

## 项目结构

```
Elpis/
├── src/                          # 源代码目录
│   ├── components/               # 公共组件
│   │   ├── schema/              # Schema相关组件
│   │   ├── form/                # 表单组件
│   │   └── search/              # 搜索组件
│   ├── views/                   # 页面视图
│   │   ├── dashboard/           # 仪表板页面
│   │   ├── custom/              # 自定义页面
│   │   └── schema/              # Schema配置页面
│   ├── plugins/                 # 插件扩展
│   ├── assets/                  # 静态资源
│   ├── utils/                   # 工具函数
│   ├── api/                     # API接口
│   ├── store/                   # 状态管理
│   └── main.js                  # 入口文件
├── server/                      # 服务器端代码
│   ├── api/                     # API路由
│   ├── middleware/              # 中间件
│   └── config/                  # 配置文件
├── public/                      # 公共文件
├── docs/                        # 文档
├── examples/                    # 示例代码
└── package.json                 # 项目配置
```

## 配置示例

完整的配置示例：

```javascript
{
    mode: 'dashboard', // 模板类型：dashboard/custom
    name: '用户管理系统',
    desc: '企业用户信息管理平台',
    icon: 'el-icon-user',
    homePage: '/dashboard',
    
    // 头部菜单配置
    menu: [{
        key: 'user-management',
        name: '用户管理',
        menuType: 'module', // group / module
        
        // 模块类型配置
        moduleType: 'schema', // sider/iframe/custom/schema
        
        // Schema配置
        schemaConfig: {
            api: '/api/users',
            schema: {
                type: 'object',
                properties: {
                    id: {
                        type: 'number',
                        label: 'ID',
                        tableOption: {
                            width: 80,
                            sortable: true
                        }
                    },
                    name: {
                        type: 'string',
                        label: '用户名',
                        tableOption: {
                            visible: true,
                            searchable: true
                        },
                        searchOption: {
                            comType: 'input',
                            placeholder: '请输入用户名'
                        }
                    },
                    email: {
                        type: 'string',
                        label: '邮箱',
                        format: 'email',
                        tableOption: {
                            visible: true
                        }
                    },
                    status: {
                        type: 'number',
                        label: '状态',
                        enum: [0, 1],
                        enumNames: ['禁用', '启用'],
                        tableOption: {
                            visible: true,
                            formatter: 'enum'
                        },
                        searchOption: {
                            comType: 'select',
                            options: [
                                { label: '启用', value: 1 },
                                { label: '禁用', value: 0 }
                            ]
                        }
                    }
                }
            },
            
            // 表格配置
            tableConfig: {
                headerButtons: [{
                    label: '新增用户',
                    eventKey: 'create',
                    type: 'primary',
                    icon: 'el-icon-plus'
                }],
                rowButtons: [{
                    label: '编辑',
                    eventKey: 'edit',
                    type: 'text',
                    eventOption: {
                        params: {
                            id: 'schema::id'
                        }
                    }
                }, {
                    label: '删除',
                    eventKey: 'remove',
                    type: 'text',
                    eventOption: {
                        params: {
                            id: 'schema::id'
                        }
                    }
                }]
            },
            
            // 搜索配置
            searchConfig: {
                layout: 'inline',
                showAdvanced: true
            },
            
            // 表单配置
            formConfig: {
                layout: 'vertical',
                labelWidth: '100px'
            }
        }
    }]
}
```

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 版本历史

- v1.0.0 - 初始版本发布
- v1.1.0 - 添加自定义组件扩展
- v1.2.0 - 完善Schema配置功能
- v1.3.0 - 新增Dashboard支持

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系我们

如有问题或建议，请通过以下方式联系我们：

- 邮箱: support@elpis.com
- 问题反馈: [GitHub Issues](https://github.com/yourorg/elpis/issues)
- 技术文档: [https://docs.elpis.com](https://docs.elpis.com)

---

**Elpis** - 让企业应用开发更简单、更高效


``` javascript
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
                            visible:true, //是否在 table 中显示 默认为true，为false时不在啊表单中展示
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
```