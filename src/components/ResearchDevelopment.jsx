import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FlaskConical, Atom, Microscope } from 'lucide-react';
import './ResearchDevelopment.css';

gsap.registerPlugin(ScrollTrigger);

export default function ResearchDevelopment() {
  const rdRef = useRef(null);

  const molecules = useMemo(() => {
    return [...Array(6)].map(() => ({
      width: `${Math.random() * 100 + 50}px`,
      height: `${Math.random() * 100 + 50}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.3 + 0.1
    }));
  }, []);

  useEffect(() => {
    const el = rdRef.current;
    
    // Animate the floating molecules
    gsap.to(el.querySelectorAll('.floating-molecule'), {
      y: 'random(-30, 30)',
      x: 'random(-30, 30)',
      rotation: 'random(-45, 45)',
      duration: 'random(3, 5)',
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.1
    });

    // Animate content reveal
    gsap.fromTo(el.querySelectorAll('.rd-content > *'), 
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 60%',
        }
      }
    );
  }, []);

  return (
    <section className="section rd-section" ref={rdRef}>
      <div className="rd-bg-particles">
        {/* Abstract Molecules */}
        {molecules.map((style, i) => (
          <div className="floating-molecule" key={i} style={style}></div>
        ))}
      </div>

      <div className="container rd-container">
        <div className="rd-content">
          <h2 className="section-title">
            <span className="text-gradient">Molecular</span> Intelligence
          </h2>
          <p className="rd-description">
            Our state-of-the-art laboratory is where impossible chemical challenges are solved. 
            We synthesize, analyze, and refine custom compounds with atomic precision to create 
            the exact properties your application demands.
          </p>
          
          <div className="rd-features">
            <div className="rd-feature">
              <div className="rd-icon-box glass-panel"><FlaskConical /></div>
              <div>
                <h4>Custom Synthesis</h4>
                <p>Tailored molecular design.</p>
              </div>
            </div>
            <div className="rd-feature">
              <div className="rd-icon-box glass-panel"><Microscope /></div>
              <div>
                <h4>Micro-Analysis</h4>
                <p>Parts-per-billion purity verification.</p>
              </div>
            </div>
            <div className="rd-feature">
              <div className="rd-icon-box glass-panel"><Atom /></div>
              <div>
                <h4>Nanotechnology</h4>
                <p>Next-gen formulation development.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
