import express from 'express';
import { createMedia, getAllMedia, getMediaById, updateMediaById, deleteMedia } from '../controllers/media.cloudinary.controller.js';
import { uploadToMemory } from '../middlewares/upload.cloudinary.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/schema.validator.js';
import { updateMediaSchema } from '../middlewares/schemas.js';

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('SUPER_ADMIN'), uploadToMemory.array('files', 100), createMedia);
router.get('/', getAllMedia);
router.get('/:id', getMediaById);
router.put('/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), validate(updateMediaSchema), updateMediaById);
router.delete('/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), deleteMedia);

export default router;
