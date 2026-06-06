import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './StartPage.css';

export const StartPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Reset theme class on html/body element
    document.documentElement.className = 'theme-starter';
    const oldTitle = document.title;
    document.title = 'SMAS Cendekia Bangsa — Profil Sekolah';

    const handleScroll = () => {
      const nav = document.querySelector('[data-nav]');
      if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 12);
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
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="start-page">
      <Link to="/" className="btn btn-soft btn-sm backhub">← Katalog</Link>

      {/* NAV */}
      <nav className="nav" data-nav>
        <div className="wrap">
          <div className="row">
            <a className="brand" href="#top" onClick={(e) => handleNavClick(e, 'top')}>
              <span className="crest">
                <svg viewBox="0 0 64 64" fill="currentColor">
                  <path d="M32 6.5 58.5 28 52.5 28 52.5 52.5a3 3 0 0 1-3 3L14.5 55.5a3 3 0 0 1-3-3L11.5 28 5.5 28Z"/>
                  <rect fill="var(--accent, #c8f250)" x="17.5" y="32.5" width="29" height="17.5" rx="2.6"/>
                  <circle cx="22" cy="37" r="1.3" fill="currentColor"/>
                  <circle cx="26.4" cy="37" r="1.3" fill="currentColor"/>
                  <circle cx="30.8" cy="37" r="1.3" fill="currentColor"/>
                </svg>
              </span>
              <span className="wm">Cendekia Bangsa<small>SMA · Akreditasi A</small></span>
            </a>
            <div className="navlinks">
              <a href="#profil" onClick={(e) => handleNavClick(e, 'profil')}>Profil</a>
              <a href="#visimisi" onClick={(e) => handleNavClick(e, 'visimisi')}>Visi &amp; Misi</a>
              <a href="#program" onClick={(e) => handleNavClick(e, 'program')}>Program</a>
              <a href="#fasilitas" onClick={(e) => handleNavClick(e, 'fasilitas')}>Fasilitas</a>
              <a href="#galeri" onClick={(e) => handleNavClick(e, 'galeri')}>Galeri</a>
              <a href="#kontak" onClick={(e) => handleNavClick(e, 'kontak')}>Kontak</a>
            </div>
            <a href="#kontak" onClick={(e) => handleNavClick(e, 'kontak')} className="btn btn-accent btn-sm cta">Hubungi Kami</a>
            <button 
              className={`menu-btn ${mobileMenuOpen ? 'active' : ''}`} 
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
        <a href="#profil" onClick={(e) => handleNavClick(e, 'profil')}>Profil</a>
        <a href="#visimisi" onClick={(e) => handleNavClick(e, 'visimisi')}>Visi &amp; Misi</a>
        <a href="#program" onClick={(e) => handleNavClick(e, 'program')}>Program</a>
        <a href="#fasilitas" onClick={(e) => handleNavClick(e, 'fasilitas')}>Fasilitas</a>
        <a href="#galeri" onClick={(e) => handleNavClick(e, 'galeri')}>Galeri</a>
        <a href="#kontak" onClick={(e) => handleNavClick(e, 'kontak')}>Kontak</a>
      </div>

      {/* HERO */}
      <header className="hero" id="top">
        <div className="wrap">
          <div className="toprule">
            <span className="kick">SMAS Cendekia Bangsa</span>
            <span className="kick"><span className="g">●</span> Est. 1998 — Terakreditasi A</span>
          </div>
          <div className="hero-grid">
            <div className="reveal in">
              <h1>Pendidikan yang <em>membentuk</em> pemimpin masa depan.</h1>
              <p className="lead">Memadukan keunggulan akademik, karakter mulia, dan keterampilan abad 21 dalam lingkungan belajar yang menumbuhkan.</p>
              <div className="cta-row">
                <a href="#profil" onClick={(e) => handleNavClick(e, 'profil')} className="btn btn-accent btn-lg">
                  Telusuri Profil
                  <svg viewBox="0 0 24 24" fill="none" style={{ display: 'inline-block', width: 18, height: 18, marginLeft: 6, verticalAlign: 'middle' }}>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#kontak" onClick={(e) => handleNavClick(e, 'kontak')} className="btn btn-ghost btn-lg">Jadwalkan Kunjungan</a>
              </div>
            </div>
            <aside className="hero-side">
              <div className="portrait reveal in" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=700&q=80&auto=format&fit=crop')" }}>
                <div className="pc"><span className="kick">Wisuda Angkatan 2025</span></div>
              </div>
              <div className="hstats">
                <div className="s"><b>1.250+</b><span>Siswa Aktif</span></div>
                <div className="s"><b>98%</b><span>Lulus PTN/PTS</span></div>
                <div className="s"><b>27</b><span>Tahun</span></div>
                <div className="s"><b>120+</b><span>Prestasi</span></div>
              </div>
            </aside>
          </div>
        </div>
      </header>

      {/* SAMBUTAN */}
      <section className="section" id="profil" style={{ paddingTop: 'clamp(28px,4vw,52px)' }}>
        <div className="wrap">
          <div className="secnum"><span className="no">01</span><h2>Sambutan</h2><span className="meta">Kepala Sekolah</span></div>
          <div className="welcome">
            <div className="pf reveal in" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=80&auto=format&fit=crop')" }}>
              <div className="pc"><b>Dr. H. Ahmad Fauzi, M.Pd.</b><span>Kepala Sekolah</span></div>
            </div>
            <div className="reveal in">
              <p className="quote"><span className="dq">“</span>Kami membimbing setiap siswa tumbuh menjadi pribadi yang berilmu, berkarakter, dan siap menghadapi masa depan dengan percaya diri.<span className="dq">”</span></p>
              <p style={{ marginTop: 22, color: 'var(--ink-2)' }}>Dengan dukungan tenaga pendidik profesional dan lingkungan belajar yang kondusif, kami percaya setiap anak memiliki potensi luar biasa yang layak dikembangkan sepenuhnya. Terima kasih atas kepercayaan Bapak/Ibu kepada sekolah kami.</p>
              <div className="sign"><div className="nm">Ahmad Fauzi</div><div className="ro">Kepala SMAS Cendekia Bangsa</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* VISI MISI */}
      <section className="section" id="visimisi" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="secnum"><span className="no">02</span><h2>Visi &amp; Misi</h2><span className="meta">Arah &amp; Tujuan</span></div>
          <div className="vm">
            <div className="visi reveal in">
              <span className="kick">Visi</span>
              <p className="big">Terwujudnya generasi yang beriman, berilmu, <em>berakhlak mulia</em>, dan berdaya saing global.</p>
            </div>
            <div className="reveal in">
              <span className="kick" style={{ color: 'var(--gold)' }}>Misi</span>
              <ul className="misi">
                <li><span className="n">01</span><p>Menyelenggarakan pembelajaran aktif, inovatif, dan menyenangkan berbasis teknologi.</p></li>
                <li><span className="n">02</span><p>Membina karakter religius, disiplin, dan kepedulian sosial siswa.</p></li>
                <li><span className="n">03</span><p>Mengembangkan bakat dan minat melalui kegiatan ekstrakurikuler unggulan.</p></li>
                <li><span className="n">04</span><p>Meningkatkan profesionalitas tenaga pendidik secara berkelanjutan.</p></li>
                <li><span className="n">05</span><p>Membangun kemitraan dengan orang tua dan masyarakat untuk kemajuan sekolah.</p></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM */}
      <section className="section" id="program" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="secnum"><span className="no">03</span><h2>Program Unggulan</h2><span className="meta">Keunggulan Kami</span></div>
          <div className="prog">
            <div className="p reveal in">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 3 2 8l10 5 8-4v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 11.5V16c0 1.1 2.7 2.5 6 2.5s6-1.4 6-2.5v-4.5" stroke="currentColor" strokeWidth="1.7"/>
                </svg>
              </span>
              <span className="no">A1</span>
              <h3>Kelas Unggulan Sains</h3>
              <p>Pendalaman MIPA dengan pembimbingan olimpiade dan laboratorium modern.</p>
            </div>
            <div className="p reveal in">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M3 12h18M3 18h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="no">A2</span>
              <h3>Tahfizh &amp; Karakter</h3>
              <p>Program hafalan Al-Qur'an dan pembinaan akhlak terintegrasi harian.</p>
            </div>
            <div className="p reveal in">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 17V9m4 8V5m4 12v-6m4 6V8m4 9v-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="no">A3</span>
              <h3>Literasi Digital</h3>
              <p>Pembelajaran coding, desain, dan keterampilan teknologi abad 21.</p>
            </div>
            <div className="p reveal in">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7"/>
                  <path d="M12 2v2M12 20v2M4 12H2M22 12h-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="no">A4</span>
              <h3>Bahasa Internasional</h3>
              <p>Pengayaan Inggris &amp; Arab dengan native speaker dan klub bahasa.</p>
            </div>
            <div className="p reveal in">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 2 4 6v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V6z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
                  <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="no">A5</span>
              <h3>Pembinaan Prestasi</h3>
              <p>Pendampingan lomba akademik, olahraga, dan seni hingga tingkat nasional.</p>
            </div>
            <div className="p reveal in">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="no">A6</span>
              <h3>Konseling &amp; Karier</h3>
              <p>Bimbingan studi lanjut dan perencanaan karier untuk setiap siswa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FASILITAS */}
      <section className="section" id="fasilitas" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="secnum"><span className="no">04</span><h2>Fasilitas</h2><span className="meta">Sarana &amp; Prasarana</span></div>
          <div className="fac reveal in">
            <div className="f">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 19V5a1 1 0 0 1 1-1h6v15H5a1 1 0 0 1-1-1ZM13 4h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-6z" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
              </span>
              <b>Perpustakaan</b>
              <span>01</span>
            </div>
            <div className="f">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 3v6l-4 8a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-4-8V3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                </svg>
              </span>
              <b>Lab IPA &amp; Komputer</b>
              <span>02</span>
            </div>
            <div className="f">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 21h18M6 21V8l6-4 6 4v13" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                </svg>
              </span>
              <b>Masjid Sekolah</b>
              <span>03</span>
            </div>
            <div className="f">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
              </span>
              <b>Lapangan Olahraga</b>
              <span>04</span>
            </div>
            <div className="f">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
              </span>
              <b>Kelas Multimedia</b>
              <span>05</span>
            </div>
            <div className="f">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M19 14c0 4-7 7-7 7s-7-3-7-7a7 7 0 0 1 14 0Z" stroke="currentColor" strokeWidth="1.6"/>
                  <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
              </span>
              <b>UKS &amp; Klinik</b>
              <span>06</span>
            </div>
            <div className="f">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 11h16M6 11V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4M5 11v6m14-6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </span>
              <b>Asrama Boarding</b>
              <span>07</span>
            </div>
            <div className="f">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="6" width="18" height="12" rx="1" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
              </span>
              <b>Kantin Sehat</b>
              <span>08</span>
            </div>
          </div>
        </div>
      </section>

      {/* GALERI */}
      <section className="section" id="galeri" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="secnum"><span className="no">05</span><h2>Galeri</h2><span className="meta">Dokumentasi Kegiatan</span></div>
          <div className="gallery reveal in">
            <div className="g photo tone wide tall" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80&auto=format&fit=crop')" }}>
              <div className="cap"><span className="kick" style={{ color: '#fff' }}>Kegiatan Sekolah</span></div>
            </div>
            <div className="g photo" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80&auto=format&fit=crop')" }}></div>
            <div className="g photo" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=500&q=80&auto=format&fit=crop')" }}></div>
            <div className="g photo" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&q=80&auto=format&fit=crop')" }}></div>
            <div className="g photo tone wide" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80&auto=format&fit=crop')" }}>
              <div className="cap"><span className="kick" style={{ color: '#fff' }}>Pembelajaran</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* KONTAK */}
      <section className="section" id="kontak" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="secnum"><span className="no">06</span><h2>Kontak</h2><span className="meta">Lokasi &amp; Informasi</span></div>
          <div className="contact">
            <div className="reveal in">
              <div className="inforow">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M19 14c0 4-7 7-7 7s-7-3-7-7a7 7 0 0 1 14 0Z" stroke="currentColor" strokeWidth="1.6"/>
                    <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
                  </svg>
                </span>
                <div><b>Alamat</b><span>Jl. Pendidikan No. 45, Cibadak, Kab. Sukabumi, Jawa Barat 43351</span></div>
              </div>
              <div className="inforow">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M4 5a2 2 0 0 1 2-2h2l2 5-2 1c1 2 3 4 5 5l1-2 5 2v2a2 2 0 0 1-2 2A16 16 0 0 1 4 7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                  </svg>
                </span>
                <div><b>Telepon / WhatsApp</b><span>(0266) 123-456 · 0812-3456-7890</span></div>
              </div>
              <div className="inforow">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                  </svg>
                </span>
                <div><b>Email</b><span>info@cendekiabangsa.sch.id</span></div>
              </div>
              <div className="inforow">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </span>
                <div><b>Jam Operasional</b><span>Senin–Jumat, 07.00 – 16.00 WIB</span></div>
              </div>
            </div>
            <div className="map reveal in">
              <div className="grid-bg"></div>
              <div className="pin"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg></div>
              <div className="ml">SMAS CENDEKIA BANGSA · -6.92, 106.78</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="foot">
        <div className="wrap">
          <div className="grid-f">
            <div>
              <a className="brand" href="#top" onClick={(e) => handleNavClick(e, 'top')}>
                <span className="crest">
                  <svg viewBox="0 0 64 64" fill="currentColor">
                    <path d="M32 6.5 58.5 28 52.5 28 52.5 52.5a3 3 0 0 1-3 3L14.5 55.5a3 3 0 0 1-3-3L11.5 28 5.5 28Z"/>
                    <rect fill="var(--accent, #c8f250)" x="17.5" y="32.5" width="29" height="17.5" rx="2.6"/>
                    <circle cx="22" cy="37" r="1.3" fill="currentColor"/>
                    <circle cx="26.4" cy="37" r="1.3" fill="currentColor"/>
                    <circle cx="30.8" cy="37" r="1.3" fill="currentColor"/>
                  </svg>
                </span>
                <span className="wm">Cendekia Bangsa</span>
              </a>
              <p style={{ marginTop: 18, fontSize: '.92rem', maxWidth: '300px' }}>Membentuk generasi cerdas, berakhlak, dan berprestasi sejak 1998.</p>
            </div>
            <div>
              <h4>Tautan</h4>
              <a href="#profil" onClick={(e) => handleNavClick(e, 'profil')}>Profil</a>
              <a href="#visimisi" onClick={(e) => handleNavClick(e, 'visimisi')}>Visi &amp; Misi</a>
              <a href="#program" onClick={(e) => handleNavClick(e, 'program')}>Program</a>
              <a href="#fasilitas" onClick={(e) => handleNavClick(e, 'fasilitas')}>Fasilitas</a>
            </div>
            <div>
              <h4>Informasi</h4>
              <a href="#galeri" onClick={(e) => handleNavClick(e, 'galeri')}>Galeri</a>
              <a href="#kontak" onClick={(e) => handleNavClick(e, 'kontak')}>Kontak</a>
              <span className="block py-1 text-[var(--muted)] text-[0.92rem] cursor-not-allowed" style={{ opacity: 0.5, display: 'block', padding: '5px 0' }}>PPDB (Pro/PPDB)</span>
              <span className="block py-1 text-[var(--muted)] text-[0.92rem] cursor-not-allowed" style={{ opacity: 0.5, display: 'block', padding: '5px 0' }}>Berita (Pro/PPDB)</span>
            </div>
            <div>
              <h4>Alamat</h4>
              <p style={{ fontSize: '.92rem' }}>Jl. Pendidikan No. 45, Cibadak, Kab. Sukabumi, Jawa Barat 43351</p>
              <p style={{ fontSize: '.92rem', marginTop: 8 }}>(0266) 123-456<br/>info@cendekiabangsa.sch.id</p>
            </div>
          </div>
          <div className="copy">
            <span>© 2026 SMAS CENDEKIA BANGSA</span>
            <span>DIBUAT DENGAN SEKOLAHKU STARTER</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StartPage;
