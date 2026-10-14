import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isPreloading, setIsPreloading] = useState(() => !sessionStorage.getItem('hasPreloaded'));

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('hasPreloaded', 'true');
    setIsPreloading(false);
  };

  useEffect(() => {
    if (isPreloading) {
      // Strictly lock scrolling and hide scrollbar
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      
      const preventScroll = (e) => e.preventDefault();
      const preventKeyScroll = (e) => {
        if (['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
          e.preventDefault();
        }
      };

      // Force scroll position to top
      window.scrollTo(0, 0);
      
      // Add event listeners to block all scroll inputs
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      window.addEventListener('keydown', preventKeyScroll, { passive: false });

      return () => {
        // Restore scrolling once preloader completes
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
        window.removeEventListener('keydown', preventKeyScroll);
      };
    }

    // Initialize Lenis ONLY after preloader is finished
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.15,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, [isPreloading]);

  return (
    <BrowserRouter>
      {isPreloading && <Preloader onComplete={handlePreloaderComplete} />}

      <CustomCursor />

      {/* Hide the main app content visually while preloading, but keep it in DOM so it's ready */}
      <div className="app" style={{ visibility: isPreloading ? 'hidden' : 'visible', opacity: isPreloading ? 0 : 1, transition: 'opacity 1s ease' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home isPreloading={isPreloading} />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
