/* eslint-disable import/prefer-default-export */
import httpStatus from 'http-status';
import passport from 'passport';
import { promisify } from 'bluebird';
import { AuthFailureError, APIError } from '../error-handler';

const handleJWT = async (req, res, next) => async (err, user, info) => {
  const error = err || info;
  const logIn = promisify(req.logIn);
  const apiError = new APIError(
    httpStatus.UNAUTHORIZED,
    'Authentication required: Authentication with a valid API Key is required.',
    error ? error.stack : undefined,
  );

  try {
    // if user is not login
    if (error || !user) throw new AuthFailureError(402, 'User not registered');
    await logIn(user, { session: false });
  } catch (e) {
    return next(apiError);
  }

  req.user = user;
  return next();
};

export const authorize = () => async (req, res, next) =>
  passport.authenticate('jwt', { session: false, failWithError: true }, await handleJWT(req, res, next))(
    req,
    res,
    next,
  );
