import User from './user.model';
import { generateAccessTokens, passwordMatchesFn, generatePasswordHashFn } from '../../../auth';

const checkEmailExist = async (email) => {
  const user = await User.findOne({ where: { email }, raw: false });
  return user;
};

const registerUser = async (inputData) => {
  const { email, password } = inputData;
  const hash = await generatePasswordHashFn(password);
  const newUser = await User.create({
    email,
    password: hash,
  });
  const accessToken = await generateAccessTokens(newUser);
  return accessToken;
};

const loginUser = async (inputData) => {
  const { email, password } = inputData;
  const user = await User.findOne({ email }).exec();
  const accessToken = await generateAccessTokens(user);
  await passwordMatchesFn(password, user.password);

  return accessToken;
};

export default { loginUser, registerUser, checkEmailExist };
