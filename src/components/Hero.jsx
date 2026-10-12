import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero({ isPreloading }) {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Wait until preloading is finished before animating
    if (isPreloading) return;

    // Advanced cinematic reveal
    const tl = gsap.timeline();
    
    tl.fromTo(
      textRef.current.children,
      { y: 120, opacity: 0, rotateX: 15 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.2 // slightly reduced delay since preloader handles the pause
      }
    );

  }, [isPreloading]);

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="hero-wrapper">
        <div className="hero-content" ref={textRef} style={{ perspective: '1000px' }}>
          <h1 className="hero-title" style={{ opacity: 0 }}>
            Engineering <br className="desktop-break" />
            <span className="text-gradient">Tomorrow's</span> <br className="mobile-break" /> Chemistry
          </h1>
          <p className="hero-subtitle" style={{ opacity: 0 }}>
            Award-winning B2B chemical manufacturing and distribution. 
            Precision formulations for the world's most demanding industries.
          </p>
          <div className="hero-actions" style={{ opacity: 0 }}>
            <Link to="/products" className="magnetic-btn primary-btn">
              Explore Catalog <ArrowRight size={20} className="btn-arrow" style={{ marginLeft: '0.5rem' }} />
            </Link>
            <Link to="/about" className="magnetic-btn secondary-btn">
              Our Story
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
