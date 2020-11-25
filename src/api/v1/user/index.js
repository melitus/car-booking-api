/* eslint-disable import/no-cycle */
import { Router } from 'express';
import { validateBodySchema } from '../../../helpers/validation';

import UserController from './user.controller';
import { loginSchema, registerSchema } from './user.validation';

const userRouter = Router();

userRouter.route('/login').post(validateBodySchema(loginSchema), UserController.login);
userRouter.route('/register').post(validateBodySchema(registerSchema), UserController.register);

export default userRouter;
