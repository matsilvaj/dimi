-- Data integrity hardening for signup flow

-- profiles identifiers should be unique
create unique index if not exists uq_profiles_user_id on public.profiles (user_id);
create unique index if not exists uq_profiles_email_nonnull on public.profiles (email) where email is not null;

-- token should be unique per row (optional but recommended)
create unique index if not exists uq_email_tokens_token on public.email_tokens (token);
