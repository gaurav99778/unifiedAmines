import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSceneTypography.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSceneTypography() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const revealBgRef = useRef(null);

  useEffect(() => {
    // Pin the section while the typography mask reveals the image
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=100%',
      pin: true,
      scrub: true,
      animation: gsap.timeline()
        // The text scales up massively until the hole in the text becomes the screen
        .to(textRef.current, {
          scale: 30, // Scale up hugely
          opacity: 0,
          ease: 'power3.in'
        }, 0)
        // Simultaneously fade in the full bleed background to complete the illusion
        .fromTo(revealBgRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.2, ease: 'none' },
        0.8)
    });
  }, []);

  return (
    <section className="scene-typography" ref={sectionRef}>
      
      {/* This background reveals fully at the end of the scroll */}
      <div 
        className="scene-typography-reveal-bg" 
        ref={revealBgRef}
        style={{ backgroundImage: 'url(/images/innovation_1.png)' }}
      ></div>

      <div className="scene-typography-mask-container">
        <h2 className="scene-typography-text" ref={textRef}>
          INNOVATE
        </h2>
      </div>

    </section>
  );
}
