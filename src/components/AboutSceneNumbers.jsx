import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSceneNumbers.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSceneNumbers() {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    rowsRef.current.forEach((row) => {
      if (!row) return;

      const number = row.querySelector('.scene-numbers-giant');
      const text = row.querySelector('.scene-numbers-text');

      gsap.fromTo(number,
        { clipPath: 'inset(100% 0% 0% 0%)', y: 50 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(text,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);

  return (
    <section className="scene-numbers" ref={sectionRef}>
      <div className="container">
        
        <div className="scene-numbers-row" ref={el => rowsRef.current[0] = el}>
          <div className="scene-numbers-giant text-gradient">25+</div>
          <div className="scene-numbers-text">
            <h3 className="scene-numbers-label">YEARS OF EXCELLENCE</h3>
            <p className="scene-numbers-desc">Two and a half decades of defining the edge of specialty chemistry.</p>
          </div>
        </div>

        <div className="scene-numbers-row" ref={el => rowsRef.current[1] = el}>
          <div className="scene-numbers-giant text-gradient">1.5K</div>
          <div className="scene-numbers-text">
            <h3 className="scene-numbers-label">METRIC TONS ANNUALLY</h3>
            <p className="scene-numbers-desc">Unprecedented scale without ever compromising molecular precision.</p>
          </div>
        </div>

        <div className="scene-numbers-row" ref={el => rowsRef.current[2] = el}>
          <div className="scene-numbers-giant text-gradient">50+</div>
          <div className="scene-numbers-text">
            <h3 className="scene-numbers-label">GLOBAL MARKETS</h3>
            <p className="scene-numbers-desc">Powering innovations across continents, from agriculture to high-tech manufacturing.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
