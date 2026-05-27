# Shan Globalization Website

Premium React + Tailwind website for:

- Home
- About Us
- Services
- Announcement
- Careers
- Contact Us

## Stack

- React
- React Router
- Tailwind CSS
- Vite
- Supabase Auth + Postgres JSON content store

## Run locally

1. Install Node.js 18+.
2. Run `npm install`
3. Copy `.env.example` to `.env`
4. Run `npm run dev`

If `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are not set, the admin portal falls back to local browser-only demo mode.

## Build

- `npm run build`
- `npm run preview`

## Deploy

This project is a Vite single-page app with React Router, so production hosting needs an SPA
fallback for routes like `/about-us` and `/admin/login`.

- `vercel.json` is included for Vercel deployments
- `public/_redirects` is included for Netlify deployments
- `public/.htaccess` is included for Apache-based hosts like Hostinger

Build output:

- Build command: `npm run build`
- Publish directory: `dist`

### Hostinger deployment

If you are using regular Hostinger web hosting, deploy the built static files:

1. Copy `.env.example` to `.env` and set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2. Run `npm run build`
3. Upload the contents of `dist/` into `public_html/`
4. Make sure the uploaded files include `.htaccess` so React Router routes keep working on refresh

If you are using Hostinger Business/Cloud with Node.js Web Apps:

1. Create a new Node.js Web App in hPanel
2. Connect the GitHub repo or upload the project ZIP
3. Use build command `npm run build`
4. Use output directory `dist`
5. Add the same `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables in Hostinger before deploy

## Admin modes

### Supabase mode

When the Supabase env vars are present:

- public announcement/careers content loads from `public.site_content`
- admin login uses Supabase Auth email/password
- only users listed in `public.admin_users` can update content
- content changes live sync across connected browsers and devices

### Local fallback mode

When Supabase is not configured:

- admin login stays on the demo credentials
- content saves only in that browser with `localStorage`
- JSON export/import still works for backup

## Supabase setup

1. Create a Supabase project on the free plan.
2. In the Supabase SQL editor, run [supabase/site_content_schema.sql](./supabase/site_content_schema.sql).
   This sets up the content tables, permissions, seed data, and realtime publication.
3. In Supabase Auth, create the admin user manually.
4. Copy that user ID into the `public.admin_users` insert shown at the bottom of the SQL file.
5. In Auth settings, disable public email signups so random users cannot create admin accounts.
6. Copy `.env.example` to `.env` and fill in:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Handover notes

- Admin login route: `/admin/login`
- Demo fallback credentials: `admin` / `SGAdmin123`
- Dashboard includes JSON export/import for backup handover
- Shared content updates now live sync when Supabase mode is active
- Main editable seed content still lives in `src/data/siteContent.js`

## Notes

- The careers application form still opens the user email client with a prefilled message.
- Placeholder business email, phone, and office text should be replaced with the client's real details.
