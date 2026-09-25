# Shared Chef’s choice setup

Owner: **bajenovdan@gmail.com**. Public visitors only read the shared pick. Owner sign-in lives at `/recipe/admin`. No browser-stored pick is used.

1. Create a Supabase project. Keep your database password private.
2. In Authentication > Users, create **bajenovdan@gmail.com** as a confirmed user with a strong private password. The website password form always authenticates this account; it does not accept another email.
3. Disable new-user signups and anonymous sign-ins. Keep email/password authentication enabled and provider rate limits active.
4. SMTP is not required for password sign-in. Email-code endpoints are retired. Password recovery by email would require email delivery; if needed, manage this account through the Supabase dashboard.
5. Never enter your Supabase dashboard or database password on the recipe website. Use the password for the Authentication user above.
6. Run `supabase/chef-choice.sql` in Supabase’s SQL Editor. It starts with no featured recipe and limits writes to the owner’s actual user ID. It rejects other authenticated users and anonymous writes even if someone calls the database API directly.
7. In the **DanjosRecipes** Vercel project, add `SUPABASE_URL` and `SUPABASE_ANON_KEY` from Supabase project API settings. Use the legacy **anon / public** JWT key, not a service-role key or database password. Add the same variables to an ignored `.env.local` for local testing.
8. Deploy the recipe project. The existing PortfolioHTML rewrite must be deployed too. Visit `https://danielbajenov.com/recipe/admin`, enter your owner user password, sign in, choose a recipe, and click **Save for everyone**.

## Check before considering setup finished

- Confirm a correct password signs in and an incorrect password is rejected.
- With a signed-out browser, confirm the pick is visible and PUT requests cannot change it.
- Save another pick as owner, then check a separate private browser. New visits fetch the current pick; already-open visible pages refresh within 30 seconds.
- Verify the SQL policy rejects another authenticated user as well as anon. There are no public INSERT or DELETE permissions.
- Check sign-out and an expired session: saving must require a fresh sign-in.

Sessions use a host-only HttpOnly, Secure-in-production, SameSite=Strict cookie scoped to `/recipe`, valid for at most an hour. No service-role credentials are needed. Writes require an allowed Origin and an independently verified owner session, then pass through database row-level security. Cookie deletion signs out this browser; a previously stolen token remains valid until its short expiry, as with normal JWT sessions.

The app is deliberately read-only/unconfigured until these settings exist. It does not invent a shared pick or fall back to local storage. If the old local-only feature had a pick, select it once in the admin page after setup.

References: [Password authentication](https://supabase.com/docs/guides/auth/passwords), [SMTP](https://supabase.com/docs/guides/auth/auth-smtp), [Row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security).
