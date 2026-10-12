import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TypographyHero.css';

gsap.registerPlugin(ScrollTrigger);

export default function TypographyHero({
  headline = "Built on Precision.<br/>Driven by Innovation.",
  subtitle = "Pioneering the future of molecular science through unprecedented scale and exact methodologies.",
  ctaText = "EXPLORE OUR LEGACY",
  ctaLink = "#legacy",
  highlightWord = null
}) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Custom SplitText Logic for the god-level animation
    const textElement = headlineRef.current;
    if (textElement) {
      // Split the text manually to avoid needing the premium SplitText plugin
      const text = headline;
      const lines = text.split('<br/>');
      textElement.innerHTML = '';
      
      lines.forEach((line) => {
        const lineDiv = document.createElement('div');
        lineDiv.style.overflow = 'hidden'; // Vertical mask
        lineDiv.style.display = 'block';
        lineDiv.style.lineHeight = '1.1';
        lineDiv.style.paddingBottom = '0.1em'; // Prevent clipping of descenders
        
        const words = line.split(' ');
        words.forEach((word, wordIndex) => {
          const wordSpan = document.createElement('span');
          wordSpan.style.display = 'inline-block';
          if (wordIndex < words.length - 1) {
            wordSpan.style.marginRight = '0.3em';
          }
          
          word.split('').forEach((char) => {
            const charSpan = document.createElement('span');
            charSpan.innerText = char;
            charSpan.className = 'god-char';
            charSpan.style.display = 'inline-block';
            charSpan.style.transform = 'translateY(120%) scale(0.98)';
            charSpan.style.opacity = '0';
            charSpan.style.filter = 'blur(10px)';
            charSpan.style.willChange = 'transform, opacity, filter';
            
            // Apply highlight if this word matches the highlightWord (stripping punctuation for comparison)
            if (highlightWord && word.replace(/[^a-zA-Z]/g, '') === highlightWord.replace(/[^a-zA-Z]/g, '')) {
              charSpan.style.color = 'var(--color-brand-blue)';
            }

            wordSpan.appendChild(charSpan);
          });
          
          lineDiv.appendChild(wordSpan);
        });
        
        textElement.appendChild(lineDiv);
      });

      const chars = textElement.querySelectorAll('.god-char');

      // The God-Level Entrance Animation
      tl.to(chars, {
        y: '0%',
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 2,
        stagger: 0.03,
        ease: 'power4.out'
      });
    }

    // Fade in subtitle and button
    tl.fromTo([subtitleRef.current, btnRef.current], 
      { opacity: 0, y: 30, filter: 'blur(5px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, stagger: 0.2, ease: 'power3.out' },
      "-=1.5"
    );

    // Subtle parallax and scale down on scroll
    gsap.to(sectionRef.current, {
      y: '15%',
      scale: 0.95,
      opacity: 0,
      filter: 'blur(10px)',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

  }, []);

  return (
    <section className="typography-hero" ref={sectionRef}>
      
      {/* Subtle Ambient Lighting */}
      <div className="typo-hero-ambient typo-hero-ambient-blue"></div>
      <div className="typo-hero-ambient typo-hero-ambient-orange"></div>

      <div className="typo-hero-content">
        <h1 className="typo-hero-headline" ref={headlineRef}>
          {/* Content is injected via JS for splitting */}
        </h1>
        
        <p className="typo-hero-subtitle" ref={subtitleRef}>
          {subtitle}
        </p>
        
        <div className="typo-hero-cta" ref={btnRef}>
          <button className="btn-primary" style={{ padding: '1rem 3rem', letterSpacing: '0.1em' }} onClick={() => window.location.href = ctaLink}>
            {ctaText}
          </button>
        </div>
      </div>
      
    </section>
  );
}
