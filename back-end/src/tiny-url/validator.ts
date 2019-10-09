import Joi from '@hapi/joi'


export const createTinyurl = Joi.object().keys({
  originalUrl: Joi.string().uri().required(),
  slug: Joi.string().required(),
})
