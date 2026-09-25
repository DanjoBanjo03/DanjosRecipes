-- Run after creating your owner user in Authentication > Users.
-- This binds editing to your immutable user ID, not a browser value or editable profile field.
begin;
create table if not exists public.chef_choice (
 id integer primary key check (id = 1),
 slug text check (slug in ('shrimp-marinade', 'chipotle-southwest-sauce', 'chili', 'tiramisu', 'guacamole', 'salsa', 'pico-de-gallo', 'miso-soup', 'sweet-and-sour-chicken', 'cream-puffs', 'green-salad-dressing', 'ramen', 'pizza', 'mongolian-beef', 'korean-popcorn-chicken'))
);
alter table public.chef_choice enable row level security;
revoke all on public.chef_choice from anon, authenticated;
grant select on public.chef_choice to anon, authenticated;
grant update (slug) on public.chef_choice to authenticated;
insert into public.chef_choice (id, slug) values (1, null) on conflict (id) do nothing;
drop policy if exists "Everyone can read the pick" on public.chef_choice;
create policy "Everyone can read the pick" on public.chef_choice for select to anon, authenticated using (true);
drop policy if exists "Only the owner can change the pick" on public.chef_choice;
do $$
declare owner_id uuid;
begin
 select id into owner_id from auth.users where lower(email) = 'bajenovdan@gmail.com' and email_confirmed_at is not null;
 if owner_id is null then raise exception 'Create the confirmed owner user bajenovdan@gmail.com first.'; end if;
 execute format('create policy "Only the owner can change the pick" on public.chef_choice for update to authenticated using ((select auth.uid()) = %L::uuid) with check ((select auth.uid()) = %L::uuid)', owner_id, owner_id);
end $$;
commit;
