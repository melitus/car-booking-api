/* eslint-disable no-use-before-define */
const defaultServerResponse = {
  status: 422,
  message: '',
  body: {},
};
export const validateBodySchema = (schema) => {
  return (req, res, next) => {
    const response = { ...defaultServerResponse };
    const result = checkSchema(req.body, schema);
    if (result) {
      response.body = result;
      response.message = `Invalid Fields`;
      return res.status(422).send(response);
    }
    return next();
  };
};

export const validateQuerySchema = (schema) => {
  return (req, res, next) => {
    const response = { ...defaultServerResponse };
    const result = checkSchema(req.query, schema);
    if (result) {
      response.body = result;
      response.message = `Invalid Fields`;
      return res.status(422).send(response);
    }
    return next();
  };
};

export const validateParamsSchema = (schema) => {
  return (req, res, next) => {
    const response = { ...defaultServerResponse };
    const result = checkSchema(req.params, schema);
    if (result) {
      response.body = result;
      response.message = `Invalid Fields`;
      return res.status(422).send(response);
    }
    return next();
  };
};

const checkSchema = (data, schema) => {
  const result = schema.validate(data, { convert: false });
  if (result.error) {
    const errorDetails = result.error.details.map((value) => {
      return {
        error: value.message,
        path: value.path,
      };
    });
    return errorDetails;
  }
  return null;
};
