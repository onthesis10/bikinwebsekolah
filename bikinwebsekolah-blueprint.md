# Blueprint Pembangunan  
# BikinWebSekolah.com — Website Sekolah Modern + PPDB Online

## 1. Ringkasan Blueprint

Blueprint ini menjadi panduan teknis dan visual untuk membangun **BikinWebSekolah.com** sebagai website promosi/demo interaktif untuk menjual template website sekolah.

Produk ini memiliki 3 paket:

1. **Start**  
   Website profil sekolah statis.

2. **Pro**  
   Website sekolah premium dengan CMS sederhana berbasis Google Sheet.

3. **PPDB Online**  
   Website sekolah premium + sistem PPDB online + dashboard panitia.

Tahap awal dibangun sebagai **demo promosi 1:1**, bukan production backend penuh. Semua data dapat menggunakan dummy data, tetapi tampilan, interaksi, dan flow harus terasa seperti produk nyata yang siap dijual.

---

## 2. Tujuan Pembangunan

### Tujuan Utama

Membangun website promosi yang membuat calon klien sekolah langsung memahami:

- Apa itu BikinWebSekolah.com
- Paket apa saja yang tersedia
- Perbedaan Start, Pro, dan PPDB Online
- Seperti apa demo website sekolah yang akan mereka dapatkan
- Kenapa harga paket terasa masuk akal
- Bagaimana cara menghubungi untuk konsultasi

### Tujuan Bisnis

- Membuat media promosi digital yang terlihat profesional.
- Membantu closing ke sekolah/madrasah/yayasan.
- Menampilkan demo interaktif agar calon klien lebih percaya.
- Menjadi pintu masuk untuk upsell ke Xamina atau layanan sekolah digital lain.
- Menyiapkan fondasi template yang bisa dijual berulang.

---

## 3. Prinsip Pembangunan

### Prinsip Produk

- Bangun sebagai **productized service**, bukan project custom dari nol.
- Tiga paket harus terlihat jelas secara value dan harga.
- Website harus bisa dipresentasikan langsung ke kepala sekolah/panitia PPDB.
- Demo harus terlihat premium, bukan template murahan.
- Semua halaman harus mobile-first.

### Prinsip Teknis

- MVP demo tidak perlu backend.
- Gunakan dummy data dulu.
- Semua interaksi penting harus hidup.
- Struktur kode harus modular agar nanti mudah dijadikan production.
- Komponen harus reusable antar halaman.

### Prinsip Visual

- Modern
- Edukatif
- Premium
- Clean
- Resmi tapi tidak kaku
- Cocok untuk sekolah Indonesia
- Banyak whitespace
- Card-based layout
- Typography kuat

---

## 4. Struktur Route

Gunakan route berikut:

```text
/
├── /start
├── /pro
├── /ppdb
└── /ppdb/dashboard
```

### Fungsi Route

| Route | Halaman | Fungsi |
|---|---|---|
| `/` | Landing utama | Menjual produk, paket, harga, demo, CTA WhatsApp |
| `/start` | Demo Start | Demo website profil sekolah statis |
| `/pro` | Demo Pro | Demo website sekolah premium + konten dinamis |
| `/ppdb` | Demo PPDB Online | Demo halaman publik PPDB |
| `/ppdb/dashboard` | Dashboard PPDB | Demo dashboard panitia PPDB |

---

## 5. Tech Stack Rekomendasi

### Opsi Utama

```text
Next.js
TypeScript
Tailwind CSS
Lucide React
Framer Motion opsional
Vercel / Cloudflare Pages
```

### Opsi Cepat

```text
React + Vite
TypeScript
Tailwind CSS
React Router
Lucide React
Netlify / Cloudflare Pages
```

### Rekomendasi Eksekusi

Untuk demo promosi yang cepat:

```text
React + Vite + TypeScript + Tailwind CSS
```

Alasan:

- Setup cepat.
- Cocok untuk static demo.
- Deploy mudah.
- Tidak perlu backend.
- Mudah dipindah ke Next.js jika nanti butuh SEO/production.

---

## 6. Design Direction

### Nama Style

```text
Modern Academic Editorial
```

### Karakter Style

- Background hangat seperti kertas akademik.
- Heading serif editorial.
- Body sans-serif modern.
- Card dengan border tipis.
- Shadow halus.
- Badge elegan.
- CTA jelas.
- Tidak terlalu ramai.
- Tidak terlalu kekanak-kanakan.
- Cocok untuk sekolah, madrasah, SMK, pesantren, dan yayasan.

---

## 7. Font System

Gunakan 2 font utama:

### Heading / Display

```text
Newsreader
```

Dipakai untuk:

- Hero headline
- Section title
- Pricing headline
- Editorial quote
- Angka besar tertentu

### Body / UI

```text
Plus Jakarta Sans
```

