# CMS translation (Gemini)

Auto-translation of Sanity CMS content to French and Spanish using the Gemini API.

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
