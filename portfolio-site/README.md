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
- `POST /api/admin/resume` - uploads and updates resume PDF URL

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

## Gmail SMTP Configuration

Use Gmail SMTP values:

- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_USER=asifnawazsharif3@gmail.com`
- `SMTP_PASS=<Google App Password>`
- `CONTACT_RECEIVER_EMAIL=asifnawazsharif3@gmail.com`

Important: Gmail account password does not work directly. Use a 16-character Google App Password.

## Dynamic Data Persistence

- Portfolio data is persisted at `data/portfolio.json`
- Resume uploads are stored in `public/uploads`
- Home/contact pages fetch data from API for dynamic updates
