const koaRouter = require('koa-router')
const { a } = require('../api/a')

const router = new koaRouter()
router.get('/a', a)
// 导出不能忘
module.exports = router