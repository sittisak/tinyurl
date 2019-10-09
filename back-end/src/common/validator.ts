import Joi from '@hapi/joi'


export const signUp = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
})

export const signIn = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
})
