import { z } from 'zod';

// --- ZOD SCHEMAS (validation + type inference) ---
// Utilisés pour les inputs utilisateur et les données de formulaires

export const LoginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
export type LoginInput = z.infer<typeof LoginSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.email('Invalid email address'),
});
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;

const passwordRules = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const ResetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Token is required'),
    password: passwordRules,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;

export const InviteUserSchema = z.object({
  email: z.email('Invalid email address'),
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  role: z.enum(['SUPER_ADMIN', 'COACH']),
});
export type InviteUserInput = z.infer<typeof InviteUserSchema>;

export const ContactSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  email: z.string().min(1, 'Email is required.').email('Enter a valid email address.'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required.'),
  message: z.string().min(1, 'Message is required.'),
  consent: z.literal(true, { error: 'Please accept the data processing consent.' }),
});
export type ContactFormData = z.infer<typeof ContactSchema>;


export const ClientInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z.string().refine(
    (v) => v === '' || /^[+\d\s\-().]{7,20}$/.test(v),
    { message: 'Enter a valid phone number' }
  ),
});
export type ClientInfo = z.infer<typeof ClientInfoSchema>;

export const FormOptionSchema = z.object({
  id: z.number(),
  label: z.string(),
  value: z.string(),
  feedback: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  position: z.number(),
});
export type FormOption = z.infer<typeof FormOptionSchema>;

export const FormFieldSchema = z.object({
  id: z.number(),
  label: z.string(),
  subtitle: z.string().optional().nullable(),
  explanation: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  type: z.enum(['SINGLE', 'MULTIPLE', 'RANK', 'TEXT']),
  displayType: z.enum(['CARDS', 'SLIDER', 'CHECKBOX', 'RADIO']).optional().nullable(),
  isRequired: z.boolean(),
  position: z.number(),
  options: z.array(FormOptionSchema).optional(),
});
export type FormField = z.infer<typeof FormFieldSchema>;

export const FormSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.enum(['CONTACT', 'SURF_TRIP_REQUEST']),
  fields: z.array(FormFieldSchema),
});
export type Form = z.infer<typeof FormSchema>;

// --- PLAIN TYPES (réponses API, pas de validation nécessaire) ---

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName?: string;
  role: string;
};

export type Media = {
  id: number;
  filename: string;
  url: string;
  mime_type: string;
  size_bytes: number;
  alt: string | null;
  uploaded_at: string;
};

export type Submission = {
  id: number;
  formName: string;
  formType: 'CONTACT' | 'SURF_TRIP_REQUEST';
  clientFirstname: string;
  clientLastname: string;
  clientEmail: string;
  clientPhone: string | null;
  status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';
  createdAt: string;
};

export type ContentItem = {
  id: number;
  keyName: string;
  value: string;
  type: 'TEXT' | 'RICHTEXT' | 'IMAGE_URL' | 'NUMBER';
  page: string;
  label: string;
};

// A surf session as returned by GET /api/sessions/public
export type Session = {
  id: number;
  date: string;     // YYYY-MM-DD
  time: string;     // "9:00 AM"
  type: string;     // "Group Lesson"
  duration: string; // "1h30"
  price: number;    // price per person in NZD
};

export type CarouselSlide = {
  title: string;
  content: string;
  bulletPoints: { text: string }[];
  imageSrc: string;
  imageAlt: string;
  buttonText?: string;
  buttonHref?: string;
};

export type FaqItem = {
  q: string;
  a: string;
}

export type FaqCategory = {
  title: string;
  items:FaqItem[]
}