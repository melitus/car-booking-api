import { Router } from 'express';

import userRoutes from '../v1/user';
import carRoutes from '../v1/car';

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Car booking api is live!' });
});

apiRouter.use('/user', userRoutes);
apiRouter.use('/booking', carRoutes);

export default apiRouter;
