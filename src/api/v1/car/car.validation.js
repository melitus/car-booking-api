/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

export const addBookingSchema = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.string().required(),
  user_id: Joi.string().guid({ version: 'uuidv4' }),
});
