export const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') console.error(err.stack);
  else console.error(err.message);
  // Only forward err.message to the client if err.status is set — those are intentional app errors.
  // Unhandled errors (no status) get a generic message so internal details don't leak.
  const message = err.status ? err.message : 'Internal server error';
  res.status(err.status || 500).json({ message });
};
