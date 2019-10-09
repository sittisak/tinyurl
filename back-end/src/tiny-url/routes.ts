import Router from 'koa-router'
import { Controller } from './controllers'


const router = new Router()
const controller = new Controller()

router.get('/public/:slug', controller.redirectedToOriginalUrl)

router.post('/', controller.createTinyurl)
router.get('/', controller.getTinyurlList)


export default router
