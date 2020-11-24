/* eslint-disable import/no-named-as-default-member */
import httpStatus from 'http-status';

import UserService from './user.service';

const register = async (req, res) => {
  const inputData = req.body;
  try {
    const user = await UserService.checkEmailExist(inputData.email);
    if (user) {
      res.status(httpStatus.UNAUTHORIZED).json({ message: 'Email already exists' });
    } else {
      const newUserAccessToken = await UserService.registerUser(inputData);
      res.status(httpStatus.CREATED).json({ token: newUserAccessToken });
    }
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({ message: 'Error Creating User' });
  }
};

const login = async (req, res) => {
  const inputData = req.body;
  try {
    const response = await UserService.loginUser(inputData);
    res.status(httpStatus.OK).json({ token: response });
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({ message: 'Error login User' });
  }
};

export default {
  register,
  login,
};
