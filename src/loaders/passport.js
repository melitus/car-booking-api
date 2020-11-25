/* eslint-disable import/prefer-default-export */
import passport from 'passport';
import logger from './logger';

import strategies from '../auth/passport';

export const passportLoader = (app) => {
  logger.info('💻 SETUP - Installing Passport...');
  app.use(passport.initialize());
  passport.use('jwt', strategies.jwt);
};
