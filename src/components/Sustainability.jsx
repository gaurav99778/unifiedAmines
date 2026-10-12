import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf } from 'lucide-react';
import './Sustainability.css';

gsap.registerPlugin(ScrollTrigger);

export default function Sustainability() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    
    // Background color organic transition
    gsap.fromTo(el,
      { backgroundColor: '#050505' },
      {
        backgroundColor: '#05110a', // subtle dark green tint
        duration: 1,
        scrollTrigger: {
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      }
    );

    // Leaves/organic elements animation
    gsap.fromTo(el.querySelectorAll('.organic-leaf'),
      { y: 100, opacity: 0, rotation: -30 },
      {
        y: 0,
        opacity: 0.2,
        rotation: 0,
        duration: 1.5,
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
    <section className="section sustain-section" ref={sectionRef}>
      {/* Abstract organic leaves in background */}
      <div className="organic-leaf" style={{ top: '20%', left: '10%' }}><Leaf size={200} /></div>
      <div className="organic-leaf" style={{ bottom: '10%', right: '15%' }}><Leaf size={150} /></div>

      <div className="container sustain-container">
        <div className="sustain-content glass-panel">
          <h2 className="section-title">
            Engineered for <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(90deg, #4ade80, #10b981)' }}>Tomorrow</span>
          </h2>
          <p className="sustain-text">
            Innovation is meaningless without responsibility. We are pioneering zero-emission synthesis processes, developing fully biodegradable surfactants, and implementing closed-loop water systems across our global facilities.
          </p>
          
          <div className="sustain-metrics">
            <div className="sustain-metric">
              <span className="metric-val">100%</span>
              <span className="metric-label">Renewable Energy</span>
            </div>
            <div className="sustain-metric">
              <span className="metric-val">0</span>
              <span className="metric-label">Net Carbon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
