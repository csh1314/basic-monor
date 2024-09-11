const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StaticPageSlicePlugin = require("./static-page-slice-plugin");

module.exports = {
    mode: process.env.NODE_ENV,
    entry: "./src/index.js",
    output: {
        filename: "index.js",
        path:path.resolve(__dirname, "dist")
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'basic webpack template',
        filename: 'index.html',
        template: path.resolve('./public/index.html'),
        hash: true,
        minify: {
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          minifyCSS: true,
          minifyJS: true,
        },
        inject: "body",
        scriptLoading: "blocking",
      }),
      new StaticPageSlicePlugin({
        injectorUrl: 'http://localhost:3000/injector/data'
      })
    ]
}