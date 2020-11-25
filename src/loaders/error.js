/* eslint-disable import/prefer-default-export */
import { NotFoundError, errorHandler } from '../error-handler';

export function initializeErrorHandling(app) {
  // catch 404 and forward to error handler
  app.use((req, res, next) => next(new NotFoundError()));

  // global error handler, send stacktrace only during development
  app.use(errorHandler);
}
