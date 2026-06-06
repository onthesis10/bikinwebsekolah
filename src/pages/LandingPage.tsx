import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { packages, businessFaqs } from '../data/mockData';

/* ====== Check icon for feature lists ====== */
const Check = () => (
  <svg viewBox="0 0 24 24" fill="none"><path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ display: 'inline-block', flexShrink: 0, marginLeft: 6, verticalAlign: 'middle' }}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const StartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
    <line x1="2" y1="9" x2="22" y2="9" />
    <circle cx="6" cy="6" r="1" />
    <circle cx="10" cy="6" r="1" />
    <circle cx="14" cy="6" r="1" />
  </svg>
);

const ProIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M21 9H3M21 15H3M12 3v18" />
  </svg>
);

const PpdbIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const getPackageIcon = (id: string) => {
  if (id === 'start') return <StartIcon />;
  if (id === 'pro') return <ProIcon />;
  return <PpdbIcon />;
};

const floatsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.6
    }
  }
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
} as const;

const HERO_PHOTOS = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80&auto=format&fit=crop", // modern campus hall
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1400&q=80&auto=format&fit=crop", // student seminar/collaboration
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1400&q=80&auto=format&fit=crop", // teacher / classroom active discussion
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1400&q=80&auto=format&fit=crop"  // slick modern technology/web design workspace
];

const ConstellationCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 40;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulseSpeed: number;
      pulsePhase: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.8 + 0.8,
        pulseSpeed: 0.015 + Math.random() * 0.025,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.pulsePhase += p.pulseSpeed;
        const glow = 0.4 + Math.sin(p.pulsePhase) * 0.4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (1 + glow * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 242, 80, ${0.25 + glow * 0.4})`;
        ctx.fill();

        if (glow > 0.6) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 242, 80, ${0.04 * (glow - 0.6)})`;
          ctx.fill();
        }
      });

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 120;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(200, 242, 80, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70"
    />
  );
};

