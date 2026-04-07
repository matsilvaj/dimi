-- Final security cleanup after migrating to RPC flow

-- Keep RLS enabled
alter table public.email_tokens enable row level security;
alter table public.profiles enable row level security;

-- Remove legacy/open policies used during debugging
-- email_tokens
 drop policy if exists "tmp_email_tokens_select_anon" on public.email_tokens;
 drop policy if exists "tmp_email_tokens_update_anon" on public.email_tokens;
 drop policy if exists "email_tokens_select_anon" on public.email_tokens;
 drop policy if exists "email_tokens_update_anon" on public.email_tokens;

-- profiles
 drop policy if exists "tmp_profiles_update_anon" on public.profiles;
 drop policy if exists "profiles_update_anon" on public.profiles;
 drop policy if exists "profiles_update_web" on public.profiles;
 drop policy if exists "profiles_select_web" on public.profiles;

-- Revoke direct table access from client roles
revoke select, insert, update, delete on table public.email_tokens from anon, authenticated;
revoke select, insert, update, delete on table public.profiles from anon, authenticated;

-- Ensure only RPCs are callable by client roles
revoke all on function public.validate_email_token(text) from public;
revoke all on function public.consume_email_token_and_activate(text, text) from public;
grant execute on function public.validate_email_token(text) to anon, authenticated;
grant execute on function public.consume_email_token_and_activate(text, text) to anon, authenticated;

-- Optional checks:
-- select tablename, policyname, roles, cmd from pg_policies where schemaname='public' and tablename in ('email_tokens','profiles');
-- select grantee, privilege_type, table_name from information_schema.role_table_grants where table_schema='public' and table_name in ('email_tokens','profiles') and grantee in ('anon','authenticated');
