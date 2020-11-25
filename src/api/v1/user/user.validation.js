import Joi from '@hapi/joi';

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().trim().required(),
  password: Joi.string().required().min(6).max(128),
});

export const registerSchema = Joi.object().keys({
  email: Joi.string().email().trim().required(),
  password: Joi.string().required().min(6).max(128),
});

export default { loginSchema, registerSchema };
