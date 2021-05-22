const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: { minimize: true }
        }
      }
    ]
  },
  entry: {
    page0: ['./src/pages/page0/index.js', './src/template/page0.html'],
    page1: ['./src/pages/page1/index.js'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/template/page0.html",
      filename: "./page0.html",
      chunksSortMode: 'none',
      chunks: ["page0"]
    }),
    new HtmlWebPackPlugin({
      template: "./src/template/page1.html",
      filename: "./page1.html",
      chunksSortMode: 'none',
      chunks: ["page1"]
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()	//热更新
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8033,
    host: "127.0.0.1",
    hot: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'common',
          priority: 10,
          chunks: 'initial'
        }
      }
    }
  }
};
