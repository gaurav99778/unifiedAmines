import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StatisticsExperience.css';

gsap.registerPlugin(ScrollTrigger);

export default function StatisticsExperience() {
  const sectionRef = useRef(null);

  const stats = [
    { label: 'Years of Experience', value: 25, suffix: '+' },
    { label: 'Products Formulated', value: 60, suffix: '+' },
    { label: 'Industries Served', value: 8, suffix: '' },
    { label: 'Global Clients', value: 500, suffix: '+' },
    { label: 'Countries Reached', value: 40, suffix: '+' }
  ];

  useEffect(() => {
    const statNumbers = sectionRef.current.querySelectorAll('.stat-val');
    
    statNumbers.forEach((el) => {
      const targetVal = parseFloat(el.getAttribute('data-target'));
      
      gsap.to(el, {
        innerHTML: targetVal,
        duration: 2.5,
        ease: 'power3.out',
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true
        },
        onUpdate: function() {
          // Format with commas if needed
          el.innerHTML = Math.round(this.targets()[0].innerHTML).toLocaleString();
        }
      });
    });
  }, []);

  return (
    <section className="section stats-section" ref={sectionRef}>
      <div className="stats-bg-glow"></div>
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div className="cinematic-stat" key={idx}>
              <div className="stat-number-wrapper">
                <span className="stat-val" data-target={stat.value}>0</span>
                <span className="stat-suffix">{stat.suffix}</span>
              </div>
              <div className="stat-label-text">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
