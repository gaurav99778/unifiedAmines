import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import './AboutHero.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // 1. Initial Mature Cinematic Entrance Animation
    const tl = gsap.timeline();

    const titleElement = titleRef.current;
    if (titleElement) {
      const lines = titleElement.innerHTML.split('<br>');
      titleElement.innerHTML = '';
      
      lines.forEach((line) => {
        const lineDiv = document.createElement('div');
        lineDiv.style.overflow = 'hidden'; 
        lineDiv.style.lineHeight = '1.1';
        
        const words = line.split(' ');
        words.forEach((word) => {
          const wordSpan = document.createElement('span');
          wordSpan.style.display = 'inline-block';
          wordSpan.style.marginRight = '0.3em';
          wordSpan.innerText = word;
          wordSpan.className = 'about-hero-word';
          gsap.set(wordSpan, { y: '100%' });
          lineDiv.appendChild(wordSpan);
        });
        
        titleElement.appendChild(lineDiv);
      });

      const words = titleElement.querySelectorAll('.about-hero-word');
      
      // Animate background fade in smoothly (no extreme scaling to keep it mature)
      tl.fromTo(bgRef.current, 
        { scale: 1.05, opacity: 0, filter: 'blur(10px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 2, ease: 'power2.out' }
      );

      // Animate words rising up sequentially
      tl.to(words, {
        y: '0%',
        duration: 1,
        stagger: 0.05,
        ease: 'power3.out'
      }, "-=1.2");

      // Animate paragraph fading upward
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        "-=0.8"
      );

      // Animate CTA button
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        "-=0.8"
      );
    }

    // 2. Smooth Scroll Parallax
    gsap.to(bgRef.current, {
      y: '20%', // Subtle parallax
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to([titleRef.current, subtitleRef.current, ctaRef.current], {
      y: '-15%', // Move text faster than background
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

  }, []);

  return (
    <section className="about-hero" ref={sectionRef}>
      <div 
        className="about-hero-bg" 
        ref={bgRef}
        style={{ backgroundImage: 'url(/images/industrial_hero.png)' }}
      ></div>
      <div className="about-hero-overlay"></div>
      
      <div className="container about-hero-container">
        <div className="about-hero-content">
          <div className="about-hero-label">ABOUT US</div>
          <h1 className="about-hero-title text-gradient" ref={titleRef}>
            Engineering Chemistry<br/>with Precision.
          </h1>
          <p className="about-hero-subtitle" ref={subtitleRef}>
            For over two decades, Unified Amines has been delivering high-performance specialty chemicals to global industries, driven by uncompromising quality and state-of-the-art manufacturing.
          </p>
          <div className="about-hero-cta-wrapper" ref={ctaRef}>
            <MagneticButton>
              <Link to="/products" className="about-hero-cta">Explore Our Capabilities</Link>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
