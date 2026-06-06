import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ppdbFaqs, initialApplicants, statusMetadata } from '../data/mockData';
import type { Applicant, ApplicationStatus } from '../data/mockData';
import { getInitials } from '../lib/initials';
import './PPDBPage.css';

interface PremiumSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  required?: boolean;
}

const PremiumSelect: React.FC<PremiumSelectProps> = ({ label, value, options, onChange, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="field premium-select-container" ref={selectRef}>
      <label>
        {label} {required && <span className="req">*</span>}
      </label>
      <div className={`premium-select ${isOpen ? 'open' : ''}`}>
        <button
          type="button"
          className="premium-select-trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{value}</span>
          <svg className="chevron" viewBox="0 0 24 24" fill="none">
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {isOpen && (
          <div className="premium-select-options">
            {options.map((opt) => (
              <div
                key={opt}
                className={`premium-select-option ${opt === value ? 'selected' : ''}`}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
              >
                <span>{opt}</span>
                {opt === value && (
                  <svg className="check" viewBox="0 0 24 24" fill="none">
                    <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const PPDBPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Applicants local database state
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);

  // Form State
  const [nama, setNama] = useState('');
  const [nisn, setNisn] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('Laki-laki');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [asalSekolah, setAsalSekolah] = useState('');
  const [alamat, setAlamat] = useState('');
  const [jalur, setJalur] = useState('Reguler');
  const [gelombang, setGelombang] = useState('Gelombang 1');
  const [jurusan1, setJurusan1] = useState('Teknik Komputer & Jaringan');
  const [jurusan2, setJurusan2] = useState('Rekayasa Perangkat Lunak');
  const [namaAyah, setNamaAyah] = useState('');
  const [namaIbu, setNamaIbu] = useState('');
  const [pekerjaanOrtu, setPekerjaanOrtu] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [agree, setAgree] = useState(false);

  // Success Modal State
  const [successOpen, setSuccessOpen] = useState(false);
  const [generatedRegNo, setGeneratedRegNo] = useState('PPDB-2026-0443');

  // Status Checker State
  const [searchNo, setSearchNo] = useState('');
  const [checkedApplicant, setCheckedApplicant] = useState<Applicant | null>(null);
  const [checkError, setCheckError] = useState(false);
  const [showStatusResult, setShowStatusResult] = useState(false);

  // FAQ State
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  // Countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({ days: 32, hours: 14, minutes: 8, seconds: 21 });

  useEffect(() => {
    document.documentElement.className = 'theme-ppdb';
    const oldTitle = document.title;
    document.title = 'SMK Bina Teknologi — Pendaftaran PPDB Online';

    const handleScroll = () => {
      const nav = document.querySelector('[data-nav]');
      if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 12);
        setScrolled(window.scrollY > 12);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Timer countdown decrement
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
      document.title = oldTitle;
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 70; // nav height is 70px
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !nisn || !tanggalLahir || !asalSekolah || !whatsapp || !agree) {
      alert('Mohon lengkapi semua field wajib!');
      return;
    }

    // Generate random id like PPDB-2026-0443
    const nextNum = 443 + Math.floor(Math.random() * 500);
    const newId = `PPDB-2026-${String(nextNum).padStart(4, '0')}`;
    setGeneratedRegNo(newId);

    // Create new applicant in the database state
    const newApplicant: Applicant = {
      id: newId,
      nama: nama,
      asal: asalSekolah,
      jalur: jalur as any,
      gel: gelombang === 'Gelombang 1' ? 'G1' : 'G2',
      jur: jurusan1,
      tgl: '05 Juni 2026',
      wa: whatsapp,
      st: 'baru'
    };

    setApplicants(prev => [newApplicant, ...prev]);
    setSuccessOpen(true);

    // Reset Form Fields
    setNama('');
    setNisn('');
    setTanggalLahir('');
    setTempatLahir('');
    setAsalSekolah('');
    setAlamat('');
    setNamaAyah('');
    setNamaIbu('');
    setPekerjaanOrtu('');
    setWhatsapp('');
    setAgree(false);
  };

  const handleCheckStatus = () => {
    const lookup = searchNo.trim();
    if (!lookup) {
      alert('Masukkan nomor pendaftaran terlebih dahulu!');
      return;
    }

    const found = applicants.find(a => a.id.toLowerCase() === lookup.toLowerCase());
    if (found) {
      setCheckedApplicant(found);
      setCheckError(false);
      setShowStatusResult(true);
    } else {
      setCheckedApplicant(null);
      setCheckError(true);
      setShowStatusResult(true);
    }

    // Smooth scroll to results
    setTimeout(() => {
      const el = document.getElementById('status-res');
      if (el) {
        const topOffset = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      }
    }, 100);
  };

  const getProgressInfo = (status: ApplicationStatus) => {
    switch (status) {
      case 'baru':
        return { percent: '20%', stepText: 'TAHAP 1 / 5', desc: 'Berkas Anda telah diterima dan sedang menunggu antrean verifikasi.' };
      case 'verifikasi':
        return { percent: '40%', stepText: 'TAHAP 2 / 5', desc: 'Berkas Anda sedang dalam proses verifikasi oleh panitia.' };
      case 'cadangan':
        return { percent: '80%', stepText: 'TAHAP 4 / 5', desc: 'Hasil Seleksi: Anda masuk dalam daftar CADANGAN. Tunggu info pendaftaran ulang.' };
      case 'diterima':
        return { percent: '80%', stepText: 'TAHAP 4 / 5', desc: 'Selamat! Anda dinyatakan DITERIMA. Silakan lakukan daftar ulang 1–10 Juni 2026.' };
      case 'ditolak':
        return { percent: '80%', stepText: 'TAHAP 4 / 5', desc: 'Maaf, Anda dinyatakan BELUM LULUS seleksi PPDB gelombang ini.' };
      default:
        return { percent: '0%', stepText: 'TAHAP 0 / 5', desc: 'Status pendaftaran tidak diketahui.' };
    }
  };

  const getStatusText = (status: ApplicationStatus) => {
    switch (status) {
      case 'baru': return 'Baru';
      case 'verifikasi': return 'Diverifikasi';
      case 'diterima': return 'Diterima';
      case 'ditolak': return 'Ditolak';
      case 'cadangan': return 'Cadangan';
      default: return '';
    }
  };

  return (
    <div className="ppdb-page">
      <Link to="/" className="btn btn-soft btn-sm backhub">← Katalog</Link>
      <Link to="/ppdb/dashboard" className="btn btn-primary btn-sm dashlink">Dashboard Panitia →</Link>

      {/* NAV */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} data-nav>
        <div className="wrap">
          <div className="row">
            <a className="brand" href="#top" onClick={(e) => handleNavClick(e, 'top')}>
              <span className="mk">
                <svg viewBox="0 0 64 64" fill="currentColor">
                  <path d="M32 6.5 58.5 28 52.5 28 52.5 52.5a3 3 0 0 1-3 3L14.5 55.5a3 3 0 0 1-3-3L11.5 28 5.5 28Z"/>
                  <rect fill="var(--accent, #ff7a45)" x="17.5" y="32.5" width="29" height="17.5" rx="2.6"/>
                  <circle cx="22" cy="37" r="1.3" fill="currentColor"/>
                  <circle cx="26.4" cy="37" r="1.3" fill="currentColor"/>
                  <circle cx="30.8" cy="37" r="1.3" fill="currentColor"/>
                </svg>
              </span>
              <span className="wm">SMK Bina Teknologi<small>PPDB Online 2026/2027</small></span>
            </a>
            <div className="navlinks">
              <a href="#jalur" onClick={(e) => handleNavClick(e, 'jalur')}>Jalur</a>
              <a href="#alur" onClick={(e) => handleNavClick(e, 'alur')}>Alur</a>
              <a href="#jadwal" onClick={(e) => handleNavClick(e, 'jadwal')}>Jadwal</a>
              <a href="#biaya" onClick={(e) => handleNavClick(e, 'biaya')}>Biaya</a>
              <a href="#syarat" onClick={(e) => handleNavClick(e, 'syarat')}>Syarat</a>
              <a href="#status" onClick={(e) => handleNavClick(e, 'status')}>Cek Status</a>
              <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')}>FAQ</a>
            </div>
            <a href="#daftar" onClick={(e) => handleNavClick(e, 'daftar')} className="btn btn-amber btn-sm cta">Daftar Sekarang</a>
            <button 
              className="menu-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className={`mobnav ${mobileMenuOpen ? 'open' : ''}`} id="mobnav">
        <a href="#jalur" onClick={(e) => handleNavClick(e, 'jalur')}>Jalur</a>
        <a href="#alur" onClick={(e) => handleNavClick(e, 'alur')}>Alur</a>
        <a href="#jadwal" onClick={(e) => handleNavClick(e, 'jadwal')}>Jadwal</a>
        <a href="#biaya" onClick={(e) => handleNavClick(e, 'biaya')}>Biaya</a>
        <a href="#syarat" onClick={(e) => handleNavClick(e, 'syarat')}>Syarat</a>
        <a href="#status" onClick={(e) => handleNavClick(e, 'status')}>Cek Status</a>
        <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')}>FAQ</a>
        <a href="#daftar" onClick={(e) => handleNavClick(e, 'daftar')}>Daftar</a>
      </div>

      {/* HERO */}
      <header className="hero" id="top">
        <div className="wrap">
          <div className="hero-panel">
            <div className="hero-grid">
              <div>
                <div className="coord"><span className="d"></span><span className="kick">PPDB Online · 2026/2027</span></div>
                <h1>Masa depanmu<br/>dimulai dari <span className="hl">sini.</span></h1>
                <p className="sub">Daftar online dalam 10 menit. Pilih jurusan, unggah berkas, dan pantau status pendaftaran langsung dari rumah.</p>
                <div className="cta-row">
                  <a href="#daftar" onClick={(e) => handleNavClick(e, 'daftar')} className="btn btn-amber btn-lg">
                    Daftar Sekarang
                    <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16, stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </a>
                  <a href="#status" onClick={(e) => handleNavClick(e, 'status')} className="btn btn-onp btn-lg">Cek Status</a>
                </div>
              </div>
              <div className="glass">
                <div className="gh"><b>Status Pendaftaran</b><span className="kick" style={{ color: 'var(--amber)' }}>LIVE</span></div>
                <div className="gel"><div className="gi"><b>Gelombang 1</b><span>01 APR – 31 MEI 2026</span></div><span className="st-dot st-open">Dibuka</span></div>
                <div className="gel"><div className="gi"><b>Gelombang 2</b><span>01 JUN – 15 JUL 2026</span></div><span className="st-dot st-soon">Segera</span></div>
                <div className="gel"><div className="gi"><b>Gelombang 3</b><span>16 JUL – 05 AGU 2026</span></div><span className="st-dot st-soon">Terkunci</span></div>
                <div className="countdown">
                  <div className="cd"><b>{timeLeft.days}</b><span>Hari</span></div>
                  <div className="cd"><b>{timeLeft.hours}</b><span>Jam</span></div>
                  <div className="cd"><b>{timeLeft.minutes}</b><span>Mnt</span></div>
                  <div className="cd"><b>{timeLeft.seconds}</b><span>Dtk</span></div>
                </div>
                <div className="kuota">
                  <div className="kt"><span>KUOTA TERISI</span><span>428 / 548</span></div>
                  <div className="ktrack"><div className="kfill" style={{ width: '78%' }}></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* JALUR */}
      <section className="section" id="jalur" style={{ paddingTop: 'clamp(20px,3vw,40px)' }}>
        <div className="wrap">
          <div className="secnum"><span className="no">// 01</span><h2>Jalur Penerimaan</h2><span className="meta">Pilih yang sesuai</span></div>
          <div className="jalur">
            <article className="jcard reveal in">
              <span className="jn">J1</span>
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="m12 2 2.4 5 5.6.8-4 4 1 5.6L12 19l-5 2.4 1-5.6-4-4 5.6-.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Jalur Prestasi</h3>
              <p>Untuk siswa dengan prestasi akademik atau non-akademik unggulan.</p>
              <ul>
                <li>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Sertifikat juara min. kab/kota
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Bebas biaya pendaftaran
                </li>
              </ul>
            </article>

            <article className="jcard reveal in">
              <span className="jn">J2</span>
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 21h18M5 21V9l7-5 7 5v12" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Jalur Reguler</h3>
              <p>Jalur umum berdasarkan nilai rapor dan hasil tes seleksi.</p>
              <ul>
                <li>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Nilai rapor 5 semester
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Tes potensi akademik
                </li>
              </ul>
            </article>

            <article className="jcard reveal in">
              <span className="jn">J3</span>
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Jalur Afirmasi</h3>
              <p>Untuk keluarga kurang mampu dengan dokumen pendukung.</p>
              <ul>
                <li>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  KIP / KKS / SKTM
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="m5 13 4 4L19 7" stroke="currentColor" stroke-width="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Subsidi biaya pendidikan
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* ALUR */}
      <section className="section" id="alur" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="secnum"><span className="no">// 02</span><h2>Alur Pendaftaran</h2><span className="meta">4 Langkah</span></div>
          <div className="steps">
            <div className="step reveal in"><div className="num">01</div><h3>Isi Formulir</h3><p>Lengkapi data diri dan pilih jurusan secara online.</p></div>
            <div className="step reveal in"><div className="num">02</div><h3>Unggah Berkas</h3><p>Upload dokumen persyaratan format PDF/JPG.</p></div>
            <div className="step reveal in"><div className="num">03</div><h3>Verifikasi</h3><p>Panitia memeriksa kelengkapan data pendaftar.</p></div>
            <div className="step reveal in"><div className="num">04</div><h3>Pengumuman</h3><p>Cek hasil seleksi melalui menu Cek Status.</p></div>
          </div>
        </div>
      </section>

      {/* JADWAL */}
      <section className="section" id="jadwal" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="secnum center"><span className="no">// 03</span><h2>Jadwal PPDB 2026/2027</h2></div>
          <div className="timeline reveal in">
            <div className="tl done">
              <span className="date">01 APR 2026</span>
              <b>Pendaftaran Gelombang 1 Dibuka</b>
              <p>Pengisian formulir &amp; unggah berkas online.</p>
            </div>
            <div className="tl done">
              <span className="date">01 – 15 MEI 2026</span>
              <b>Verifikasi Berkas</b>
              <p>Pemeriksaan kelengkapan oleh panitia.</p>
            </div>
            <div className="tl">
              <span className="date">20 MEI 2026</span>
              <b>Tes Seleksi &amp; Wawancara</b>
              <p>Tes potensi akademik dan wawancara orang tua.</p>
            </div>
            <div className="tl">
              <span className="date">28 MEI 2026</span>
              <b>Pengumuman Kelulusan</b>
              <p>Hasil seleksi diumumkan via Cek Status.</p>
            </div>
            <div className="tl">
              <span className="date">01 – 10 JUN 2026</span>
              <b>Daftar Ulang</b>
              <p>Konfirmasi &amp; pembayaran biaya masuk.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BIAYA */}
      <section className="section" id="biaya" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="secnum"><span className="no">// 04</span><h2>Biaya Pendaftaran</h2><span className="meta">Per Gelombang</span></div>
          <div className="tiers">
            <div className="tier reveal in">
              <span className="gname">Gelombang 1</span>
              <div className="amt"><b>Rp 150rb</b></div>
              <span className="period">01 APR – 31 MEI 2026</span>
              <ul>
                <li>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Biaya formulir termurah
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="m5 13 4 4L19 7" stroke="currentColor" stroke-width="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Prioritas kuota jurusan
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="m5 13 4 4L19 7" stroke="currentColor" stroke-width="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Gratis kaos PPDB
                </li>
              </ul>
            </div>
            <div className="tier hot reveal in">
              <span className="hotbadge">Aktif</span>
              <span className="gname">Gelombang 2</span>
              <div className="amt"><b>Rp 200rb</b></div>
              <span className="period">01 JUN – 15 JUL 2026</span>
              <ul>
                <li>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="m5 13 4 4L19 7" stroke="currentColor" stroke-width="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Kuota reguler
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="m5 13 4 4L19 7" stroke="currentColor" stroke-width="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Seleksi tes &amp; wawancara
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="m5 13 4 4L19 7" stroke="currentColor" stroke-width="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Bimbingan jurusan
                </li>
              </ul>
            </div>
            <div className="tier reveal in">
              <span className="gname">Gelombang 3</span>
              <div className="amt"><b>Rp 250rb</b></div>
              <span className="period">16 JUL – 05 AGU 2026</span>
              <ul>
                <li>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="m5 13 4 4L19 7" stroke="currentColor" stroke-width="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Kuota sisa jurusan
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="m5 13 4 4L19 7" stroke="currentColor" stroke-width="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Seleksi langsung
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="m5 13 4 4L19 7" stroke="currentColor" stroke-width="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Pengumuman cepat
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SYARAT */}
      <section className="section" id="syarat" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="secnum"><span className="no">// 05</span><h2>Syarat Pendaftaran</h2><span className="meta">Dokumen</span></div>
          <div className="syarat reveal in">
            <div className="s">
              <span className="ck">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="m5 13 4 4L19 7" stroke="currentColor" stroke-width="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <b>Scan Akta Kelahiran</b>
              <span>PDF · 2MB</span>
            </div>
            <div className="s">
              <span className="ck">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="m5 13 4 4L19 7" stroke="currentColor" stroke-width="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <b>Kartu Keluarga (KK)</b>
              <span>PDF · 2MB</span>
            </div>
            <div className="s">
              <span className="ck">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="m5 13 4 4L19 7" stroke="currentColor" stroke-width="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <b>Ijazah / SKL</b>
              <span>SKL Sementara</span>
            </div>
            <div className="s">
              <span className="ck">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="m5 13 4 4L19 7" stroke="currentColor" stroke-width="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <b>Rapor 5 Semester</b>
              <span>Dilegalisir</span>
            </div>
            <div className="s">
              <span className="ck">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="m5 13 4 4L19 7" stroke="currentColor" stroke-width="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <b>Pas Foto 3×4</b>
              <span>Latar merah</span>
            </div>
            <div className="s">
              <span className="ck">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="m5 13 4 4L19 7" stroke="currentColor" stroke-width="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <b>Sertifikat Prestasi</b>
              <span>Opsional</span>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="section" id="daftar" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="secnum"><span className="no">// 06</span><h2>Formulir Pendaftaran</h2><span className="meta">Wajib: <span className="req">*</span></span></div>
          <div className="form-wrap reveal in">
            <form className="form-card" id="ppdb-form" onSubmit={handleFormSubmit}>
              <div className="fsec">
                <div className="sh"><span className="n">01</span><h3>Data Pribadi</h3></div>
                <div className="frow">
                  <div className="field">
                    <label>Nama Lengkap <span className="req">*</span></label>
                    <input className="input" placeholder="Sesuai akta" required value={nama} onChange={e => setNama(e.target.value)} />
                  </div>
                  <div className="field">
                    <label>NISN <span className="req">*</span></label>
                    <input className="input" placeholder="10 digit" required value={nisn} onChange={e => setNisn(e.target.value)} maxLength={10} />
                  </div>
                  <PremiumSelect
                    label="Jenis Kelamin"
                    value={jenisKelamin}
                    options={['Laki-laki', 'Perempuan']}
                    onChange={setJenisKelamin}
                    required
                  />
                  <div className="field">
                    <label>Tanggal Lahir <span className="req">*</span></label>
                    <input className="input" type="date" required value={tanggalLahir} onChange={e => setTanggalLahir(e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Tempat Lahir</label>
                    <input className="input" placeholder="Kota kelahiran" value={tempatLahir} onChange={e => setTempatLahir(e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Asal Sekolah <span className="req">*</span></label>
                    <input className="input" placeholder="SMP/MTs asal" required value={asalSekolah} onChange={e => setAsalSekolah(e.target.value)} />
                  </div>
                </div>
                <div className="frow full" style={{ marginTop: '16px' }}>
                  <div className="field">
                    <label>Alamat Lengkap</label>
                    <textarea className="textarea" placeholder="Jalan, RT/RW, kelurahan, kecamatan, kota" value={alamat} onChange={e => setAlamat(e.target.value)}></textarea>
                  </div>
                </div>
              </div>

              <div className="fsec">
                <div className="sh"><span className="n">02</span><h3>Jurusan &amp; Jalur</h3></div>
                <div className="frow">
                  <PremiumSelect
                    label="Jalur"
                    value={jalur}
                    options={['Reguler', 'Prestasi', 'Afirmasi']}
                    onChange={setJalur}
                    required
                  />
                  <PremiumSelect
                    label="Gelombang"
                    value={gelombang}
                    options={['Gelombang 1', 'Gelombang 2', 'Gelombang 3']}
                    onChange={setGelombang}
                    required
                  />
                  <PremiumSelect
                    label="Pilihan Jurusan 1"
                    value={jurusan1}
                    options={[
                      'Teknik Komputer & Jaringan',
                      'Rekayasa Perangkat Lunak',
                      'Multimedia / DKV',
                      'Teknik Elektronika',
                      'Akuntansi'
                    ]}
                    onChange={setJurusan1}
                    required
                  />
                  <PremiumSelect
                    label="Pilihan Jurusan 2"
                    value={jurusan2}
                    options={[
                      'Rekayasa Perangkat Lunak',
                      'Teknik Komputer & Jaringan',
                      'Multimedia / DKV',
                      'Teknik Elektronika',
                      'Akuntansi'
                    ]}
                    onChange={setJurusan2}
                  />
                </div>
              </div>

              <div className="fsec">
                <div className="sh"><span className="n">03</span><h3>Data Orang Tua / Wali</h3></div>
                <div className="frow">
                  <div className="field">
                    <label>Nama Ayah</label>
                    <input className="input" placeholder="Nama ayah" value={namaAyah} onChange={e => setNamaAyah(e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Nama Ibu</label>
                    <input className="input" placeholder="Nama ibu" value={namaIbu} onChange={e => setNamaIbu(e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Pekerjaan Orang Tua</label>
                    <input className="input" placeholder="Mis. Wiraswasta" value={pekerjaanOrtu} onChange={e => setPekerjaanOrtu(e.target.value)} />
                  </div>
                  <div className="field">
                    <label>No. WhatsApp Aktif <span className="req">*</span></label>
                    <input className="input" placeholder="08xx-xxxx-xxxx" required value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="fsec">
                <div className="sh"><span className="n">04</span><h3>Unggah Berkas</h3></div>
                <div className="frow">
                  <div className="upload">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 16V4m0 0 4 4m-4-4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                    <b>Kartu Keluarga</b>
                    <span>PDF / JPG</span>
                  </div>
                  <div className="upload">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 16V4m0 0 4 4m-4-4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" stroke-width="1.8" strokeLinecap="round"/>
                    </svg>
                    <b>Rapor &amp; Ijazah</b>
                    <span>PDF / JPG</span>
                  </div>
                </div>
              </div>

              <label className="agree">
                <input type="checkbox" style={{ marginTop: '3px' }} required checked={agree} onChange={e => setAgree(e.target.checked)} />
                Saya menyatakan data yang diisi benar dan menyetujui ketentuan PPDB SMK Bina Teknologi.
              </label>

              <button type="submit" className="btn btn-amber btn-lg" style={{ width: '100%', marginTop: '22px' }}>
                Kirim Pendaftaran
                <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16, stroke: 'currentColor', strokeWidth: 1.8, strokeLinejoin: 'round' }}>
                  <path d="m22 2-7 20-4-9-9-4z"/>
                </svg>
              </button>
            </form>

            <aside className="aside">
              <h4>Panduan</h4>
              <div className="smini"><span className="d">01</span><div><b>Siapkan berkas</b><span>Scan dokumen dulu</span></div></div>
              <div className="smini"><span className="d">02</span><div><b>Isi formulir</b><span>Sesuai dokumen</span></div></div>
              <div className="smini"><span className="d">03</span><div><b>Simpan no. daftar</b><span>Untuk cek status</span></div></div>
              <a 
                href="https://wa.me/6281221388713?text=Halo%20BikinWebSekolah%2C%20saya%20sedang%20mencoba%20demo%20halaman%20PPDB%20dan%20tertarik%20tanya-tanya%20seputar%20paket%20ini."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-onp btn-sm" 
                style={{ width: '100%', marginTop: '18px', background: 'rgba(241,237,230,.12)' }}
              >
                WhatsApp Panitia (Demo)
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* CEK STATUS */}
      <section className="section" id="status" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="status-box">
            <div className="secnum center"><span className="no">// 07</span><h2>Cek Status Pendaftaran</h2></div>
            <div className="status-in reveal in">
              <input 
                className="input" 
                id="status-no" 
                placeholder="Contoh: PPDB-2026-0432" 
                value={searchNo} 
                onChange={e => setSearchNo(e.target.value)} 
              />
              <button className="btn btn-primary" id="cek-btn" onClick={handleCheckStatus}>Cek Status</button>
            </div>

            {showStatusResult && (
              <div className="status-res show" id="status-res">
                {checkError ? (
                  <div className="status-card" style={{ textAlign: 'center', color: 'var(--maroon)' }}>
                    <b>Nomor pendaftaran tidak ditemukan!</b>
                    <p style={{ margin: '8px 0 0 0', fontSize: '.9rem', color: 'var(--muted)' }}>
                      Pastikan nomor pendaftaran yang Anda masukkan benar (contoh: PPDB-2026-0432).
                    </p>
                  </div>
                ) : checkedApplicant ? (
                  <div className="status-card">
                    <div className="status-head">
                      <span className="av">{getInitials(checkedApplicant.nama)}</span>
                      <div style={{ flex: 1 }}>
                        <b style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.1rem', display: 'block' }}>{checkedApplicant.nama}</b>
                        <span className="mono" style={{ fontSize: '.78rem', color: 'var(--muted)' }}>
                          {checkedApplicant.id} &middot; Jalur {checkedApplicant.jalur}
                        </span>
                      </div>
                      <span className={`badge ${statusMetadata[checkedApplicant.st].cls}`} style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '4px', fontSize: '.76rem', fontWeight: 700 }}>
                        {getStatusText(checkedApplicant.st)}
                      </span>
                    </div>
                    <div className="sgrid">
                      <div className="it"><span>Jurusan</span><b>{checkedApplicant.jur}</b></div>
                      <div className="it"><span>Gelombang</span><b>{checkedApplicant.gel === 'G1' ? 'Gelombang 1' : 'Gelombang 2'}</b></div>
                      <div className="it"><span>Tanggal Daftar</span><b>{checkedApplicant.tgl}</b></div>
                      <div className="it"><span>Asal Sekolah</span><b>{checkedApplicant.asal}</b></div>
                    </div>
                    <div style={{ marginTop: '18px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Space Mono', monospace", fontSize: '.72rem', color: 'var(--ink-2)' }}>
                        <span>PROGRES</span>
                        <span>{getProgressInfo(checkedApplicant.st).stepText}</span>
                      </div>
                      <div className="ptrack">
                        <div className="pfill" style={{ width: getProgressInfo(checkedApplicant.st).percent }}></div>
                      </div>
                      <p className="mono" style={{ fontSize: '.82rem', color: 'var(--muted)', marginTop: '10px' }}>
                        {getProgressInfo(checkedApplicant.st).desc}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="secnum center"><span className="no">// 08</span><h2>Pertanyaan Umum</h2></div>
          <div className="faq reveal in">
            {ppdbFaqs.map((faq, idx) => (
              <div className={`faq-item ${openFaqs[idx] ? 'open' : ''}`} key={idx}>
                <button className="faq-q" onClick={() => toggleFaq(idx)}>
                  {faq.q}
                  <span className="pm">+</span>
                </button>
                <div className="faq-a">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="foot">
        <div className="wrap">
          <div className="grid-f">
            <div>
              <a className="brand" href="#top" onClick={(e) => handleNavClick(e, 'top')}>
                <span className="mk">
                  <svg viewBox="0 0 64 64" fill="currentColor">
                    <path d="M32 6.5 58.5 28 52.5 28 52.5 52.5a3 3 0 0 1-3 3L14.5 55.5a3 3 0 0 1-3-3L11.5 28 5.5 28Z"/>
                    <rect fill="var(--accent, #ff7a45)" x="17.5" y="32.5" width="29" height="17.5" rx="2.6"/>
                    <circle cx="22" cy="37" r="1.3" fill="currentColor"/>
                    <circle cx="26.4" cy="37" r="1.3" fill="currentColor"/>
                    <circle cx="30.8" cy="37" r="1.3" fill="currentColor"/>
                  </svg>
                </span>
                <span className="wm">SMK Bina Teknologi</span>
              </a>
              <p style={{ marginTop: '18px', maxWidth: '300px' }}>Sekolah kejuruan berbasis teknologi, mencetak lulusan siap kerja &amp; berwirausaha.</p>
            </div>
            <div>
              <h4>PPDB</h4>
              <a href="#jalur" onClick={(e) => handleNavClick(e, 'jalur')}>Jalur</a>
              <a href="#alur" onClick={(e) => handleNavClick(e, 'alur')}>Alur</a>
              <a href="#jadwal" onClick={(e) => handleNavClick(e, 'jadwal')}>Jadwal</a>
              <a href="#biaya" onClick={(e) => handleNavClick(e, 'biaya')}>Biaya</a>
              <a href="#daftar" onClick={(e) => handleNavClick(e, 'daftar')}>Daftar</a>
            </div>
            <div>
              <h4>Kontak Panitia</h4>
              <p>Jl. Industri No. 8, Bandung 40234</p>
              <p style={{ marginTop: '8px' }}>0812-0000-1111 (WA)<br/>ppdb@binateknologi.sch.id</p>
            </div>
          </div>
          <div className="copy">
            <span>© 2026 SMK BINA TEKNOLOGI · SISTEM PPDB ONLINE</span>
            <span>DIBUAT DENGAN SEKOLAHKU PPDB</span>
          </div>
        </div>
      </footer>

      {/* SUCCESS MODAL */}
      {successOpen && (
        <div className="success open" id="success">
          <div className="success-bg" onClick={() => setSuccessOpen(false)}></div>
          <div className="success-card">
            <div className="success-ic">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 style={{ fontSize: '1.6rem', marginTop: 0 }}>Pendaftaran Berhasil</h2>
            <p className="muted" style={{ marginTop: '8px' }}>
              Data pendaftaran Anda telah kami terima. Simpan nomor pendaftaran berikut untuk memantau status seleksi.
            </p>
            <div className="regno">
              <span>Nomor Pendaftaran</span>
              <b>{generatedRegNo}</b>
            </div>
            <p style={{ fontSize: '.88rem', color: 'var(--ink-2)' }}>
              Nomor juga dikirim ke WhatsApp Anda. Langkah selanjutnya: tunggu verifikasi panitia.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '22px' }}>
              <a 
                href="#status" 
                className="btn btn-soft" 
                style={{ flex: 1, textDecoration: 'none' }} 
                onClick={(e) => { 
                  setSuccessOpen(false); 
                  setSearchNo(generatedRegNo); 
                  // Trigger search directly
                  const found = applicants.find(a => a.id.toLowerCase() === generatedRegNo.toLowerCase());
                  if (found) {
                    setCheckedApplicant(found);
                    setCheckError(false);
                  } else {
                    // Fallback to newly added student in state database
                    const newlyRegistered: Applicant = {
                      id: generatedRegNo,
                      nama: nama,
                      asal: asalSekolah,
                      jalur: jalur as any,
                      gel: (gelombang === 'Gelombang 1' ? 'G1' : 'G2') as 'G1' | 'G2',
                      jur: jurusan1,
                      tgl: '05 Juni 2026',
                      wa: whatsapp,
                      st: 'baru'
                    };
                    setCheckedApplicant(newlyRegistered);
                    setCheckError(false);
                  }
                  setShowStatusResult(true);
                  handleNavClick(e, 'status'); 
                }}
              >
                Cek Status
              </a>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setSuccessOpen(false)}>Selesai</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PPDBPage;
