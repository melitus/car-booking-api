/* eslint-disable import/no-named-as-default-member */
import httpStatus from 'http-status';

import UserService from './user.service';

const register = async (req, res) => {
  const inputData = req.body;
  try {
    const user = await UserService.checkEmailExist(inputData.email);
    if (user) {
      res.status(httpStatus.UNAUTHORIZED).json({ success: true, message: 'Email already exists' });
    } else {
      const newUserAccessToken = await UserService.registerUser(inputData);
      res
        .status(httpStatus.CREATED)
        .json({ success: true, message: 'User registered successfully', data: newUserAccessToken });
    }
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'Error Creating User', Error: error });
  }
};

const login = async (req, res) => {
  const inputData = req.body;
  try {
    const user = await UserService.checkEmailExist(inputData.email);
    if (!user) {
      res.status(httpStatus.UNAUTHORIZED).json({ success: true, message: 'No user with that email' });
    } else {
      const response = await UserService.loginUser(inputData);
      res.status(httpStatus.OK).json({ success: true, message: 'User login successsfuly', data: response });
    }
  } catch (error) {
    console.trace(error);
    res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'Error login User' });
  }
};

export default {
  register,
  login,
};
