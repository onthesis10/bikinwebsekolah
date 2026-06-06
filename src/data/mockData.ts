export interface PackageSpec {
  id: string;
  name: string;
  label?: string;
  price: string;
  normalPrice: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  annualOps: string;
  paymentSys: string;
  suitableFor: string;
}

export const packages: PackageSpec[] = [
  {
    id: "start",
    name: "Start",
    price: "Rp799rb",
    normalPrice: "Rp999rb",
    description: "Website profil sekolah statis yang elegan, ringan, dan terpercaya — kehadiran resmi online tanpa ribet.",
    features: [
      "Homepage profil satu halaman",
      "Sambutan kepala sekolah & visi-misi",
      "Informasi sarana & fasilitas",
      "Galeri foto kegiatan sekolah",
      "Kontak resmi & peta lokasi",
      "Desain mobile responsive penuh"
    ],
    cta: "Lihat Demo Start",
    href: "/start",
    annualOps: "Rp500rb/tahun",
    paymentSys: "Sekali bayar jasa pembuatan website",
    suitableFor: "Website profil sekolah sederhana"
  },
  {
    id: "pro",
    name: "Pro",
    label: "Paling Laris",
    price: "Rp1,99jt",
    normalPrice: "Rp2,49jt",
    description: "Website dinamis dengan CMS Google Sheet — operator update berita, agenda & galeri tanpa coding.",
    features: [
      "Semua fitur paket Start",
      "Berita & pengumuman dinamis",
      "Agenda kegiatan & linimasa",
      "Daftar prestasi & penghargaan",
      "Direktori guru & staff sekolah",
      "CMS via Google Sheet (No-Code)",
      "Accordion FAQ & loading/empty states"
    ],
    cta: "Lihat Demo Pro",
    href: "/pro",
    annualOps: "Rp700rb/tahun",
    paymentSys: "Sekali bayar jasa pembuatan website",
    suitableFor: "Website sekolah + update berita, agenda, galeri"
  },
  {
    id: "ppdb",
    name: "PPDB Online",
    label: "Paket Komersial",
    price: "Rp4,39jt",
    normalPrice: "Rp5,49jt",
    description: "Paket premium + sistem PPDB online & dashboard panitia. Fokus konversi pendaftaran siswa baru.",
    features: [
      "Semua fitur paket Pro",
      "Form pendaftaran online validatif",
      "Unggah berkas pendaftaran",
      "Sistem cek status kelulusan siswa",
      "Dashboard admin/panitia PPDB",
      "Statistik & grafik pendaftar",
      "Ubah status kelulusan & export CSV"
    ],
    cta: "Lihat Demo PPDB",
    href: "/ppdb",
    annualOps: "Rp2jt/tahun",
    paymentSys: "Sekali bayar jasa pembuatan website & sistem PPDB",
    suitableFor: "Website sekolah + pendaftaran siswa baru online"
  }
];

export interface NewsItem {
  id: string;
  title: string;
  category: "Prestasi" | "Kegiatan" | "Pengumuman";
  date: string;
  excerpt: string;
  content: string;
}

