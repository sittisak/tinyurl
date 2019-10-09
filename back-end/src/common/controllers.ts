import Koa from 'koa'
// import slugify from 'slugify'
import { body , isLogin } from './utils/koa-decorators'
import * as schema from './validator'
import { Auth } from './models'


export class Controller {
  
  @body(schema.signUp)
  public async signUp(ctx: Koa.Context, next: () => Promise<any>) {
    const { username, password } = ctx.request.body
    const user = await Auth.createUser({ username, password })
      .catch(err => ctx.throw(400, err))
    ctx.body = user.getProfile()
    return next()
  }

  @body(schema.signIn)
  public async signIn(ctx: Koa.Context, next: () => Promise<any>) {
    const { username, password } = ctx.request.body
    const user = await Auth
      .authenticate(username, password)
      .catch(err => ctx.throw(400, err))
    const refreshToken: string = await user.signIn(ctx.request)
    ctx.body = user.getAccessToken(refreshToken)
    return next()
  }

  @isLogin()
  public async signOut(ctx: Koa.Context, next: () => Promise<any>) {
    const user: Auth = await Auth.findByPk(ctx.state.username)
    await user.signOut(ctx.request.header.refreshtoken)
    ctx.body = `successfully deleted refresh access token: ${ctx.request.header.refreshtoken}`
    return next()
  }

  @isLogin()
  public async profile(ctx: Koa.Context, next: () => Promise<any>) {
    const user: Auth = await Auth.findByPk(ctx.state.username)
    ctx.body = user.getProfile()
    return next()
  }

  public async refreshAccesstoken(ctx: Koa.Context, next: () => Promise<any>) {
    const user: Auth = await Auth.findByPk(ctx.state.username)
    ctx.assert(user, 404, `not found username: ${ctx.state.username}`)
    ctx.body = user.getAccessToken(ctx.request.header.refreshtoken)
    return next()
  }

}
