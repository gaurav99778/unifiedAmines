import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CompanyIntro.css';

gsap.registerPlugin(ScrollTrigger);

export default function CompanyIntro() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;

    // Animate heading and paragraph
    gsap.fromTo(
      [textRef.current.querySelector('h2'), textRef.current.querySelector('p')],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Cards entrance and counter animation
    const statsRow = textRef.current.querySelector('.stats-row');
    const statCards = textRef.current.querySelectorAll('.stat-item');

    const statsTl = gsap.timeline({
      scrollTrigger: {
        trigger: statsRow,
        start: 'top 85%',
        once: true
      }
    });

    statsTl.fromTo(statCards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );

    statCards.forEach((card, index) => {
      const counterEl = card.querySelector('.counter');
      if (counterEl) {
        const target = parseFloat(counterEl.getAttribute('data-target'));
        statsTl.fromTo(counterEl,
          { innerHTML: 0 },
          {
            innerHTML: target,
            duration: 1.8,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            onUpdate: function () {
              counterEl.innerHTML = Math.round(this.targets()[0].innerHTML);
            }
          },
          `<+${index * 0.15 + 0.1}`
        );
      }
    });
  }, []);

  return (
    <section className="section intro-section" ref={containerRef}>
      <div className="container intro-container">
        <div className="intro-content" ref={textRef}>
          <h2 className="intro-heading">
            We don't just<br />
            Supply Chemicals.<br />
            <span className="text-gradient-blue">We Engineer Potential.</span>
          </h2>
          <p className="intro-text">
            For over two decades, Unified Amines has been at the forefront of molecular innovation.
            We synthesize high-purity surfactants, esters, and specialty amines that form the invisible
            foundation of the world's most advanced industries.
          </p>
          <div className="stats-row">

            <div className="stat-item glass-panel">
              <span className="stat-number"><span className="counter" data-target="28">0</span>+</span>
              <span className="stat-label">Years</span>
            </div>
            <div className="stat-item glass-panel">
              <span className="stat-number"><span className="counter" data-target="60">0</span>+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-item glass-panel">
              <span className="stat-number"><span className="counter" data-target="40">0</span>+</span>
              <span className="stat-label">Countries</span>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