export const proNews: NewsItem[] = [
  {
    id: "news-1",
    category: "Prestasi",
    date: "28 Mei 2026",
    title: "Tim Robotik Raih Juara 1 Nasional di Jakarta",
    excerpt: "Siswa kelas XI berhasil membawa pulang medali emas pada ajang National Robotic Competition 2026.",
    content: "Setelah melalui seleksi ketat dari 240 tim se-Indonesia, tim robotik MTsN Al-Hikmah Bandung berhasil meraih Juara 1 pada National Robotic Competition 2026 yang digelar di Jakarta Convention Center (JCC). Tim yang beranggotakan lima siswa kelas XI ini sukses memukau dewan juri dengan robot inovatif bernama \"Trash-Sorter Pro v2\".\n\nRobot ini dirancang khusus untuk memilah sampah secara otomatis berbasis kombinasi sensor warna RGB, sensor kedekatan ultrasonik, dan mikrokontroler Arduino. Dengan akurasi mencapai 98%, robot mampu memisahkan sampah organik, anorganik plastik, dan logam dalam waktu kurang dari 2 detik per objek.\n\n\"Kami mempersiapkan riset ini selama hampir enam bulan, mulai dari desain sasis mekanik 3D printing, pemrograman algoritma sensor, hingga uji coba stabilitas lengan robot. Kemenangan ini kami persembahkan untuk seluruh civitas akademika MTsN Al-Hikmah,\" ujar ketua tim robotik, Raihan Ahmad.\n\nKepala Sekolah MTsN Al-Hikmah, Dr. H. Ahmad Fauzi, M.Pd., menyampaikan rasa bangga yang luar biasa atas pencapaian ini. Sekolah berkomitmen untuk terus mendukung pendanaan laboratorium robotik dan sains agar bakat-bakat teknologi seperti ini dapat terus tumbuh dan menorehkan prestasi di kancah nasional maupun internasional."
  },
  {
    id: "news-2",
    category: "Kegiatan",
    date: "21 Mei 2026",
    title: "Pekan Literasi & Bazar Buku Tingkatkan Minat Baca",
    excerpt: "Sekolah menggelar pekan literasi selama lima hari dengan beragam lomba dan pameran karya siswa.",
    content: "MTsN Al-Hikmah sukses menggelar acara tahunan Pekan Literasi 2026 selama lima hari berturut-turut pada tanggal 17-21 Mei 2026. Dengan mengangkat tema \"Membaca Membuka Dunia\", kegiatan ini bertujuan untuk merevitalisasi budaya membaca dan menulis di kalangan siswa serta memanfaatkan perpustakaan sekolah secara maksimal.\n\nRangkaian acara tahun ini dirancang sangat dinamis dan interaktif. Mulai dari lomba menulis cerpen tingkat sekolah, kompetisi resensi buku, kelas menulis puisi, hingga puncaknya adalah acara Bedah Buku bersama penulis novel terlaris nasional, Tere Liye. Antusiasme siswa terlihat sangat tinggi, terbukti dari ratusan naskah cerpen yang masuk ke meja panitia.\n\nSelain perlombaan sastra, area lapangan sekolah disulap menjadi Bazar Buku Murah yang bekerja sama dengan penerbit-penerbit besar. Buku-buku fiksi, sains populer, sejarah, hingga buku keagamaan dijual dengan potongan harga hingga 50%, memudahkan siswa untuk mengoleksi buku bacaan bermutu.\n\n\"Literasi bukan sekadar membaca teks, melainkan kemampuan mencerna informasi secara kritis. Kami berharap lewat Pekan Literasi ini, siswa tidak hanya gemar membaca, tetapi juga memiliki kemampuan berpikir kritis dan kreatif dalam mengekspresikan ide-ide mereka,\" ungkap Ibu Siti Rohmah, S.Pd., selaku ketua panitia pelaksana."
  },
  {
    id: "news-3",
    category: "Pengumuman",
    date: "15 Mei 2026",
    title: "Jadwal Ujian Semester Genap 2025/2026",
    excerpt: "Ujian akhir semester akan dilaksanakan mulai 9 Juni 2026. Simak jadwal lengkap dan tata tertibnya.",
    content: "Sehubungan dengan akan berakhirnya kegiatan belajar mengajar pada semester genap Tahun Pelajaran 2025/2026, pihak kurikulum MTsN Al-Hikmah Bandung secara resmi merilis jadwal pelaksanaan Ujian Akhir Semester (UAS) Genap. Berdasarkan kalender akademik, ujian tertulis akan dilangsungkan mulai tanggal 9 hingga 18 Juni 2026.\n\nUAS Genap kali ini akan menggunakan sistem Computer-Based Test (CBT) melalui server lokal sekolah yang dapat diakses menggunakan tablet atau perangkat komputer di laboratorium. Langkah ini diambil untuk mendukung program go-green sekolah dan meminimalisir penggunaan kertas ujian secara fisik.\n\nAdapun beberapa tata tertib penting yang wajib diperhatikan oleh seluruh siswa antara lain:\n1. Hadir di ruang ujian 15 menit sebelum ujian dimulai.\n2. Membawa kartu peserta ujian resmi yang telah divalidasi oleh wali kelas.\n3. Mengenakan seragam sekolah rapi dan atribut lengkap sesuai hari pelaksanaan.\n4. Dilarang membawa catatan fisik atau gawai pribadi ke dalam ruang ujian selain perangkat CBT yang telah ditentukan.\n\n\"Kami mengimbau para orang tua untuk memantau intensitas belajar anak di rumah dan memastikan kesehatan fisik anak terjaga dengan baik menjelang ujian. Nilai UAS Genap ini akan menjadi salah satu faktor penentu utama kenaikan kelas,\" menjelaskan Wakil Kepala Sekolah Bidang Kurikulum."
  },
  {
    id: "news-4",
    category: "Kegiatan",
    date: "8 Mei 2026",
    title: "Bakti Sosial Ramadhan: Berbagi dengan Sesama",
    excerpt: "OSIS menggalang donasi dan menyalurkan paket sembako kepada warga sekitar sekolah.",
    content: "Dalam rangka menyemarakkan bulan suci Ramadhan dan menumbuhkan rasa empati sosial sejak dini, Organisasi Siswa Intra Sekolah (OSIS) MTsN Al-Hikmah Bandung menggelar aksi nyata Bakti Sosial Ramadhan 2026. Kegiatan ini merupakan inisiatif kolaboratif antara siswa, guru, dan persatuan orang tua murid.\n\nMelalui penggalangan donasi sukarela yang dibuka sejak awal bulan Ramadhan, panitia berhasil mengumpulkan dana dan bahan pokok untuk menyusun 200 paket sembako gratis. Setiap paket sembako berisi 5 kg beras premium, 1 liter minyak goreng, gula pasir, teh, mie instan, dan susu kaleng.\n\nPaket sembako tersebut didistribusikan secara langsung oleh perwakilan pengurus OSIS dan guru pendamping kepada warga pra-sejahtera, kaum dhuafa, serta anak yatim di sekitar lingkungan RW 04 dan RW 05 kelurahan setempat. Selain paket sembako, OSIS juga menyalurkan santunan tunai kepada panti asuhan terdekat.\n\n\"Tujuan utama kami adalah melatih kepekaan sosial teman-teman siswa. Kami ingin menunjukkan bahwa madrasah hadir bukan hanya untuk belajar teori di kelas, tetapi juga membawa manfaat nyata dan keberkahan langsung bagi masyarakat sekitar,\" ujar Ketua OSIS MTsN Al-Hikmah."
  },
  {
    id: "news-5",
    category: "Prestasi",
    date: "2 Mei 2026",
    title: "Juara Umum Olimpiade Sains Tingkat Kabupaten",
    excerpt: "Delegasi sekolah memborong medali pada Olimpiade Sains Nasional tingkat kabupaten.",
    content: "Kabar membanggakan kembali datang dari bidang akademik. MTsN Al-Hikmah Bandung dinobatkan sebagai Juara Umum dalam ajang bergengsi Olimpiade Sains Nasional tingkat Kabupaten (OSN-K) tahun 2026. Keputusan ini diumumkan secara resmi oleh Dinas Pendidikan setempat setelah rekapitulasi perolehan medali selesai dilakukan.\n\nDalam kompetisi ketat yang diikuti oleh lebih dari 50 sekolah menengah tersebut, kontingen sains MTsN Al-Hikmah sukses mendominasi panggung juara. Tim sekolah berhasil memboyong total 9 medali, dengan rincian:\n- 3 Medali Emas (di cabang Matematika Terintegrasi, IPA Fisika, dan IPS Geografi)\n- 2 Medali Perak (di cabang IPA Biologi dan Matematika)\n- 4 Medali Perunggu (di cabang Fisika, IPS Sejarah, dan Matematika)\n\nPrestasi gemilang ini diraih berkat program bimbingan intensif \"Klub Sains Al-Hikmah\" yang mempertemukan siswa berbakat dengan dosen pembimbing tamu dan alumni olimpiade secara berkala setiap akhir pekan.\n\n\"Ini adalah buah dari kerja keras, disiplin tinggi, dan doa restu dari orang tua serta guru-guru. Kami sangat bersyukur dan siap memfokuskan energi untuk mewakili kabupaten dalam ajang OSN tingkat Provinsi bulan depan,\" ungkap salah satu peraih medali emas IPA Fisika."
  },
  {
    id: "news-6",
    category: "Pengumuman",
    date: "25 Apr 2026",
    title: "Pembukaan PPDB Gelombang 1 Tahun 2026/2027",
    excerpt: "Penerimaan peserta didik baru gelombang pertama resmi dibuka. Kuota terbatas.",
    content: "Penerimaan Peserta Didik Baru (PPDB) MTsN Al-Hikmah Bandung untuk tahun pelajaran 2026/2027 resmi membuka pendaftaran Gelombang 1 mulai tanggal 25 April hingga 30 Mei 2026. Pada tahun ajaran ini, madrasah menyediakan kuota terbatas untuk kelas reguler maupun kelas unggulan berbasis riset dan IT.\n\nGuna mempermudah calon pendaftar, sistem pendaftaran kini sepenuhnya terintegrasi secara online melalui portal resmi PPDB Sekolahku. Orang tua siswa dapat mengisi formulir biodata diri, mengunggah dokumen persyaratan (seperti Akta Kelahiran, Kartu Keluarga, dan Rapor), hingga memantau status kelulusan berkas secara langsung dari ponsel mereka.\n\nBagi calon siswa yang memiliki kendala koneksi internet, panitia PPDB juga menyediakan meja pelayanan offline di sekretariat pendaftaran gedung utama sekolah dengan protokol pendampingan pengisian data.\n\n\"Gelombang 1 ini difokuskan untuk jalur prestasi akademik/non-akademik dan jalur afirmasi bagi keluarga kurang mampu. Kuota Gelombang 1 biasanya cepat terpenuhi karena antusiasme masyarakat Bandung yang sangat tinggi terhadap kualitas pembelajaran di madrasah kami,\" menerangkan ketua panitia PPDB 2026/2027."
  }
];

