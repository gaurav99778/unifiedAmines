import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroMolecule3D from './HeroMolecule3D';
import './Hero.css';

export default function Hero({ isPreloading }) {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    if (isPreloading) return;

    const tl = gsap.timeline();

    if (visualRef.current) {
      tl.fromTo(
        visualRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out' }
      );
    }

    if (textRef.current) {
      tl.fromTo(
        textRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.out'
        },
        '-=1.2'
      );
    }
  }, [isPreloading]);

  return (
    <section className="hero-section" ref={heroRef}>
      {/* 3D Immersive Molecular Canvas in the Background */}
      <div className="hero-3d-backdrop" ref={visualRef} style={{ opacity: 0 }}>
        <HeroMolecule3D />
      </div>

      {/* Atmospheric Radial Gradient Mask for Crisp Legibility */}
      <div className="hero-atmosphere-radial"></div>

      {/* Foreground Hero Content (Centered) */}
      <div className="hero-wrapper">
        <div className="hero-content" ref={textRef}>
          
          <div className="" style={{ opacity: 0 }}>  
          </div>

          <h1 className="hero-title" style={{ opacity: 0 }}>
            Engineering <span className="text-gradient">Tomorrow's</span> Chemistry
          </h1>

          <p className="hero-subtitle" style={{ opacity: 0 }}>
            Precision amine formulations and advanced surfactant technology,
            manufactured for global enterprise industries with zero-impurity standards.
          </p>

          <div className="hero-actions" style={{ opacity: 0 }}>
            <Link to="/products" className="magnetic-btn primary-btn">
              Explore Catalog <ArrowRight size={18} className="btn-arrow" style={{ marginLeft: '0.5rem' }} />
            </Link>
            <Link to="/about" className="magnetic-btn secondary-btn">
              Our Story
            </Link>
          </div>

          {/* Clean Trust Proof Bar */}
          <div className="hero-trust-bar" style={{ opacity: 0 }}>
            <div className="trust-pill">
              <span className="pill-dot orange"></span>
              <span>99.98% High Purity</span>
            </div>
            <div className="trust-pill">
              <span className="pill-dot blue"></span>
              <span>ISO 9001:2015 & REACH Compliant</span>
            </div>
            <div className="trust-pill">
              <span className="pill-dot gold"></span>
              <span>Global Enterprise Supply</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
