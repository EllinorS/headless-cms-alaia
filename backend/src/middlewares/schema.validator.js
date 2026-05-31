// Zod middleware adapter. Wraps a Zod schema into an Express middleware that validates
// and coerces req.body in place, then returns 400 with a joined error message on failure.
export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error.issues) {
      return res.status(400).json({ message: error.issues.map((e) => e.message).join(', ') });
    }
    return next(error);
  }
};
