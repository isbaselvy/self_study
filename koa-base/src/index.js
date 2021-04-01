// const Koa = require('koa')
// const router = require('./routes/routes')
// // 安全的header
// const helmet = require('koa-helmet')
// const statics = require('koa-static')
// const path = require('path')


import Koa from 'koa'
import router from 'koa-router'
import helmet from 'koa-helmet'
import statics from 'koa-static'
import path from 'path'
import koaBody from 'koa-body'
import jsonUtis from 'koa-json'
import cors from '@koa/cors'
import compose from 'koa-compose'
import compress from 'koa-compress'

const app = new Koa()
const isDevMode = process.env.NODE_ENV === 'production' ? false : true

// 一系列use则可用compose整合 todo报错 middleware must be a function
const middleware = compose([ // 注意：必须是数组
    koaBody(),
    statics(path.join(__dirname, '../public')),
    cors(),
    jsonUtis({pretty: false, param: 'pretty'}), // 帮助输出格式漂亮的get请求参数
    helmet()
])

app.use(middleware)
app.use(router())

// // 在路由之前使用
// app.use(helmet())
// // 若静态资源下有a文件，路由中有a的api，会先找静态资源
// app.use(statics(path.join(__dirname, '../public')))
// app.use(router())
// 生产模式下压缩代码
if(!isDevMode) {
    app.use(compress())
}

app.listen(3000)