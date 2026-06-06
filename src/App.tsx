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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollReveal />
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
