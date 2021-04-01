const webpackMerge = require('webpack-merge')

const baseConfig = require('./webpack.config.base')
const webpackconfig = webpackMerge(baseConfig, {
    devtool: 'eval-source-map', //打开调式
    mode: 'development',
    status: {
        children: false // 日志消息不传递出来
    }
})
module.exports = webpackconfig