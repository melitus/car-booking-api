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
  const response = {
    _id: newUser.id,
    email: newUser.email,
    accessToken,
  };
  return response;
};

const loginUser = async (inputData) => {
  const { email, password } = inputData;
  const user = await User.findOne({ where: { email }, raw: false });
  const accessToken = await generateAccessTokens(user);
  await passwordMatchesFn(password, user.password);
  const response = {
    _id: user.id,
    email: user.email,
    accessToken,
  };
  return response;
};

export default { loginUser, registerUser, checkEmailExist };
