/* eslint-disable import/no-cycle */
import { Router } from 'express';

import CarController from './car.controller';
import { authorize } from '../../../auth';
import { validateBodySchema } from '../../../helpers/validation';

import { addBookingSchema } from './car.validation';

const userRouter = Router();

userRouter
  .route('/')
  .post(validateBodySchema(addBookingSchema), authorize(), CarController.bookACarByUser)
  .get(authorize(), CarController.getAllCars);

userRouter.route('/:userId/previous').get(authorize(), CarController.getAllPreviousBookingByUser);

export default userRouter;
