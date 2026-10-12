import React, { useState, useEffect, useRef, useMemo } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const t = setTimeout(() => setMobileMenuOpen(false), 0);
    window.scrollTo(0, 0);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // Handle mobile menu scroll locking and animation
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Animate links in
      gsap.fromTo('.mobile-nav-link, .mobile-nav-cta', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      );
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Initial Reveal Animation
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate Navbar down
    tl.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
    
    // Prominent Logo Reveal
    tl.fromTo(logoRef.current,
      { scale: 0.8, opacity: 0, filter: 'blur(10px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out' },
      "-=0.6"
    );

    // Stagger Links
    if (linksRef.current) {
      tl.fromTo(linksRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        "-=0.8"
      );
    }
  }, []);

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Prominent Logo */}
        <Link to="/" className="navbar-logo interactive" ref={logoRef}>
          <img 
            src="/logo.png" 
            alt="Unified Amines Logo" 
            className="logo-image"
            onError={(e) => { 
              e.target.style.display = 'none'; 
              e.target.nextSibling.style.display = 'block'; 
            }} 
          />
          <span className="logo-text" style={{ display: 'none' }}>
            Unified <span className="text-gradient">Amines</span>
          </span>
        </Link>

        {/* Links */}
        <div className="navbar-links" ref={linksRef}>
          <NavLink to="/" className={({isActive}) => isActive ? "nav-link active interactive" : "nav-link interactive"} end>
            Home
          </NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "nav-link active interactive" : "nav-link interactive"}>
            About Us
          </NavLink>
          <NavLink to="/products" className={({isActive}) => isActive ? "nav-link active interactive" : "nav-link interactive"}>
            Products
          </NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? "nav-link active interactive" : "nav-link interactive"}>
            Contact Us
          </NavLink>
        </div>

        {/* CTA */}
        <div className="navbar-cta">
          <MagneticButton href="/contact">
            Request Quote
          </MagneticButton>
        </div>

        <button 
          className={`mobile-menu-btn interactive ${mobileMenuOpen ? 'active' : ''}`} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="hamburger">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <NavLink to="/" end className="mobile-nav-link interactive" onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/about" className="mobile-nav-link interactive" onClick={() => setMobileMenuOpen(false)}>About Us</NavLink>
          <NavLink to="/products" className="mobile-nav-link interactive" onClick={() => setMobileMenuOpen(false)}>Products</NavLink>
          <NavLink to="/contact" className="mobile-nav-link interactive" onClick={() => setMobileMenuOpen(false)}>Contact Us</NavLink>
          <div className="mobile-nav-cta" style={{ marginTop: '3rem' }}>
            <Link to="/contact" className="primary-btn interactive" onClick={() => setMobileMenuOpen(false)}>
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
