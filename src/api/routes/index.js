import { Router } from 'express';

import userRoutes from '../v1/user';

const apiRouter = Router();

apiRouter.use('/user', userRoutes);

export default apiRouter;
