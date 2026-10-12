import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';
import './FeaturedTechnology.css';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedTechnology() {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightVisualRef = useRef(null);
  const svgRef = useRef(null);
  
  // Animation setup
  useEffect(() => {
    const section = sectionRef.current;
    
    // Left Content Animation
    const leftElements = leftContentRef.current.children;
    gsap.fromTo(leftElements, 
      { y: 40, opacity: 0 },
      {
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        }
      }
    );

    // Right Visual Animation
    const atoms = svgRef.current.querySelectorAll('.atom');
    const bonds = svgRef.current.querySelectorAll('.bond');
    const pulses = svgRef.current.querySelectorAll('.pulse-line');
    
    gsap.fromTo(rightVisualRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
        }
      }
    );

    gsap.fromTo(bonds,
      { strokeDasharray: "0, 1000" },
      {
        strokeDasharray: "1000, 0",
        duration: 1.5,
        stagger: 0.1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
        }
      }
    );

    gsap.fromTo(atoms,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.5)',
        delay: 0.5,
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
        }
      }
    );

    // Energy pulse infinite animation
    gsap.to(pulses, {
      strokeDashoffset: -1000,
      duration: 3,
      ease: 'linear',
      repeat: -1,
    });
    
  }, []);

  // Simple script to track mouse for the cursor halo effect over the molecule
  const handleMouseMove = (e) => {
    const wrapper = rightVisualRef.current.querySelector('.molecule-wrapper');
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    wrapper.style.setProperty('--cursor-x', `${x}px`);
    wrapper.style.setProperty('--cursor-y', `${y}px`);
  };

  return (
    <section className="featured-tech-section" ref={sectionRef}>
      <div className="ft-bg-gradients">
        <div className="ft-glow-blue"></div>
        <div className="ft-glow-orange"></div>
      </div>
      <div className="ft-blueprint-overlay"></div>
      
      <div className="container ft-container">
        
        {/* LEFT COLUMN */}
        <div className="ft-left" ref={leftContentRef}>
          <div className="ft-label">PRODUCT SPOTLIGHT</div>
          <h2 className="ft-heading">
            Cocamidopropyl Betaine <br />
            <span className="ft-highlight">(CAPB)</span>
          </h2>
          <p className="ft-paragraph">
            Engineered for unparalleled performance, our proprietary CAPB synthesis yields a high-purity amphoteric surfactant. It serves as a core building block for premium formulations, offering superior viscosity and extraordinary foam stability across demanding environments.
          </p>
          
          <div className="ft-chips">
            {['High Purity', 'Excellent Foam Stability', 'Global Export Grade', 'REACH Compliant'].map((chip, i) => (
              <div className="ft-chip interactive" key={i}>
                <Check size={16} className="ft-chip-icon" strokeWidth={2.5} />
                <span>{chip}</span>
              </div>
            ))}
          </div>
          
          <button className="ft-cta-btn interactive">
            Request Product Quote <ArrowRight size={18} className="ft-cta-arrow" />
          </button>
        </div>
        
        {/* RIGHT COLUMN */}
        <div className="ft-right" ref={rightVisualRef}>
          <div className="molecule-wrapper" onMouseMove={handleMouseMove}>
            <div className="cursor-halo"></div>
            {/* SVG Molecular Visualization */}
            <svg viewBox="0 0 500 500" className="ft-svg" ref={svgRef}>
              <defs>
                <linearGradient id="bondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-brand-blue-light)" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="var(--color-brand-blue)" stopOpacity="0.2"/>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Rotating Rings */}
              <g className="rotating-rings">
                <circle cx="250" cy="250" r="200" fill="none" stroke="rgba(42, 106, 212, 0.1)" strokeWidth="1" strokeDasharray="4 8" />
                <circle cx="250" cy="250" r="160" fill="none" stroke="rgba(255, 90, 0, 0.05)" strokeWidth="1" />
                <circle cx="250" cy="250" r="220" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="2" strokeDasharray="20 40 10 40" />
              </g>

              {/* Bonds (Paths) */}
              <g className="bonds-group">
                <path className="bond" d="M 250 250 L 250 150" stroke="url(#bondGrad)" strokeWidth="2" fill="none" />
                <path className="bond" d="M 250 250 L 336 200" stroke="url(#bondGrad)" strokeWidth="2" fill="none" />
                <path className="bond" d="M 250 250 L 336 300" stroke="url(#bondGrad)" strokeWidth="2" fill="none" />
                <path className="bond" d="M 250 250 L 250 350" stroke="url(#bondGrad)" strokeWidth="2" fill="none" />
                <path className="bond" d="M 250 250 L 164 300" stroke="url(#bondGrad)" strokeWidth="2" fill="none" />
                <path className="bond" d="M 250 250 L 164 200" stroke="url(#bondGrad)" strokeWidth="2" fill="none" />
                
                {/* Secondary bonds */}
                <path className="bond" d="M 336 200 L 400 160" stroke="url(#bondGrad)" strokeWidth="1.5" fill="none" opacity="0.6"/>
                <path className="bond" d="M 336 300 L 400 340" stroke="url(#bondGrad)" strokeWidth="1.5" fill="none" opacity="0.6"/>
                <path className="bond" d="M 164 200 L 100 160" stroke="url(#bondGrad)" strokeWidth="1.5" fill="none" opacity="0.6"/>
                <path className="bond" d="M 164 300 L 100 340" stroke="url(#bondGrad)" strokeWidth="1.5" fill="none" opacity="0.6"/>
                <path className="bond" d="M 250 150 L 200 100" stroke="url(#bondGrad)" strokeWidth="1.5" fill="none" opacity="0.6"/>
                <path className="bond" d="M 250 150 L 300 100" stroke="url(#bondGrad)" strokeWidth="1.5" fill="none" opacity="0.6"/>
              </g>

              {/* Energy Pulses */}
              <g className="pulses-group">
                <path className="pulse-line" d="M 250 250 L 336 200" stroke="var(--color-brand-orange)" strokeWidth="3" fill="none" strokeDasharray="15 300" filter="url(#glow)" />
                <path className="pulse-line" d="M 250 250 L 164 300" stroke="var(--color-brand-orange)" strokeWidth="3" fill="none" strokeDasharray="15 300" filter="url(#glow)" />
                <path className="pulse-line" d="M 164 200 L 100 160" stroke="var(--color-brand-blue-light)" strokeWidth="2" fill="none" strokeDasharray="10 200" filter="url(#glow)" />
                <path className="pulse-line" d="M 336 300 L 400 340" stroke="var(--color-brand-blue-light)" strokeWidth="2" fill="none" strokeDasharray="10 200" filter="url(#glow)" />
              </g>

              {/* Atoms */}
              <g className="atoms-group">
                <circle className="atom center-atom" cx="250" cy="250" r="16" fill="#0A3A8A" stroke="#2A6AD4" strokeWidth="3" filter="url(#glow)" />
                
                {/* Primary Ring */}
                <circle className="atom" cx="250" cy="150" r="10" fill="#1A1A1A" stroke="#2A6AD4" strokeWidth="2" />
                <circle className="atom" cx="336" cy="200" r="12" fill="#1A1A1A" stroke="#FF5A00" strokeWidth="2" />
                <circle className="atom" cx="336" cy="300" r="10" fill="#1A1A1A" stroke="#2A6AD4" strokeWidth="2" />
                <circle className="atom" cx="250" cy="350" r="12" fill="#1A1A1A" stroke="#2A6AD4" strokeWidth="2" />
                <circle className="atom" cx="164" cy="300" r="10" fill="#1A1A1A" stroke="#FF5A00" strokeWidth="2" />
                <circle className="atom" cx="164" cy="200" r="12" fill="#1A1A1A" stroke="#2A6AD4" strokeWidth="2" />
                
                {/* Secondary Ring */}
                <circle className="atom small" cx="400" cy="160" r="6" fill="#2A6AD4" />
                <circle className="atom small" cx="400" cy="340" r="6" fill="#2A6AD4" />
                <circle className="atom small" cx="100" cy="160" r="6" fill="#2A6AD4" />
                <circle className="atom small" cx="100" cy="340" r="6" fill="#2A6AD4" />
                <circle className="atom small" cx="200" cy="100" r="6" fill="#FF5A00" />
                <circle className="atom small" cx="300" cy="100" r="6" fill="#2A6AD4" />
              </g>
            </svg>
            
            {/* Particles */}
            <div className="particle-system">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className={`particle p-${i}`}></div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
