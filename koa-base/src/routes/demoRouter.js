import koaRouter from 'koa-router'
import demoController from '../api/demoRouter'

const router = new koaRouter()
router.get('/demo', demoController.demo())

export default router