import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

const LANGUAGES = [
  { text: 'HELLO', font: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", sans-serif' },
  { text: 'BONJOUR', font: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", sans-serif' },
  { text: 'مرحبا', font: '"Noto Sans Arabic", -apple-system, sans-serif' },
  { text: 'HOLA', font: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", sans-serif' },
  { text: 'こんにちは', font: '"Noto Sans JP", -apple-system, sans-serif' },
  { text: '你好', font: '"Noto Sans SC", -apple-system, sans-serif' },
  { text: 'नमस्ते', font: '"Noto Sans Devanagari", -apple-system, sans-serif' }
];

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);
  const finalWrapperRef = useRef(null);
  const lineRef = useRef(null);
  const textElementRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    LANGUAGES.forEach((lang, index) => {
      const wordNode = wordsRef.current[index];
      const isLast = index === LANGUAGES.length - 1;

      tl.fromTo(wordNode,
        { opacity: 0, scale: 1.05, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.12, ease: 'power2.out' }
      );

      if (!isLast) {
        tl.to(wordNode, {
          opacity: 0,
          scale: 0.95,
          filter: 'blur(5px)',
          duration: 0.08,
          ease: 'power2.in'
        }, "+=0.04");
      } else {
        tl.to(wordNode, {
          opacity: 0,
          scale: 0.9,
          filter: 'blur(10px)',
          duration: 0.15,
          ease: 'expo.in'
        }, "+=0.05");
      }
    });

    tl.fromTo(lineRef.current,
      { width: '0px', height: '2px', borderRadius: '50%', autoAlpha: 0 },
      { width: '2px', autoAlpha: 1, duration: 0.05, ease: 'power2.out', immediateRender: false },
      "-=0.1"
    );

    tl.to(lineRef.current, { 
      width: '100vw', 
      height: '1px', 
      borderRadius: '0%', 
      duration: 0.2, 
      ease: 'expo.inOut' 
    });

    tl.to(lineRef.current, { 
      autoAlpha: 0, 
      duration: 0.1, 
      ease: 'power2.inOut' 
    }, "+=0.05");

    tl.fromTo(finalWrapperRef.current,
      { opacity: 0, filter: 'blur(20px)', scale: 0.95 },
      { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 0.3, ease: 'power3.out' },
      "-=0.1" 
    );

    tl.fromTo(textElementRef.current,
      { letterSpacing: '0.4em' },
      { letterSpacing: '0.25em', duration: 0.5, ease: 'power2.out' },
      "<"
    );

    tl.to(finalWrapperRef.current, {
      scale: 100,
      opacity: 0,
      duration: 0.7,
      ease: 'expo.inOut',
      delay: 0.1
    });

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power1.out'
    }, "-=0.3");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader-container" ref={containerRef}>
      <div className="greeting-wrapper">
        {LANGUAGES.map((lang, i) => (
          <div 
            key={i} 
            className="greeting-text" 
            style={{ fontFamily: lang.font }}
            ref={el => wordsRef.current[i] = el}
          >
            {lang.text}
          </div>
        ))}
      </div>

      <div className="energy-line" ref={lineRef}></div>

      <div className="unified-amines-wrapper" ref={finalWrapperRef}>
        <div className="unified-amines-text" ref={textElementRef}>
          <span className="char-custom">U</span>nified <span className="char-custom">A</span>mines
        </div>
      </div>
    </div>
  );
}
