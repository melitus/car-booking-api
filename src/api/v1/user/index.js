/* eslint-disable import/no-cycle */
import { Router } from 'express';

import UserController from './user.controller';

const userRouter = Router();

userRouter.route('/login').post(UserController.login);
userRouter.route('/register').post(UserController.register);

export default userRouter;
