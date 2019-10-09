import * as jwt from 'jsonwebtoken'
import Koa from 'koa'
import conf from '../../config'


export default () => async (
  ctx: Koa.Context,
  next: () => Promise<any>,
): Promise<void> => {
  const authorization: string = ctx.request.headers.authorization
  if (!authorization) {
    ctx.state.isUserLogin = false
    return next()
  }
  const token: string = authorization.split(' ')[1]
  try {
    const jwtData: any = jwt.verify(token, conf.jwtSecret)
    ctx.state.isUserLogin = true
    ctx.state.username = jwtData.username
    ctx.state.userRole = jwtData.role
    return next()
  } catch (err) {
    if(err.name === 'TokenExpiredError') {
      const jwtDataError: any = jwt.decode(token)
      ctx.state.isUserLogin = false
      ctx.state.username = jwtDataError.username
      ctx.state.userRole = jwtDataError.role
      return next()
    }
    ctx.throw(400)
  }
}
