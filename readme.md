# JobFlow – Job Board Application

Live Demo: https://jobflow-24.netlify.app/

JobFlow is a full-stack job board application where employers can post jobs and job seekers can search, apply, and track applications in a structured workflow.

This project is built with a real-world recruitment system in mind.

## Features

### Employer

- Create, edit, and delete job posts
- View applicants for each job
- Update application status (Pending / Accepted / Rejected)
- Download CVs submitted by job applicants

### Job Seeker

- Browse and search jobs
- Filter jobs by title, location, job type, and category
- Server-side pagination for job listings
- Apply for jobs with CV upload
- Track application status

### Authentication

- JWT authentication system
- Access Token & Refresh Token implementation
- Role-based access control (Employer / Job Seeker)

### 👤 Profile Management

- Update profile information
- Upload avatar image

### 📄 File Handling

- CV upload using Multer
- Cloudinary integration for file storage and delivery

## Tech Stack

### Frontend

- Next.js
- TypeScript
- TanStack Query
- Tailwind CSS
- Framer Motion

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

### Services

- Cloudinary (file storage)
- Supabase (database hosting)
- Render (backend deployment)
- Netlify (frontend deployment)

## What I Learned

This project helped me understand real-world full-stack development including authentication systems, role-based access control, file handling, pagination, and deployment workflows.

I also improved my ability to design scalable backend architecture and manage production-ready APIs.

## Deployment

- Frontend deployed on Netlify
- Backend deployed on Render
- Database hosted on Supabase
