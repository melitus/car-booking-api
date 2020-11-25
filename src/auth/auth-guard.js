/* eslint-disable import/prefer-default-export */
import httpStatus from 'http-status';
import passport from 'passport';
import { promisify } from 'bluebird';
import { AppError } from '../error-handler';

const handleJWT = (req, res, next) => async (err, user, info) => {
  const error = err || info;
  const logIn = promisify(req.logIn);
  const apiError = new AppError(
    httpStatus.UNAUTHORIZED,
    'Authentication required: Authentication with a valid API Key is required.',
    error ? error.stack : undefined,
  );
  // log user in
  try {
    if (error || !user) throw error;
    await logIn(user, { session: false });
  } catch (e) {
    return next(apiError);
  }
  if (err || !user) {
    return next(apiError);
  }

  req.user = user;
  return next();
};

export const authorize = () => (req, res, next) => {
  passport.authenticate('jwt', { session: false, failWithError: true }, handleJWT(req, res, next))(req, res, next);
};
