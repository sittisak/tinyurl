import Router from 'koa-router'
import commonRouter from './common/routes'
import conf from './config'


const rootRouter = new Router({ prefix: `/${conf.apiPrefix}` })

rootRouter.use('/common', commonRouter.routes(), commonRouter.allowedMethods())


export default rootRouter
