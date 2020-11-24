export default (app) => {
  app.set('trust proxy', true);
  app.disable('x-powered-by');

  return app;
};
