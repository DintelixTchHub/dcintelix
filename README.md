# DCINTELIX Frontend

The frontend uses Next.js App Router, React, TypeScript for the application
foundation, Tailwind CSS v4, and the existing Redux/Axios client integration.
Existing page components and business logic remain in `src/legacy-pages` and
`src/components`.

## Local development

Use Node.js 20.9 or later and npm:

```sh
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_URL` in `.env.local` to the backend API base URL (including
the `/api/v1` prefix). This value is intentionally public because browser
requests use it; do not put credentials or private keys in any `NEXT_PUBLIC_`
variable.

## Checks and production

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

Netlify serves the Next.js App Router through `@netlify/plugin-nextjs`, which
is configured in `netlify.toml`. The build command is `npm run build` and the
publish directory is `.next`. The plugin must run during deployment to
configure Next.js routes and server-rendered pages. Do not add a catch-all
static redirect; Next.js handles routes and 404s.

## Routes

Public pages: `/`, `/about`, `/projects`, `/blogs`, `/contact`, `/privacy`,
`/testimonials`, `/careers`, and `/careers/[identifier]`.

Admin pages: `/admin/login`, `/admin/register`, `/admin/dashboard`,
`/admin/jobs/new`, `/admin/training/new`, `/admin/internships/new`, and
`/admin/jobs/[id]/edit`. `/admin` redirects to `/admin/login`.
