import User from './user.model';
import { generateAccessTokens, passwordMatchesFn, generatePasswordHashFn } from '../../../auth';

const checkEmailExist = async (email) => {
  console.log({ email });
  const user = await User.findOne({ where: { email }, attributes: ['id', 'email'], raw: false });
  console.log({ user });

  return user;
};

const registerUser = async (inputData) => {
  const { email, password } = inputData;
  const hash = await generatePasswordHashFn(password);
  console.log({ hash, inputData });
  const newUser = await User.create({
    email,
    password: hash,
  });
  console.log({ newUser });
  const accessToken = await generateAccessTokens(newUser);
  return accessToken;
};

const loginUser = async (inputData) => {
  const { email, password } = inputData;
  const user = await User.findOne({ where: { email }, raw: false });
  const accessToken = await generateAccessTokens(user);
  await passwordMatchesFn(password, user.password);

  return accessToken;
};

export default { loginUser, registerUser, checkEmailExist };