export interface AgendaItem {
  id: string;
  d: string;
  m: string;
  title: string;
  time: string;
  place: string;
  tag: string;
}

export const proAgenda: AgendaItem[] = [
  { id: "agenda-1", d: "09", m: "Jun", title: "Ujian Akhir Semester Genap", time: "07.30 – 12.00 WIB", place: "Seluruh ruang kelas", tag: "Akademik" },
  { id: "agenda-2", d: "14", m: "Jun", title: "Rapat Pleno Kenaikan Kelas", time: "13.00 – 16.00 WIB", place: "Aula Utama", tag: "Internal" },
  { id: "agenda-3", d: "20", m: "Jun", title: "Pentas Seni & Pembagian Rapor", time: "08.00 – 11.00 WIB", place: "Lapangan Sekolah", tag: "Kegiatan" },
  { id: "agenda-4", d: "01", m: "Jul", title: "Daftar Ulang Peserta Didik Baru", time: "08.00 – 14.00 WIB", place: "Ruang TU", tag: "PPDB" }
];

export interface PrestasiItem {
  id: string;
  thn: string;
  title: string;
  tk: string;
  nama: string;
}

export const proPrestasi: PrestasiItem[] = [
  { id: "pres-1", thn: "2026", title: "Juara 1 National Robotic Competition", tk: "Nasional", nama: "Tim Robotik" },
  { id: "pres-2", thn: "2026", title: "Juara Umum Olimpiade Sains Kabupaten", tk: "Kabupaten", nama: "Delegasi OSN" },
  { id: "pres-3", thn: "2025", title: "Medali Emas MTQ Pelajar Provinsi", tk: "Provinsi", nama: "Aisyah Nur R." },
  { id: "pres-4", thn: "2025", title: "Juara 2 Lomba Cerdas Cermat", tk: "Provinsi", nama: "Tim LCC" }
];

