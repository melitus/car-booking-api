import { initVendorMiddlewares } from '../middlewares';
import installApiEndpoints from '../api/routes';
import { initializeErrorHandling } from './error';
import { passportLoader } from './passport';

export default (app) => {
  app.set('trust proxy', true);
  app.disable('x-powered-by');
  initVendorMiddlewares(app);
  passportLoader(app);

  app.use('/v1/api', installApiEndpoints);
  initializeErrorHandling(app);

  return app;
};
