const path = require("path");
const merge = require("webpack-merge");
const os = require("os");
const HappyPack = require("happypack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
// 多线程build 设置
const happypackCommonConfig = {
  debug: false,
  threadPool: HappyPack.ThreadPool({ size: os.cpus().length }),
};

// 基类配置
const baseConfig = require("./webpack.base.js");
const HtmlWebpackInjectAttributesPlugin = require("html-webpack-inject-attributes-plugin");

// 生成环境webpack 配置
const webpackConfig = merge.smart(baseConfig, {
  // 指定生产环境
  mode: "production",
  // 生产环境的output配置
  output: {
    filename: "js/[name]_[chunkhash:8].bundle.js",
    path: path.join(process.cwd(), "./app/public/dist/prod/"),
    publicPath: "/dist/prod/",
    crossOriginLoading: "anonymous",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          `${require.resolve("happypack/loader")}?id=css`,
        ],
      },
      {
        test: /\.js$/,
        include: [
           // 处理 elpis 目录
           path.resolve(__dirname, "../../pages"),
           // 处理 业务 目录
           path.resolve(process.cwd(), "./app/pages"),
        ],
        use: {
          loader: `${require.resolve("happypack/loader")}?id=js`,
        },
      },
    ],
  },
  // 不会产生大量的hints信息 默认为 warning
  performance: {
    hints: false,
  },
  plugins: [
    // 每次 build 前，清除 public/dist 目录
    new CleanWebpackPlugin(["public/dist"], {
      root: path.resolve(process.cwd(), "./app/"),
      exclude: ["./public/static"],
      verbose: true,
      dry: false,
    }),
    // 提取 css 的公共部分，有效利用缓存，（非公共部分使用inline）
    new MiniCssExtractPlugin({
      chunkFilename: "css/[name]_[contenthash:8].build.css",
    }),
    // 优化并压缩 css 资源
    new CssMinimizerPlugin(),
    // 多线程打包 js，佳穗打包速度
    new HappyPack({
      ...happypackCommonConfig,
      id: "js",
      loaders: [
        `${require.resolve("babel-loader")}?${JSON.stringify({
          presets: [require.resolve("@babel/preset-env")],
          plugins: [require.resolve("@babel/plugin-transform-runtime")],
        })}`,
      ],
    }),
    // 多线程打包 css 加速打包速度
    new HappyPack({
      ...happypackCommonConfig,
      id: "css",
      loaders: [
        {
          path: require.resolve("css-loader"),
          options: {
            importLoaders: 1,
          },
        },
      ],
    }),
    // 浏览器在请求资源是不发送用户的身份凭证
    new HtmlWebpackInjectAttributesPlugin({
      crossorigin: "anonymous",
    }),
  ],
  optimization: {
    // 使用 TerserPlugin 的并发和缓存，提升压缩阶段的性能
    // 清除 console.log
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true, //利用多核cpu的优势来加速压缩速度
        cache: true, //启用缓存来加速构建过程
        terserOptions: {
          compress: {
            drop_console: true, // 去掉console.log
          },
        },
      }),
    ],
  },
});

module.exports = webpackConfig;
