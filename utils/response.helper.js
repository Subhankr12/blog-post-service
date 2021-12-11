const successResponse = ({
  res,
  data = {},
  code = 200,
  message = '',
}) => res.send({ data, code, message });

const errorResponse = ({
  res,
  data = {},
  code = 500,
  message = null,
  error = null,
}) => {
  const errorCode = (error && error.code) || code;
  const errorMessage = (error && error.message) || message || '';
  return res.status(errorCode).send(
    {
      data,
      code: errorCode,
      message: errorMessage,
    },
  );
};

module.exports = { successResponse, errorResponse };
