/* SekolahKu Suite — shared UI helpers */
(function () {
  // Reveal on scroll
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  // Sticky nav shadow on scroll
  function initNav() {
    var nav = document.querySelector('[data-nav]');
    if (!nav) return;
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 12); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile menu toggle
  function initMenu() {
    document.querySelectorAll('[data-menu-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = document.querySelector(btn.getAttribute('data-menu-btn'));
        if (target) { target.classList.toggle('open'); btn.classList.toggle('active'); }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initReveal(); initNav(); initMenu();
  });
})();