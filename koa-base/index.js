// 引入
const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')
const Cors = require('@koa/cors')
const Json = require('koa-json')

// 实例
const app = new Koa()
const router = new Router()

// 设置路由前缀，所有的接口路径都要加上这个
router.prefix('/api')

// 定义路径
router.get('/', ctx => {
    // console.log(ctx);
    // console.log(ctx.request); // 和浏览器中请求的header一致
    ctx.body = 'hello world'
})

router.get('/api', ctx => {
    // console.log(ctx);
    // console.log(ctx.request); // 和浏览器中请求的header一致
    // 获取get请求中的api
    const params = ctx.request.query
    ctx.body = params
})
// 使用async解决回调，浏览器中下请求花费2.01秒
router.get('/async', async (ctx) => {
    let res = await new Promise( resolve => {
        setTimeout( ()=> {
            resolve('hello world after 2s')
        }, 2000)
    })
    ctx.body = res
})

// post请求:将posy请求的body内容原样返回
router.post('/post', async (ctx)=>{
    const { body } = ctx.request
    console.log(ctx.request);
    ctx.body = { ...body }
})

// 使用
app.use(koaBody())
app.use(Cors())
// app.use(Json({pretty: false, param: 'pretty'}))
// 1.request，method，response
// 2.api url => function, router?
// 3.ctx async
// allowedMethods 拦截器，返回routes中没有的请求，做出处理,比如返回404
app.use(router.routes()).use(router.allowedMethods())

// 开启一个3000端口的服务，将body内容返回
app.listen(3000)