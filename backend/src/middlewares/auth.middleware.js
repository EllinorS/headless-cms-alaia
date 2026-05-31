// Verifies the JWT stored in the HttpOnly auth_token cookie on every protected route.
// Sets req.user with the decoded payload so downstream handlers know who made the request.
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authMiddleware = (req, res, next) => {
  // The token lives in an HttpOnly cookie (not localStorage) so JS on the page cannot read it.
  // cookieParser in app.js parses it into req.cookies before this middleware runs.
  const token = req.cookies?.auth_token;

  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.name, err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