Dipakai untuk:

- Navbar
- Paragraph
- Button
- Form
- Table
- Badge
- Dashboard
- Footer

---

## 8. Design Token

### 8.1 Global Token

```css
:root {
  --bg: #f1ece1;
  --bg-deep: #e9e2d3;
  --surface: #fbf9f3;
  --surface-2: #efe9dc;

  --ink: #161d18;
  --ink-2: #3c4640;
  --muted: #6c736a;

  --line: #ddd5c4;
  --line-2: #e7e0d1;

  --gold: #c79433;
  --gold-soft: #f1dfb8;

  --danger: #b42318;
  --success: #16784f;
  --warning: #b7791f;
  --info: #2563eb;

  --r-sm: 6px;
  --r: 10px;
  --r-lg: 14px;
  --r-xl: 20px;

  --shadow-sm: 0 1px 2px rgba(22, 29, 24, .05);
  --shadow: 0 6px 20px -8px rgba(22, 29, 24, .16), 0 2px 6px rgba(22, 29, 24, .05);
  --shadow-lg: 0 24px 60px -20px rgba(22, 29, 24, .30), 0 8px 22px -12px rgba(22, 29, 24, .16);
}
```

---

### 8.2 Theme Start

```css
.theme-start {
  --brand: #1b4332;
  --brand-600: #2d6a4f;
  --brand-700: #143026;
  --brand-50: #e6ede7;
  --brand-100: #cdddd1;
  --accent: #cf8a2c;
}
```

Vibe:

- Formal
- Aman
- Hijau akademik
- Cocok untuk madrasah/sekolah umum

---

### 8.3 Theme Pro

```css
.theme-pro {
  --brand: #16314f;
  --brand-600: #27557f;
  --brand-700: #0f2238;
  --brand-50: #e4eaf1;
  --brand-100: #c8d6e6;
  --accent: #c98a2b;
}
```

Vibe:

- Lebih institusional
- Lebih matang
- Cocok untuk website sekolah premium

---

### 8.4 Theme PPDB Online

```css
.theme-ppdb {
  --brand: #6a1f2b;
  --brand-600: #8c2f3d;
  --brand-700: #4d141d;
  --brand-50: #f1e3e4;
  --brand-100: #e3c9cc;
  --accent: #c79433;
}
```

Vibe:

- Lebih conversion-oriented
- Serius
- Campaign PPDB
- Cocok untuk pendaftaran siswa baru

---

## 9. Layout System

### Container

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
}
```

### Section Spacing

Desktop:

```css
section {
  padding-top: 96px;
  padding-bottom: 96px;
}
```

Tablet:

```css
section {
  padding-top: 72px;
  padding-bottom: 72px;
}
```

Mobile:

```css
section {
  padding-top: 56px;
  padding-bottom: 56px;
}
```

### Grid

Desktop:

```text
3 kolom untuk pricing/card utama
4 kolom untuk step/alur
2 kolom untuk hero dan feature section
```

Mobile:

```text
Semua grid turun menjadi 1 kolom
KPI dashboard bisa 2 kolom
Table dashboard horizontal scroll
```

---

## 10. Komponen Global

Bangun komponen berikut sebelum membuat halaman:

### Layout Components

```text
Navbar
Footer
MobileMenu
Container
SectionHeader
PageShell
```

### UI Components

```text
Button
Badge
Chip
Card
PricingCard
FeatureCard
StatCard
Modal
Drawer
Toast
Skeleton
EmptyState
FormField
SelectField
TextareaField
UploadBox
StatusBadge
FilterPill
Table
KpiCard
```

### Utility Components

```text
RevealOnScroll
ScrollToSection
BackToTop optional
LogoMark
ThemePreview
```

---

## 11. Struktur Folder

### React + Vite

```text
src/
├── main.tsx
├── app/
│   ├── App.tsx
│   └── routes.tsx
├── pages/
│   ├── LandingPage.tsx
│   ├── StartPage.tsx
│   ├── ProPage.tsx
│   ├── PPDBPage.tsx
│   └── PPDBDashboardPage.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Container.tsx
│   │   └── SectionHeader.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Chip.tsx
│   │   ├── Modal.tsx
│   │   ├── Drawer.tsx
│   │   ├── Toast.tsx
│   │   ├── Skeleton.tsx
│   │   ├── EmptyState.tsx
│   │   ├── FormField.tsx
│   │   ├── SelectField.tsx
│   │   ├── TextareaField.tsx
│   │   ├── UploadBox.tsx
│   │   └── StatusBadge.tsx
│   ├── landing/
│   │   ├── HeroLanding.tsx
│   │   ├── PricingSection.tsx
│   │   ├── PricingCard.tsx
│   │   ├── FeatureMatrix.tsx
│   │   ├── DemoPreview.tsx
│   │   └── LeadCta.tsx
│   ├── start/
│   │   ├── StartHero.tsx
│   │   ├── ProfileSection.tsx
│   │   ├── VisionMission.tsx
│   │   ├── Programs.tsx
│   │   ├── Facilities.tsx
│   │   └── ContactSection.tsx
│   ├── pro/
│   │   ├── ProHero.tsx
│   │   ├── NewsSection.tsx
│   │   ├── NewsCard.tsx
│   │   ├── NewsModal.tsx
│   │   ├── AgendaSection.tsx
│   │   ├── AchievementSection.tsx
│   │   ├── TeachersSection.tsx
│   │   └── CmsStateSwitcher.tsx
│   └── ppdb/
│       ├── PPDBHero.tsx
│       ├── AdmissionPaths.tsx
│       ├── AdmissionSteps.tsx
│       ├── AdmissionSchedule.tsx
│       ├── AdmissionPricing.tsx
│       ├── AdmissionRequirements.tsx
│       ├── PPDBForm.tsx
│       ├── StatusChecker.tsx
│       ├── SuccessModal.tsx
│       ├── DashboardSidebar.tsx
│       ├── DashboardTopbar.tsx
│       ├── KpiCard.tsx
│       ├── StatusChart.tsx
│       ├── MajorDistribution.tsx
│       ├── ApplicantFilters.tsx
│       ├── ApplicantTable.tsx
│       └── ApplicantDrawer.tsx
├── data/
│   ├── packages.ts
│   ├── schoolProfiles.ts
│   ├── news.ts
│   ├── agenda.ts
│   ├── achievements.ts
│   ├── teachers.ts
│   ├── faqs.ts
│   ├── ppdb.ts
│   └── applicants.ts
├── hooks/
│   ├── useScrollShadow.ts
│   ├── useEscapeKey.ts
│   ├── useToast.ts
│   └── useDisclosure.ts
├── lib/
│   ├── cn.ts
│   ├── format.ts
│   ├── initials.ts
│   └── exportCsv.ts
└── styles/
    ├── globals.css
    └── tokens.css
