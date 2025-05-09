export const sendSuccess = (
  res,
  data = {},
  message = 'Success',
  statusCode = 200
) => {
  return res.status(statusCode).json({
    statusCode,
    error: '',
    message,
    data,
  });
};

export const sendError = (
  res,
  message = 'Something went wrong',
  statusCode = 500,
  errorData = null
) => {
  return res.status(statusCode).json({
    statusCode,
    error: message,
    message,
    ...(errorData ? { data: errorData } : {}),
  });
};
