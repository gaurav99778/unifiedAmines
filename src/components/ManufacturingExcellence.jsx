import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ManufacturingExcellence.css';

gsap.registerPlugin(ScrollTrigger);

export default function ManufacturingExcellence() {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Full width image reveal
    if (imageContainerRef.current && imageRef.current) {
      // Unmask from bottom
      gsap.fromTo(imageContainerRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { 
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Scale and blur effect for premium feel
      gsap.fromTo(imageRef.current,
        { scale: 1.1, filter: 'blur(5px)' },
        { 
          scale: 1, 
          filter: 'blur(0px)',
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Subtle parallax while scrolling
      gsap.to(imageRef.current, {
        y: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Text stagger reveal
    if (textRef.current) {
      gsap.fromTo(textRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, []);

  return (
    <section className="section mfg-section" ref={sectionRef}>
      
      <div className="mfg-intro" ref={textRef}>
        <div className="section-label text-center" style={{ marginBottom: '1.5rem', display: 'block' }}>SCALE & PRECISION</div>
        <h2 className="mfg-title text-center text-diamond">Manufacturing Excellence</h2>
      </div>

      <div className="mfg-fullwidth-container" ref={imageContainerRef}>
        <div 
          className="mfg-fullwidth-bg" 
          ref={imageRef}
          style={{ backgroundImage: 'url(/images/manufacturing_full.png)' }}
        ></div>
        <div className="mfg-overlay"></div>
      </div>

    </section>
  );
}