```

---

## 12. Data Dummy

### 12.1 Packages

```ts
export const packages = [
  {
    id: "start",
    name: "Start",
    label: "Entry",
    price: "Rp999rb",
    normalPrice: "Rp1,5jt",
    description: "Website profil sekolah modern untuk kebutuhan dasar.",
    features: [
      "Homepage sekolah",
      "Profil sekolah",
      "Visi & misi",
      "Fasilitas",
      "Galeri",
      "Kontak",
      "Mobile responsive"
    ],
    cta: "Lihat Demo Start",
    href: "/start"
  },
  {
    id: "pro",
    name: "Pro",
    label: "Paling Laris",
    price: "Rp2,49jt",
    normalPrice: "Rp3,5jt",
    description: "Website sekolah lengkap dengan konten dinamis dan CMS Google Sheet.",
    features: [
      "Semua fitur Start",
      "Berita sekolah",
      "Agenda",
      "Prestasi",
      "Guru & staff",
      "CMS Google Sheet",
      "FAQ"
    ],
    cta: "Lihat Demo Pro",
    href: "/pro"
  },
  {
    id: "ppdb",
    name: "PPDB Online",
    label: "Paket Komersial",
    price: "Rp4,99jt",
    normalPrice: "Rp7,5jt",
    description: "Website sekolah plus sistem PPDB online dan dashboard panitia.",
    features: [
      "Semua fitur Pro",
      "Form PPDB online",
      "Cek status pendaftaran",
      "Dashboard panitia",
      "Verifikasi status",
      "Filter data",
      "Export data"
    ],
    cta: "Lihat Demo PPDB",
    href: "/ppdb"
  }
];
```

---

### 12.2 Applicant Data

Minimal 12 data pendaftar.

```ts
export type ApplicationStatus =
  | "baru"
  | "verifikasi"
  | "diterima"
  | "ditolak"
  | "cadangan";

export type Applicant = {
  id: string;
  nama: string;
  asal: string;
  jalur: "Reguler" | "Prestasi" | "Afirmasi";
  gelombang: "G1" | "G2";
  jurusan: string;
  tanggalDaftar: string;
  whatsapp: string;
  status: ApplicationStatus;
};

