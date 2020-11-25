/* eslint-disable import/no-cycle */
import { Router } from 'express';

import CarController from './car.controller';
import { authorize } from '../../../auth';

const userRouter = Router();

userRouter.route('/').post(authorize(), CarController.bookACarByUser).get(authorize(), CarController.getAllCars);

userRouter.route('/:userId/previous').get(authorize(), CarController.getAllPreviousBookingByUser);

export default userRouter;
