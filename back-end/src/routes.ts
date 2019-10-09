import Router from 'koa-router'
import commonRouter from './common/routes'
import tinyurlRouter from './tiny-url/routes'
import conf from './config'


const rootRouter = new Router({ prefix: `/${conf.apiPrefix}` })

rootRouter.use('/common', commonRouter.routes(), commonRouter.allowedMethods())
rootRouter.use('/tinyurl', tinyurlRouter.routes(), tinyurlRouter.allowedMethods())

export default rootRouter
