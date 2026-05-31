// All Zod validation schemas used by validate() in schema.validator.js.
// Each schema mirrors the shape of the corresponding API request body.
import { z } from 'zod';

// invite user (SUPER_ADMIN only)

export const inviteUserSchema = z.object({
  email: z.email('Invalid email address'),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  role: z.enum(['SUPER_ADMIN', 'COACH']).default('COACH'),
});

// login

export const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

// reset password request

export const resetPasswordRequestSchema = z.object({
  email: z.email('Invalid email address'),
});

// reset password

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Token is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
  })

// update media

export const updateMediaSchema = z.object({
  alt: z.string().max(500).optional(),
});

// update site content

export const updateSiteContentSchema = z.object({
  value: z.string().optional(),
  page: z.string().min(1),
  label: z.string().min(1),
  type: z.enum(['TEXT', 'RICHTEXT', 'IMAGE_URL', 'NUMBER']),
});

// form

export const createFormSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.enum(['CONTACT', 'SURF_TRIP_REQUEST']),
  isActive: z.boolean().default(true),
});

export const updateFormSchema = createFormSchema.partial();

// form field

export const createFieldSchema = z.object({
  label: z.string().min(1).max(255),
  subtitle: z.string().max(255).nullable().optional(),
  explanation: z.string().nullable().optional(),
  type: z.enum(['SINGLE', 'MULTIPLE', 'RANK', 'TEXT']),
  displayType: z.enum(['CARDS', 'SLIDER', 'CHECKBOX', 'RADIO']).nullable().optional(),
  imageUrl: z.string().url('Must be a valid URL').startsWith('https://', 'Must be HTTPS').nullable().optional(),
  position: z.number().int().min(0).default(0),
  isRequired: z.boolean().default(true),
});

export const updateFieldSchema = z.object({
  label: z.string().min(1).max(255).optional(),
  subtitle: z.string().max(255).nullable().optional(),
  explanation: z.string().nullable().optional(),
  type: z.enum(['SINGLE', 'MULTIPLE', 'RANK', 'TEXT']).optional(),
  displayType: z.enum(['CARDS', 'SLIDER', 'CHECKBOX', 'RADIO']).nullable().optional(),
  imageUrl: z.string().url('Must be a valid URL').startsWith('https://', 'Must be HTTPS').nullable().optional(),
  position: z.number().int().min(0).optional(),
  isRequired: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

// form field option

export const createOptionSchema = z.object({
  label: z.string().min(1).max(500),
  value: z.string().min(1).max(500),
  feedback: z.string().max(500).optional(),
  imageUrl: z.string().url('Must be a valid URL').startsWith('https://', 'Must be HTTPS').nullable().optional(),
  position: z.number().int().min(0).default(0),
});

export const updateOptionSchema = createOptionSchema.partial();

// submission

const answerSchema = z.object({
  fieldId: z.number().int().positive(),
  value: z.string().max(5000),
});

export const createSubmissionSchema = z.object({
  formId: z.number().int().positive(),
  client: z.object({
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    email: z.email(),
    phone: z.string().regex(/^[+\d\s()./-]{1,30}$/, 'Invalid phone number').optional(),
  }),
  answers: z.array(answerSchema).min(1, 'At least one answer is required'),
});

export const updateSubmissionStatusSchema = z.object({
  status: z.enum(['NEW', 'READ', 'REPLIED', 'ARCHIVED']),
});

// session

export const createSessionSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  time: z.string().min(1).max(10),
  type: z.enum(['Group - Adults', 'Group - Kids']),
  duration: z.string().min(1).max(10),
  price: z.number().min(0, 'Price must be 0 or more'),
});

// contact form

export const contactSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.email(),
  phone: z.string().regex(/^[+\d\s()./-]{1,30}$/, 'Invalid phone number').optional(),
  subject: z.string().min(1).max(255),
  message: z.string().min(1),
});
