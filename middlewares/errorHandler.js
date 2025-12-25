const errorHandler = (err, req, res, next) => {
  // Log full error for development debugging
  console.error(err);

  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Internal Server Error";

  if (err.code === 11000) {
    statusCode = 409;
    message = "Resource already exists";
  }

  res.status(statusCode).json({
    success: false,
    code: statusCode,
    message: message,
  });
};

export default errorHandler;
