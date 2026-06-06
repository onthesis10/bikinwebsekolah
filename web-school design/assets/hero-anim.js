/* ============================================================
   SekolahKu Hub — Hero ambient animation
   Cinematic cross-fade (Ken Burns) + lime particle network +
   ring dial count-up + gentle glass-card float.
   Respects prefers-reduced-motion.
   ============================================================ */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var PHOTOS = [
    'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1500&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1500&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1500&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1562774053-701939374585?w=1500&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1500&q=80&auto=format&fit=crop'
  ];

  function buildSlides() {
    var media = document.getElementById('imm-media');
    if (!media) return null;
    var slides = PHOTOS.map(function (url, i) {
      var s = document.createElement('div');
      s.className = 'imm-slide' + (i === 0 ? ' on' : '');
      s.style.backgroundImage = "url('" + url + "')";
      media.appendChild(s);
      // preload
      var im = new Image(); im.src = url;
      return s;
    });
    return slides;
  }

  function runCrossfade(slides) {
    if (!slides || slides.length < 2 || reduce) return;
    var cur = 0;
    setInterval(function () {
      slides[cur].classList.remove('on');
      cur = (cur + 1) % slides.length;
      slides[cur].classList.add('on');
    }, 4600);
  }

  // ---- Ring dial count-up ----
  function animateRing() {
    var ring = document.querySelector('.ring');
    if (!ring) return;
    var target = parseFloat(ring.getAttribute('data-p') || ring.style.getPropertyValue('--p') || '78');
    if (reduce) { ring.style.setProperty('--p', target); return; }
    var start = null, dur = 1500;
    ring.style.setProperty('--p', 0);
    function step(t) {
      if (start === null) start = t;
      var k = Math.min((t - start) / dur, 1);
      var e = 1 - Math.pow(1 - k, 3);
      ring.style.setProperty('--p', (target * e).toFixed(1));
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ---- Particle network ----
  function runParticles() {
    var canvas = document.getElementById('imm-fx');
    if (!canvas || reduce) return;
    var ctx = canvas.getContext('2d');
    var W, H, DPR = Math.min(window.devicePixelRatio || 1, 2);
    var pts = [], raf = null;

    function resize() {
      var r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      var count = Math.round(Math.min(48, Math.max(20, W / 26)));
      pts = [];
      for (var i = 0; i < count; i++) {
        pts.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.6 + 0.6,
          glow: Math.random() < 0.18
        });
      }
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      var i, j, a, b, dx, dy, d, max = 132;
      for (i = 0; i < pts.length; i++) {
        a = pts[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < -20) a.x = W + 20; if (a.x > W + 20) a.x = -20;
        if (a.y < -20) a.y = H + 20; if (a.y > H + 20) a.y = -20;
      }
      // links
      for (i = 0; i < pts.length; i++) {
        a = pts[i];
        for (j = i + 1; j < pts.length; j++) {
          b = pts[j];
          dx = a.x - b.x; dy = a.y - b.y; d = Math.sqrt(dx * dx + dy * dy);
          if (d < max) {
            var o = (1 - d / max) * 0.32;
            ctx.strokeStyle = 'rgba(200,242,80,' + o.toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      // nodes
      for (i = 0; i < pts.length; i++) {
        a = pts[i];
        if (a.glow) {
          ctx.shadowColor = 'rgba(200,242,80,.9)'; ctx.shadowBlur = 10;
          ctx.fillStyle = 'rgba(200,242,80,.95)';
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = 'rgba(235,240,220,.55)';
        }
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    }

    resize();
    tick();
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 200); });

    // pause when offscreen
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        en.forEach(function (e) {
          if (e.isIntersecting) { if (!raf) tick(); }
          else { if (raf) { cancelAnimationFrame(raf); raf = null; } }
        });
      }, { threshold: 0 }).observe(canvas);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var slides = buildSlides();
    runCrossfade(slides);
    animateRing();
    runParticles();
  });
})();
