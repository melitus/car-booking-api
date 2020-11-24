import { initVendorMiddlewares } from '../middlewares';

export default (app) => {
  app.set('trust proxy', true);
  app.disable('x-powered-by');
  initVendorMiddlewares(app);

  return app;
};
