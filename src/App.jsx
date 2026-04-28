import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { logEvent } from './firebase';
import BottomNav from './components/BottomNav';
import BilingualToggle from './components/BilingualToggle';
import BadgePopup from './components/BadgePopup';
import TricolorBand from './components/TricolorBand';
import Home from './pages/Home';
import StoryMode from './pages/StoryMode';
import Guide from './pages/Guide';
import Ask from './pages/Ask';
import Timeline from './pages/Timeline';

// Analytics route tracker component
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    logEvent('page_view', {
      page_path: location.pathname,
      page_title: document.title,
    });

    // Also push to gtag if available
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AnalyticsTracker />
        <div className="app-shell">
          {/* Top tricolor band */}
          <TricolorBand className="app-top-band" />
          
          {/* App header */}
          <header className="app-header">
            <div className="app-header-left">
              <span className="app-logo">🗳️</span>
              <span className="app-title">Matdata Mitra</span>
            </div>
            <BilingualToggle />
          </header>

          {/* Main content */}
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/story" element={<StoryMode />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/ask" element={<Ask />} />
              <Route path="/timeline" element={<Timeline />} />
            </Routes>
          </main>

          {/* Bottom nav */}
          <BottomNav />
          
          {/* Badge popup overlay */}
          <BadgePopup />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}