export interface TeacherItem {
  id: string;
  name: string;
  role: string;
  subject: string;
}

export const proTeachers: TeacherItem[] = [
  { id: "teach-1", name: "Dr. H. Ahmad Fauzi, M.Pd.", role: "Kepala Sekolah", subject: "Manajemen Pendidikan" },
  { id: "teach-2", name: "Siti Rohmah, S.Pd.", role: "Wakil Kurikulum", subject: "Matematika" },
  { id: "teach-3", name: "Bambang Sutejo, M.Sc.", role: "Guru", subject: "Fisika" },
  { id: "teach-4", name: "Nur Halimah, S.Pd.", role: "Guru", subject: "Bahasa Inggris" },
  { id: "teach-5", name: "Hendra Wijaya, S.Kom.", role: "Guru", subject: "Informatika" },
  { id: "teach-6", name: "Dewi Lestari, S.Pd.", role: "Wali Kelas", subject: "Biologi" }
];

export interface FaqItem {
  q: string;
  a: string;
}

export const businessFaqs: FaqItem[] = [
  {
    q: "Apakah pendaftaran website sekolah ini gratis?",
    a: "BikinWebSekolah.com menyediakan platform demo interaktif gratis untuk melihat fitur. Layanan deployment, domain, hosting, dan setup untuk sekolah Anda dikenakan biaya sesuai paket yang dipilih."
  },
  {
    q: "Bagaimana cara mengelola konten di Paket Pro dan PPDB?",
    a: "Konten dikelola menggunakan Google Sheet yang sangat mudah dipahami. Operator sekolah cukup mengisi baris baru pada tabel, dan data di website akan terupdate otomatis tanpa perlu login CMS yang rumit."
  },
  {
    q: "Apakah harga di website sudah termasuk domain dan hosting?",
    a: "Ya, harga launching sudah termasuk setup awal, domain .sch.id resmi, dan hosting gratis selama tahun pertama untuk seluruh paket."
  },
  {
    q: "Bagaimana dengan notifikasi PPDB ke WhatsApp?",
    a: "Paket PPDB Online mendukung integrasi WhatsApp gateway (opsional) untuk mengirim notifikasi nomor pendaftaran dan status verifikasi secara otomatis ke orang tua/siswa."
  }
];

