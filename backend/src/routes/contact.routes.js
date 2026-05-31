// Contact route: single public POST that validates the form and fires a notification email to the coach.
// No database record is created — the contact form is email-only.
import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { newContactEmail } from '../config/mailer.js';
import { validate } from '../middlewares/schema.validator.js';
import { contactSchema } from '../middlewares/schemas.js';

const router = express.Router();

router.post('/', validate(contactSchema), asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, subject, message } = req.body;
  await newContactEmail(firstName, lastName, email, phone ?? '', subject, message);
  res.status(202).json({ message: 'Message sent' });
}));

export default router;