export const applicants: Applicant[] = [
  {
    id: "PPDB-2026-0431",
    nama: "Muhammad Rizky Pratama",
    asal: "SMPN 3 Bandung",
    jalur: "Reguler",
    gelombang: "G1",
    jurusan: "Rekayasa Perangkat Lunak",
    tanggalDaftar: "12 Mei 2026",
    whatsapp: "0812-3456-7890",
    status: "diterima"
  },
  {
    id: "PPDB-2026-0432",
    nama: "Siti Aisyah Nurhaliza",
    asal: "MTs Al-Falah",
    jalur: "Prestasi",
    gelombang: "G1",
    jurusan: "Multimedia / DKV",
    tanggalDaftar: "12 Mei 2026",
    whatsapp: "0813-2222-1010",
    status: "verifikasi"
  },
  {
    id: "PPDB-2026-0433",
    nama: "Bayu Setiawan",
    asal: "SMPN 1 Cimahi",
    jalur: "Reguler",
    gelombang: "G1",
    jurusan: "Teknik Komputer & Jaringan",
    tanggalDaftar: "13 Mei 2026",
    whatsapp: "0857-9988-1234",
    status: "baru"
  }
];
```

Tambahkan 9 data lain agar dashboard terlihat padat dan realistis.

---

## 13. Landing Utama `/`

### Tujuan Halaman

Landing utama adalah halaman penjualan utama. Halaman ini harus membuat calon klien paham value BikinWebSekolah.com dalam waktu singkat.

### Struktur Section

```text
1. Navbar
2. Hero utama
3. Feature ticker
4. Paket harga
5. Kenapa BikinWebSekolah.com
6. Design direction / preview visual
7. Feature comparison matrix
8. Demo preview cards
9. Add-on services
10. FAQ bisnis
11. CTA WhatsApp
12. Footer
```

---

### 13.1 Navbar

Menu:

```text
Paket
Demo
Fitur
Harga
FAQ
```

CTA:

```text
Konsultasi Gratis
```

Behavior:

- Sticky di atas
- Background blur
- Shadow saat scroll
- Mobile menu hamburger
- CTA WhatsApp jelas

---

### 13.2 Hero

Headline:

```text
Bikin website sekolah jadi gampang.
```

Subheadline:

```text
BikinWebSekolah.com membantu sekolah tampil modern, rapi, dan siap digital — dari profil resmi, berita sekolah, sampai PPDB online dengan dashboard panitia.
```

CTA:

```text
Lihat Paket
Lihat Demo PPDB
```

Badge target:

```text
SD
SMP
SMA
SMK
MA
MTs
Pesantren
Yayasan
```

Hero visual:

- Mockup website sekolah
- Card kecil “PPDB Online”
- Card kecil “CMS Google Sheet”
- Card kecil “Dashboard Panitia”
- Badge “Harga launching untuk 10 sekolah pertama”

---

### 13.3 Paket Harga

Card 1:

```text
Start
Rp999rb
Website profil sekolah modern.

Fitur:
- Beranda
- Profil sekolah
- Visi misi
- Program
- Fasilitas
- Galeri
- Kontak
```

Card 2:

```text
Pro
Rp2,49jt
Website sekolah lengkap + CMS Google Sheet.

Fitur:
- Semua fitur Start
- Berita
- Agenda
- Prestasi
- Guru & staff
- FAQ
- CMS Google Sheet
```

Card 3:

```text
PPDB Online
Rp4,99jt
Website sekolah + sistem PPDB online.

Fitur:
- Semua fitur Pro
- Form daftar online
- Cek status
- Dashboard panitia
- Verifikasi status
- Filter data
- Export data
```

Card Pro diberi label:

```text
Paling Laris
```

Card PPDB diberi label:

```text
Paket Komersial
```

---

### 13.4 Feature Matrix

Kolom:

```text
Fitur
Start
Pro
PPDB Online
```

Baris:

```text
Website profil
Mobile responsive
Galeri
Kontak
Berita
Agenda
Guru & staff
CMS Google Sheet
FAQ
Halaman PPDB
Form pendaftaran
Cek status
Dashboard panitia
Export data
```

---

### 13.5 CTA WhatsApp

Copy:

```text
Sekolah Anda butuh website resmi yang lebih modern?

