import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSceneHero.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSceneHero() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // 1. Initial God-Level Entrance
    const tl = gsap.timeline();
    
    // Smooth reveal of background
    tl.fromTo(bgRef.current,
      { scale: 1.1, filter: 'blur(20px)', opacity: 0 },
      { scale: 1, filter: 'blur(0px)', opacity: 1, duration: 2.5, ease: 'power2.out' }
    );

    // Text splitting for cinematic reveal
    const textElement = textRef.current;
    if (textElement) {
      const lines = textElement.innerHTML.split('<br>');
      textElement.innerHTML = '';
      
      lines.forEach((line) => {
        const lineDiv = document.createElement('div');
        lineDiv.style.overflow = 'hidden';
        lineDiv.style.lineHeight = '1.0';
        
        const innerSpan = document.createElement('span');
        innerSpan.innerHTML = line;
        innerSpan.className = 'scene-hero-text-line';
        innerSpan.style.display = 'inline-block';
        gsap.set(innerSpan, { y: '100%' });
        
        lineDiv.appendChild(innerSpan);
        textElement.appendChild(lineDiv);
      });

      const linesToAnimate = textElement.querySelectorAll('.scene-hero-text-line');
      
      tl.to(linesToAnimate, {
        y: '0%',
        duration: 1.5,
        stagger: 0.1,
        ease: 'power4.out'
      }, "-=1.5");
    }

    // 2. Cinematic Push-Back Scroll Mechanic
    gsap.to(textRef.current, {
      scale: 1.5, // Text scales UP towards the camera
      opacity: 0,
      filter: 'blur(10px)',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to(bgRef.current, {
      y: '30%', // Image moves down
      opacity: 0.2, // Darkens further
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

  }, []);

  return (
    <section className="scene-hero" ref={sectionRef}>
      <div 
        className="scene-hero-bg" 
        ref={bgRef}
        style={{ backgroundImage: 'url(/images/industrial_hero.png)' }}
      ></div>
      <div className="scene-hero-overlay"></div>
      
      <div className="scene-hero-content">
        <h1 className="scene-hero-title" ref={textRef}>
          ENGINEERING<br/>PRECISION
        </h1>
      </div>
    </section>
  );
}
