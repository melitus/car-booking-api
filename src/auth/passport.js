import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';

import User from '../api/v1/user/user.model';
import config from '../config';

const jwtOptions = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  algorithms: config.algorithms,
};

// This verifies that the token sent by the user is valid
const jwtVerify = async (payload, done) => {
  try {
    const user = await User.findOne({ where: { id: payload.sub }, raw: false });
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

const jwt = new JWTStrategy(jwtOptions, jwtVerify);

export default {
  jwt,
};