export const ppdbFaqs: FaqItem[] = [
  {
    q: "Apakah pendaftaran bisa sepenuhnya online?",
    a: "Ya, seluruh proses mulai dari pengisian formulir hingga unggah berkas dapat dilakukan online. Verifikasi dokumen fisik dilakukan saat daftar ulang."
  },
  {
    q: "Bagaimana jika saya lupa nomor pendaftaran?",
    a: "Nomor pendaftaran dikirim ke WhatsApp yang Anda daftarkan. Jika hilang, hubungi panitia dengan menyebutkan NISN dan nama lengkap."
  },
  {
    q: "Apakah bisa memilih dua jurusan?",
    a: "Bisa. Anda dapat memilih pilihan jurusan 1 (utama) dan pilihan 2 (cadangan) sesuai ketersediaan kuota."
  },
  {
    q: "Kapan pengumuman hasil seleksi?",
    a: "Pengumuman gelombang 1 dilakukan pada 28 Mei 2026 dan dapat dicek melalui menu Cek Status di halaman ini."
  }
];

export type ApplicationStatus = "baru" | "verifikasi" | "diterima" | "ditolak" | "cadangan";

export interface Applicant {
  id: string;
  nama: string;
  asal: string;
  jalur: "Reguler" | "Prestasi" | "Afirmasi";
  gel: "G1" | "G2";
  jur: string;
  tgl: string;
  wa: string;
  st: ApplicationStatus;
}

