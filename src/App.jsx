import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Loader component
import Loader from './components/feedback/Loader/Loader';

// Import child components
import TopNavBar from './components/common/TopNavBar';
import Home from './pages/Home/Home';
import Footer from './components/common/Footer';
import CreativeStudio from './pages/CreativeStudio/CreativeStudio';
import ConsultPage from './pages/Consult/ConsultPage';
import CommunicatePage from './pages/Communicate/CommunicatePage';
import AboutPage from './pages/About/AboutPage';
import StaggeredMenu from './components/common/StaggeredMenu/StaggeredMenu';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  { label: 'Consult', link: '/consult' },
  { label: 'Create', link: '/creative-studio' },
  { label: 'Communicate', link: '/communicate' },
  { label: 'About', link: '/about' }
];

const socialItems = [
  { label: 'LinkedIn', link: 'https://linkedin.com' },
  { label: 'Instagram', link: 'https://instagram.com' }
];

// Helper component to handle scrolling on route or hash changes
function ScrollToAnchor() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Find element by hash ID (removing the # character)
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          if (window.lenis) {
            window.lenis.scrollTo(element);
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const websiteRef = useRef(null);

  // Check if dark mode is preferred or saved in storage
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Toggle theme state and save to local storage
  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  // Sync theme state with index.html root class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // custom ease out
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // Share lenis globally for Loader controller
    window.lenis = lenis;

    // Bind scroll listener for GSAP update trigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Connect GSAP ticker
    const gsapTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(gsapTicker);
    gsap.ticker.lagSmoothing(0);

    // Standard RAF loop
    let rafId;
    const updateRaf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(updateRaf);
    };
    rafId = requestAnimationFrame(updateRaf);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(rafId);
      gsap.ticker.remove(gsapTicker);
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);

  return (
    <>
      <ScrollToAnchor />
      {showLoader && (
        <Loader
          websiteRef={websiteRef}
          onComplete={() => setShowLoader(false)}
          isDark={isDark}
        />
      )}
      <div
        ref={websiteRef}
        className="min-h-screen bg-background text-on-background font-body-md text-body-md transition-colors duration-400"
        style={
          showLoader
            ? {
                opacity: 0,
                position: 'relative',
                zIndex: 9980, // Stacks behind loader-bg (9990)
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
              }
            : {
                opacity: 1,
                position: 'relative',
                zIndex: 'auto',
                transformOrigin: 'center center',
              }
        }
      >
        {/* Global Navigation Header */}
        <div className="hidden lg:block">
          <TopNavBar isDark={isDark} toggleTheme={toggleTheme} showLoader={showLoader} />
        </div>
        <div className="block lg:hidden">
          <StaggeredMenu
            isDark={isDark}
            toggleTheme={toggleTheme}
            items={menuItems}
            socialItems={socialItems}
            colors={isDark ? ['#333333', '#111111'] : ['#dadada', '#eeeeee']}
            displaySocials={true}
            displayItemNumbering={true}
          />
        </div>

        {/* Page Content Routed via React Router */}
        <main>
          <Routes>
            <Route
              path="/"
              element={<Home isDark={isDark} />}
            />
            <Route path="/creative-studio" element={<CreativeStudio />} />
            <Route path="/consult" element={<ConsultPage isDark={isDark} />} />
            <Route path="/communicate" element={<CommunicatePage isDark={isDark} />} />
            <Route path="/about" element={<AboutPage isDark={isDark} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Brand Footer */}
        <Footer />
      </div>
    </>
  );
}

