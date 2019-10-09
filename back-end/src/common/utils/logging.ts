import Koa from 'koa'
import config from '../../config'
import winston from 'winston'


export default () => {
  winston.configure({
    level: config.debug ? 'debug' : 'info',
    transports: [
      // - Write to all logs with specified level to console.
      new winston.transports.Console({ format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ) })
    ]
  })

  return async(ctx: Koa.Context, next: () => Promise<any>) => {
    const start = new Date()
    await next()
    const ms = new Date().getMilliseconds() - start.getMilliseconds()

    let logLevel: string
    if (ctx.status >= 500) {
        logLevel = 'error'
    } else if (ctx.status >= 400) {
        logLevel = 'warn'
    } else if (ctx.status >= 100) {
        logLevel = 'info'
    }
    const msg: string = `(${start.toISOString()}) ${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`
    winston.log(logLevel, msg)
  }
}
