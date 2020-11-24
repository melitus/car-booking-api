/* eslint-disable import/prefer-default-export */
import { initCors } from './cors';
import { initBodyParser } from './bodyparser';

export const initVendorMiddlewares = (app) => {
  initCors(app);
  initBodyParser(app);
};
