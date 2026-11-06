# AREALIS - Tahap 1 (Frontend)
1. `npm install`
2. `npm run dev` lalu buka http://localhost:3000
Ganti data produk di `data/products.js`. Teks lore di `app/lore/page.js`, cerita brand di `app/about/page.js`.

## Mode demo login
Login masih simulasi (disimpan di browser). Tombol Google membuat akun contoh (juga admin demo, buka /admin lewat alamat langsung, tidak ada tautan di menu).
Semua diganti Supabase di tahap 2.

## Tampilan
Banner Home ada di data/banners.js (isi image dengan foto dari public/banner). Link sosial ada di data/social.js.

Setelah login Google, user mengisi formulir data diri di /lengkapi-data (demo: disimpan di browser; tahap 2: tabel profiles di Supabase).

## Cara menjalankan (revisi 11)
1. `npm install`
2. Salin `.env.local.example` menjadi `.env.local`, lalu isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` dari Supabase (Project Settings, API Keys). File `.env.local` tidak ikut terunggah ke GitHub.
3. `npm run dev`, lalu buka http://localhost:3000
4. Untuk Netlify, isi dua variabel yang sama di Site configuration, Environment variables, lalu deploy ulang.
