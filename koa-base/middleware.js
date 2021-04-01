const Koa = require('koa')
const app = new Koa()

const middleware = function async(ctx, next) {
    console.log('this is a middleware');
    console.log(ctx.request.path);
    next() // 将代码控制权传给下一个中间件
    console.log('this is after middleware next'); // 此处的console会在下一个中间件执行完再执行
}

const middleware1 = function async(ctx, next) {
    console.log('this is a middleware111');
    console.log(ctx.request.path);
    next()
    console.log('this is after middleware next 1');
}

const middleware2 = function async(ctx, next) {
    console.log('this is a middleware2222');
    console.log(ctx.request.path);
    next()
    console.log('this is after middleware next2');
}

app.use(middleware)
.use(middleware1)
.use(middleware2)
/* 若将middleware的next()注释，后面的1和2不会输出
输出：
    this is a middleware
    /
    this is a middleware111
    /
    this is a middleware2222
    /
    this is after middleware next2
    this is after middleware next 1
    this is after middleware next
 */

// 调换顺序，则执行顺序也会变
app
// .use(middleware1)
// .use(middleware2)
// .use(middleware)

app.listen(3000)