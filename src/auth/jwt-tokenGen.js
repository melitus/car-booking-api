import moment from 'moment-timezone';
import { promisify } from 'util';
import { sign } from 'jsonwebtoken';

import { AuthFailureError } from '../error-handler';
import config from '../config';

export function generateTokenExpiration() {
  const expiresIn = moment().add(config.jwtExpirationInterval, 'minutes').unix();

  return expiresIn;
}

function readAccessTokenKey() {
  return config.jwtSecret;
}
async function encodeAccessToken(payload) {
  const cert = readAccessTokenKey();
  if (!cert) throw new AuthFailureError(401, 'Token generation failure');
  return promisify(sign)({ ...payload }, cert, { algorithm: config.algorithms });
}

const prepareTokenPayload = (user) => {
  const expiresIn = generateTokenExpiration();
  const payload = {
    aud: config.audience,
    iss: config.issued,
    iat: moment().unix(),
    exp: expiresIn,
    sub: user.id,
  };
  return payload;
};

export const generateAccessTokens = async (user) => {
  const tokenType = 'Bearer';
  const accessToken = await encodeAccessToken(prepareTokenPayload(user));
  if (!accessToken) throw new AuthFailureError();
  return {
    tokenType,
    accessToken,
  };
};
