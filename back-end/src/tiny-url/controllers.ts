import Koa from 'koa'
import { body , isLogin } from '../common/utils/koa-decorators'
import * as schema from './validator'
import { Tinyurl } from './models'


export class Controller {
  
  public async redirectedToOriginalUrl(ctx: Koa.Context, next: () => Promise<any>) {
    const tinyurl = await Tinyurl.findByPk(ctx.params.slug)
    ctx.assert(tinyurl, 404, 'not found')
    ctx.redirect(tinyurl.originalUrl)
    return next()
  }

  @isLogin()
  @body(schema.createTinyurl)
  public async createTinyurl(ctx: Koa.Context, next: () => Promise<any>) {
    const { slug, originalUrl } = ctx.request.body
    console.log(ctx.state)
    const tinyurl = Tinyurl.build()
    tinyurl.slug =  await Tinyurl.slugify(slug)
    tinyurl.auth = ctx.state.username
    tinyurl.originalUrl = originalUrl
    await tinyurl.save()
    ctx.body = tinyurl
    return next()
  }
  
  @isLogin()
  public async getTinyurlList(ctx: Koa.Context, next: () => Promise<any>) {
    const tinyurlList = await Tinyurl.findAll({
      where: { auth: ctx.state.username },
      order: [['createdAt', 'DESC']],
    })
    ctx.body = tinyurlList
    return next()
  }

}
