# Roadmap AREALIS

## Tahap 1: tampilan web (selesai, tinggal isi konten)
Sudah ada: Home (banner, teaser Codex), Lore (kartu arcana), Catalog, About Us, login Google (demo), formulir data diri, Dashboard pengguna, halaman pembayaran (demo), panel admin (demo), dark mode, tombol sosial.

Masih perlu diselesaikan di tahap tampilan:
- Isi konten: lore dan deskripsi produk (draf Word sudah ada), foto produk, foto tim, galeri BTS, cerita About Us, alamat lokasi, estimasi produksi di FAQ.
- Perbarui dokumen rancangan agar sama dengan web: login Google saja, formulir data diri (bukan input WA dan handshake WA), pembayaran otomatis lewat webhook, tampilan terang.
- Cek tampilan di HP dan perbaiki yang janggal.

## Setelah tampilan selesai
### Tahap 2: Supabase (sedang dikerjakan: login Google dan data diri dulu)
- Buat project, tabel profiles (data diri dan peran admin), products, orders.
- Login Google asli (foto profil Gmail ikut tampil), simpan formulir data diri ke profiles.
- Aturan keamanan (RLS): user hanya melihat datanya sendiri, admin melihat semua. Halaman /admin dikunci untuk admin.
- Undang anggota kelompok ke project Supabase lewat email (pengaturan tim) supaya admin dan produksi bisa melihat dan mengunduh data dengan akun masing-masing.

### Tahap 3: Pembayaran QRIS
- Pilih payment gateway dan daftarkan akunnya lebih awal (verifikasi merchant bisa lama).
- Buat QRIS dinamis per pesanan, webhook pembayaran, dan halaman bayar yang berpindah otomatis saat lunas.
- Status pesanan: Menunggu pembayaran, Lunas, Kedaluwarsa. Tentukan batas waktu bayar (usulan 15 menit). Admin hanya melihat pesanan Lunas.

### Tahap 4: Admin asli
- Daftar pesanan dan pengguna dari database, ubah status (Proses, Siap Diambil, Selesai) tersimpan, Export CSV dari data nyata.
- Fitur tutup Pre-Order: tanggal buka dan tutup, tombol Tutup PO. Setelah ditutup, tombol Pre-Order nonaktif dan tampil "Pre-Order ditutup".

### Sebelum membuka pesanan sungguhan
- Halaman kebijakan privasi sederhana (web menyimpan nomor telepon dan alamat).
- Uji seluruh alur di mode sandbox gateway, lalu pindah ke produksi.
- Cek ketentuan paket gratis Vercel untuk penggunaan komersial.

## Keputusan yang harus diambil kelompok
- Tanggal buka dan tutup Pre-Order.
- Batas waktu bayar QRIS.
- Siapa pemilik akun Supabase dan siapa saja yang jadi admin.
- Payment gateway yang dipakai.
