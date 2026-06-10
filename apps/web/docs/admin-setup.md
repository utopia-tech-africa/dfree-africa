# Admin dashboard setup

The admin area lives at `/admin` (locale-free). It uses **Better Auth**, **Prisma**, **Neon Postgres**, and **Resend** for invitation emails.

## 1. Environment variables

Copy `apps/web/.env.example` to `apps/web/.env.local` and set (Prisma CLI reads `.env` then `.env.local` via `prisma.config.ts`):

| Variable             | Notes                                          |
| -------------------- | ---------------------------------------------- |
| `DATABASE_URL`       | Neon **pooled** connection string (serverless) |
| `BETTER_AUTH_SECRET` | `openssl rand -base64 32`                      |
| `BETTER_AUTH_URL`    | Site origin, e.g. `http://localhost:3000`      |
| `RESEND_API_KEY`     | From [resend.com](https://resend.com)          |
| `EMAIL_FROM`         | Verified sender domain in Resend               |
| `BOOTSTRAP_*`        | Only for the one-time seed script              |

## 2. Database

```bash
cd apps/web
pnpm db:migrate    # or: pnpm db:push (local prototyping)
pnpm db:generate
```

On Vercel production deploys, run migrations via `pnpm db:deploy` in your release step or manually after deploy.

## 3. Bootstrap first owner

```bash
pnpm --filter web auth:seed
```

Creates the bootstrap user, `DFREE Admin` organization, and an `owner` membership.

## 4. Run the app

```bash
pnpm --filter web dev
```

- Sign in: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Invite admins: **Team** page (`/admin/team`)

Invitees must **sign in with the invited email** before opening the accept link (`/admin/accept-invitation/[id]`).

In **production**, public sign-up is disabled (`disableSignUp`). Create additional admin accounts in development first, or run the seed script for each environment.

## 5. Vercel

Add the same env vars to the `web` project. Set `BETTER_AUTH_URL` to your production URL. Ensure `postinstall` / build runs `prisma generate` (configured in `package.json`).

## 6. Form submissions (planned)

Public forms (contact, fellowship application, fellowship sponsor) are not wired to the database yet. When they are, use this flow:

1. **Validate** input (e.g. Zod) in a route handler or server action.
2. **Persist** a `FormSubmission` row (future Prisma model), for example:

   ```prisma
   model FormSubmission {
     id                   String   @id @default(cuid())
     type                 String   // contact | fellowship-application | fellowship-sponsor
     payload              Json
     createdAt            DateTime @default(now())
     acknowledgementSentAt DateTime?
   }
   ```

3. **Auto-reply** via `sendFormAcknowledgement` in `lib/email/send-form-acknowledgement.ts` (copy in `lib/email/form-acknowledgement-copy.ts`). Uses the same `RESEND_API_KEY` and `EMAIL_FROM` as invitations.
4. **Set** `acknowledgementSentAt` after a successful send so webhook retries stay idempotent (skip send if already set).

Example (future API route):

```ts
import { sendFormAcknowledgement } from "@/lib/email/send-form-acknowledgement";

const { sent } = await sendFormAcknowledgement({
  to: email,
  formType: "fellowship-application",
  submitterName: name,
});
// if (sent) await prisma.formSubmission.update({ acknowledgementSentAt: new Date() })
```

Admin list pages and dashboard metrics will read from `FormSubmission` once the public forms POST to your API.
