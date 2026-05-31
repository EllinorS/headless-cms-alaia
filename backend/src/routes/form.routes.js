// Form routes: SUPER_ADMIN CRUD for forms, fields, and options.
// GET /:id is public so the quiz page can fetch the active form without auth.
import express from 'express';
import {
  createForm, getAllForms, getFormById, updateForm, deleteForm,
  createField, getFieldById, updateField, deleteField,
  createOption, getOptionById, updateOption, deleteOption,
} from '../controllers/form.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/schema.validator.js';
import {
  createFormSchema, updateFormSchema,
  createFieldSchema, updateFieldSchema,
  createOptionSchema, updateOptionSchema,
} from '../middlewares/schemas.js';

const router = express.Router();

// FORMS
router.post('/', authMiddleware, roleMiddleware('SUPER_ADMIN'), validate(createFormSchema), createForm);
router.get('/', authMiddleware, roleMiddleware('SUPER_ADMIN'), getAllForms);
router.get('/:id', getFormById);
router.put('/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), validate(updateFormSchema), updateForm);
router.delete('/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), deleteForm);

// FIELDS

router.post('/:formId/fields', authMiddleware, roleMiddleware('SUPER_ADMIN'), validate(createFieldSchema), createField);
router.get('/fields/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), getFieldById);
router.put('/fields/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), validate(updateFieldSchema), updateField);
router.delete('/fields/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), deleteField);


// OPTIONS 

router.post('/fields/:fieldId/options', authMiddleware, roleMiddleware('SUPER_ADMIN'), validate(createOptionSchema), createOption);
router.get('/options/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), getOptionById);
router.put('/options/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), validate(updateOptionSchema), updateOption);
router.delete('/options/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), deleteOption);


export default router;