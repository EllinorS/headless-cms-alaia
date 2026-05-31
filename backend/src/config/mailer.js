// Nodemailer transporter configured for Brevo SMTP, plus transactional email templates.
import 'dotenv/config';
import nodemailer from 'nodemailer';
import sanitizeHtml from 'sanitize-html';

const SENDER = `ALAIA Surf Coach <${process.env.SMTP_FROM}>`;

// Strips all HTML tags from user-supplied strings before injecting into email templates.
const esc = (str) => sanitizeHtml(String(str ?? ''), { allowedTags: [], allowedAttributes: {} });

export const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

// Tests the SMTP connection at startup. In production, a broken SMTP config is fatal
// because every email-dependent endpoint (reset, invite, contact) will silently fail.
transporter.verify((err) => {
  if (err) {
    console.error('SMTP error', err.message);
  } else {
    console.log('SMTP connected');
  }
});

// Wraps transporter.sendMail. Always throws on failure so callers decide how to handle it:
// critical paths (password reset, invite) let the error bubble → 500 is better than false success.
// non-critical paths (submission notification) use fire-and-forget with .catch().
const safeSendMail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent to', mailOptions.to, '— messageId:', info.messageId);
  } catch (err) {
    console.error('Email failed to', mailOptions.to);
    console.error('  Subject:', mailOptions.subject);
    console.error('  Error:', err.message);
    console.error('  Code:', err.code, '| Response:', err.response);
    throw err;
  }
};

export const sendResetPasswordEmail = async (email, token) => {
  await safeSendMail({
    from: SENDER,
    to: email,
    subject: 'Reset password',
    html: `
      <h2>Hi ${esc(email)}!</h2>
      <p>Click the link to reset your password:</p>
      <a href="${process.env.CLIENT_URL}/reset-password?token=${token}">Reset my password</a>
    `,
  });
};

// Sent to the admin inbox when a visitor submits the surf trip request quiz.
export const newSubmissionEmail = async (firstName, lastName, email, phone) => {
  await safeSendMail({
    from: SENDER,
    to: process.env.CONTACT_EMAIL,
    subject: `New surf trip request — ${esc(firstName)} ${esc(lastName)}`,
    html: `
      <p>A new surf trip request has been submitted.</p>
      <p>Name: ${esc(firstName)} ${esc(lastName)}<br/>
      Email: ${esc(email)}<br/>
      Phone: ${esc(phone)}</p>
      <p>View the full submission in the admin panel.</p>
    `,
  });
};

// Sent to the admin inbox when a visitor submits the contact form.
// replyTo is set to the visitor's email so replying goes to them, not to SMTP_FROM.
export const newContactEmail = async (firstName, lastName, email, phone, subject, message) => {
  await safeSendMail({
    from: SENDER,
    replyTo: esc(email),
    to: process.env.CONTACT_EMAIL,
    subject: `New message — ${esc(subject)}`,
    html: `
      <p>First name: ${esc(firstName)}<br/>
      Last name: ${esc(lastName)}<br/>
      Phone: ${esc(phone)}<br/>
      Email: ${esc(email)}<br/>
      Message: ${esc(message)}</p>
    `,
  });
};
