// Site content routes: all GETs are public (pages fetch their own content on load).
// Only the PUT (update by key) requires SUPER_ADMIN auth.
import express from 'express';
import {
  getAllContent,
  getContentByKey,
  getContentByPage,
  updateContentByKey,
} from '../controllers/siteContent.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { updateSiteContentSchema } from '../middlewares/schemas.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/schema.validator.js';

const router = express.Router();

router.get('/', getAllContent);
router.get('/page/:pageName', getContentByPage);
router.get('/key/:keyName', getContentByKey);
router.put(
  '/key/:keyName',
  authMiddleware,
  roleMiddleware('SUPER_ADMIN'),
  validate(updateSiteContentSchema),
  updateContentByKey,
);

export default router;
