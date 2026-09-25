-- Expand the allowed recipe list without changing the owner policy or current pick.
begin;
alter table public.chef_choice drop constraint if exists chef_choice_slug_check;
alter table public.chef_choice add constraint chef_choice_slug_check
 check (slug in ('shrimp-marinade', 'chipotle-southwest-sauce', 'chili', 'tiramisu', 'guacamole', 'salsa', 'pico-de-gallo', 'miso-soup', 'sweet-and-sour-chicken', 'cream-puffs', 'green-salad-dressing', 'ramen', 'pizza', 'mongolian-beef', 'korean-popcorn-chicken', 'crispy-beef-taquitos', 'green-sauce'));
commit;
