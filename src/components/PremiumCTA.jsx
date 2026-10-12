import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import './PremiumCTA.css';

gsap.registerPlugin(ScrollTrigger);

export default function PremiumCTA() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const elements = contentRef.current.children;
    
    gsap.fromTo(elements, 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%'
        }
      }
    );

    // Particle fade in
    const particles = section.querySelectorAll('.cta-particle');
    gsap.fromTo(particles,
      { opacity: 0 },
      {
        opacity: 0.6,
        duration: 1.5,
        stagger: 0.05,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%'
        }
      }
    );

  }, []);

  return (
    <section className="premium-cta-section" ref={sectionRef}>
      {/* Minimal Background */}
      <div className="cta-bg-glow"></div>
      <div className="cta-blueprint-lines"></div>
      <div className="cta-energy-wave"></div>
      
      {/* Particle System */}
      <div className="cta-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className={`cta-particle p-${i}`}></div>
        ))}
      </div>

      <div className="container cta-container" ref={contentRef}>
        <div className="cta-label">READY TO BUILD THE RIGHT SOLUTION?</div>
        
        <h2 className="cta-heading">
          <div className="line">Let's <span className="text-gradient-orange">Engineer</span></div>
          <div className="line">Your Next</div>
          <div className="line">Breakthrough.</div>
        </h2>
        
        <p className="cta-subtext">
          Whether you need high-performance surfactants, specialty amines, or custom formulations, our team is ready to help you build the right chemical solution.
        </p>
        
        <div className="cta-buttons">
          <button className="cta-primary-btn interactive">
            Request a Quote <ArrowRight size={18} className="cta-arrow" />
          </button>
          
          <button className="cta-secondary-btn interactive">
            Download Product Catalog
          </button>
        </div>
      </div>
    </section>
  );
}
