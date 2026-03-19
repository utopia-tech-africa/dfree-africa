# CMS translation (Gemini)

Auto-translation of Sanity CMS content to French and Spanish using the Gemini API.

## Performance cache

Translation lookups use:

- **L1:** in-memory cache (fast, resets on restart)
- **L2:** **Vercel KV** (persistent across restarts/cold starts)

To enable persistent cache in `apps/web/.env.local`, provide **any one** of:

```bash
# Option 1: Vercel KV REST
KV_REST_API_URL=...
KV_REST_API_TOKEN=...

# Option 2: Upstash REST
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...

# Option 3: Redis URL integration
REDIS_URL=...
```

If KV is not configured, translation still works using in-memory cache only.

## Make sure it’s working

1. **Set the API key**
   - Get a key: https://aistudio.google.com/apikey
   - In `apps/web/.env.local` add:
     ```bash
     GEMINI_API_KEY=your_key_here
     ```
   - Restart the dev server (`pnpm run dev`) so Next.js picks up the new env.

2. **Use a non-English locale**
   - Translation only runs for **French (fr)** and **Spanish (es)**.
   - English (`/en/...`) always shows the original CMS content.
   - Open a FR or ES URL, for example:
     - `/fr/blog/<slug>`
     - `/es/africa/projects`
     - `/fr/africa/projects/<slug>`

3. **Check the terminal (dev only)**
   - If the key is missing you’ll see:
     `[translation] No GEMINI_API_KEY or GOOGLE_API_KEY in env...`
   - If the API fails you’ll see:
     `[translation] Gemini error: <message>`
   - Fix the key or error, then reload the FR/ES page.

4. **Quick test**
   - Open e.g. `/fr/africa/projects` (or any project with a title/description).
   - If the project title/description is in French, translation is working.

## Optional env

- `GOOGLE_API_KEY` is used if `GEMINI_API_KEY` is not set.
- Without either, the app still runs; CMS content is shown in the source language (no translation).
- Any of these enables persistent translation cache:
  - `KV_REST_API_URL` + `KV_REST_API_TOKEN`
  - `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`
  - `REDIS_URL`
