import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { proNews, proAgenda, proPrestasi, proTeachers, ppdbFaqs } from '../data/mockData';
import type { NewsItem } from '../data/mockData';
import { getInitials } from '../lib/initials';
import './ProPage.css';

export const ProPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // CMS State: 'loaded' | 'loading' | 'empty'
  const [cmsState, setCmsState] = useState<'loaded' | 'loading' | 'empty'>('loaded');
  
  // Modal State
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  // FAQ accordion state
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  useEffect(() => {
    // Reset theme class on html/body element
    document.documentElement.className = 'theme-pro';
    const oldTitle = document.title;
    document.title = 'MTsN Al-Hikmah Bandung — Portal Resmi Sekolah';

    const handleScroll = () => {
      const nav = document.querySelector('[data-nav]');
      if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 12);
        setScrolled(window.scrollY > 12);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.title = oldTitle;
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 88; // accounting for nav height (64px) + 24px breathing room
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const handleCmsStateChange = (state: 'loaded' | 'loading' | 'empty') => {
    setCmsState(state);
  };

  // Unsplash image ids matched to index
  const newsImages = [
    'photo-1581092160562-40aa08e78837', // lead robotik
    'photo-1517486808906-6ca8b3f04846', // news-2 / galeri-1
    'photo-1524178232363-1fb2b075b655', // news-3 / galeri-2
    'photo-1531545514256-b1400bc00f31', // news-4 / galeri-3
    'photo-1427504494785-3a9ca7044f45', // news-5 / galeri-4
    'photo-1577896851231-70ef18881754'  // news-6 / galeri-5
  ];

  const getImgUrl = (idx: number, width = 600) => {
    const id = newsImages[idx % newsImages.length];
    return `https://images.unsplash.com/${id}?w=${width}&q=80&auto=format&fit=crop`;
  };

  const getCategoryClass = (cat: string) => {
    switch (cat) {
      case 'Prestasi': return 'badge-warn';
      case 'Kegiatan': return 'badge-info';
      case 'Pengumuman': return 'badge-plum';
      default: return 'badge-muted';
    }
  };

  return (
    <div className="pro-page">
      <Link to="/" className="btn btn-soft btn-sm backhub">← Katalog</Link>

      {/* NAV */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} data-nav>
        <div className="wrap">
          <div className="row">
            <a className="brand" href="#beranda" onClick={(e) => handleNavClick(e, 'beranda')}>
              <span className="mk">
                <svg viewBox="0 0 64 64" fill="currentColor">
                  <path d="M32 6.5 58.5 28 52.5 28 52.5 52.5a3 3 0 0 1-3 3L14.5 55.5a3 3 0 0 1-3-3L11.5 28 5.5 28Z"/>
                  <rect fill="var(--accent, #3f7bff)" x="17.5" y="32.5" width="29" height="17.5" rx="2.6"/>
                  <circle cx="22" cy="37" r="1.3" fill="currentColor"/>
                  <circle cx="26.4" cy="37" r="1.3" fill="currentColor"/>
                  <circle cx="30.8" cy="37" r="1.3" fill="currentColor"/>
                </svg>
              </span>
              <span className="wm">Al-Hikmah</span>
            </a>
            <div className="navlinks">
              <a href="#berita" onClick={(e) => handleNavClick(e, 'berita')}>Berita</a>
              <a href="#agenda" onClick={(e) => handleNavClick(e, 'agenda')}>Agenda</a>
              <a href="#prestasi" onClick={(e) => handleNavClick(e, 'prestasi')}>Prestasi</a>
              <a href="#guru" onClick={(e) => handleNavClick(e, 'guru')}>Guru</a>
              <a href="#program" onClick={(e) => handleNavClick(e, 'program')}>Program</a>
              <a href="#galeri" onClick={(e) => handleNavClick(e, 'galeri')}>Galeri</a>
              <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')}>FAQ</a>
            </div>
            <Link to="/ppdb" className="btn btn-accent btn-sm cta">Info PPDB</Link>
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
        <a href="#berita" onClick={(e) => handleNavClick(e, 'berita')}>Berita</a>
        <a href="#agenda" onClick={(e) => handleNavClick(e, 'agenda')}>Agenda</a>
        <a href="#prestasi" onClick={(e) => handleNavClick(e, 'prestasi')}>Prestasi</a>
        <a href="#guru" onClick={(e) => handleNavClick(e, 'guru')}>Guru</a>
        <a href="#program" onClick={(e) => handleNavClick(e, 'program')}>Program</a>
        <a href="#galeri" onClick={(e) => handleNavClick(e, 'galeri')}>Galeri</a>
        <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')}>FAQ</a>
        <Link to="/ppdb">Info PPDB</Link>
      </div>

      {/* MASTHEAD HERO */}
      <header className="mast" id="beranda">
        <div className="wrap" id="top">
          <div className="mast-bar">
            <span className="ed">MTsN Al-Hikmah · Bandung</span>
            <span className="live"><span className="d"></span>Diperbarui via Google Sheet</span>
            <span className="ed">Kamis, 28 Mei 2026</span>
          </div>
          <div className="lead-grid">
            <article className="feat">
              <span className="kick">Berita Utama · Prestasi</span>
              <h1>Tim Robotik Raih Juara 1 Nasional di Jakarta</h1>
              <p className="ex">Siswa kelas XI membawa pulang medali emas pada National Robotic Competition 2026 dengan robot pemilah sampah otomatis berbasis sensor warna.</p>
              <div className="by">
                <button 
                  onClick={() => {
                    const mainNews = proNews.find(n => n.id === 'news-1') || proNews[0];
                    setSelectedNews(mainNews);
                  }}
                  className="btn btn-primary"
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  Baca Selengkapnya
                  <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16, stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                </button>
                <span className="kick">5 menit baca</span>
              </div>
            </article>
            <div className="feat-photo photo tone" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80&auto=format&fit=crop')` }}>
              <span className="tag badge badge-accent">Liputan</span>
            </div>
          </div>
          <div className="latest">
            <a href="#berita" onClick={(e) => handleNavClick(e, 'berita')}>
              <span className="no">01</span>
              <span className="lt">
                <span>Kegiatan · 21 Mei</span>
                <b>Pekan Literasi &amp; Bazar Buku Tingkatkan Minat Baca</b>
              </span>
            </a>
            <a href="#berita" onClick={(e) => handleNavClick(e, 'berita')}>
              <span className="no">02</span>
              <span className="lt">
                <span>Pengumuman · 15 Mei</span>
                <b>Jadwal Ujian Akhir Semester Genap 2025/2026</b>
              </span>
            </a>
            <a href="#berita" onClick={(e) => handleNavClick(e, 'berita')}>
              <span className="no">03</span>
              <span className="lt">
                <span>Prestasi · 2 Mei</span>
                <b>Juara Umum Olimpiade Sains Tingkat Kabupaten</b>
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* BERITA (CMS) */}
      <section className="section" id="berita" style={{ paddingTop: 'clamp(20px,3vw,40px)' }}>
        <div className="wrap">
          <div className="shd reveal in">
            <h2>Berita</h2>
            <span className="cms">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 5h16v14H4z" stroke="currentColor" strokeWidth="1.7"/>
                <path d="M4 9h16M9 9v10" stroke="currentColor" strokeWidth="1.7"/>
              </svg>
              Google Sheet
            </span>
            <span className="ln"></span>
          </div>

          {/* DYNAMIC NEWS GRID */}
          {cmsState === 'loading' && (
            <div className="news-grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="news-card">
                  <div className="sk sk-img" />
                  <div className="pad">
                    <div className="sk sk-line" style={{ width: '30%', marginBottom: '12px' }} />
                    <div className="sk sk-line" style={{ width: '90%', height: '16px', marginBottom: '8px' }} />
                    <div className="sk sk-line" style={{ width: '70%', height: '16px', marginBottom: '14px' }} />
                    <div className="sk sk-line" style={{ width: '40%', height: '10px' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {cmsState === 'empty' && (
            <div className="empty">
              <div className="empty-ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 5h16v14H4z" stroke="currentColor" strokeWidth="1.7"/>
                  <path d="M4 9h16M9 9v10" stroke="currentColor" strokeWidth="1.7"/>
                </svg>
              </div>
              <h3>Belum Ada Berita</h3>
              <p>Data berita kosong atau belum ditambahkan di Google Sheet CMS Anda.</p>
            </div>
          )}

          {cmsState === 'loaded' && (
            <div className="news-grid reveal in">
              {proNews.map((n, idx) => (
                <article key={n.id} className="news-card card-hover">
                  <div className="news-img-wrap" style={{ overflow: 'hidden', aspectRatio: '16/10' }}>
                    <div 
                      className="photo news-img" 
                      style={{ 
                        backgroundImage: `url('${getImgUrl(idx)}')`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center',
                        height: '100%',
                        transition: 'transform 0.4s ease'
                      }}
                    />
                  </div>
                  <div className="pad">
                    <div className="news-meta">
                      <span className={`badge ${getCategoryClass(n.category)}`}>{n.category}</span>
                      <span className="mono" style={{ fontSize: '.78rem', color: 'var(--muted)' }}>{n.date}</span>
                    </div>
                    <h3 className="news-title">{n.title}</h3>
                    <p className="news-excerpt">{n.excerpt}</p>
                    <button 
                      onClick={() => setSelectedNews(n)}
                      className="news-link"
                    >
                      Baca selengkapnya
                      <svg viewBox="0 0 24 24" width="16" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* AGENDA */}
      <section className="section" id="agenda" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="shd reveal in">
            <h2>Agenda</h2>
            <span className="cms">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 5h16v14H4z" stroke="currentColor" strokeWidth="1.7"/>
                <path d="M4 9h16M9 9v10" stroke="currentColor" strokeWidth="1.7"/>
              </svg>
              Google Sheet
            </span>
            <span className="ln"></span>
          </div>
          <div className="agenda-list reveal in">
            {proAgenda.map((item) => (
              <div className="agenda-row" key={item.id}>
                <div className="adate">
                  <b>{item.d}</b>
                  <span>{item.m}</span>
                </div>
                <div className="ainfo">
                  <h3 style={{ margin: 0 }}>{item.title}</h3>
                  <div className="ameta">
                    <span>🕘 {item.time}</span>
                    <span>📍 {item.place}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESTASI */}
      <section className="section" id="prestasi" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="shd reveal in">
            <h2>Prestasi</h2>
            <span className="cms">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 5h16v14H4z" stroke="currentColor" strokeWidth="1.7"/>
                <path d="M4 9h16M9 9v10" stroke="currentColor" strokeWidth="1.7"/>
              </svg>
              Google Sheet
            </span>
            <span className="ln"></span>
          </div>
          <div className="prestasi-grid reveal in">
            {proPrestasi.map((item) => (
              <div className="prestasi-card" key={item.id}>
                <div className="ptrophy">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 2a4 4 0 0 1 4 4v7H8V6a4 4 0 0 1 4-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="kick">{item.tk} &middot; {item.thn}</span>
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GURU */}
      <section className="section" id="guru" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="shd reveal in">
            <h2>Guru</h2>
            <span className="cms">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 5h16v14H4z" stroke="currentColor" strokeWidth="1.7"/>
                <path d="M4 9h16M9 9v10" stroke="currentColor" strokeWidth="1.7"/>
              </svg>
              Google Sheet
            </span>
            <span className="ln"></span>
          </div>
          <div className="guru-grid reveal in">
            {proTeachers.map((teacher) => (
              <div className="guru-card" key={teacher.id}>
                <div className="guru-photo">
                  <span className="mono">{getInitials(teacher.name)}</span>
                </div>
                <div className="pad">
                  <h3>{teacher.name}</h3>
                  <p style={{ margin: 0, fontSize: '.84rem', color: 'var(--muted)' }}>{teacher.role}</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '.8rem', color: 'var(--accent-deep)', fontFamily: "'Space Mono', monospace" }}>{teacher.subject}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM (EKSKUL) */}
      <section className="section" id="program" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="shd reveal in">
            <h2>Ekstrakurikuler</h2>
            <span className="ln"></span>
          </div>
          <div className="ekskul reveal in">
            <span className="chip">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="m12 2 2.4 5 5.6.8-4 4 1 5.6L12 19l-5 2.4 1-5.6-4-4 5.6-.8z" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              Tahfizh
            </span>
            <span className="chip">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              Robotik
            </span>
            <span className="chip">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 17V9m4 8V5m4 12v-6m4 6V8m4 9v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              English Club
            </span>
            <span className="chip">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 3 4 7v6c0 5 8 8 8 8s8-3 8-8V7z" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              Pramuka
            </span>
            <span className="chip">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M12 3v18" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              Futsal
            </span>
            <span className="chip">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.6"/>
                <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              Marawis
            </span>
            <span className="chip">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              Jurnalistik
            </span>
            <span className="chip">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2a7 7 0 0 0-4 13v3h8v-3a7 7 0 0 0-4-13Z" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              KIR Sains
            </span>
            <span className="chip">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M3 12h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              Kaligrafi
            </span>
          </div>
        </div>
      </section>

      {/* GALERI */}
      <section className="section" id="galeri" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="shd reveal in">
            <h2>Galeri</h2>
            <span className="cms">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 5h16v14H4z" stroke="currentColor" strokeWidth="1.7"/>
                <path d="M4 9h16M9 9v10" stroke="currentColor" strokeWidth="1.7"/>
              </svg>
              Google Sheet
            </span>
            <span className="ln"></span>
          </div>
          <div className="gallery2 reveal in">
            <div className="g photo tone wide tall" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80&auto=format&fit=crop')" }}>
              <div className="cap">
                <span className="badge badge-accent">Kegiatan</span>
              </div>
            </div>
            <div className="g photo" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&q=80&auto=format&fit=crop')" }}></div>
            <div className="g photo" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=500&q=80&auto=format&fit=crop')" }}></div>
            <div className="g photo" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&q=80&auto=format&fit=crop')" }}></div>
            <div className="g photo tone wide" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80&auto=format&fit=crop')" }}>
              <div className="cap">
                <span className="badge badge-accent">Wisuda</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PPDB BAND */}
      <section className="section" id="ppdb" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="ppdb-band reveal in">
            <div>
              <span className="kick" style={{ color: 'var(--accent)' }}>PPDB 2026/2027</span>
              <h2 style={{ marginTop: '12px' }}>Penerimaan Peserta Didik Baru Telah Dibuka</h2>
              <p style={{ marginTop: '10px', maxWidth: '520px' }}>Daftarkan putra-putri Anda sekarang. Kuota terbatas untuk setiap gelombang pendaftaran.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/ppdb" className="btn btn-accent btn-lg">
                Info &amp; Daftar PPDB
                <svg viewBox="0 0 24 24" fill="none" style={{ display: 'inline-block', width: 16, height: 16, marginLeft: 6, stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </Link>
              <a href="#" className="btn btn-ghost btn-lg" style={{ color: '#fff', borderColor: 'var(--on-ink-line)' }} onClick={(e) => e.preventDefault()}>Unduh Brosur</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="shd reveal in" style={{ justifyContent: 'center' }}>
            <h2>Tanya Jawab</h2>
          </div>
          <div className="faq reveal in">
            {ppdbFaqs.map((faq, idx) => (
              <div className={`faq-item ${openFaqs[idx] ? 'open' : ''}`} key={idx}>
                <button 
                  className="faq-q" 
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openFaqs[idx] ? 'true' : 'false'}
                >
                  {faq.q}
                  <span className="pm">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    <p>{faq.a}</p>
                  </div>
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
                    <rect fill="var(--accent, #3f7bff)" x="17.5" y="32.5" width="29" height="17.5" rx="2.6"/>
                    <circle cx="22" cy="37" r="1.3" fill="currentColor"/>
                    <circle cx="26.4" cy="37" r="1.3" fill="currentColor"/>
                    <circle cx="30.8" cy="37" r="1.3" fill="currentColor"/>
                  </svg>
                </span>
                <span className="wm">Al-Hikmah</span>
              </a>
              <p style={{ marginTop: '18px', fontSize: '.92rem', maxWidth: '300px' }}>Madrasah modern berbasis teknologi dengan nilai-nilai Qur'ani.</p>
            </div>
            <div>
              <h4>Menu</h4>
              <a href="#berita" onClick={(e) => handleNavClick(e, 'berita')}>Berita</a>
              <a href="#agenda" onClick={(e) => handleNavClick(e, 'agenda')}>Agenda</a>
              <a href="#prestasi" onClick={(e) => handleNavClick(e, 'prestasi')}>Prestasi</a>
              <a href="#galeri" onClick={(e) => handleNavClick(e, 'galeri')}>Galeri</a>
            </div>
            <div>
              <h4>Informasi</h4>
              <a href="#guru" onClick={(e) => handleNavClick(e, 'guru')}>Guru &amp; Staff</a>
              <a href="#program" onClick={(e) => handleNavClick(e, 'program')}>Program</a>
              <Link to="/ppdb">PPDB</Link>
              <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')}>FAQ</a>
            </div>
            <div>
              <h4>Kontak</h4>
              <p style={{ fontSize: '.92rem' }}>Jl. Pesantren No. 12, Bandung 40123</p>
              <p style={{ fontSize: '.92rem', marginTop: '8px' }}>(022) 555-1234<br/>info@alhikmah.sch.id</p>
            </div>
          </div>
          <div className="copy">
            <span>© 2026 MTsN AL-HIKMAH · DIKELOLA VIA GOOGLE SHEET</span>
            <span>DIBUAT DENGAN SEKOLAHKU PRO</span>
          </div>
        </div>
      </footer>

      {/* FLOATING DEMO CONTROL CENTER */}
      <div className="demo-control-center">
        <div className="dc-header">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 5h16v14H4z" stroke="currentColor" strokeWidth="1.7"/>
            <path d="M4 9h16M9 9v10" stroke="currentColor" strokeWidth="1.7"/>
          </svg>
          <span>CMS PREVIEW SYSTEM</span>
        </div>
        <div className="dc-buttons">
          <button 
            onClick={() => handleCmsStateChange('loaded')} 
            className={cmsState === 'loaded' ? 'active' : ''}
            title="Tampilkan data berita lengkap dari Google Sheet"
          >
            DATA OK
          </button>
          <button 
            onClick={() => handleCmsStateChange('loading')} 
            className={cmsState === 'loading' ? 'active' : ''}
            title="Tampilkan skeleton loading state"
          >
            LOADING
          </button>
          <button 
            onClick={() => handleCmsStateChange('empty')} 
            className={cmsState === 'empty' ? 'active' : ''}
            title="Tampilkan empty state ketika data sheet kosong"
          >
            KOSONG
          </button>
        </div>
      </div>

      {/* DETAIL NEWS MODAL */}
      {selectedNews && (
        <div className="modal open" id="news-modal">
          <div className="modal-bg" onClick={() => setSelectedNews(null)}></div>
          <article className="modal-card">
            <div 
              className="modal-hero photo" 
              style={{ backgroundImage: `url('${getImgUrl(proNews.indexOf(selectedNews))}')` }}
            />
            <button className="modal-close" onClick={() => setSelectedNews(null)} aria-label="Tutup">
              <svg viewBox="0 0 24 24" width="18" fill="none">
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="modal-body">
              <div className="news-meta">
                <span className={`badge ${getCategoryClass(selectedNews.category)}`}>{selectedNews.category}</span>
                <span className="mono" style={{ fontSize: '.78rem', color: 'var(--muted)' }}>{selectedNews.date}</span>
              </div>
              <h2>{selectedNews.title}</h2>
              <p style={{ whiteSpace: 'pre-line' }}>{selectedNews.content}</p>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};

export default ProPage;
