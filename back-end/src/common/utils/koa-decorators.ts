import Koa from 'koa'


export const isLogin = () => (target, name, descriptor) => {
  const original = descriptor.value
  descriptor.value = async (ctx: Koa.Context, next: () => Promise<any>) => {
    ctx.assert(ctx.state.isUserLogin, 401)
    return original.call(this, ctx, next)
  }
  return descriptor
}

export const body = (schema: any) => (target, name, descriptor) => {
  const original = descriptor.value
  descriptor.value = async (ctx: Koa.Context, next: () => Promise<any>) => {
    const { error } = schema.validate(ctx.request.body)
    if (error) {
      ctx.throw(400, error.details.map(detail => detail.message).join(', '))
    }
    return original.call(this, ctx, next)
  }
  return descriptor
}