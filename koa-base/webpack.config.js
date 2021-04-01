const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackconfig = {
    target: 'node',
    mode: 'development', // 开发模式
    entry: {
        server: path.join(__dirname, 'src/index.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, './dist')
    },
    devtool: 'eval-source-map', //打开调式
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
        new CleanWebpackPlugin()
    ]
}

module.exports = webpackconfig