Konsultasikan kebutuhan sekolah sekarang. Kami bantu pilih paket yang paling cocok sesuai anggaran dan kebutuhan.
```

CTA:

```text
Konsultasi via WhatsApp
```

Link format:

```text
https://wa.me/62XXXXXXXXXXX?text=Halo%20saya%20tertarik%20dengan%20BikinWebSekolah.com
```

---

## 14. Demo Start `/start`

### Tujuan

Menunjukkan bentuk website profil sekolah statis yang sederhana tapi terlihat resmi dan modern.

### Dummy School

```text
SMAS Cendekia Bangsa
```

### Theme

```text
theme-start
```

### Section

```text
1. Navbar sekolah
2. Hero
3. Profil singkat
4. Statistik
5. Sambutan kepala sekolah
6. Visi misi
7. Program unggulan
8. Fasilitas
9. Galeri
10. Kontak
11. Footer
```

### Hero Copy

```text
Membentuk Generasi Cerdas, Berakhlak & Berprestasi
```

### CTA

```text
Lihat Profil
Hubungi Kami
```

### Statistik

```text
650+ Siswa Aktif
42 Guru & Staff
18 Program Pembinaan
A Akreditasi
```

### Program Unggulan

```text
Kelas Unggulan Sains
Tahfizh & Karakter
Literasi Digital
Bahasa Internasional
Pembinaan Prestasi
Konseling & Karier
```

### Acceptance

- Tidak ada CMS.
- Tidak ada dashboard.
- Semua content static.
- Tampil rapi mobile dan desktop.
- Cocok sebagai paket entry-level.

---

## 15. Demo Pro `/pro`

### Tujuan

Menunjukkan website sekolah premium dengan konten dinamis dan CMS-style state.

### Dummy School

```text
MTsN Al-Hikmah
```

### Theme

```text
theme-pro
```

### Section

```text
1. Topbar
2. Navbar
3. Hero premium
4. Berita & pengumuman
5. Agenda
6. Prestasi
7. Guru & staff
8. Program/ekstrakurikuler
9. Galeri
10. CTA PPDB
11. FAQ
12. Footer
```

### Interaksi

```text
Modal detail berita
FAQ accordion
CMS state: loaded/loading/empty
Mobile menu
Card hover
```

### News Modal Behavior

- Klik “Baca selengkapnya”.
- Modal terbuka.
- Tampilkan gambar, kategori, tanggal, judul, isi.
- Bisa ditutup via X.
- Bisa ditutup via backdrop.
- Bisa ditutup via Escape.

### CMS State Demo

Buat toggle kecil untuk demo:

```text
Loaded
Loading
Empty
```

Loaded:

```text
Menampilkan berita dummy.
```

Loading:

```text
Menampilkan skeleton card.
```

Empty:

```text
Belum ada berita.
Tambahkan baris baru pada Google Sheet Berita dan halaman ini akan otomatis menampilkannya.
```

### Acceptance

- Berita dari dummy data.
- Modal berjalan.
- Loading state berjalan.
- Empty state berjalan.
- Layout tetap premium.
- CTA PPDB menuju `/ppdb`.

---

## 16. Demo PPDB Online `/ppdb`

### Tujuan

Menunjukkan halaman publik PPDB yang conversion-oriented.

### Dummy School

```text
SMK Bina Teknologi
```

### Campaign

```text
PPDB Online Tahun Ajaran 2026/2027
```

### Theme

```text
theme-ppdb
```

### Section

```text
1. Navbar
2. Hero PPDB
3. Jalur penerimaan
4. Alur pendaftaran
5. Jadwal PPDB
6. Biaya/gelombang
7. Syarat pendaftaran
8. Form pendaftaran
9. Cek status
10. FAQ
11. Footer
12. Success modal
```

---

### 16.1 Hero PPDB

Headline:

```text
Wujudkan Masa Depan di SMK Bina Teknologi
```

Subheadline:

```text
PPDB Online Tahun Ajaran 2026/2027 telah dibuka. Pilih jurusan impianmu, isi formulir online, dan pantau status pendaftaran langsung dari website.
```

CTA:

```text
Daftar Sekarang
Cek Status
```

Visual:

- Card gelombang pendaftaran
- Card kuota tersedia
- Card status pendaftaran
- Card jadwal penting

---

### 16.2 Jalur Penerimaan

Card:

```text
Reguler
Prestasi
Afirmasi
```

Isi setiap card:

```text
Nama jalur
Deskripsi
Badge
Kuota/info singkat
```

---

### 16.3 Alur Pendaftaran

Step:

```text
1. Isi Formulir
2. Unggah Berkas
3. Verifikasi Panitia
4. Pengumuman & Daftar Ulang
```

---

### 16.4 Form PPDB

Field:

```text
Nama lengkap
NISN
NIK
Jenis kelamin
Tempat lahir
Tanggal lahir
Asal sekolah
Alamat lengkap
Jalur pendaftaran
Gelombang
Pilihan jurusan 1
Pilihan jurusan 2
Nama ayah
Nama ibu
Pekerjaan orang tua
No WhatsApp aktif
```

Upload dummy:

```text
Kartu Keluarga
Rapor/Ijazah
Pas foto
```

Checkbox:

```text
Saya menyatakan data yang diisi benar dan menyetujui ketentuan PPDB SMK Bina Teknologi.
```

Submit behavior:

```text
1. Validasi required fields.
2. Jika invalid, tampilkan error.
3. Jika valid, tampilkan success modal.
4. Generate nomor dummy PPDB-2026-0443.
```

---

### 16.5 Success Modal

Isi:

```text
Pendaftaran Berhasil!

Nomor pendaftaran Anda:
PPDB-2026-0443

