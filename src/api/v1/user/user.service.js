import User from './index';

const checkEmailExist = async (email) => {
  const user = await User.findOne({ where: { email }, raw: false });
  return user;
};
const register = async (inputData) => {
  const { email, password } = inputData;
  
};
