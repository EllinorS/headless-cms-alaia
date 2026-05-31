// Auth routes: public endpoints for login/reset, protected endpoints for
// the current user and logout, and SUPER_ADMIN-only endpoints for user management.
import express from 'express';
import {
  login,
  logout,
  resetPasswordRequest,
  resetPassword,
  connectedUser,
  inviteUser,
  deleteUser,
  getAllUsers,
} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/schema.validator.js';
import {
  inviteUserSchema,
  loginSchema,
  resetPasswordRequestSchema,
  resetPasswordSchema,
} from '../middlewares/schemas.js';

const router = express.Router();

// Public
router.post('/login', validate(loginSchema), login);
router.post('/reset-password-request', validate(resetPasswordRequestSchema), resetPasswordRequest);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);

// Protected
router.get('/me', authMiddleware, connectedUser);
router.post('/logout', authMiddleware, logout);

// SUPER_ADMIN only
router.post('/users/invite', authMiddleware, roleMiddleware('SUPER_ADMIN'), validate(inviteUserSchema), inviteUser);
router.get('/users', authMiddleware, roleMiddleware('SUPER_ADMIN'), getAllUsers)
router.delete('/users/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), deleteUser);
export default router;
