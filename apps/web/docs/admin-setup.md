# Admin dashboard setup

The admin area lives at `/admin` (locale-free). It uses **Better Auth**, **Prisma**, **Neon Postgres**, and **Amazon SES** for invitation and form acknowledgement emails.

## 1. Environment variables

Copy `apps/web/.env.example` to `apps/web/.env.local` and set (Prisma CLI reads `.env` then `.env.local` via `prisma.config.ts`):

| Variable                      | Notes                                                                                                                                                             |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`                | Neon **pooled** connection string (serverless)                                                                                                                    |
| `BETTER_AUTH_SECRET`          | `openssl rand -base64 32`                                                                                                                                         |
| `BETTER_AUTH_URL`             | Exact site origin you open in the browser. Local: `http://localhost:3000`. Production: `https://www.dfreefoundation.org` (not `localhost`; apex redirects to www) |
| `BETTER_AUTH_TRUSTED_ORIGINS` | Optional comma-separated extra origins (custom domains, previews). Apex + www for dfreefoundation.org are included in code.                                       |
| `NEXT_PUBLIC_SITE_URL`        | Canonical public origin (Stripe URLs + Better Auth fallback). Production: `https://www.dfreefoundation.org`                                                       |
| `AWS_REGION`                  | SES region, e.g. `us-east-1` (or set `SES_AWS_REGION`)                                                                                                            |
| `AWS_ACCESS_KEY_ID`           | IAM user/key with `ses:SendEmail` (optional on AWS hosts)                                                                                                         |
| `AWS_SECRET_ACCESS_KEY`       | Matching secret key (optional on AWS hosts with IAM role)                                                                                                         |
| `EMAIL_FROM`                  | Verified SES sender identity / domain address                                                                                                                     |
| `STRIPE_SECRET_KEY`           | Stripe Dashboard → Developers → API keys                                                                                                                          |
| `STRIPE_WEBHOOK_SECRET`       | Stripe webhook signing secret for `/api/stripe/webhook`                                                                                                           |
| `BOOTSTRAP_*`                 | Only for the one-time seed script                                                                                                                                 |

### Amazon SES (transactional email)

1. In AWS SES, verify the domain (or email) used for `EMAIL_FROM`.
2. If the account is still in the SES sandbox, verify recipient addresses too (or request production access).
3. Create an IAM user/role with `ses:SendEmail` / `ses:SendRawEmail` on the verified identity.
4. Set `AWS_REGION`, credentials (local/dev), and `EMAIL_FROM` in `.env.local` / hosting env.

Invitations and form acknowledgements both send through `lib/email/send-email.ts`.

### Stripe (Leadership Institute sponsorship credit card)

1. Add `STRIPE_SECRET_KEY` (start with `sk_test_…` for testing).
2. In Stripe Dashboard → Developers → Webhooks, create an endpoint:
   - URL: `https://<your-domain>/api/stripe/webhook`
   - Events: `checkout.session.completed`, `checkout.session.expired`
3. Paste the signing secret into `STRIPE_WEBHOOK_SECRET`.
4. For local testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

Card payments on the sponsor form use Stripe Checkout with a **server-calculated** amount from the selected tier. General donations remain on Zeffy.

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

Add the same env vars to the `web` project. Set both `BETTER_AUTH_URL` and `NEXT_PUBLIC_SITE_URL` to `https://www.dfreefoundation.org` (apex `dfreefoundation.org` redirects to www). If either is left as `http://localhost:3000`, admin login fails with **Invalid origin**. Ensure `postinstall` / build runs `prisma generate` (configured in `package.json`).

Transactional emails (admin invitations + form acknowledgements) are built with **React Email** templates under `emails/` and sent through Amazon SES (`lib/email/send-email.ts`).

## 6. Form submissions

Fellowship **application** and **sponsorship** forms are wired end-to-end:

1. **Validate** input with Zod in the API route handlers.
2. **Persist** a `FormSubmission` row (`type`: `fellowship-application` | `fellowship-sponsor`).
3. **Auto-reply** via `sendFormAcknowledgement` → Amazon SES (`lib/email/send-email.ts`).
4. **Set** `acknowledgementSentAt` after a successful send (idempotent for retries / Stripe webhooks).

Admin list/detail pages live under:

- `/admin/fellowship-applications` — search/filter, review status workflow (`pending` → `under_review` → `accepted` / `rejected` / `waitlisted`), CSV export
- `/admin/fellowship-sponsors` — search/filter by payment status; logo preview/download; Stripe payment badges

Edit acknowledgement email copy under **Auto-responses** (`/admin/auto-responses`).
