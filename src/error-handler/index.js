/* eslint-disable max-classes-per-file */
import httpStatus from 'http-status';

/**
 * @extends Error
 */
export class CarBookingStackError extends Error {
  constructor({ message, errors, title, status, isPublic, stack }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = stack; // Error.captureStackTrace(this, this.constructor.name);
    this.title = title;
  }
}

// Class representing an API error.

export class APIError extends CarBookingStackError {
  constructor({
    errors,
    stack,
    title = 'Internal Server Error',
    message = 'An unknown server error occurred.',
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
  }) {
    super({
      message,
      errors,
      status,
      isPublic,
      stack,
      title,
    });
  }
}

export class AuthFailureError extends CarBookingStackError {
  constructor(status = httpStatus.UNAUTHORIZED, title = 'Authentication error', message = 'Invalid Credentials.') {
    super(message);
    this.status = status;
    this.title = title;
  }
}

export class NotFoundError extends CarBookingStackError {
  constructor(
    status = httpStatus.NOT_FOUND,
    title = 'Resource error',
    message = 'ResourceNotFoundError: The API endpoint requested does not exist',
  ) {
    super(message);
    this.status = status;
    this.title = title;
  }
}

export const errorHandler = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };
  res.status(err.status);
  res.json(response);
  res.end();
  next();
};