export const initialApplicants: Applicant[] = [
  { id: 'PPDB-2026-0431', nama: 'Muhammad Rizky Pratama', asal: 'SMPN 3 Bandung', jalur: 'Reguler', gel: 'G1', jur: 'Rekayasa Perangkat Lunak', tgl: '12 Mei 2026', wa: '0812-3456-7890', st: 'diterima' },
  { id: 'PPDB-2026-0432', nama: 'Siti Aisyah Nurhaliza', asal: 'MTs Al-Falah', jalur: 'Prestasi', gel: 'G1', jur: 'Multimedia / DKV', tgl: '12 Mei 2026', wa: '0813-2222-1010', st: 'verifikasi' },
  { id: 'PPDB-2026-0433', nama: 'Bayu Setiawan', asal: 'SMPN 1 Cimahi', jalur: 'Reguler', gel: 'G1', jur: 'Teknik Komputer & Jaringan', tgl: '13 Mei 2026', wa: '0857-9988-1234', st: 'baru' },
  { id: 'PPDB-2026-0434', nama: 'Dewi Lestari', asal: 'SMP Mutiara', jalur: 'Afirmasi', gel: 'G1', jur: 'Akuntansi', tgl: '13 Mei 2026', wa: '0812-7766-5544', st: 'diterima' },
  { id: 'PPDB-2026-0435', nama: 'Ahmad Fadli Rahman', asal: 'MTsN 2 Bandung', jalur: 'Prestasi', gel: 'G1', jur: 'Rekayasa Perangkat Lunak', tgl: '14 Mei 2026', wa: '0896-1212-3434', st: 'cadangan' },
  { id: 'PPDB-2026-0436', nama: 'Nabila Putri Andini', asal: 'SMPN 5 Bandung', jalur: 'Reguler', gel: 'G2', jur: 'Multimedia / DKV', tgl: '15 Mei 2026', wa: '0812-5050-6060', st: 'baru' },
  { id: 'PPDB-2026-0437', nama: 'Rangga Dwi Saputra', asal: 'SMP Harapan', jalur: 'Reguler', gel: 'G2', jur: 'Teknik Elektronika', tgl: '15 Mei 2026', wa: '0821-3030-9090', st: 'ditolak' },
  { id: 'PPDB-2026-0438', nama: 'Putri Amelia Sari', asal: 'MTs Darussalam', jalur: 'Afirmasi', gel: 'G2', jur: 'Akuntansi', tgl: '16 Mei 2026', wa: '0812-1414-5656', st: 'verifikasi' },
  { id: 'PPDB-2026-0439', nama: 'Fauzan Aziz Maulana', asal: 'SMPN 8 Bandung', jalur: 'Prestasi', gel: 'G2', jur: 'Teknik Komputer & Jaringan', tgl: '17 Mei 2026', wa: '0857-7878-1212', st: 'diterima' },
  { id: 'PPDB-2026-0440', nama: 'Kirana Maharani', asal: 'SMP Bina Insani', jalur: 'Reguler', gel: 'G2', jur: 'Rekayasa Perangkat Lunak', tgl: '18 Mei 2026', wa: '0813-9090-3434', st: 'baru' },
  { id: 'PPDB-2026-0441', nama: 'Yoga Pratama Wijaya', asal: 'SMPN 12 Bandung', jalur: 'Reguler', gel: 'G2', jur: 'Teknik Elektronika', tgl: '18 Mei 2026', wa: '0812-6767-8989', st: 'verifikasi' },
  { id: 'PPDB-2026-0442', nama: 'Salsabila Rahmadhani', asal: 'MTs Al-Hikmah', jalur: 'Prestasi', gel: 'G2', jur: 'Multimedia / DKV', tgl: '19 Mei 2026', wa: '0896-4545-6767', st: 'cadangan' }
];

export const statusMetadata: Record<ApplicationStatus, { label: string; cls: string; tone: string }> = {
  baru: { label: "Baru", cls: "badge-info", tone: "info" },
  verifikasi: { label: "Diverifikasi", cls: "badge-warn", tone: "warn" },
  diterima: { label: "Diterima", cls: "badge-ok", tone: "ok" },
  ditolak: { label: "Ditolak", cls: "badge-danger", tone: "danger" },
  cadangan: { label: "Cadangan", cls: "badge-plum", tone: "plum" }
};
