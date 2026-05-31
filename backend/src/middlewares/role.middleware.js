// Role-based access control. Must be used after authMiddleware so req.user is already populated.
// Usage: router.get('/admin-only', authMiddleware, roleMiddleware('ADMIN'), handler)
export const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    // authMiddleware executed before
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Role verification
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden - insufficient role' });
    }

    next();
  };
};
