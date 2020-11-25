/* eslint-disable no-self-assign */
/* eslint-disable max-classes-per-file */
import httpStatus from 'http-status';

// /**
//  * @extends Error
//  */
// export class CarBookingStackError extends Error {
//   constructor({ message, errors, title, status, isPublic, stack }) {
//     super(message);
//     this.name = this.constructor.name;
//     this.message = message;
//     this.errors = errors;
//     this.status = status;
//     this.isPublic = isPublic;
//     this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
//     this.stack = stack; // Error.captureStackTrace(this, this.constructor.name);
//     this.title = title;
//   }
// }

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

// Class representing an API error.

export class AppError extends CarBookingStackError {
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

// Generic error response middleware for internal server errors.
export function genericErrorHandler(err, req, res, next) {
  console.log({ err });
  const errCode = err.status || err.code || 500;
  let errorMsg = '';

  if (Array.isArray(err.error)) {
    errorMsg = err.error.map((e) => `${e.param}: ${e.msg}`).toString();
  } else {
    errorMsg = err.error ? `${err.error.message} ${err.error.detail || ''}` : err.message;
  }

  res.status(errCode).json({
    success: false,
    code: errCode,
    message: errorMsg,
  });
}

/**
 * Create an Error Object
 * @param {Array} or {object} errors - an instance or array of instances of AppError
 * return {object} format - properly-formatted JSONAPI errors object
 */
function formatError(errors) {
  let errorFormat;
  console.log({ errors });
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

async function handleError(err) {
  await console.error('Error message from the centralized error-handling component', err);
  // await sendMailToAdminIfCritical(err);
  // await sendEventsToSentry();
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
    console.error(err);
    err = new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.name || 'Internal Server Error',
      error.message || 'An unknown server error occurred',
    );
    await handleError(err);
  }
  const processedErrors = formatError(err);
  response.status(processedErrors.errors[0].status || 500).json(processedErrors);
  return next();
}
