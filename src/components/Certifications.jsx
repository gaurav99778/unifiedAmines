import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, CheckCircle } from 'lucide-react';
import './Certifications.css';

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const sectionRef = useRef(null);

  const certs = [
    { title: 'ISO 9001:2015', desc: 'Quality Management Systems' },
    { title: 'ISO 14001:2015', desc: 'Environmental Management' },
    { title: 'REACH Compliant', desc: 'European Union Regulation' },
    { title: 'Ecovadis Gold', desc: 'Sustainability Rating' }
  ];

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll('.cert-card');
    
    gsap.fromTo(cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%'
        }
      }
    );

    // Spotlight effect logic
    const handleMouseMove = (e) => {
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="section cert-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title text-center">
          Global <span className="text-gradient">Standards</span>
        </h2>
        
        <div className="cert-grid">
          {certs.map((cert, idx) => (
            <div className="cert-card" key={idx}>
              <div className="cert-content glass-panel">
                <Award className="cert-icon" size={40} />
                <h3>{cert.title}</h3>
                <p>{cert.desc}</p>
                <div className="cert-check">
                  <CheckCircle size={20} />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
