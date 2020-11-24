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
