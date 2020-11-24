import User from './index';
import { generateAccessTokens, passwordMatchesFn, generatePasswordHashFn } from '../../../auth';

const checkEmailExist = async (email) => {
  const user = await User.findOne({ where: { email }, raw: false });
  return user;
};

const register = async (inputData) => {
  const { email, password } = inputData;
  const hash = await generatePasswordHashFn(password);
  const newUser = await User.create({
    email,
    password: hash,
  });
  const accessToken = await generateAccessTokens(newUser);
  return accessToken;
};

const login = async (inputData) => {
  const { email, password } = inputData;
  const user = await User.findOne({ email }).exec();
  const accessToken = await generateAccessTokens(user);
  await passwordMatchesFn(password, user.password);

  return accessToken;
};

export { login, register, checkEmailExist };
