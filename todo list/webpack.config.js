const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: __dirname + `/src/js/main.js`,
  output: {
    path: __dirname + `/dist`,
    filename: `bundle.js`,
    publicPath: `./`
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + `/src/public/index.html`,
      inject: "body"
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: "[id].css"
    })
  ],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  },
  devServer: {
    contentBase: "./src/public",
    port: 8080
  }
};
