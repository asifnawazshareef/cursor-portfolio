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
- Contact page

## API Endpoints

- `GET /api/portfolio` - returns all portfolio content
- `POST /api/contact` - validates and sends contact messages

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

If SMTP variables are missing, the API returns a configuration message.
