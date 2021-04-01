const webpackMerge = require('webpack-merge')
const Terser = require('terser-webpack-plugin')
const baseConfig = require('./webpack.config.base')

const webpackconfig = webpackMerge(baseConfig, {
    mode: 'production',
    status: {
        children: false, // 日志消息不传递出来
        warnings: false
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    warnings: false,
                    compress: {
                        warnings: false,
                        drop_console: false, // 是否注释掉console
                        dead_code: true,
                        drop_debugger: true
                    },
                    output: {
                        comments: false, // 不要注释
                        beautifu: false // 只有一行
                    },
                    mangle: true
                },
                parallel: true,
                sourceMap: false
            }),
        ],
        slitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 3,
                    enforce: true
                }
            }
        }
    }
})
module.exports = webpackconfig