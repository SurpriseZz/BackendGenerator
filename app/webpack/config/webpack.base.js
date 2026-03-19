const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 动态构造 pageEntries htmlWebpackPluginList
const pageEntries = {};
const htmlWebpackPluginList = [];
// 获取app/pages 目录下所有的入口文件 （entry.xxx.js）
const entryList = path.resolve(process.cwd(), './app/pages/**/entry.*.js')
glob.sync(entryList).forEach(file => {
    const entryName = path.basename(file, '.js');
    // 构造entry
    pageEntries[entryName] = file;
    // 构造最终渲染的页面文件
    htmlWebpackPluginList.push(new HtmlWebpackPlugin({
        // 产物 （最终模板） 输出路径
        filename: path.resolve(process.cwd(), './app/public/dist/', `${entryName}.tpl`),
        // 指定要使用的模板文件
        template: path.resolve(process.cwd(), './app/view/entry.tpl'),
        // 注入的代码快
        chunks: [entryName]
    }))
})

/**
 * webpack 基础配置
 */
module.exports = {
// 入口配置
    entry: pageEntries,
    // 模块解析配置（觉得了要加载解释那些模块，以及用什么方式解释）
    module: {
        rules: [{
            test: /\.vue$/,
            use: {
                loader: 'vue-loader',
            }
        }, {
            test: /\.js$/,
            include: [
                // 只对业务代码进行babel，加快webpack打包速度
                path.resolve(process.cwd(), './app/pages')
            ],
            use: {
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false
                }
            }
        }, {
            test: /\.(png|jpe?g|gif)(\?.+)?$/,
            type: "asset",
            parser: {
                dataUrlCondition: {
                    maxSize: 300
                }
            },
            generator: {
                filename: "images/[name]_[contenthash:8][ext]"
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            type: "asset/resource",
            generator: {
                filename: "fonts/[name]_[contenthash:8][ext]"
            }
        }]

    },
    // 产物输出路径, 因为开发环境输出不一致，所以需要在各自环境中自行配置
    output: {
        filename: "js/[name]_[chunkhash:8].bundle.js",
        path: path.join(process.cwd(), './app/public/dist/prod'),
        publicPath: '/dist/prod',
        crossOriginLoading: 'anonymous'
    },
    // 配置模块解析的具体行为（定义webpack 在打包时候，然后找到并解析具体模块的路径）
    resolve: {
        extensions: ['.js', '.vue', '.less', '.css'],
        alias: {
            $pages: path.resolve(process.cwd(), './app/pages'),
            $common: path.resolve(process.cwd(), './app/pages/common'),
            $widgets: path.resolve(process.cwd(), './app/pages/widgets'),
            $store: path.resolve(process.cwd(), './app/pages/store'),
        }
    },
    // 配置webpack插件
    plugins: [
        //处理.vue文件，这个插件是必须的
        //他的职能是将你定义过的其他规则赋值并应用到.vue文件里面
        new VueLoaderPlugin(),
        // 把第三方库暴露到window context下
        new webpack.ProvidePlugin({
            Vue: 'vue',
            axios: 'axios',
            _:'lodash'
        }),
        // 定义全局常量
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,//支持vue解析optionsAPi
            __VUE_PROD_DEVTOOLS__: false,//不支持vue调试相关工具
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false// 禁用生产环境显示“水合”信息
        }),
        ...htmlWebpackPluginList
    ],
    // 配置一些打包输出优化（代码分割，模块合并，缓存,TreeShaing,压缩等优化策略）
    optimization: {
        /**
         * 把js 文件打包成3类
         * 1、vendor：第三方lib库，基本不会改动，除非依赖版本升级
         * 2、common：业务组建代码的公共部分抽出来，改动较少
         * 3、entry.{page}：不用页面entry里的业务组建代码的差异部分，会经常改动
         * 目的：把改动和引用频率不一样的js区分出来，以达到更好利用浏览器缓存的效果
         */
        splitChunks: {
            chunks: "all",//对同步和一步模块都进行分割
            maxAsyncRequests: 10,//每次异步加载的最大并行请求数
            maxInitialRequests: 10,//入口点的最大并行请求数
            cacheGroups: {
                vendor: { //第三方依赖库
                    name: "vendor",// 模块名称
                    test: /[\\/]node_modules[\\/]/,//打包node_modules中的第三方依赖库
                    priority: 20,//优先级 数字约到优先级越高
                    enforce: true,//强制执行
                    reuseExistingChunk: true,//复用已有的公共模块
                },
                common: { //公共模块
                    test:/[\\/]common|widgets[\\/]/,
                    name: "common",
                    minChunks: 2,//被2个以上引用被归为公共模块  （前提条件：最少被引用的数量）
                    minSize: 1,//最小分割文件大小 （1byte）
                    priority: 10, //优先级
                    reuseExistingChunk: true,//复用已有的公共 chunk
                }
            }
        },
        // 将 webpack 运行是生成的代码打包到runtime.js
        runtimeChunk: true
    },
}
