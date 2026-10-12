import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSceneExpansion.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSceneExpansion() {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Pin the entire section while the expansion happens
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=150%', // Scroll for 1.5x the viewport height
      pin: true,
      scrub: true,
      animation: gsap.timeline()
        // Expand the container width/height from small to massive
        .to(imageContainerRef.current, {
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
          ease: 'power2.inOut'
        }, 0)
        // Zoom out the image inside so it looks like a continuous space
        .fromTo(imageRef.current, 
          { scale: 2 }, 
          { scale: 1, ease: 'power2.inOut' }, 
        0)
        // Fade in the text content over the expanded image
        .fromTo(contentRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.8)
    });
  }, []);

  return (
    <section className="scene-expansion" ref={sectionRef}>
      
      <div className="scene-expansion-image-container" ref={imageContainerRef}>
        <div 
          className="scene-expansion-image" 
          ref={imageRef}
          style={{ backgroundImage: 'url(/images/manufacturing_full.png)' }}
        ></div>
        <div className="scene-expansion-overlay"></div>
        
        <div className="scene-expansion-content" ref={contentRef}>
          <div className="scene-expansion-label">SCALE & PRECISION</div>
          <h2 className="scene-expansion-title">
            Manufacturing at a<br/>Global Scale.
          </h2>
          <p className="scene-expansion-desc">
            We operate the most advanced automated synthesis reactors in the industry, perfectly scaling from pilot batches to thousands of metric tons with zero variance in quality.
          </p>
        </div>
      </div>

    </section>
  );
}
