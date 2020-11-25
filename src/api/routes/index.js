import { Router } from 'express';

import userRoutes from '../v1/user';
import carRoutes from '../v1/car';

const apiRouter = Router();

apiRouter.use('/user', userRoutes);
apiRouter.use('/booking', carRoutes);

export default apiRouter;
