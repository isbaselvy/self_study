// 存放webpack基础配置，生产和开发模式都会使用到
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { webpack } = require('webpack')
const utils = require('./utils')

const webpackconfig = {
    target: 'node',
    entry: {
        server: path.join(utils.APP_PATH, 'index.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: utils.DIST_PATH
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: [path.join(__dirname, '/node_modules')]
            }
        ]
    },
    // 排除不会使用到的模块
    externals: [
        nodeExternals()
    ],
    plugins: [
        new CleanWebpackPlugin(),
        // 配置node env,创建一个全局常量供webpack打包时使用
        new webpack.DefinePlugin({
            // 'process.env': {
            //     NODE_ENV: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod') 
            //     ? "'production'" : "'development'"
            // }
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        })
    ]
}

module.exports = webpackconfig