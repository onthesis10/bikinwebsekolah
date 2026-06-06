import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { initialApplicants, statusMetadata } from '../data/mockData';
import type { Applicant, ApplicationStatus } from '../data/mockData';
import { getInitials } from '../lib/initials';
import './PPDBDashboardPage.css';

export const PPDBDashboardPage: React.FC = () => {
  // Dashboard Data State
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);
  
  // Filters & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGel, setFilterGel] = useState('');
  const [filterJalur, setFilterJalur] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>(''); // empty means all
  
  // UI States
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Toast State
  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setToastShow(true);
  };

  useEffect(() => {
    document.documentElement.className = 'theme-ppdb';
    const oldTitle = document.title;
    document.title = 'Panitia PPDB SMK Bina Teknologi — Dashboard';
    return () => {
      document.title = oldTitle;
    };
  }, []);

  useEffect(() => {
    if (toastShow) {
      const timer = setTimeout(() => {
        setToastShow(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toastShow]);

  // Calculations
  const counts = () => {
    const c = { total: applicants.length, baru: 0, verifikasi: 0, diterima: 0, ditolak: 0, cadangan: 0 };
    applicants.forEach(a => {
      if (a.st in c) {
        c[a.st as keyof typeof c]++;
      }
    });
    return c;
  };

  const c = counts();

  // Filtered applicants
  const filteredApplicants = applicants.filter(a => {
    if (filterGel && a.gel !== filterGel) return false;
    if (filterJalur && a.jalur !== filterJalur) return false;
    if (filterStatus && a.st !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !a.nama.toLowerCase().includes(q) &&
        !a.id.toLowerCase().includes(q) &&
        !a.asal.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  // Major distribution calculation
  const getMajorDistribution = () => {
    const map: Record<string, number> = {};
    applicants.forEach(a => {
      map[a.jur] = (map[a.jur] || 0) + 1;
    });
    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
    const maxVal = Math.max(...sorted.map(x => x[1]), 1);
    return { sorted, maxVal };
  };

  const { sorted: majorList, maxVal: majorMax } = getMajorDistribution();

  // Update applicant status
  const handleUpdateStatus = (id: string, newStatus: ApplicationStatus) => {
    setApplicants(prev => 
      prev.map(a => a.id === id ? { ...a, st: newStatus } : a)
    );
    const label = statusMetadata[newStatus].label;
    triggerToast(`Status ${id} berhasil diubah menjadi ${label}.`);
  };

  // Drawer detail item
  const selectedApplicant = applicants.find(a => a.id === selectedApplicantId) || null;

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterGel('');
    setFilterJalur('');
    setFilterStatus('');
    triggerToast('Filter telah direset.');
  };

  // Demo loading simulation
  const handleDemoLoading = () => {
    setIsLoading(true);
    triggerToast('Memuat ulang data...');
    setTimeout(() => {
      setIsLoading(false);
      triggerToast('Data berhasil dimuat.');
    }, 1500);
  };

  // Download CSV
  const handleExportData = () => {
    const list = filteredApplicants;
    if (list.length === 0) {
      triggerToast('Tidak ada data pendaftar untuk diexport.');
      return;
    }

    triggerToast(`Mengekspor ${list.length} data pendaftar ke CSV...`);

    // CSV formatting
    const headers = 'ID,Nama Pendaftar,Asal Sekolah,Jalur,Gel,Jurusan,Tanggal Daftar,No WhatsApp,Status\n';
    const rows = list.map(a => 
      `"${a.id}","${a.nama}","${a.asal}","${a.jalur}","${a.gel}","${a.jur}","${a.tgl}","${a.wa}","${statusMetadata[a.st].label}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ppdb_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const chartMax = Math.max(c.baru, c.verifikasi, c.diterima, c.ditolak, c.cadangan, 1);
  const chartBars = [
    { key: 'baru', val: c.baru, label: 'Baru' },
    { key: 'verifikasi', val: c.verifikasi, label: 'Verifikasi' },
    { key: 'diterima', val: c.diterima, label: 'Diterima' },
    { key: 'ditolak', val: c.ditolak, label: 'Ditolak' },
    { key: 'cadangan', val: c.cadangan, label: 'Cadangan' }
  ];

  return (
    <div className="dashboard-page">
      <div className="app">
        <div className={`sb-bg ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)}></div>
        
        {/* SIDEBAR */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} id="sidebar">
          <div className="sb-brand">
            <span className="mk">
              <svg viewBox="0 0 64 64" fill="currentColor">
                <path d="M32 6.5 58.5 28 52.5 28 52.5 52.5a3 3 0 0 1-3 3L14.5 55.5a3 3 0 0 1-3-3L11.5 28 5.5 28Z"/>
                <rect fill="var(--accent, #ff7a45)" x="17.5" y="32.5" width="29" height="17.5" rx="2.6"/>
                <circle cx="22" cy="37" r="1.3" fill="currentColor"/>
                <circle cx="26.4" cy="37" r="1.3" fill="currentColor"/>
                <circle cx="30.8" cy="37" r="1.3" fill="currentColor"/>
              </svg>
            </span>
            <div>
              <b>Panitia PPDB</b>
              <span>SMK Bina Teknologi</span>
            </div>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <span className="sb-sec">Menu</span>
            <span className="nav-link active">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
                <rect x="14" y="3" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
                <rect x="14" y="12" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
                <rect x="3" y="16" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
              </svg>
              Overview
            </span>
            <span onClick={() => { setFilterStatus(''); setSidebarOpen(false); }} className="nav-link">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              Data Pendaftar
              <span className="cnt">{applicants.length}</span>
            </span>
            <span onClick={() => { setFilterStatus('verifikasi'); setSidebarOpen(false); }} className="nav-link">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
              </svg>
              Verifikasi
              <span className="cnt">{c.verifikasi}</span>
            </span>
            <span className="nav-link" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              Jadwal Seleksi
            </span>
            <span className="nav-link" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M3 13h8V3H3zM13 21h8V3h-8zM3 21h8v-4H3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
              </svg>
              Statistik
            </span>
            <span className="sb-sec">Lainnya</span>
            <span className="nav-link" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.91 1V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 3.6 14H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 5 8.6a1.65 1.65 0 0 0-.4-1.8l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 10 4.6h.09A1.65 1.65 0 0 0 11 3" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              Pengaturan
            </span>
            <Link to="/ppdb" className="nav-link">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M5 12l5-5M5 12l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Lihat Situs Publik
            </Link>
          </nav>
          <div className="sb-foot">
            <div className="sb-user">
              <span className="av">AR</span>
              <div style={{ flex: 1 }}>
                <b>Andi Rahman</b>
                <span>Ketua Panitia</span>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="main">
          <header className="topbar">
            <button className="sb-toggle" id="sb-toggle" onClick={() => setSidebarOpen(true)} aria-label="Menu">
              <svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            <div className="pg-title">
              <b>Overview PPDB 2026/2027</b>
              <span style={{ display: 'block' }}>Gelombang 1 &amp; 2 · Update hari ini</span>
            </div>
            <div className="search">
              <svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="m20 20-3-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
              <input 
                id="search" 
                placeholder="Cari nama / no. pendaftaran…" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="icon-btn" aria-label="Notifikasi">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.7 21a2 2 0 0 1-3.4 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
              <span className="ping"></span>
            </button>
            <Link to="/" className="btn btn-soft btn-sm backhub">← Katalog</Link>
          </header>

          <div className="content">
            <div className="phead">
              <div>
                <h1>Selamat datang, Andi</h1>
                <p>Kelola seluruh data pendaftar PPDB di satu tempat.</p>
              </div>
              <div className="actions">
                <button className="btn btn-soft btn-sm" id="demo-load" onClick={handleDemoLoading}>
                  <svg viewBox="0 0 24 24" width="16" fill="none" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 5 }}>
                    <path d="M21 12a9 9 0 1 1-6.2-8.5" stroke="currentColor" strokeWidth="2" stroke-linecap="round"/>
                    <path d="M21 3v6h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Demo Loading
                </button>
                <button className="btn btn-primary btn-sm" id="export" onClick={handleExportData}>
                  <svg viewBox="0 0 24 24" width="16" fill="none" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 5 }}>
                    <path d="M12 3v12m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5 21h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  Export Data
                </button>
              </div>
            </div>

            {/* KPI CARDS */}
            <div className="kpis" id="kpis">
              <div className="kpi-card t-brand">
                <div className="kpi-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div className="kpi-num">{c.total}</div>
                <div className="kpi-label">Total Pendaftar</div>
              </div>
              <div className="kpi-card t-info">
                <div className="kpi-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                </div>
                <div className="kpi-num">{c.baru}</div>
                <div className="kpi-label">Baru</div>
              </div>
              <div className="kpi-card t-warn">
                <div className="kpi-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                </div>
                <div className="kpi-num">{c.verifikasi}</div>
                <div className="kpi-label">Verifikasi</div>
              </div>
              <div className="kpi-card t-ok">
                <div className="kpi-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                </div>
                <div className="kpi-num">{c.diterima}</div>
                <div className="kpi-label">Diterima</div>
              </div>
              <div className="kpi-card t-danger">
                <div className="kpi-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg>
                </div>
                <div className="kpi-num">{c.ditolak}</div>
                <div className="kpi-label">Ditolak</div>
              </div>
              <div className="kpi-card t-plum">
                <div className="kpi-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
                </div>
                <div className="kpi-num">{c.cadangan}</div>
                <div className="kpi-label">Cadangan</div>
              </div>
            </div>

            {/* CHARTS */}
            <div className="charts">
              <div className="panel">
                <div className="panel-h">
                  <b>Pendaftar per Status</b>
                  <span>Gel. 1 &amp; 2</span>
                </div>
                <div className="chart" id="chart">
                  {chartBars.map(bar => {
                    const h = Math.round(bar.val / chartMax * 100);
                    return (
                      <div key={bar.key} className="bar-col">
                        <div className="bar-val">{bar.val}</div>
                        <div className={`bar bar-${bar.key}`} style={{ height: `${Math.max(h, 6)}%` }} />
                        <div className="bar-lbl">{bar.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="panel">
                <div className="panel-h">
                  <b>Distribusi Jurusan</b>
                  <span>Pilihan 1</span>
                </div>
                <div className="jur-list" id="jur-list">
                  {majorList.map(([major, val]) => {
                    const pct = Math.round(val / majorMax * 100);
                    return (
                      <div key={major} className="jur-row">
                        <div className="jur-top">
                          <span>{major}</span>
                          <b>{val}</b>
                        </div>
                        <div className="jur-track">
                          <div className="jur-fill" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* TOOLBAR */}
            <div className="toolbar">
              <div className="stat-pills">
                {[
                  { key: '', label: 'Semua' },
                  { key: 'baru', label: 'Baru' },
                  { key: 'verifikasi', label: 'Verifikasi' },
                  { key: 'diterima', label: 'Diterima' },
                  { key: 'ditolak', label: 'Ditolak' },
                  { key: 'cadangan', label: 'Cadangan' }
                ].map(pill => (
                  <button 
                    key={pill.key}
                    onClick={() => setFilterStatus(pill.key)}
                    className={`stat-pill ${filterStatus === pill.key ? 'active' : ''}`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
              <div className="tb-spacer"></div>
              <select className="fselect" id="f-gel" value={filterGel} onChange={e => setFilterGel(e.target.value)}>
                <option value="">Semua Gelombang</option>
                <option value="G1">Gelombang 1</option>
                <option value="G2">Gelombang 2</option>
              </select>
              <select className="fselect" id="f-jalur" value={filterJalur} onChange={e => setFilterJalur(e.target.value)}>
                <option value="">Semua Jalur</option>
                <option value="Reguler">Reguler</option>
                <option value="Prestasi">Prestasi</option>
                <option value="Afirmasi">Afirmasi</option>
              </select>
              <button className="btn btn-soft btn-sm" id="reset" onClick={handleResetFilters}>Reset</button>
            </div>

            {/* TABLE */}
            <div className="table-card">
              <div className="table-head">
                <div>
                  <b>Data Pendaftar</b>
                  <span className="muted"> &middot; <span id="row-count">{filteredApplicants.length}</span> entri</span>
                </div>
                <span className="badge badge-muted">
                  <span className="dot"></span>
                  Klik baris untuk detail
                </span>
              </div>
              <div className="table-scroll">
                <table className="data">
                  <thead>
                    <tr>
                      <th>Nama Pendaftar</th>
                      <th>Asal Sekolah</th>
                      <th>Jalur</th>
                      <th>Gel.</th>
                      <th>Jurusan</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody id="rows">
                    {isLoading ? (
                      [...Array(6)].map((_, idx) => (
                        <tr key={idx}>
                          <td colSpan={7}>
                            <div className="sk" style={{ height: '22px', borderRadius: '4px' }}></div>
                          </td>
                        </tr>
                      ))
                    ) : filteredApplicants.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ cursor: 'default' }}>
                          <div className="t-empty">
                            <div className="empty-ic">
                              <svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="m20 20-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                            </div>
                            <h3>Tidak ada hasil</h3>
                            <p>Tidak ada pendaftar yang cocok dengan filter atau pencarian.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredApplicants.map(a => {
                        const meta = statusMetadata[a.st];
                        const showActions = a.st === 'baru' || a.st === 'verifikasi';
                        return (
                          <tr key={a.id} onClick={() => setSelectedApplicantId(a.id)}>
                            <td>
                              <div className="cell-name">
                                <span className="av">{getInitials(a.nama)}</span>
                                <div>
                                  <b>{a.nama}</b>
                                  <span>{a.id}</span>
                                </div>
                              </div>
                            </td>
                            <td>{a.asal}</td>
                            <td><span className="badge badge-muted">{a.jalur}</span></td>
                            <td>{a.gel}</td>
                            <td className="td-jur">{a.jur}</td>
                            <td>
                              <span className={`badge ${meta.cls}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                <span className="dot"></span>
                                {meta.label}
                              </span>
                            </td>
                            <td>
                              <div className="act" onClick={e => e.stopPropagation()}>
                                {showActions && (
                                  <>
                                    <button 
                                      className="act-btn ok" 
                                      title="Terima"
                                      onClick={() => handleUpdateStatus(a.id, 'diterima')}
                                    >
                                      <svg viewBox="0 0 24 24" fill="none">
                                        <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </button>
                                    <button 
                                      className="act-btn danger" 
                                      title="Tolak"
                                      onClick={() => handleUpdateStatus(a.id, 'ditolak')}
                                    >
                                      <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                                      </svg>
                                    </button>
                                  </>
                                )}
                                <button className="act-btn" title="Detail" onClick={() => setSelectedApplicantId(a.id)}>
                                  <svg viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
                                    <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* APPLICANT DETAIL DRAWER */}
      <div className={`drawer ${selectedApplicant ? 'open' : ''}`} id="drawer">
        <div className="drawer-bg" onClick={() => setSelectedApplicantId(null)}></div>
        <div className="drawer-panel">
          <div className="drawer-top">
            <span className="drawer-av">{selectedApplicant ? getInitials(selectedApplicant.nama) : '--'}</span>
            <div style={{ flex: 1 }}>
              <div className="drawer-name">{selectedApplicant?.nama || 'Nama'}</div>
              <div className="drawer-id">{selectedApplicant?.id || 'ID'}</div>
            </div>
            <button className="drawer-close" onClick={() => setSelectedApplicantId(null)} aria-label="Tutup">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div className="drawer-body">
            {selectedApplicant && (
              <>
                <div className="d-status">
                  <span className={`badge ${statusMetadata[selectedApplicant.st].cls}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <span className="dot"></span>
                    {statusMetadata[selectedApplicant.st].label}
                  </span>
                </div>
                <div className="d-grid">
                  <div className="d-field">
                    <span>Asal Sekolah</span>
                    <b>{selectedApplicant.asal}</b>
                  </div>
                  <div className="d-field">
                    <span>Jalur</span>
                    <b>{selectedApplicant.jalur}</b>
                  </div>
                  <div className="d-field">
                    <span>Gelombang</span>
                    <b>{selectedApplicant.gel === 'G1' ? 'Gelombang 1' : 'Gelombang 2'}</b>
                  </div>
                  <div className="d-field">
                    <span>Tanggal Daftar</span>
                    <b>{selectedApplicant.tgl}</b>
                  </div>
                  <div className="d-field" style={{ gridColumn: 'span 2' }}>
                    <span>Pilihan Jurusan</span>
                    <b>{selectedApplicant.jur}</b>
                  </div>
                  <div className="d-field" style={{ gridColumn: 'span 2' }}>
                    <span>No. WhatsApp</span>
                    <b>{selectedApplicant.wa}</b>
                  </div>
                </div>
                <div className="d-docs">
                  <b>Berkas Terlampir</b>
                  <div className="doc-row">
                    <div className="doc">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                        <path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                      </svg>
                      Kartu Keluarga.pdf
                    </div>
                    <div className="doc">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                        <path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                      </svg>
                      Akta Kelahiran.pdf
                    </div>
                    <div className="doc">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                        <path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                      </svg>
                      Rapor 5 Sem.pdf
                    </div>
                    <div className="doc">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                        <path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                      </svg>
                      Pas Foto.jpg
                    </div>
                  </div>
                </div>
                <div className="d-actions">
                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleUpdateStatus(selectedApplicant.id, 'diterima')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" style={{ width: 15, height: 15, display: 'inline-block', verticalAlign: 'middle', marginRight: 5 }}>
                      <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Terima
                  </button>
                  <button 
                    className="btn btn-soft" 
                    onClick={() => handleUpdateStatus(selectedApplicant.id, 'cadangan')}
                  >
                    Cadangan
                  </button>
                  <button 
                    className="btn btn-soft" 
                    style={{ color: 'var(--maroon)' }}
                    onClick={() => handleUpdateStatus(selectedApplicant.id, 'ditolak')}
                  >
                    Tolak
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* TOAST */}
      <div className={`toast ${toastShow ? 'show' : ''}`}>{toastMessage}</div>
    </div>
  );
};

export default PPDBDashboardPage;
