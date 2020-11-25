/* eslint-disable import/prefer-default-export */
import passport from 'passport';

import strategies from '../auth/passport';

export const passportLoader = (app) => {
  console.info('💻 SETUP - Installing Passport...');
  app.use(passport.initialize());
  passport.use('jwt', strategies.jwt);
};
