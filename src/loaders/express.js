import installApiEndpoints from '../api/v1';

export default (app) => {
  app.set('trust proxy', true);
  app.disable('x-powered-by');
  app.use('/v1/api', installApiEndpoints);

  return app;
};
