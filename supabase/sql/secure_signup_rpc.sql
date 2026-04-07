-- Secure signup confirmation helpers (run in Supabase SQL Editor)

create or replace function public.validate_email_token(p_token text)
returns table (user_id text, email text)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  select et.user_id, et.email
  from public.email_tokens et
  where et.token = p_token
    and coalesce(et.used, false) = false
    and (et.expires_at is null or et.expires_at > now())
  order by et.creat_at desc nulls last
  limit 1;
end;
$$;

revoke all on function public.validate_email_token(text) from public;
grant execute on function public.validate_email_token(text) to anon, authenticated;

create or replace function public.consume_email_token_and_activate(
  p_token text,
  p_email text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id text;
  v_profile_user_id text;
  v_profiles_updated integer;
begin
  select et.user_id
    into v_user_id
  from public.email_tokens et
  where et.token = p_token
    and et.email = p_email
    and coalesce(et.used, false) = false
    and (et.expires_at is null or et.expires_at > now())
  order by et.creat_at desc nulls last
  limit 1
  for update;

  if v_user_id is null then
    return false;
  end if;

  select p.user_id
    into v_profile_user_id
  from public.profiles p
  where p.user_id = v_user_id
     or p.email = p_email
  order by case when p.user_id = v_user_id then 0 else 1 end
  limit 1;

  if v_profile_user_id is null then
    return false;
  end if;

  update public.profiles p
    set plan = 'ativo',
        register_date = coalesce(p.register_date, now())
  where p.user_id = v_profile_user_id;

  get diagnostics v_profiles_updated = row_count;

  if v_profiles_updated = 0 then
    return false;
  end if;

  update public.email_tokens et
    set used = true,
        used_at = now()
  where et.token = p_token
    and et.email = p_email
    and coalesce(et.used, false) = false;

  return true;
end;
$$;

revoke all on function public.consume_email_token_and_activate(text, text) from public;
grant execute on function public.consume_email_token_and_activate(text, text) to anon, authenticated;

-- Optional cleanup after migrating to RPC flow:
-- drop policy if exists "email_tokens_select_anon" on public.email_tokens;
-- drop policy if exists "email_tokens_update_anon" on public.email_tokens;
-- drop policy if exists "profiles_update_web" on public.profiles;
