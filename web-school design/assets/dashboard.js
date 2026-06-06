/* ============================================================
   SekolahKu PPDB — Dashboard Panitia: data, render, filter, aksi
   ============================================================ */
(function () {
  var STATUS = {
    baru:        { label:'Baru',        cls:'badge-info'  },
    verifikasi:  { label:'Diverifikasi',cls:'badge-warn'  },
    diterima:    { label:'Diterima',    cls:'badge-ok'    },
    ditolak:     { label:'Ditolak',     cls:'badge-danger'},
    cadangan:    { label:'Cadangan',    cls:'badge-plum'  }
  };

  var DATA = [
    { id:'PPDB-2026-0431', nama:'Muhammad Rizky Pratama', asal:'SMPN 3 Bandung', jalur:'Reguler', gel:'G1', jur:'Rekayasa Perangkat Lunak', tgl:'12 Mei 2026', wa:'0812-3456-7890', st:'diterima' },
    { id:'PPDB-2026-0432', nama:'Siti Aisyah Nurhaliza', asal:'MTs Al-Falah', jalur:'Prestasi', gel:'G1', jur:'Multimedia / DKV', tgl:'12 Mei 2026', wa:'0813-2222-1010', st:'verifikasi' },
    { id:'PPDB-2026-0433', nama:'Bayu Setiawan', asal:'SMPN 1 Cimahi', jalur:'Reguler', gel:'G1', jur:'Teknik Komputer & Jaringan', tgl:'13 Mei 2026', wa:'0857-9988-1234', st:'baru' },
    { id:'PPDB-2026-0434', nama:'Dewi Lestari', asal:'SMP Mutiara', jalur:'Afirmasi', gel:'G1', jur:'Akuntansi', tgl:'13 Mei 2026', wa:'0812-7766-5544', st:'diterima' },
    { id:'PPDB-2026-0435', nama:'Ahmad Fadli Rahman', asal:'MTsN 2 Bandung', jalur:'Prestasi', gel:'G1', jur:'Rekayasa Perangkat Lunak', tgl:'14 Mei 2026', wa:'0896-1212-3434', st:'cadangan' },
    { id:'PPDB-2026-0436', nama:'Nabila Putri Andini', asal:'SMPN 5 Bandung', jalur:'Reguler', gel:'G2', jur:'Multimedia / DKV', tgl:'15 Mei 2026', wa:'0812-5050-6060', st:'baru' },
    { id:'PPDB-2026-0437', nama:'Rangga Dwi Saputra', asal:'SMP Harapan', jalur:'Reguler', gel:'G2', jur:'Teknik Elektronika', tgl:'15 Mei 2026', wa:'0821-3030-9090', st:'ditolak' },
    { id:'PPDB-2026-0438', nama:'Putri Amelia Sari', asal:'MTs Darussalam', jalur:'Afirmasi', gel:'G2', jur:'Akuntansi', tgl:'16 Mei 2026', wa:'0812-1414-5656', st:'verifikasi' },
    { id:'PPDB-2026-0439', nama:'Fauzan Aziz Maulana', asal:'SMPN 8 Bandung', jalur:'Prestasi', gel:'G2', jur:'Teknik Komputer & Jaringan', tgl:'17 Mei 2026', wa:'0857-7878-1212', st:'diterima' },
    { id:'PPDB-2026-0440', nama:'Kirana Maharani', asal:'SMP Bina Insani', jalur:'Reguler', gel:'G2', jur:'Rekayasa Perangkat Lunak', tgl:'18 Mei 2026', wa:'0813-9090-3434', st:'baru' },
    { id:'PPDB-2026-0441', nama:'Yoga Pratama Wijaya', asal:'SMPN 12 Bandung', jalur:'Reguler', gel:'G2', jur:'Teknik Elektronika', tgl:'18 Mei 2026', wa:'0812-6767-8989', st:'verifikasi' },
    { id:'PPDB-2026-0442', nama:'Salsabila Rahmadhani', asal:'MTs Al-Hikmah', jalur:'Prestasi', gel:'G2', jur:'Multimedia / DKV', tgl:'19 Mei 2026', wa:'0896-4545-6767', st:'cadangan' }
  ];

  var state = { q:'', gel:'', jalur:'', st:'', loading:false };

  function counts(){
    var c = { total:DATA.length, baru:0, verifikasi:0, diterima:0, ditolak:0, cadangan:0 };
    DATA.forEach(function(d){ c[d.st]++; });
    return c;
  }

  function filtered(){
    return DATA.filter(function(d){
      if(state.gel && d.gel!==state.gel) return false;
      if(state.jalur && d.jalur!==state.jalur) return false;
      if(state.st && d.st!==state.st) return false;
      if(state.q){ var q=state.q.toLowerCase(); if(d.nama.toLowerCase().indexOf(q)<0 && d.id.toLowerCase().indexOf(q)<0 && d.asal.toLowerCase().indexOf(q)<0) return false; }
      return true;
    });
  }

  // ---- KPI cards ----
  function renderKpi(){
    var c=counts();
    var wrap=document.getElementById('kpis'); if(!wrap) return;
    var items=[
      { k:'total', label:'Total Pendaftar', val:c.total, ic:'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1', tone:'brand' },
      { k:'baru', label:'Baru', val:c.baru, ic:'M12 8v8M8 12h8', tone:'info' },
      { k:'verifikasi', label:'Diverifikasi', val:c.verifikasi, ic:'M9 12l2 2 4-4', tone:'warn' },
      { k:'diterima', label:'Diterima', val:c.diterima, ic:'m5 13 4 4L19 7', tone:'ok' },
      { k:'ditolak', label:'Ditolak', val:c.ditolak, ic:'M6 6l12 12M18 6 6 18', tone:'danger' },
      { k:'cadangan', label:'Cadangan', val:c.cadangan, ic:'M12 6v6l4 2', tone:'plum' }
    ];
    wrap.innerHTML='';
    items.forEach(function(it){
      wrap.insertAdjacentHTML('beforeend',
        '<div class="card kpi-card t-'+it.tone+'"><div class="kpi-ic"><svg viewBox="0 0 24 24" fill="none"><path d="'+it.ic+'" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="kpi-num">'+it.val+'</div><div class="kpi-label">'+it.label+'</div></div>');
    });
  }

  // ---- Bar chart by status ----
  function renderChart(){
    var c=counts(); var wrap=document.getElementById('chart'); if(!wrap) return;
    var max=Math.max(c.baru,c.verifikasi,c.diterima,c.ditolak,c.cadangan,1);
    var bars=[['baru',c.baru],['verifikasi',c.verifikasi],['diterima',c.diterima],['ditolak',c.ditolak],['cadangan',c.cadangan]];
    wrap.innerHTML='';
    bars.forEach(function(b){
      var h=Math.round(b[1]/max*100);
      wrap.insertAdjacentHTML('beforeend','<div class="bar-col"><div class="bar-val">'+b[1]+'</div><div class="bar bar-'+b[0]+'" style="height:'+Math.max(h,6)+'%"></div><div class="bar-lbl">'+STATUS[b[0]].label+'</div></div>');
    });
  }

  // ---- Jurusan distribution ----
  function renderJur(){
    var wrap=document.getElementById('jur-list'); if(!wrap) return;
    var map={};
    DATA.forEach(function(d){ map[d.jur]=(map[d.jur]||0)+1; });
    var arr=Object.keys(map).map(function(k){ return [k,map[k]]; }).sort(function(a,b){ return b[1]-a[1]; });
    var max=Math.max.apply(null,arr.map(function(a){return a[1];}));
    wrap.innerHTML='';
    arr.forEach(function(a){
      wrap.insertAdjacentHTML('beforeend','<div class="jur-row"><div class="jur-top"><span>'+a[0]+'</span><b>'+a[1]+'</b></div><div class="jur-track"><div class="jur-fill" style="width:'+Math.round(a[1]/max*100)+'%"></div></div></div>');
    });
  }

  // ---- Table ----
  function actionBtns(d){
    if(d.st==='baru' || d.st==='verifikasi'){
      return '<div class="act"><button class="act-btn ok" data-act="diterima" data-id="'+d.id+'" title="Terima"><svg viewBox="0 0 24 24" fill="none"><path d="m5 13 4 4L19 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'+
        '<button class="act-btn danger" data-act="ditolak" data-id="'+d.id+'" title="Tolak"><svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>'+
        '<button class="act-btn" data-act="detail" data-id="'+d.id+'" title="Detail"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M12 11v5M12 8h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button></div>';
    }
    return '<div class="act"><button class="act-btn" data-act="detail" data-id="'+d.id+'" title="Detail"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M12 11v5M12 8h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button></div>';
  }

  function renderTable(){
    var tb=document.getElementById('rows'); if(!tb) return;
    var rows=filtered();
    document.getElementById('row-count').textContent=rows.length;

    if(state.loading){
      tb.innerHTML='';
      for(var i=0;i<6;i++){ tb.insertAdjacentHTML('beforeend','<tr><td colspan="7"><div class="sk" style="height:20px; border-radius:6px"></div></td></tr>'); }
      return;
    }
    if(!rows.length){
      tb.innerHTML='<tr><td colspan="7"><div class="t-empty"><div class="empty-ic"><svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.7"/><path d="m20 20-3-3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></div><h3>Tidak ada pendaftar</h3><p>Tidak ada data yang cocok dengan filter. Coba ubah atau reset filter.</p><button class="btn btn-soft btn-sm" id="reset2">Reset Filter</button></div></td></tr>';
      var r2=document.getElementById('reset2'); if(r2) r2.addEventListener('click', resetFilters);
      return;
    }
    tb.innerHTML='';
    rows.forEach(function(d){
      var s=STATUS[d.st];
      tb.insertAdjacentHTML('beforeend',
        '<tr data-row="'+d.id+'">'+
        '<td><div class="cell-name"><span class="av">'+initials(d.nama)+'</span><div><b>'+d.nama+'</b><span>'+d.id+'</span></div></div></td>'+
        '<td>'+d.asal+'</td>'+
        '<td><span class="badge badge-muted">'+d.jalur+'</span></td>'+
        '<td>'+d.gel+'</td>'+
        '<td class="td-jur">'+d.jur+'</td>'+
        '<td><span class="badge '+s.cls+'"><span class="dot"></span>'+s.label+'</span></td>'+
        '<td>'+actionBtns(d)+'</td></tr>');
    });
    tb.querySelectorAll('[data-act]').forEach(function(b){
      b.addEventListener('click', function(e){
        e.stopPropagation();
        var id=b.getAttribute('data-id'), act=b.getAttribute('data-act');
        if(act==='detail'){ openDetail(id); return; }
        setStatus(id, act);
      });
    });
    tb.querySelectorAll('[data-row]').forEach(function(tr){
      tr.addEventListener('click', function(){ openDetail(tr.getAttribute('data-row')); });
    });
  }

  function initials(n){ var p=n.split(' '); return (p[0][0]+(p[1]?p[1][0]:'')).toUpperCase(); }

  function setStatus(id, st){
    var d=DATA.find(function(x){ return x.id===id; });
    if(d){ d.st=st; renderKpi(); renderChart(); renderTable(); toast('Status '+id+' → '+STATUS[st].label); }
  }

  // ---- Detail drawer ----
  function openDetail(id){
    var d=DATA.find(function(x){ return x.id===id; }); if(!d) return;
    var dr=document.getElementById('drawer'); var b=dr.querySelector('.drawer-body'); var s=STATUS[d.st];
    dr.querySelector('.drawer-name').textContent=d.nama;
    dr.querySelector('.drawer-id').textContent=d.id;
    dr.querySelector('.drawer-av').textContent=initials(d.nama);
    b.innerHTML=
      '<div class="d-status"><span class="badge '+s.cls+'"><span class="dot"></span>'+s.label+'</span></div>'+
      '<div class="d-grid">'+
      field('Asal Sekolah', d.asal)+field('Jalur', d.jalur)+field('Gelombang', d.gel)+field('Tanggal Daftar', d.tgl)+
      field('Pilihan Jurusan', d.jur)+field('No. WhatsApp', d.wa)+
      '</div>'+
      '<div class="d-docs"><b>Berkas Terlampir</b><div class="doc-row">'+
        doc('Kartu Keluarga')+doc('Akta Kelahiran')+doc('Rapor 5 Sem')+doc('Pas Foto')+
      '</div></div>'+
      '<div class="d-actions">'+
        '<button class="btn btn-primary" data-d-act="diterima" data-id="'+d.id+'" style="flex:1"><svg viewBox="0 0 24 24" width="18" fill="none"><path d="m5 13 4 4L19 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Terima</button>'+
        '<button class="btn btn-ghost" data-d-act="cadangan" data-id="'+d.id+'" style="flex:1">Cadangan</button>'+
        '<button class="btn btn-ghost" data-d-act="ditolak" data-id="'+d.id+'" style="flex:1; color:var(--danger); border-color:var(--danger-50)">Tolak</button>'+
      '</div>';
    b.querySelectorAll('[data-d-act]').forEach(function(btn){
      btn.addEventListener('click', function(){ setStatus(btn.getAttribute('data-id'), btn.getAttribute('data-d-act')); openDetail(id); });
    });
    dr.classList.add('open'); document.body.style.overflow='hidden';
  }
  function field(l,v){ return '<div class="d-field"><span>'+l+'</span><b>'+v+'</b></div>'; }
  function doc(n){ return '<div class="doc"><svg viewBox="0 0 24 24" fill="none"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M14 3v6h6" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg><span>'+n+'</span></div>'; }
  function closeDrawer(){ document.getElementById('drawer').classList.remove('open'); document.body.style.overflow=''; }

  // ---- Toast ----
  var toEl;
  function toast(msg){
    if(!toEl){ toEl=document.createElement('div'); toEl.className='toast'; document.body.appendChild(toEl); }
    toEl.textContent=msg; toEl.classList.add('show');
    clearTimeout(toEl._t); toEl._t=setTimeout(function(){ toEl.classList.remove('show'); }, 2200);
  }

  // ---- Filters ----
  function resetFilters(){
    state.q=''; state.gel=''; state.jalur=''; state.st='';
    var si=document.getElementById('search'); if(si) si.value='';
    document.querySelectorAll('.fselect').forEach(function(s){ s.value=''; });
    document.querySelectorAll('.stat-pill').forEach(function(p){ p.classList.toggle('active', p.getAttribute('data-stat')===''); });
    renderTable();
  }

  function initFilters(){
    var si=document.getElementById('search');
    if(si) si.addEventListener('input', function(){ state.q=si.value; renderTable(); });
    document.getElementById('f-gel').addEventListener('change', function(e){ state.gel=e.target.value; renderTable(); });
    document.getElementById('f-jalur').addEventListener('change', function(e){ state.jalur=e.target.value; renderTable(); });
    document.querySelectorAll('.stat-pill').forEach(function(p){
      p.addEventListener('click', function(){
        document.querySelectorAll('.stat-pill').forEach(function(x){ x.classList.remove('active'); });
        p.classList.add('active'); state.st=p.getAttribute('data-stat'); renderTable();
      });
    });
    var rb=document.getElementById('reset'); if(rb) rb.addEventListener('click', resetFilters);
    var lb=document.getElementById('demo-load'); if(lb) lb.addEventListener('click', function(){
      state.loading=true; renderTable();
      setTimeout(function(){ state.loading=false; renderTable(); toast('Data berhasil dimuat'); }, 1500);
    });
    var ex=document.getElementById('export'); if(ex) ex.addEventListener('click', function(){ toast('Mengekspor '+filtered().length+' data ke CSV…'); });
  }

  // ---- Sidebar mobile ----
  function initSidebar(){
    var tg=document.getElementById('sb-toggle'); var sb=document.getElementById('sidebar'); var bg=document.getElementById('sb-bg');
    function close(){ sb.classList.remove('open'); bg.classList.remove('show'); }
    if(tg) tg.addEventListener('click', function(){ sb.classList.toggle('open'); bg.classList.toggle('show'); });
    if(bg) bg.addEventListener('click', close);
    document.querySelectorAll('.nav-link').forEach(function(l){
      l.addEventListener('click', function(e){ e.preventDefault(); document.querySelectorAll('.nav-link').forEach(function(x){x.classList.remove('active');}); l.classList.add('active'); close(); });
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    renderKpi(); renderChart(); renderJur(); renderTable(); initFilters(); initSidebar();
    document.querySelectorAll('[data-close-drawer]').forEach(function(b){ b.addEventListener('click', closeDrawer); });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeDrawer(); });
  });
})();