// Wraps async route handlers so any thrown error is forwarded to Express error middleware (errorHandler.js)
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
