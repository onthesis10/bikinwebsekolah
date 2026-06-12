import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StartPage from './pages/StartPage';
import ProPage from './pages/ProPage';
import PPDBPage from './pages/PPDBPage';
import PPDBDashboardPage from './pages/PPDBDashboardPage';
import ScrollToTop from './components/ScrollToTop';

function ScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal');
      if (!els.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      els.forEach((el) => {
        el.classList.remove('in');
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}

function CanonicalLink() {
  const location = useLocation();

  useEffect(() => {
    const baseUrl = 'https://bikinwebsekolah.web.id';
    const path = location.pathname.endsWith('/') && location.pathname !== '/'
      ? location.pathname.slice(0, -1)
      : location.pathname;

    const canonicalUrl = `${baseUrl}${path}`;

    // Update <link rel="canonical">
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute('href', canonicalUrl);
    } else {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      canonicalEl.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonicalEl);
    }

    // Update <meta property="og:url">
    let ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (ogUrlEl) {
      ogUrlEl.setAttribute('content', canonicalUrl);
    } else {
      ogUrlEl = document.createElement('meta');
      ogUrlEl.setAttribute('property', 'og:url');
      ogUrlEl.setAttribute('content', canonicalUrl);
      document.head.appendChild(ogUrlEl);
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollReveal />
      <CanonicalLink />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/pro" element={<ProPage />} />
        <Route path="/ppdb" element={<PPDBPage />} />
        <Route path="/ppdb/dashboard" element={<PPDBDashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;

