/* ============================================================
   SekolahKu Pro — CMS (simulasi Google Sheet) data + rendering
   ============================================================ */
(function () {
  // ---- Sumber data (mensimulasikan baris-baris Google Sheet) ----
  var NEWS = [
    { kat:'Prestasi', tgl:'28 Mei 2026', judul:'Tim Robotik Raih Juara 1 Nasional di Jakarta', ringkas:'Siswa kelas XI berhasil membawa pulang medali emas pada ajang National Robotic Competition 2026.', isi:'Setelah melalui seleksi ketat dari 240 tim se-Indonesia, tim robotik MTsN Al-Hikmah berhasil meraih Juara 1 pada National Robotic Competition 2026 yang digelar di Jakarta. Tim yang beranggotakan lima siswa ini membangun robot pemilah sampah otomatis berbasis sensor warna.' },
    { kat:'Kegiatan', tgl:'21 Mei 2026', judul:'Pekan Literasi & Bazar Buku Tingkatkan Minat Baca', ringkas:'Sekolah menggelar pekan literasi selama lima hari dengan beragam lomba dan pameran karya siswa.', isi:'Pekan Literasi tahun ini mengangkat tema "Membaca Membuka Dunia". Berbagai kegiatan diadakan mulai dari lomba menulis cerpen, bedah buku bersama penulis tamu, hingga bazar buku murah yang melibatkan seluruh warga sekolah.' },
    { kat:'Pengumuman', tgl:'15 Mei 2026', judul:'Jadwal Ujian Akhir Semester Genap 2025/2026', ringkas:'Ujian akhir semester akan dilaksanakan mulai 9 Juni 2026. Simak jadwal lengkap dan tata tertibnya.', isi:'Ujian Akhir Semester (UAS) Genap Tahun Pelajaran 2025/2026 akan dilaksanakan pada 9–18 Juni 2026. Siswa diharapkan mempersiapkan diri dan memperhatikan tata tertib ujian yang telah diumumkan melalui wali kelas masing-masing.' },
    { kat:'Kegiatan', tgl:'8 Mei 2026', judul:'Bakti Sosial Ramadhan: Berbagi dengan Sesama', ringkas:'OSIS menggalang donasi dan menyalurkan paket sembako kepada warga sekitar sekolah.', isi:'Dalam rangka mengisi bulan suci Ramadhan, OSIS menyelenggarakan kegiatan bakti sosial dengan menyalurkan 200 paket sembako kepada warga kurang mampu di sekitar lingkungan sekolah.' },
    { kat:'Prestasi', tgl:'2 Mei 2026', judul:'Juara Umum Olimpiade Sains Tingkat Kabupaten', ringkas:'Delegasi sekolah memborong medali pada Olimpiade Sains Nasional tingkat kabupaten.', isi:'Pada OSN tingkat kabupaten tahun ini, sekolah berhasil meraih predikat Juara Umum dengan total 3 medali emas, 2 perak, dan 4 perunggu di berbagai bidang sains.' },
    { kat:'Pengumuman', tgl:'25 Apr 2026', judul:'Pembukaan PPDB Gelombang 1 Tahun 2026/2027', ringkas:'Penerimaan peserta didik baru gelombang pertama resmi dibuka. Kuota terbatas.', isi:'Penerimaan Peserta Didik Baru (PPDB) gelombang 1 untuk tahun pelajaran 2026/2027 resmi dibuka mulai 25 April 2026. Pendaftaran dapat dilakukan secara online maupun langsung ke sekolah.' }
  ];

  var AGENDA = [
    { d:'09', m:'Jun', judul:'Ujian Akhir Semester Genap', wkt:'07.30 – 12.00 WIB', tmp:'Seluruh ruang kelas', tag:'Akademik' },
    { d:'14', m:'Jun', judul:'Rapat Pleno Kenaikan Kelas', wkt:'13.00 – 16.00 WIB', tmp:'Aula Utama', tag:'Internal' },
    { d:'20', m:'Jun', judul:'Pentas Seni & Pembagian Rapor', wkt:'08.00 – 11.00 WIB', tmp:'Lapangan Sekolah', tag:'Kegiatan' },
    { d:'01', m:'Jul', judul:'Daftar Ulang Peserta Didik Baru', wkt:'08.00 – 14.00 WIB', tmp:'Ruang TU', tag:'PPDB' }
  ];

  var PRESTASI = [
    { thn:'2026', judul:'Juara 1 National Robotic Competition', tk:'Nasional', nama:'Tim Robotik' },
    { thn:'2026', judul:'Juara Umum Olimpiade Sains Kabupaten', tk:'Kabupaten', nama:'Delegasi OSN' },
    { thn:'2025', judul:'Medali Emas MTQ Pelajar Provinsi', tk:'Provinsi', nama:'Aisyah Nur R.' },
    { thn:'2025', judul:'Juara 2 Lomba Cerdas Cermat', tk:'Provinsi', nama:'Tim LCC' }
  ];

  var GURU = [
    { nama:'Dr. H. Ahmad Fauzi, M.Pd.', jab:'Kepala Sekolah', mapel:'Manajemen Pendidikan' },
    { nama:'Siti Rohmah, S.Pd.', jab:'Wakil Kurikulum', mapel:'Matematika' },
    { nama:'Bambang Sutejo, M.Sc.', jab:'Guru', mapel:'Fisika' },
    { nama:'Nur Halimah, S.Pd.', jab:'Guru', mapel:'Bahasa Inggris' },
    { nama:'Hendra Wijaya, S.Kom.', jab:'Guru', mapel:'Informatika' },
    { nama:'Dewi Lestari, S.Pd.', jab:'Wali Kelas', mapel:'Biologi' }
  ];

  var katClass = { 'Prestasi':'badge-warn', 'Kegiatan':'badge-info', 'Pengumuman':'badge-plum' };
  var NEWSIMG = ['photo-1531545514256-b1400bc00f31','photo-1427504494785-3a9ca7044f45','photo-1497633762265-9d179a990aa6','photo-1517486808906-6ca8b3f04846','photo-1541339907198-e08756dedf3f','photo-1523580846011-d3a5bc25702b'];
  function imgUrl(id,w){ return 'https://images.unsplash.com/'+id+'?w='+(w||600)+'&q=80&auto=format&fit=crop'; }

  // ---- Helper ----
  function el(html){ var t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstChild; }
  function phNews(label){ return '<div class="ph" style="aspect-ratio:16/10"><span class="ph-label">'+label+'</span></div>'; }
  function photoNews(idx){ return '<div class="photo" style="aspect-ratio:16/10;background-image:url(\''+imgUrl(NEWSIMG[idx%NEWSIMG.length])+'\')"></div>'; }

  // ---- Render Berita ----
  function renderNews(state){
    var grid = document.getElementById('news-grid');
    if(!grid) return;
    grid.innerHTML='';

    if(state==='loading'){
      for(var i=0;i<3;i++){
        grid.appendChild(el('<article class="card news-card"><div class="sk sk-img"></div><div class="pad" style="display:flex;flex-direction:column;gap:10px"><div class="sk sk-line" style="width:30%"></div><div class="sk sk-line" style="width:90%;height:18px"></div><div class="sk sk-line" style="width:70%;height:18px"></div><div class="sk sk-line" style="width:50%"></div></div></article>'));
      }
      return;
    }
    if(state==='empty'){
      grid.appendChild(el('<div class="empty" style="grid-column:1/-1"><div class="empty-ic"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 11h8M8 15h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></div><h3>Belum ada berita</h3><p>Tambahkan baris baru pada Google Sheet <b>Berita</b> dan halaman ini akan otomatis menampilkannya.</p><a class="btn btn-soft btn-sm" href="#">Buka panduan CMS</a></div>'));
      return;
    }
    // loaded
    NEWS.forEach(function(n, idx){
      var card = el('<article class="card news-card card-hover">'+
        photoNews(idx)+
        '<div class="pad">'+
          '<div class="news-meta"><span class="badge '+(katClass[n.kat]||'badge-muted')+'">'+n.kat+'</span><span class="muted" style="font-size:.8rem">'+n.tgl+'</span></div>'+
          '<h3 class="news-title">'+n.judul+'</h3>'+
          '<p class="news-excerpt">'+n.ringkas+'</p>'+
          '<button class="news-link" data-news="'+idx+'">Baca selengkapnya <svg viewBox="0 0 24 24" fill="none" width="16"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'+
        '</div></article>');
      grid.appendChild(card);
    });
    grid.querySelectorAll('[data-news]').forEach(function(b){
      b.addEventListener('click', function(){ openNews(NEWS[+b.getAttribute('data-news')]); });
    });
  }

  // ---- Modal detail berita ----
  function openNews(n){
    var m = document.getElementById('news-modal');
    var idx = NEWS.indexOf(n);
    var hero = m.querySelector('.modal-hero');
    hero.className='modal-hero photo'; hero.style.backgroundImage="url('"+imgUrl(NEWSIMG[idx%NEWSIMG.length],900)+"')"; hero.innerHTML='';
    m.querySelector('[data-m-kat]').className = 'badge '+(katClass[n.kat]||'badge-muted');
    m.querySelector('[data-m-kat]').textContent = n.kat;
    m.querySelector('[data-m-tgl]').textContent = n.tgl;
    m.querySelector('[data-m-judul]').textContent = n.judul;
    m.querySelector('[data-m-isi]').textContent = n.isi;
    m.classList.add('open'); document.body.style.overflow='hidden';
  }
  function closeNews(){ document.getElementById('news-modal').classList.remove('open'); document.body.style.overflow=''; }

  // ---- Render Agenda ----
  function renderAgenda(){
    var wrap=document.getElementById('agenda-list'); if(!wrap) return;
    AGENDA.forEach(function(a){
      wrap.appendChild(el('<div class="card agenda-row card-hover"><div class="adate"><b>'+a.d+'</b><span>'+a.m+'</span></div><div class="ainfo"><span class="badge badge-brand" style="margin-bottom:6px">'+a.tag+'</span><h3>'+a.judul+'</h3><div class="ameta"><span>🕘 '+a.wkt+'</span><span>📍 '+a.tmp+'</span></div></div></div>'));
    });
  }

  // ---- Render Prestasi ----
  function renderPrestasi(){
    var wrap=document.getElementById('prestasi-grid'); if(!wrap) return;
    PRESTASI.forEach(function(p){
      wrap.appendChild(el('<div class="card prestasi-card card-hover pad"><div class="ptrophy"><svg viewBox="0 0 24 24" fill="none"><path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0zM7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div><span class="badge badge-warn">'+p.tk+' · '+p.thn+'</span><h3>'+p.judul+'</h3><p class="muted" style="font-size:.86rem">'+p.nama+'</p></div>'));
    });
  }

  // ---- Render Guru ----
  function renderGuru(){
    var wrap=document.getElementById('guru-grid'); if(!wrap) return;
    GURU.forEach(function(g){
      var ini=g.nama.replace(/Dr\.|H\.|S\.Pd\.|M\.Pd\.|M\.Sc\.|S\.Kom\.|,/g,'').trim().split(' ').slice(0,2).map(function(x){return x[0];}).join('').toUpperCase();
      wrap.appendChild(el('<div class="card guru-card card-hover"><div class="guru-photo"><span class="mono">'+ini+'</span></div><div class="pad" style="text-align:center"><h3 style="font-size:1rem">'+g.nama+'</h3><div class="badge badge-brand" style="margin:8px 0 4px">'+g.jab+'</div><p class="muted" style="font-size:.82rem">'+g.mapel+'</p></div></div>'));
    });
  }

  // ---- FAQ accordion ----
  function initFaq(){
    document.querySelectorAll('.faq-q').forEach(function(q){
      q.addEventListener('click', function(){
        var item=q.closest('.faq-item'); var open=item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(function(i){ i.classList.remove('open'); });
        if(!open) item.classList.add('open');
      });
    });
  }

  // ---- CMS demo controls ----
  function initDemo(){
    document.querySelectorAll('[data-state]').forEach(function(btn){
      btn.addEventListener('click', function(){
        document.querySelectorAll('[data-state]').forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        var st=btn.getAttribute('data-state');
        if(st==='loading'){ renderNews('loading'); setTimeout(function(){ if(btn.classList.contains('active')){ renderNews('loaded'); document.querySelector('[data-state="loaded"]').classList.add('active'); btn.classList.remove('active'); } }, 1600); }
        else renderNews(st);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    renderNews('loaded'); renderAgenda(); renderPrestasi(); renderGuru(); initFaq(); initDemo();
    document.querySelectorAll('[data-close-news]').forEach(function(b){ b.addEventListener('click', closeNews); });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeNews(); });
  });
})();