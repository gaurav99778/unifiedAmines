import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Founders.css';

gsap.registerPlugin(ScrollTrigger);

export default function Founders() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const foundersData = [
    { name: 'Founder One', title: 'Chief Executive Officer', bio: 'Visionary leader driving the strategic direction of molecular synthesis.' },
    { name: 'Founder Two', title: 'Chief Scientific Officer', bio: 'Pioneer in eco-friendly chemical processes and R&D.' },
    { name: 'Founder Three', title: 'Chief Operations Officer', bio: 'Scaling global manufacturing and supply chain logistics.' },
    { name: 'Founder Four', title: 'Chief Innovation Officer', bio: 'Spearheading next-generation nanotechnology applications.' }
  ];

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 150, rotationX: 10 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });
  }, []);

  return (
    <section className="section founders-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Leadership & <span className="text-gradient">Vision</span></h2>
        
        <div className="founders-grid">
          {foundersData.map((founder, index) => (
            <div 
              key={index} 
              className="founder-card interactive"
              ref={el => cardsRef.current[index] = el}
            >
              <div className="founder-image-wrapper">
                <div className="founder-placeholder">Image Placeholder</div>
                {/* <img src={`/images/founder${index+1}.jpg`} alt={founder.name} className="founder-image" /> */}
              </div>
              <div className="founder-overlay">
                <h3 className="founder-name">{founder.name}</h3>
                <div className="founder-title">{founder.title}</div>
                <p className="founder-bio">{founder.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