Simpan nomor ini untuk mengecek status pendaftaran.
```

CTA:

```text
Cek Status
Tutup
```

---

### 16.6 Cek Status

Input:

```text
Nomor pendaftaran / NISN
```

Button:

```text
Cek Status
```

Demo result:

```text
Nama: Muhammad Rizky Pratama
No. Pendaftaran: PPDB-2026-0431
Jurusan: Rekayasa Perangkat Lunak
Status: Diterima
Catatan: Silakan melakukan daftar ulang sesuai jadwal yang ditentukan.
```

---

## 17. Dashboard PPDB `/ppdb/dashboard`

### Tujuan

Menunjukkan bahwa paket PPDB Online punya sistem panitia, bukan hanya form pendaftaran.

### Layout

```text
Sidebar kiri
Topbar
Main content
KPI cards
Chart panels
Filter toolbar
Table
Drawer detail
Toast
```

---

### 17.1 Sidebar

Menu:

```text
Overview
Data Pendaftar
Verifikasi
Jadwal Seleksi
Statistik
Pengaturan
Lihat Situs Publik
```

User:

```text
Andi Rahman
Panitia PPDB
```

---

### 17.2 Topbar

Title:

```text
Overview PPDB 2026/2027
```

Subtitle:

```text
Gelombang 1 & 2 · Update terakhir hari ini
```

Search:

```text
Cari nama / no. pendaftaran…
```

Actions:

```text
Notifikasi
Lihat Situs Publik
Export Data
```

---

### 17.3 KPI Cards

KPI:

```text
Total Pendaftar
Baru
Diverifikasi
Diterima
Ditolak
Cadangan
```

Dummy count:

```text
Total: 12
Baru: 3
Diverifikasi: 3
Diterima: 3
Ditolak: 1
Cadangan: 2
```

Behavior:

```text
KPI update otomatis saat status pendaftar berubah.
```

---

### 17.4 Chart

Chart 1:

```text
Pendaftar per Status
```

Gunakan CSS bar sederhana.

Chart 2:

```text
Distribusi Jurusan
```

Gunakan progress bar:

```text
Rekayasa Perangkat Lunak
Multimedia / DKV
Teknik Komputer & Jaringan
Teknik Elektronika
Akuntansi
```

---

### 17.5 Filter

Filter status:

```text
Semua
Baru
Diverifikasi
Diterima
Ditolak
Cadangan
```

Filter gelombang:

```text
Semua Gelombang
Gelombang 1
Gelombang 2
```

Filter jalur:

```text
Semua Jalur
Reguler
Prestasi
Afirmasi
```

Search by:

```text
Nama
Nomor pendaftaran
Asal sekolah
```

Reset:

```text
Mengembalikan semua filter ke default.
```

---

### 17.6 Table

Kolom:

```text
Nama Pendaftar
Asal Sekolah
Jalur
Gelombang
Jurusan
Status
Aksi
```

Row content:

```text
Avatar inisial
Nama lengkap
Nomor pendaftaran
Asal sekolah
Badge jalur
Gelombang
Jurusan
Badge status
Action button
```

Action:

```text
Terima
Tolak
Detail
```

Behavior:

```text
Klik Detail membuka drawer.
Klik row membuka drawer.
Klik Terima ubah status ke diterima.
Klik Tolak ubah status ke ditolak.
Toast muncul setelah aksi.
KPI dan chart update.
```

---

### 17.7 Drawer Detail

Isi:

```text
Avatar inisial
Nama lengkap
Nomor pendaftaran
Status badge
Asal sekolah
Jalur
Gelombang
Jurusan
Tanggal daftar
No WhatsApp
Berkas terlampir
Catatan panitia
Tombol Terima
Tombol Cadangan
Tombol Tolak
```

Berkas dummy:

```text
Kartu Keluarga.pdf
Rapor.pdf
Ijazah.pdf
```

Close behavior:

```text
Klik X
Klik backdrop
Tekan Escape
```

---

### 17.8 Toast

Event:

```text
Status berhasil diubah.
Data berhasil dimuat.
Mengekspor data pendaftar.
```

Position:

```text
Desktop: bottom-right
Mobile: bottom-center
```

---

### 17.9 Export

MVP demo:

```text
Klik Export Data → tampil toast
Opsional generate CSV dummy
```

Production:

```text
Export XLSX
Export CSV
Export PDF rekap
```

---

## 18. Responsive Blueprint

### Desktop

```text
Container max 1200px
Hero 2 kolom
Pricing 3 kolom
Feature matrix full width
Dashboard sidebar fixed
Dashboard table full
Drawer kanan
```

### Tablet

```text
Hero 1–2 kolom tergantung lebar
Pricing 2 kolom
Section grid 2 kolom
Dashboard sidebar collapsible
Chart 1 kolom
```

### Mobile

```text
Navbar hamburger
Hero 1 kolom
CTA button stack
Pricing 1 kolom
Form 1 kolom
KPI dashboard 2 kolom
Table horizontal scroll
Sidebar dashboard jadi drawer
Applicant drawer full width
Toast bottom-center
```

Breakpoint:

```css
480px
560px
640px
768px
900px
1024px
1200px
```

---

## 19. Interaction Blueprint

### Global

```text
Sticky navbar
Navbar shadow saat scroll
Smooth scroll anchor
Reveal animation saat section masuk viewport
Mobile menu toggle
Escape key untuk modal/drawer
Focus state pada semua input dan button
Reduced motion support
```

### Landing

```text
CTA scroll ke pricing
CTA demo pindah route
Pricing card hover
Feature matrix responsive
FAQ accordion
WhatsApp CTA
```

### Pro

```text
Modal berita
CMS state toggle
FAQ accordion
```

### PPDB

```text
Form validation
Success modal
Cek status dummy
Scroll ke form
Scroll ke status checker
```

### Dashboard

```text
Search/filter applicant
Update status
Open drawer
Close drawer
Toast
Export dummy
KPI auto update
Chart auto update
```

---

## 20. SEO Blueprint

### Landing Metadata

Title:

```text
BikinWebSekolah.com — Jasa Website Sekolah Modern + PPDB Online
```

Description:

```text
BikinWebSekolah.com membantu sekolah membuat website resmi modern, profil sekolah, berita, CMS Google Sheet, dan PPDB online dengan dashboard panitia.
```

Keywords:

```text
jasa website sekolah
website sekolah
website madrasah
website ppdb online
jasa ppdb online
website sekolah murah
website sekolah profesional
```

Open Graph:

```text
og:title
og:description
og:image
og:url
```

### SEO Requirements

```text
H1 hanya satu per halaman
Heading hierarchy rapi
Alt text pada semua gambar
Sitemap.xml
Robots.txt
Canonical URL
Meta description per route
```

---

## 21. Accessibility Blueprint

Wajib:

```text
Button bisa diakses keyboard
Input punya label
Error form jelas
Kontras warna cukup
Modal trap focus opsional
Drawer bisa ditutup Escape
Jangan hanya mengandalkan warna untuk status
Status badge punya text
```

---

## 22. Production Upgrade Blueprint

### Dari Demo ke Production

#### Start

```text
Static content diganti konten sekolah asli
Custom logo
Custom warna
Custom domain
Deploy static
```

#### Pro

```text
Integrasi Google Sheet API
Mapping sheet ke data website
Cache data
Fallback empty state
Panduan operator
```

#### PPDB Online

```text
Database pendaftar
Auth panitia
Form submit asli
Upload berkas
Status checker asli
Export XLSX
Backup data
Email/WhatsApp notification opsional
```

---

## 23. Suggested Production Stack

### Simple Client Project

```text
Frontend: Next.js
Storage/CMS: Google Sheet
Hosting: Vercel / Cloudflare Pages
Domain: Cloudflare
```

### PPDB Production

```text
Frontend: Next.js
Backend: Supabase / Firebase / Laravel / Node
Database: Supabase Postgres / Firebase Firestore
Storage: Supabase Storage / Cloudflare R2
Auth: Supabase Auth / Custom auth
Export: XLSX library
```

### If Integrated with Xamina Later

```text
BikinWebSekolah.com = lead-generation / website package
Xamina = deeper school system

