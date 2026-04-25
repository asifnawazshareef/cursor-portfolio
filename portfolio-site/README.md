# Asif Portfolio (Next.js + TypeScript + Node.js)

A recruiter-focused portfolio website with reusable frontend sections and backend APIs.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Node.js API routes
- Zod validation
- Nodemailer for contact delivery

## Included Sections

- Qualifications
- Experience
- Skills
- Education
- Projects
- Certifications
- Resume preview
- Contact page
- Admin dashboard (`/admin`)

## API Endpoints

- `GET /api/portfolio` - returns all portfolio content
- `POST /api/contact` - validates and sends contact messages
- `POST /api/admin/login` - authenticates dashboard
- `GET/PUT /api/admin/portfolio` - reads and updates portfolio data

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Contact Form Environment Variables

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_RECEIVER_EMAIL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

If SMTP variables are missing, the API returns a configuration message.
