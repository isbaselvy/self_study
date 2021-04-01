const koaRouter = require('koa-router')
const { b } = require('../api/b')

const router = new koaRouter()
router.get('/b', b)

module.exports = router