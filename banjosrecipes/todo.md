# To do:
- Personal: add photos to each recipe
- Add a meal prep section (gym) add recipies used there
- "Recently viewed" or favorites using localStorage
- Add Recipe structured data (schema.org Recipe JSON-LD) to each [slug] page — this is what lets Google show rich recipe cards in search results.
- Add a sitemap.ts and robots.ts (Next.js supports these natively) so the site gets indexed properly.
- Give each recipe page proper metadata (title/description) instead of relying on defaults — right now you likely have generic title tags across pages.
- Rate-limit the admin login route (app/api/admin/login/route.ts) — right now nothing in the code you showed me stops repeated password attempts.
- Add a basic CSP / security headers in next.config.ts given you're running real auth on this.

# Claude Ideas:

- "Surprise Me" button — random recipe picker, maybe weighted by category or how long it's been since you made something. Great low-effort delight feature.
- Ingredient substitution helper — click an ingredient you're out of and get a quick swap suggestion
- Difficulty/effort meter — a simple 1-3 scale easy medium hard