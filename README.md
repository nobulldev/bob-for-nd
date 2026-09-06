# Bob Heitkamp for North Dakota

Campaign website with a shared auction backed by Neon PostgreSQL and Vercel
Functions. Every browser uses the same database, so bids remain synchronized
across phones and computers.

## Architecture

- Vite and React render the website.
- `api/auction.ts` returns auction items and public live-auction bids.
- `api/bids.ts` validates and records bids.
- `api/health.ts` checks the Neon connection.
- Neon stores items, bidder names, private phone numbers, and bids.
- Silent-auction bids and every bidder phone number stay out of public API
  responses.

The schema and mock seed data are created idempotently the first time a function
connects to a new Neon database. They can also be initialized explicitly with
`bun run db:migrate`.

## Local development

1. Create a Neon project and copy its pooled connection string.
2. Copy `.env.example` to `.env.local`.
3. Set `DATABASE_URL` in `.env.local`.
4. Install dependencies and start both the local API and Vite:

```bash
bun install
bun run db:migrate
bun run dev
```

The local API runs on port `3001`; Vite runs on port `8081` and proxies `/api`
to it.

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import the repository at https://vercel.com/new.
3. Open the project's **Storage** tab and create or connect a Neon database.
4. Confirm that the integration added `DATABASE_URL` to Production, Preview,
   and Development environments.
5. Redeploy the project.
6. Open `/api/health`; a successful connection returns:

```json
{ "status": "ok", "database": "neon" }
```

`vercel.json` identifies the Vite build, preserves serverless functions under
`/api`, and sends all remaining routes to the React application.

## Environment

```text
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

Never expose this value through a `VITE_` variable or commit `.env.local`.

## Commands

```bash
bun run dev          # local API and Vite
bun run build        # production frontend build
bun run db:migrate   # initialize/update schema and mock data
bun run start        # serve the production build locally with Bun
```
