# ALAIA Surf Coach

Full-stack web application for ALAIA Surf Coach — a surf school based in Raglan, New Zealand. Includes a public-facing website, a surf lesson booking system, a custom surf trip request quiz, and an admin dashboard for managing content, sessions, media, and users.

---

## Project Structure

```
/
├── frontend/   — Next.js 15 App Router (TypeScript, Tailwind CSS, shadcn/ui)
└── backend/    — Express 5 REST API (Node.js, MySQL 2, ESM)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React, TypeScript, Tailwind CSS, shadcn/ui |
| Backend | Node.js, Express 5, MySQL 2 (raw SQL, no ORM) |
| Auth | JWT (HttpOnly cookie), Argon2 password hashing |
| Email | Brevo SMTP via Nodemailer |
| File storage | Cloudinary |
| Testing | Manual Postman collection |

---

## Getting Started

### Prerequisites

- Node.js 20+
- MySQL database
- Brevo account (SMTP)
- Cloudinary account

### 1. Database

Run `backend/db.sql` against your MySQL instance to create all tables and seed initial data.

### 2. Backend

```bash
cd backend
yarn install
```

Create `backend/.env` from `backend/.env.example`:

```env
NODE_ENV=development

DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
PORT=3000

JWT_SECRET=a_long_random_secret_string
JWT_EXPIRES_IN=7d

BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_USER=your_brevo_smtp_user
BREVO_SMTP_PASS=your_brevo_smtp_password
SMTP_FROM=noreply@yourdomain.com
CONTACT_EMAIL=you@yourdomain.com

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:3001
```

```bash
yarn dev     # development (nodemon) — http://localhost:3000
yarn start   # production
```

### 3. Frontend

```bash
cd frontend
yarn install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

```bash
yarn dev    # development — http://localhost:3001
yarn build  # production build
yarn start  # serve production build
yarn lint   # ESLint
```

---

## Public Routes

| Path | Description |
|---|---|
| `/` | Homepage |
| `/about` | About the coach |
| `/surf-in-new-zealand` | Surf lessons & trips in NZ |
| `/book-surf-lesson` | View upcoming sessions and book |
| `/surf-trip-request` | Custom surf trip quiz |
| `/surf-trip-request/success` | Submission confirmation |
| `/faq` | Frequently asked questions |
| `/contact` | Contact form |
| `/terms` | Terms & conditions |
| `/privacy` | Privacy policy |

## Admin Routes

All routes under `/admin` require authentication.

| Path | Description |
|---|---|
| `/admin` | Dashboard |
| `/admin/content` | Edit site content by page (headless CMS) |
| `/admin/media` | Upload and manage media (Cloudinary) |
| `/admin/sessions` | Manage upcoming surf sessions |
| `/admin/surf-trip-request` | View surf trip quiz submissions |
| `/admin/users` | Manage admin users (SUPER_ADMIN only) |

---

## Backend API

Base URL: `/api`

| Resource | Prefix |
|---|---|
| Auth | `/api/auth` |
| Site content | `/api/content` |
| Forms | `/api/forms` |
| Submissions | `/api/submissions` |
| Contact | `/api/contact` |
| Sessions | `/api/sessions` |
| Media | `/api/media` |

---

## Headless CMS

Site text and image content is stored in the `site_content` table and editable from `/admin/content`. Pages managed:

- **home** — hero, coach intro, USPs, lesson cards, reviews
- **about** — hero, coach bio, values, mission
- **surf-in-new-zealand** — hero, lessons, packages, trips sections
- **book-surf-lesson** — hero, schedule, contact section
- **surf-trip** — hero, quiz intro cards
- **faq** — categories and Q&A items
- **terms** — page title, last updated, body
- **privacy** — page title, last updated, body
- **global** — footer image, social URLs, lesson prices

Field types: `TEXT`, `RICHTEXT`, `IMAGE_URL`, `NUMBER`.

---

## Email Notifications

Sent via Brevo SMTP. Triggered events:

| Event | Recipient |
|---|---|
| Password reset | Admin user (reset link) |
| New user invite | New admin user (set-password link) |
| New surf trip submission | Admin inbox |
| Contact form submission | Admin inbox |

---

## Key Conventions

- **Date formatting** — `frontend/lib/date-formatter.ts` is the single source of truth for all date/time formatting.
- **CMS key groupings** — `frontend/lib/content-blocks.ts` defines which keys belong to each admin content tab.
- **CMS data fetching** — `frontend/lib/get-page-content.ts` exports `getPageContent(page)` and `readContent(map)` used by every public page.
- **Cache** — public pages revalidate every 60 seconds (`next: { revalidate: 60 }`).
- **noindex** — transactional pages (`/surf-trip-request/success`) are excluded from search engine indexing.
- **ESM** — backend uses `"type": "module"`, use `import`/`export` only.
