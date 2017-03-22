var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var extractSass = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: process.env.NODE_ENV === 'development'
})

module.exports = {
  entry: {
    bundle: path.join(__dirname, 'packages/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: 'eval-source-map',
  module: {
    rules: [{
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: [path.join(__dirname, 'demo'),path.join(__dirname, 'dist')],
    compress: true,
    port: 9000
  }
}