export const LandingPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSgTheme, setActiveSgTheme] = useState<'academy' | 'pro' | 'ppdb' | 'custom'>('academy');
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % HERO_PHOTOS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.documentElement.className = 'theme-academy';

    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };



  return (
    <div style={{ minHeight: '100vh' }}>
      {/* ============ NAV ============ */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} data-nav>
        <div className="wrap">
          <div className="bar">
            <Link to="/" className="brand">
              <span className="mark">
                <svg viewBox="0 0 64 64" fill="currentColor">
                  <path d="M32 6.5 58.5 28 52.5 28 52.5 52.5a3 3 0 0 1-3 3L14.5 55.5a3 3 0 0 1-3-3L11.5 28 5.5 28Z"/>
                  <rect fill="var(--acc, var(--accent, #c8f250))" x="17.5" y="32.5" width="29" height="17.5" rx="2.6"/>
                  <circle cx="22" cy="37" r="1.3" fill="currentColor"/>
                  <circle cx="26.4" cy="37" r="1.3" fill="currentColor"/>
                  <circle cx="30.8" cy="37" r="1.3" fill="currentColor"/>
                </svg>
              </span>
              <span className="wm">bikinweb<b>sekolah</b><i>.web.id</i></span>
            </Link>
            <div className="links">
              <a href="#paket">Paket</a>
              <a href="#demo">Demo</a>
              <a href="#arah">Arah Desain</a>
              <a href="#style">Style</a>
              <a href="#banding">Banding</a>
            </div>
            <a href="#demo" className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }}>Lihat Demo</a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-icon"
              aria-label="Menu"
              style={{
                display: 'none',
                background: 'transparent',
                border: 'none',
                marginLeft: 'auto',
              }}
              id="mobile-menu-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" style={{ width: 20, height: 20 }}>
                {mobileMenuOpen ? (
                  <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#paket" onClick={() => setMobileMenuOpen(false)}>Paket</a>
        <a href="#demo" onClick={() => setMobileMenuOpen(false)}>Demo</a>
        <a href="#arah" onClick={() => setMobileMenuOpen(false)}>Arah Desain</a>
        <a href="#style" onClick={() => setMobileMenuOpen(false)}>Style</a>
        <a href="#banding" onClick={() => setMobileMenuOpen(false)}>Banding</a>
        <a href="https://wa.me/6281221388713?text=Halo%20BikinWebSekolah!%20%F0%9F%91%8B%20Saya%20tertarik%20tanya-tanya%20seputar%20jasa%20pembuatan%20website%20sekolah%20nih.%20Boleh%20minta%20infonya%3F%20%F0%9F%9A%80" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ marginTop: 12 }}>
          Hubungi Kami
        </a>
      </div>

      {/* ============ HERO ============ */}
      <header className="section" id="top" style={{ paddingTop: 'clamp(20px,3vw,36px)' }}>
        <div className="wrap">
          <div className="imm">
            {/* Smooth Cinematic Photo Slideshow */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-neutral-950">
              <AnimatePresence initial={false}>
                <motion.div
                  key={photoIndex}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0, scale: 1.0 }}
                  animate={{ opacity: 1, scale: 1.05 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 1.5, ease: "easeInOut" },
                    scale: { duration: 5.2, ease: "linear" }
                  }}
                  style={{
                    backgroundImage: `url('${HERO_PHOTOS[photoIndex]}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    pointerEvents: 'none'
                  }}
                />
              </AnimatePresence>
            </div>

            {/* Glowing Lime Constellation Overlay */}
            <ConstellationCanvas />

            {/* Progress ring with subtle slow rotation and hover scale */}
            <motion.span 
              className="progress-ring" 
              style={{ '--p': 78 } as React.CSSProperties}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <motion.span 
                className="dial" 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              />
              <span className="hole">
                <b>30+</b>
                <span>Section</span>
              </span>
            </motion.span>

            <div className="imm-pad">
              <div className="imm-head">
                <motion.span 
                  className="eyebrow"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  3 Template · Satu Design System
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                >
                  Website sekolah<br/>yang <span className="hl">berkelas.</span>
                </motion.h1>
                <motion.p 
                  className="sub"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                >
                  Dari profil sekolah elegan sampai sistem PPDB online dengan dashboard panitia — satu bahasa desain, tinggal ganti logo &amp; warna.
                </motion.p>
                <motion.div 
                  className="cta-row"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
                >
                  <a href="#paket" className="btn btn-accent btn-lg">
                    Jelajahi 3 Paket <Arrow />
                  </a>
                  <a href="#demo" className="btn btn-on-ink btn-lg">Buka Prototype</a>
                </motion.div>
              </div>

              {/* Floating glass cards with stagger entrance animation and hover effects */}
              <motion.div 
                className="floats"
                variants={floatsContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div className="gcard accent lift" variants={cardVariants} whileHover={{ y: -4, scale: 1.02 }}><span className="lbl">Mulai dari</span><b>Rp 999rb</b></motion.div>
                <motion.div className="gcard solid" variants={cardVariants} whileHover={{ y: -4, scale: 1.02 }}><span className="lbl">Tingkat 2 · Premium</span><b>CMS Google Sheet</b></motion.div>
                <motion.div className="gcard lift" variants={cardVariants} whileHover={{ y: -4, scale: 1.02 }}><span className="lbl">Tingkat 3 · Komersial</span><b>PPDB + Dashboard</b></motion.div>
                <motion.div className="gcard" variants={cardVariants} whileHover={{ y: -4, scale: 1.02 }}><span className="lbl">Kualitas</span><b>100% Responsive</b></motion.div>
              </motion.div>
            </div>
          </div>

          {/* MARQUEE */}
          <div className="marq" aria-hidden="true">
            <div className="row">
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  <span className="it">SD</span><span className="it">SMP</span><span className="it">SMA</span>
                  <span className="it">SMK</span><span className="it">MA</span><span className="it">MTs</span>
                  <span className="it">Pesantren</span><span className="it">Madrasah</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ============ PACKAGES ============ */}
      <section className="section" id="paket">
        <div className="wrap">
          <div className="shead reveal">
            <div className="tt">
              <span className="idx">/ 01 — Positioning &amp; Harga</span>
              <h2>Satu value ladder,<br/>tiga titik harga.</h2>
            </div>
            <p className="lead" style={{ maxWidth: 340 }}>
              Pilih tingkat layanan yang sesuai dengan kebutuhan sekolah Anda — dari profil sederhana hingga sistem pendaftaran terintegrasi. Seluruh desain dapat disesuaikan 100% mengikuti referensi visual pilihan klien.
            </p>
          </div>

          <div className="ladder">
            {packages.map((pkg) => {
              const themeClass = pkg.id === 'start' ? 'theme-academy' : pkg.id === 'pro' ? 'theme-pro' : 'theme-ppdb';
              const isFeatured = pkg.id === 'pro';
              const tierLabel = pkg.id === 'start' ? 'Tingkat 1 · Entry' : pkg.id === 'pro' ? 'Tingkat 2 · Premium' : 'Tingkat 3 · Komersial';

              return (
                <article
                  key={pkg.id}
                  className={`pkg card-hover ${themeClass} ${isFeatured ? 'featured' : ''} reveal`}
                >
                  {isFeatured && (
                    <span className="ribbon badge badge-accent">Paling Laris</span>
                  )}
                  
                  <div className="pkg-header-visual">
                    {getPackageIcon(pkg.id)}
                  </div>

                  <span className="tier">{tierLabel}</span>
                  <h3>{pkg.name}</h3>
                  <p className="pos">{pkg.description}</p>
                  <div className="price">
                    <b>{pkg.price}</b>
                    <span style={{ fontSize: '.84rem', color: 'var(--muted)', marginLeft: 4 }}>/ pembuatan</span>
                  </div>
                  <p className="sub">Normal: {pkg.normalPrice} · Ops: {pkg.annualOps}</p>
                  <ul>
                    {pkg.features.map((feat, fi) => (
                      <li key={fi}><Check />{feat}</li>
                    ))}
                  </ul>
                  <div className="foot">
                    <Link
                      to={pkg.href}
                      className={`btn ${isFeatured ? 'btn-accent' : 'btn-soft'}`}
                      style={{ width: '100%' }}
                    >
                      {pkg.cta}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Pricing Summary Table */}
          <div className="matrix-wrap reveal" style={{ marginTop: 48, overflowX: 'auto' }}>
            <table className="matrix" style={{ minWidth: 700 }}>
              <thead>
                <tr>
                  <th>Paket</th>
                  <th style={{ textAlign: 'right' }}>Harga Normal</th>
                  <th style={{ textAlign: 'right' }}>Promo Launching</th>
                  <th>Sistem Pembayaran</th>
                  <th style={{ textAlign: 'right' }}>Operasional Tahunan</th>
                  <th>Cocok Untuk</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg) => (
                  <tr key={pkg.id}>
                    <td className="feat">{pkg.name}</td>
                    <td style={{ textAlign: 'right', color: 'var(--muted)', textDecoration: 'line-through' }}>{pkg.normalPrice}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--accent-deep)' }}>{pkg.price}</td>
                    <td>{pkg.paymentSys}</td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>{pkg.annualOps}</td>
                    <td style={{ color: 'var(--ink-2)' }}>{pkg.suitableFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Annual Operational Explanation Notice & Marketing Callout */}
          <div className="pricing-notice reveal">
            <div className="pricing-notice-marketing">
              <span className="badge badge-brand">Sistem Pembayaran</span>
              <blockquote>
                "Bayar pembuatan sekali. Operasional tahunan opsional hanya jika website ingin tetap aktif. Tidak ada biaya bulanan."
              </blockquote>
              <p>
                Platform kami adil dan transparan. Tidak ada komitmen tagihan wajib per bulan. Anda membayar jasa di awal, lalu perpanjangan server/domain di tahun-tahun berikutnya bersifat opsional penuh.
              </p>
            </div>
            <div className="pricing-ops-table-wrap">
              <table className="pricing-ops-table">
                <thead>
                  <tr>
                    <th>Komponen</th>
                    <th>Penjelasan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Sifat biaya</b></td>
                    <td>Opsional, hanya dibayar jika website ingin tetap aktif di tahun berikutnya</td>
                  </tr>
                  <tr>
                    <td><b>Mencakup</b></td>
                    <td>Domain (.sch.id), cloud hosting/server, SSL, backup mingguan, dan pemeliharaan teknis ringan</td>
                  </tr>
                  <tr>
                    <td><b>Tidak ada biaya bulanan</b></td>
                    <td>Klien cukup bayar sekali untuk pembuatan, lalu perpanjangan tahunan jika ingin website tetap aktif</td>
                  </tr>
                  <tr>
                    <td><b>Jika tidak diperpanjang</b></td>
                    <td>Website/domain bisa nonaktif setelah masa aktif tahunan berakhir, data aman disimpan</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SHOWCASE (dark) ============ */}
      <section className="section" id="demo" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="showcase reveal">
            <div className="inner">
              <div className="shead" style={{ marginBottom: 0 }}>
                <div className="tt">
                  <span className="eyebrow on-ink">Prototype Live</span>
                  <h2 style={{ marginTop: 16 }}>Buka &amp; klik langsung.</h2>
                </div>
                <Link to="/ppdb/dashboard" className="btn btn-on-ink">
                  Lihat Dashboard Panitia <Arrow />
                </Link>
              </div>

              <div className="sc-grid">
                <Link to="/start" className="sc">
                  <div className="sc-shot">
                    <span className="num" style={{ background: 'var(--lime)', color: 'var(--lime-ink)' }}>1</span>
                    <div className="mock-wrap">
                      <div className="mock-nav"><div className="mock-logo" /><div className="mock-menu-dots" /></div>
                      <div className="mock-hero">
                        <div className="mock-title" style={{ width: '65%', background: 'rgba(255,255,255,.2)' }} />
                        <div className="mock-title" style={{ width: '45%', background: 'var(--lime)' }} />
                        <div className="mock-p" style={{ width: '80%' }} />
                      </div>
                      <div className="mock-cards-row">
                        <div className="mock-mini-card" /><div className="mock-mini-card" /><div className="mock-mini-card" />
                      </div>
                    </div>
                  </div>
                  <h3>SekolahKu Starter</h3>
                  <p>Profil sekolah satu halaman: hero, sambutan, visi-misi, fasilitas, galeri &amp; kontak.</p>
                  <span className="go">Buka demo <Arrow /></span>
                </Link>

                <Link to="/pro" className="sc">
                  <div className="sc-shot">
                    <span className="num" style={{ background: '#3f7bff', color: '#fff' }}>2</span>
                    <div className="mock-wrap">
                      <div className="mock-nav"><div className="mock-logo" /><div className="mock-menu-dots" /></div>
                      <div className="mock-pro-grid">
                        <div className="mock-sidebar">
                          <div className="mock-item active" />
                          <div className="mock-item" />
                          <div className="mock-item" />
                          <div className="mock-item" />
                        </div>
                        <div className="mock-content">
                          <div className="mock-news-card" />
                          <div className="mock-news-card" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3>SekolahKu Pro</h3>
                  <p>Homepage premium, berita, agenda, prestasi, guru — dikelola lewat Google Sheet.</p>
                  <span className="go">Buka demo <Arrow /></span>
                </Link>

                <Link to="/ppdb" className="sc">
                  <div className="sc-shot">
                    <span className="num" style={{ background: '#ff7a45', color: '#2a0f02' }}>3</span>
                    <div className="mock-wrap">
                      <div className="mock-nav"><div className="mock-logo" /><div className="mock-menu-dots" /></div>
                      <div className="mock-ppdb-flow">
                        <div className="mock-flow-steps">
                          <div className="mock-step" style={{ background: '#ff7a45' }} />
                          <div className="mock-step-line" style={{ background: '#ff7a45' }} />
                          <div className="mock-step" style={{ background: '#ff7a45' }} />
                          <div className="mock-step-line" />
                          <div className="mock-step" />
                        </div>
                        <div className="mock-form-mock">
                          <div className="mock-input-row"><div className="mock-input-field" /><div className="mock-input-field" /></div>
                          <div className="mock-input-row"><div className="mock-input-field" style={{ width: '100%' }} /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3>SekolahKu PPDB</h3>
                  <p>Landing PPDB, form pendaftaran online &amp; dashboard panitia dengan verifikasi.</p>
                  <span className="go">Buka demo <Arrow /></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DESIGN DIRECTION ============ */}
      <section className="section" id="arah" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="shead reveal">
            <div className="tt">
              <span className="idx">/ 02 — Arah Desain</span>
              <h2>Desain presisi,<br/>kustomisasi fleksibel.</h2>
            </div>
            <p className="lead" style={{ maxWidth: 340 }}>
              Fondasi estetik Ink + Canvas yang konsisten dipertahankan, sementara aksen warna &amp; identitas branding sekolah dibebaskan sesuai pilihan klien.
            </p>
          </div>

          <div className="dir">
            <article className="card dcard card-hover reveal">
              <div className="palette">
                <i className="lg" style={{ background: '#15130f' }} />
                <i style={{ background: '#f3f1ea' }} />
                <i style={{ background: '#ffffff' }} />
              </div>
              <div className="dbody">
                <span className="badge badge-ink"><span className="dot" style={{ background: '#ffffff' }} />Fondasi Estetik</span>
                <h3 style={{ marginTop: 10 }}>Ink × Canvas Invariant</h3>
                <p>Tinta gelap pekat dan kanvas hangat konstan untuk menjamin website sekolah selalu berestetika tinggi, bersih, dan bebas dari kesan template murah.</p>
                <div className="hexes">
                  <span>#15130F</span><span>#F3F1EA</span><span>#FFFFFF</span>
                </div>
              </div>
            </article>

            <article className="card dcard card-hover reveal">
              <div className="palette">
                <i style={{ background: '#c8f250' }} />
                <i className="lg" style={{ background: '#3f7bff' }} />
                <i style={{ background: '#ff7a45' }} />
              </div>
              <div className="dbody">
                <span className="badge badge-ink"><span className="dot" style={{ background: '#3f7bff' }} />Pilihan Aksen</span>
                <h3 style={{ marginTop: 10 }}>Flexible Brand Accents</h3>
                <p>Klien dibebaskan memilih aksen warna elektrik (Lime, Cobalt, Coral, atau warna kustom lainnya) yang sesuai dengan warna logo atau identitas resmi sekolah Anda.</p>
                <div className="hexes">
                  <span>Lime</span><span>Cobalt</span><span>Coral</span>
                </div>
              </div>
            </article>

            <article className="card dcard card-hover reveal">
              <div className="palette">
                <i className="lg" style={{ background: '#ffffff' }} />
                <i style={{ background: '#15130f' }} />
                <i style={{ background: '#ece8dd' }} />
              </div>
              <div className="dbody">
                <span className="badge badge-ink"><span className="dot" style={{ background: '#ff7a45' }} />Kustom Aset</span>
                <h3 style={{ marginTop: 10 }}>Logo &amp; Content Custom</h3>
                <p>Seluruh logo sekolah, foto kepala sekolah, data sarana, direktori guru, hingga data pendaftaran PPDB dapat diganti total secara mandiri tanpa merusak layout.</p>
                <div className="hexes">
                  <span>Logo</span><span>Foto</span><span>Konten</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============ STYLE GUIDE ============ */}
      <section className="section" id="style" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="shead reveal">
            <div className="tt">
              <span className="idx">/ 03 — Style Guide</span>
              <h2>Sistem desain terpadu.</h2>
            </div>
            <p className="lead" style={{ maxWidth: 420, marginTop: 12 }}>
              Invariant gelap-terang memastikan kontras aksesibilitas tinggi, sementara token aksen siap diisi warna identitas brand sekolah Anda.
            </p>
          </div>

          <div className="sg">
            {/* --- COLUMN 1: FONDASI UTAMA (KONSTAN) --- */}
            <div className="sg-column">
              <span className="sg-section-title">
                <span className="dot" style={{ background: 'var(--ink)' }} />
                Fondasi Utama (Konstan)
              </span>
              
              {/* Typography Specimen */}
              <article className={`card specimen reveal in theme-${activeSgTheme === 'academy' ? 'academy' : activeSgTheme === 'pro' ? 'pro' : activeSgTheme === 'ppdb' ? 'ppdb' : 'custom'}`} style={{ marginBottom: 22, transition: 'all .3s ease' }}>
                <div className="big">Aa<em style={{ color: 'var(--accent)', transition: 'color .3s ease' }}>Gg</em><br/>123</div>
                <div className="meta">
                  <div><b>Space Grotesk</b><span>Display · Typography Utama</span></div>
                  <div><b>Plus Jakarta Sans</b><span>Body &amp; UI · Teks &amp; Formulir</span></div>
                  <div><b>−0.03em</b><span>Letter spacing display</span></div>
                </div>
              </article>

              {/* Base Colors */}
              <article className="card pad reveal in" style={{ marginBottom: 22 }}>
                <h4 style={{ fontSize: '.95rem', marginBottom: 14 }}>Warna Utama &amp; Latar</h4>
                <p style={{ fontSize: '.84rem', color: 'var(--ink-2)', marginBottom: 16 }}>
                  Kombinasi warna konstan untuk menjaga kontras teks dan kenyamanan membaca tingkat tinggi.
                </p>
                <div className="coltokens" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  <div className="ctok">
                    <div className="sw" style={{ background: '#15130f' }} />
                    <div className="nm"><b>Ink</b><span>#15130F</span></div>
                  </div>
                  <div className="ctok">
                    <div className="sw" style={{ background: '#f3f1ea', boxShadow: 'inset 0 0 0 1px var(--line)' }} />
                    <div className="nm"><b>Canvas</b><span>#F3F1EA</span></div>
                  </div>
                  <div className="ctok">
                    <div className="sw" style={{ background: '#fff', boxShadow: 'inset 0 0 0 1px var(--line)' }} />
                    <div className="nm"><b>Paper</b><span>#FFFFFF</span></div>
                  </div>
                </div>
              </article>
            </div>

            {/* --- COLUMN 2: KUSTOMISASI KLIEN (DAPAT DIGANTI) --- */}
            <div className="sg-column">
              <span className="sg-section-title">
                <span className="dot" style={{ background: 'var(--accent)', transition: 'background .3s ease' }} />
                Kustomisasi Aksen (Dapat Diganti)
              </span>

              {/* Accent Color Picker Card */}
              <article className="card pad reveal in" style={{ marginBottom: 22 }}>
                <h4 style={{ fontSize: '.95rem', marginBottom: 14 }}>Aksen Warna Elektrik</h4>
                <p style={{ fontSize: '.84rem', color: 'var(--ink-2)', marginBottom: 16 }}>
                  Klik swatch warna di bawah untuk mensimulasikan penerapan identitas visual sekolah Anda secara instan:
                </p>
                
                <div className="coltokens" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                  {/* Lime */}
                  <button 
                    onClick={() => setActiveSgTheme('academy')}
                    className={`ctok swatch-btn ${activeSgTheme === 'academy' ? 'active' : ''}`}
                    style={{ textAlign: 'left', background: 'transparent', width: '100%', padding: 0 }}
                  >
                    <div className="sw" style={{ background: '#c8f250', position: 'relative' }}>
                      {activeSgTheme === 'academy' && <span className="active-indicator" />}
                    </div>
                    <div className="nm"><b>Lime</b><span>#C8F250</span></div>
                  </button>

                  {/* Cobalt */}
                  <button 
                    onClick={() => setActiveSgTheme('pro')}
                    className={`ctok swatch-btn ${activeSgTheme === 'pro' ? 'active' : ''}`}
                    style={{ textAlign: 'left', background: 'transparent', width: '100%', padding: 0 }}
                  >
                    <div className="sw" style={{ background: '#3f7bff', position: 'relative' }}>
                      {activeSgTheme === 'pro' && <span className="active-indicator" />}
                    </div>
                    <div className="nm"><b>Cobalt</b><span>#3F7BFF</span></div>
                  </button>

                  {/* Coral */}
                  <button 
                    onClick={() => setActiveSgTheme('ppdb')}
                    className={`ctok swatch-btn ${activeSgTheme === 'ppdb' ? 'active' : ''}`}
                    style={{ textAlign: 'left', background: 'transparent', width: '100%', padding: 0 }}
                  >
                    <div className="sw" style={{ background: '#ff7a45', position: 'relative' }}>
                      {activeSgTheme === 'ppdb' && <span className="active-indicator" />}
                    </div>
                    <div className="nm"><b>Coral</b><span>#FF7A45</span></div>
                  </button>

                  {/* Custom (Violet) */}
                  <button 
                    onClick={() => setActiveSgTheme('custom')}
                    className={`ctok swatch-btn ${activeSgTheme === 'custom' ? 'active' : ''}`}
                    style={{ textAlign: 'left', background: 'transparent', width: '100%', padding: 0 }}
                  >
                    <div className="sw" style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', position: 'relative' }}>
                      {activeSgTheme === 'custom' && <span className="active-indicator" />}
                    </div>
                    <div className="nm"><b>Custom</b><span>#8B5CF6</span></div>
                  </button>
                </div>
              </article>

              {/* Dynamic Components Specimen */}
              <article className={`card pad reveal in theme-${activeSgTheme === 'academy' ? 'academy' : activeSgTheme === 'pro' ? 'pro' : activeSgTheme === 'ppdb' ? 'ppdb' : 'custom'}`} style={{ transition: 'all .3s ease' }}>
                <h4 style={{ fontSize: '.95rem', marginBottom: 14 }}>Adaptasi Komponen &amp; Status</h4>
                <p style={{ fontSize: '.84rem', color: 'var(--ink-2)', marginBottom: 16 }}>
                  Tombol dan indikator status otomatis mewarisi warna aksen aktif untuk menjaga keselarasan desain:
                </p>
                <div className="comp-demo">
                  <button className="btn btn-primary btn-sm">Primary</button>
                  <button className="btn btn-accent btn-sm">Accent (Dynamic)</button>
                  <button className="btn btn-ghost btn-sm">Ghost</button>
                </div>
                <div className="comp-demo" style={{ marginTop: 16 }}>
                  <span className="badge badge-ok"><span className="dot" />Diterima</span>
                  <span className="badge badge-warn"><span className="dot" />Verifikasi</span>
                  <span className="badge badge-info"><span className="dot" />Baru</span>
                  <span className="badge badge-danger"><span className="dot" />Ditolak</span>
                </div>
                <p style={{ fontSize: '.76rem', color: 'var(--muted)', marginTop: 14, fontStyle: 'italic' }}>
                  * Komponen aksen di atas sedang disimulasikan menggunakan tema <strong>{activeSgTheme === 'academy' ? 'Lime (Starter)' : activeSgTheme === 'pro' ? 'Cobalt (Pro)' : activeSgTheme === 'ppdb' ? 'Coral (PPDB)' : 'Custom (Violet)'}</strong>.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMPARISON ============ */}
      <section className="section" id="banding" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="shead reveal">
            <div className="tt">
              <span className="idx">/ 04 — Perbandingan</span>
              <h2>Apa yang didapat tiap tingkat.</h2>
            </div>
          </div>

          <div className="matrix-wrap reveal">
            <table className="matrix">
              <thead>
                <tr>
                  <th>Fitur / Halaman</th>
                  <th className="colmark">Starter</th>
                  <th className="colmark">Pro</th>
                  <th className="colmark">PPDB</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Profil, visi-misi, fasilitas', s: true, p: true, d: true },
                  { name: 'Galeri & kontak + peta', s: true, p: true, d: true },
                  { name: 'Berita & detail berita', s: false, p: true, d: true },
                  { name: 'Agenda, prestasi, guru/staff', s: false, p: true, d: true },
                  { name: 'CMS Google Sheet (no-code)', s: false, p: true, d: true },
                  { name: 'Empty & loading state', s: false, p: true, d: true },
                  { name: 'Landing PPDB + alur & biaya', s: false, p: false, d: true },
                  { name: 'Form daftar online + cek status', s: false, p: false, d: true },
                  { name: 'Dashboard panitia + verifikasi', s: false, p: false, d: true },
                  { name: 'Export & statistik pendaftar', s: false, p: false, d: true },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="feat">{row.name}</td>
                    <td className={`colmark ${row.s ? 'yes' : 'no'}`}>{row.s ? '●' : '○'}</td>
                    <td className={`colmark ${row.p ? 'yes' : 'no'}`}>{row.p ? '●' : '○'}</td>
                    <td className={`colmark ${row.d ? 'yes' : 'no'}`}>{row.d ? '●' : '○'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-section reveal">
            <span className="badge badge-ink">BikinWebSekolah.web.id</span>
            <h2 style={{ marginTop: 18 }}>Wujudkan Website Sekolah Impian Anda Sekarang.</h2>
            <p>Hadirkan portal informasi resmi dan sistem PPDB online terbaik untuk sekolah Anda. Hubungi kami untuk berkonsultasi secara gratis dengan tim ahli kami.</p>
            <div className="cta-row">
              <a href="https://wa.me/6281221388713?text=Halo%20BikinWebSekolah!%20%F0%9F%91%8B%20Saya%20tertarik%20tanya-tanya%20seputar%20jasa%20pembuatan%20website%20sekolah%20nih.%20Boleh%20minta%20infonya%3F%20%F0%9F%9A%80" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">Hubungi Kami di WhatsApp</a>
              <a href="#paket" className="btn btn-ghost btn-lg" style={{ borderColor: 'rgba(29,38,6,.3)', color: 'var(--lime-ink)' }}>Lihat Pilihan Paket</a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="shead reveal" style={{ justifyContent: 'center' }}>
            <div className="tt" style={{ textAlign: 'center', maxWidth: 620 }}>
              <span className="idx">/ 05 — FAQ</span>
              <h2>Pertanyaan umum.</h2>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 780, marginInline: 'auto' }}>
            {businessFaqs.map((faq, index) => (
              <div key={index} className="faq-item reveal in">
                <button onClick={() => toggleFaq(index)} className="faq-q">
                  {faq.q}
                  <span className={`pm ${openFaqIndex === index ? 'open' : ''}`}>+</span>
                </button>
                <div
                  className="faq-a"
                  style={{ maxHeight: openFaqIndex === index ? '240px' : '0px' }}
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer>
        <div className="wrap">
          <div className="grid-f">
            <div>
              <Link to="/" className="brand">
                <span className="mark">
                  <svg viewBox="0 0 64 64" fill="currentColor">
                    <path d="M32 6.5 58.5 28 52.5 28 52.5 52.5a3 3 0 0 1-3 3L14.5 55.5a3 3 0 0 1-3-3L11.5 28 5.5 28Z"/>
                    <rect fill="var(--acc, var(--accent, #c8f250))" x="17.5" y="32.5" width="29" height="17.5" rx="2.6"/>
                    <circle cx="22" cy="37" r="1.3" fill="currentColor"/>
                    <circle cx="26.4" cy="37" r="1.3" fill="currentColor"/>
                    <circle cx="30.8" cy="37" r="1.3" fill="currentColor"/>
                  </svg>
                </span>
                <span className="wm">bikinweb<b>sekolah</b><i>.web.id</i></span>
              </Link>
              <p style={{ marginTop: 16, fontSize: '.92rem', maxWidth: 330, color: 'var(--ink-2)' }}>
                Jasa pembuatan website sekolah premium di Indonesia — modern, cepat, dan tepercaya untuk tingkat SD, SMP, SMA, SMK, MA, &amp; pesantren.
              </p>
            </div>

            <div>
              <h4>Paket</h4>
              <Link to="/start">Starter — Profil</Link>
              <Link to="/pro">Pro — Premium + CMS</Link>
              <Link to="/ppdb">PPDB — Pendaftaran</Link>
              <Link to="/ppdb/dashboard">Dashboard Panitia</Link>
            </div>

            <div>
              <h4>Navigasi</h4>
              <a href="#paket">Positioning &amp; Harga</a>
              <a href="#arah">Arah Desain</a>
              <a href="#style">Style Guide</a>
              <a href="#banding">Perbandingan</a>
            </div>
          </div>

          <div className="copy">
            <span>© 2026 BikinWebSekolah.web.id — Solusi Website Sekolah Modern.</span>
            <span>Layanan profesional pembuatan website sekolah &amp; PPDB online.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
