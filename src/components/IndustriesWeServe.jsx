import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Droplet, Sprout, Wind, Beaker, Shield, Factory, Shirt, Sparkles } from 'lucide-react';
import './IndustriesWeServe.css';

gsap.registerPlugin(ScrollTrigger);

export default function IndustriesWeServe() {
  const sectionRef = useRef(null);
  
  const industries = [
    { name: 'Agrochemicals', icon: Sprout, desc: 'Advanced surfactants for robust crop protection.' },
    { name: 'Water Treatment', icon: Droplet, desc: 'Purification through highly reactive polyquats.' },
    { name: 'Personal Care', icon: Shield, desc: 'Gentle esters for cosmetics and skin health.' },
    { name: 'Oil & Gas', icon: Factory, desc: 'Demulsifiers and corrosion inhibitors for heavy industry.' },
    { name: 'Paints & Coatings', icon: Wind, desc: 'Additives that ensure perfect finish and durability.' },
    { name: 'Pharmaceuticals', icon: Beaker, desc: 'Ultra-pure intermediates for medical synthesis.' },
    { name: 'Textiles', icon: Shirt, desc: 'High-performance auxiliaries for dyeing, finishing, and fabric processing.' },
    { name: 'Home & Industrial Cleaning', icon: Sparkles, desc: 'Advanced surfactants delivering superior cleaning efficiency and stability.' }
  ];

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll('.industry-card');
    
    gsap.fromTo(cards, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%'
        }
      }
    );
  }, []);

  return (
    <section className="section industries-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title text-center">
          Powering <span className="text-gradient">Every</span> Industry
        </h2>
        
        <div className="industries-grid">
          {industries.map((ind, idx) => {
            const IconComponent = ind.icon;
            return (
              <div className="industry-card glass-panel" key={idx}>
                <div className="industry-icon-wrapper">
                  <IconComponent className="industry-icon" size={40} />
                </div>
                <h3>{ind.name}</h3>
                <p>{ind.desc}</p>
                <div className="industry-hover-bg"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
