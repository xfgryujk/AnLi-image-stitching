const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',

  plugins: [
    new LodashModuleReplacementPlugin(),
    new CleanWebpackPlugin(['docs']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})