Possible upsell:
- CBT
- Absensi
- Penilaian
- Bank soal
- Dashboard sekolah
- PPDB advanced
```

---

## 24. Development Phases

### Phase 1 — Setup & Design System

Task:

```text
Setup project
Setup Tailwind
Setup fonts
Setup route
Setup tokens.css
Setup global components
```

Done if:

```text
Project running
Routes work
Theme tokens work
Base UI components ready
```

---

### Phase 2 — Landing Sales Page

Task:

```text
Build navbar
Build hero
Build pricing
Build feature matrix
Build demo preview
Build lead CTA
Build footer
```

Done if:

```text
Landing bisa dipakai promosi
Harga tampil jelas
CTA WhatsApp tersedia
Responsive rapi
```

---

### Phase 3 — Demo Start

Task:

```text
Build Start navbar
Build hero
Build profile
Build stats
Build vision mission
Build programs
Build facilities
Build gallery
Build contact
```

Done if:

```text
Demo Start terlihat seperti website sekolah asli
Static content lengkap
Mobile rapi
```

---

### Phase 4 — Demo Pro

Task:

```text
Build topbar
Build hero
Build news section
Build news modal
Build agenda
Build achievement
Build teachers
Build gallery
Build FAQ
Build CMS state toggle
```

Done if:

```text
Modal berita jalan
Loading/empty/loaded jalan
Pro terasa lebih premium dari Start
```

---

### Phase 5 — Demo PPDB Public

Task:

```text
Build PPDB hero
Build admission paths
Build steps
Build schedule
Build requirements
Build pricing/fees
Build form
Build success modal
Build status checker
Build FAQ
```

Done if:

```text
Form validasi jalan
Success modal jalan
Cek status dummy jalan
CTA scroll jalan
```

---

### Phase 6 — Dashboard PPDB

Task:

```text
Build sidebar
Build topbar
Build KPI cards
Build charts
Build filters
Build table
Build drawer
Build toast
Build status update
Build export dummy
```

Done if:

```text
Search/filter jalan
Update status jalan
Drawer jalan
KPI/chart update
Dashboard mobile usable
```

---

### Phase 7 — Polish & Deploy

Task:

```text
Responsive polish
Accessibility check
SEO metadata
Performance check
404 page
Deploy
Test all routes
```

Done if:

```text
Website live
No fatal console error
Mobile oke
CTA WhatsApp oke
All demo interactions oke
```

---

## 25. Acceptance Criteria Final

Website dianggap selesai jika:

```text
1. Semua route berjalan.
2. Landing menjelaskan produk dan 3 paket dengan jelas.
3. Harga launching tampil.
4. CTA WhatsApp tersedia.
5. Demo Start tampil sebagai website profil sekolah.
6. Demo Pro tampil sebagai website premium.
7. Demo Pro punya modal berita.
8. Demo Pro punya loading dan empty state.
9. Demo PPDB punya form pendaftaran.
10. Form PPDB punya validasi.
11. Success modal tampil setelah submit.
12. Cek status dummy tampil.
13. Dashboard PPDB menampilkan KPI.
14. Dashboard punya table pendaftar.
15. Search dan filter jalan.
16. Status pendaftar bisa diubah.
17. Detail drawer jalan.
18. Toast muncul setelah action.
19. KPI dan chart update setelah status berubah.
20. Export button memberi feedback.
21. Mobile responsive semua halaman.
22. Dashboard tetap usable di mobile.
23. Font sesuai: Newsreader + Plus Jakarta Sans.
24. Warna sesuai token.
25. Tidak ada error console fatal.
```

---

## 26. Prompt Developer Agent

Gunakan prompt ini untuk agent coding:

```text
Bangun website demo promosi bernama BikinWebSekolah.com.

