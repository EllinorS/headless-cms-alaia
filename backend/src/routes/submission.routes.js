// Submission routes: public POST for the quiz/surf-trip-request form.
// Admin endpoints for reading, status updates, and deletion require SUPER_ADMIN auth.
import express from 'express';
import {
  createSubmission, getAllSubmissions, getSubmissionById,
  updateStatus, deleteSubmission,
} from '../controllers/submission.controller.js';
import {
  createSubmissionSchema, updateSubmissionStatusSchema,
} from '../middlewares/schemas.js';
import { validate } from '../middlewares/schema.validator.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

const router = express.Router();

// PUBLIC
router.post('/', validate(createSubmissionSchema), createSubmission);

// ADMIN
router.get('/', authMiddleware, roleMiddleware('SUPER_ADMIN'), getAllSubmissions);
router.get('/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), getSubmissionById);
router.patch('/:id/status', authMiddleware, roleMiddleware('SUPER_ADMIN'), validate(updateSubmissionStatusSchema), updateStatus);
router.delete('/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), deleteSubmission);

export default router;