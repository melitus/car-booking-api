/* eslint-disable no-self-assign */
/* eslint-disable max-classes-per-file */
import httpStatus from 'http-status';

export class CarBookingStackError extends Error {
  constructor(message, ...args) {
    super(...args);
    Object.setPrototypeOf(this, new.target.prototype);

    this.httpCode = this.httpCode;
    this.name = this.constructor.name;
    this.message = message;
    this.isPublic = this.isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = this.stack; // Error.captureStackTrace(this, this.constructor.name);
    this.title = this.title;
    Error.captureStackTrace(this);
  }
}

/** Class representing an API Error Response with a related HTTP Status Code * */
export class AppError extends CarBookingStackError {
  /**
   * Create an Error Object
   * @param {number} status - The HTTP Status Code (e.g. 404)
   * @param {string} title - The title corresponding to the Status Code (e.g. Bad Request)
   * @param {string} message - Specific information about what caused the error
   */
  constructor(
    status = httpStatus.INTERNAL_SERVER_ERROR,
    title = 'Internal Server Error',
    message = 'An unknown server error occurred.',
  ) {
    // super(status, title, message);
    super(message);
    this.status = status;
    this.title = title;
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

/**
 * Create an Error Object
 * @param {Array} or {object} errors - an instance or array of instances of AppError
 * return {object} format - properly-formatted JSONAPI errors object
 */
function formatError(errors) {
  let errorFormat;
  if (Array.isArray(errors)) {
    const formattedErrors = errors.map((error) => {
      const formattedError = {
        status: error.status,
        title: error.title,
        detail: error.message,
      };
      return formattedError;
    });
    // wrap the array in an object
    errorFormat = { errors: formattedErrors };
  } else {
    const error = errors;
    const formattedError = {
      status: error.status,
      title: error.title,
      detail: error.message,
    };
    // wrap the object in an array and then an object
    errorFormat = { errors: [formattedError] };
  }
  return errorFormat;
}

function isTrustedError(error) {
  if (error instanceof CarBookingStackError) {
    return error.isOperational;
  }
  return false;
}

export async function errorHandler(error, request, response, next) {
  let err = error;

  /* if we get an unhandled error, we want to log to console and turn it into an API error */
  if (!isTrustedError(err)) {
    err = new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.name || 'Internal Server Error',
      error.message || 'An unknown server error occurred',
    );
  }
  const processedErrors = formatError(err);
  response.status(processedErrors.errors[0].status || 500).json(processedErrors);
  return next();
}