Produk ini menjual template website sekolah dengan 3 paket:
1. Start — website profil sekolah statis
2. Pro — website sekolah premium + CMS Google Sheet
3. PPDB Online — website sekolah + PPDB online + dashboard panitia

Gunakan React + Vite + TypeScript + Tailwind CSS.

Route wajib:
/
 /start
 /pro
 /ppdb
 /ppdb/dashboard

Design style:
Modern Academic Editorial.

Font:
- Heading: Newsreader
- Body/UI: Plus Jakarta Sans

Global colors:
- Background parchment #f1ece1
- Surface #fbf9f3
- Ink #161d18
- Accent gold #c79433

Theme:
- Start: hijau akademik
- Pro: biru akademik
- PPDB Online: marun akademik

Landing / harus memiliki:
- Navbar
- Hero
- Pricing 3 paket
- Feature matrix
- Demo preview
- CTA WhatsApp
- Footer

/start:
- Demo website profil sekolah statis untuk SMAS Cendekia Bangsa
- Hero, profil, statistik, sambutan, visi misi, program, fasilitas, galeri, kontak

/pro:
- Demo website premium untuk MTsN Al-Hikmah
- Berita, agenda, prestasi, guru, program, galeri, CTA PPDB, FAQ
- Modal detail berita
- CMS state: loaded/loading/empty

/ppdb:
- Demo PPDB Online untuk SMK Bina Teknologi
- Hero, jalur, alur, jadwal, biaya, syarat, form daftar, success modal, cek status, FAQ

/ppdb/dashboard:
- Sidebar, topbar, KPI, chart, filter, search, table pendaftar, drawer detail, update status, toast, export dummy

Gunakan dummy data.
Tidak perlu backend.
Prioritaskan visual premium, responsive, interaksi demo, dan tampilan siap jual.
```

---

## 27. Kesimpulan Blueprint

Bangun BikinWebSekolah.com sebagai **media promosi yang bisa langsung dipakai jualan**.

Prioritas eksekusi:

```text
1. Visual harus premium.
2. Paket harus jelas.
3. Demo harus interaktif.
4. Mobile harus rapi.
5. CTA WhatsApp harus kuat.
6. Dashboard PPDB harus terlihat seperti sistem sungguhan.
```

Tahap awal jangan terlalu fokus ke backend. Fokus ke:

```text
Tampilan 1:1
Flow demo
Interaksi
Sales copy
Responsive
Deploy
```

Setelah ada calon klien atau sekolah yang tertarik, baru fitur dummy diubah menjadi production system.
