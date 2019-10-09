import Koa from 'koa'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import helmet from 'koa-helmet'
import rootRouter from './routes'
import db from './common/utils/connection'
import logger from './common/utils/logging'
import jwtParser from './common/utils/jwt-parser'


const app = new Koa()
app.use(helmet())
app.use(cors())
app.use(logger())
app.use(koaBody())
app.use(jwtParser())
app.use(rootRouter.routes())
app.context.db = db

export default app
