-- Jalankan di Supabase: SQL Editor, New query, tempel semua, lalu Run.

-- 1. Data diri pengguna (satu baris per akun Google)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text not null,
  phone text not null unique,
  province text not null,
  city text not null,
  district text not null,
  village text not null,
  rt text not null,
  rw text not null,
  complex text not null,
  block text,
  house_number text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists profiles_created_idx on public.profiles (created_at desc);

-- 2. Daftar admin (hanya bisa diisi lewat SQL Editor, bukan dari web)
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

-- 3. Fungsi pengecek admin
create or replace function public.is_admin() returns boolean
language sql security definer set search_path = public stable
as $$ select exists (select 1 from public.admins where user_id = auth.uid()) $$;

-- 4. Keamanan baris (RLS)
alter table public.profiles enable row level security;
alter table public.admins enable row level security;

drop policy if exists "profil sendiri: baca" on public.profiles;
drop policy if exists "profil sendiri: tambah" on public.profiles;
drop policy if exists "profil sendiri: ubah" on public.profiles;
drop policy if exists "admin: baca semua profil" on public.profiles;
drop policy if exists "admin: baca daftar admin" on public.admins;

create policy "profil sendiri: baca" on public.profiles for select using (auth.uid() = id);
create policy "profil sendiri: tambah" on public.profiles for insert with check (auth.uid() = id);
create policy "profil sendiri: ubah" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "admin: baca semua profil" on public.profiles for select using (public.is_admin());
create policy "admin: baca daftar admin" on public.admins for select using (auth.uid() = user_id);

-- 5. Izin akses API (hanya untuk pengguna yang sudah login)
grant usage on schema public to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select on public.admins to authenticated;
grant execute on function public.is_admin() to authenticated;

-- 6. Menjadikan dirimu admin (jalankan SETELAH login pertama kali di web, ganti emailnya):
-- insert into public.admins (user_id) select id from auth.users where email = 'emailmu@gmail.com';
