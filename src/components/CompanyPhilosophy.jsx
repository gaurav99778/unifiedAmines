import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CompanyPhilosophy.css';

gsap.registerPlugin(ScrollTrigger);

export default function CompanyPhilosophy() {
  const sectionRef = useRef(null);

  const philosophies = [
    { 
      title: 'Innovation', 
      desc: 'Continuous pursuit of breakthrough molecular architectures.',
      image: '/images/industrial_innovation_v2.png'
    },
    { 
      title: 'Precision', 
      desc: 'Exacting standards in every compound we synthesize.',
      image: '/images/industrial_precision_v2.png'
    },
    { 
      title: 'Reliability', 
      desc: 'Unwavering consistency in large-scale production and delivery.',
      image: '/images/industrial_reliability_v2.png'
    },
    { 
      title: 'Sustainability', 
      desc: 'Pioneering eco-friendly processes for a cleaner future.',
      image: '/images/industrial_sustainability_v2.png'
    },
  ];

  useEffect(() => {
    const heading = sectionRef.current.querySelector('.section-title');

    // Only animate the heading on scroll
    gsap.set(heading, { opacity: 0, y: 30 });
    
    gsap.to(heading, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      opacity: 1, 
      y: 0, 
      duration: 0.6, 
      ease: 'power3.out' 
    });

  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    const imageContainer = e.currentTarget.querySelector('.philosophy-image-container');
    const glow = e.currentTarget.querySelector('.philosophy-glow');
    
    if (imageContainer) {
      gsap.to(imageContainer, {
        x: x * -10,
        y: y * -10,
        duration: 0.5,
        ease: 'power2.out'
      });
    }

    if (glow) {
      gsap.to(glow, {
        x: x * 20,
        y: y * 20,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = (e) => {
    const imageContainer = e.currentTarget.querySelector('.philosophy-image-container');
    const glow = e.currentTarget.querySelector('.philosophy-glow');
    
    if (imageContainer) {
      gsap.to(imageContainer, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
    }

    if (glow) {
      gsap.to(glow, { x: 0, y: 0, duration: 0.8, ease: 'power2.out' });
    }
  };

  return (
    <section className="section philosophy-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center' }}>Core <span className="text-gradient">Philosophy</span></h2>
        
        <div className="philosophy-grid">
          {philosophies.map((item, index) => (
            <div 
              key={index} 
              className="philosophy-card interactive"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="philosophy-image-container">
                <div className="industrial-image-wrapper">
                  <div className="industrial-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                </div>
              </div>
              <div className="philosophy-glow"></div>
              <div className="philosophy-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
