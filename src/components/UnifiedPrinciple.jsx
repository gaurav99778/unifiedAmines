import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './UnifiedPrinciple.css';

gsap.registerPlugin(ScrollTrigger);

const words = [
  { line1: 'WE BELIEVE IN', line2: 'SCIENCE' },
  { line1: 'THAT CREATES', line2: 'PRECISION' },
  { line1: 'WHICH DELIVERS', line2: 'PERFORMANCE' },
  { line1: 'AND BUILDS', line2: 'PARTNERSHIP' }
];

export default function UnifiedPrinciple() {
  const sectionRef = useRef(null);
  const wordRefs = useRef([]);
  const lineRefs = useRef([]);
  const glowRef = useRef(null);
  const sentenceRef = useRef(null);
  const signatureRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    // Split text for each word
    const splits = wordRefs.current.map(el => new SplitType(el, { types: 'chars' }));

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 15%',
          end: '+=6000', // Long pin to allow comfortable scrolling through all sequences
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Initially hide everything except background
      gsap.set(lineRefs.current, { scaleX: 0 });
      gsap.set(glowRef.current, { opacity: 0 });
      gsap.set(sentenceRef.current, { opacity: 0, y: 20 });
      gsap.set(signatureRef.current, { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 });
      gsap.set(titleRef.current, { opacity: 0 });

      words.forEach((word, index) => {
        const chars = splits[index].chars;
        const isLast = index === words.length - 1;

        // Reset chars with a much smaller offset so they don't clip outside the viewport
        gsap.set(chars, { opacity: 0, y: 30, rotateX: -30, filter: 'blur(0px)', scale: 1, x: 0, rotationZ: 0 });

        // 1. Entrance: Letters rise individually
        tl.to(chars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: 'power3.out',
        });

        // 2. Line draws underneath
        tl.to(lineRefs.current[index], {
          scaleX: 1,
          duration: 1,
          ease: 'power3.inOut',
          transformOrigin: 'center center'
        }, "-=0.6");

        // 3. Pause
        tl.to({}, { duration: 1.5 });

        if (!isLast) {
          // 4. Dissolve into particles
          tl.to(chars, {
            opacity: 0,
            filter: 'blur(12px)',
            scale: () => gsap.utils.random(0.2, 0.6),
            y: () => gsap.utils.random(-150, -50),
            x: () => gsap.utils.random(-100, 100),
            rotationZ: () => gsap.utils.random(-90, 90),
            duration: 1.5,
            stagger: 0.03,
            ease: 'power2.inOut'
          });

          // Line fades out
          tl.to(lineRefs.current[index], {
            opacity: 0,
            duration: 0.8
          }, "-=1.5");

          // Pause before next word
          tl.to({}, { duration: 0.5 });
        } else {
          // Final sequence

          // Orange glow fades around the word
          tl.to(glowRef.current, {
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out'
          });

          // Sentence fades in below
          tl.to(sentenceRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
          }, "-=0.5");

          // Signature animation
          tl.set(signatureRef.current, { opacity: 1 });
          tl.to(signatureRef.current, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power3.inOut'
          }, "+=0.5");

          // Title fades in
          tl.to(titleRef.current, {
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
          }, "-=0.5");
        }
      });

    }, sectionRef);

    return () => {
      splits.forEach(split => split.revert());
      ctx.revert();
    };
  }, []);

  return (
    <section className="unified-principle-section" ref={sectionRef}>

      {/* Background Atmosphere */}
      <div className="up-bg-particles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`up-particle particle-${i}`}></div>
        ))}
      </div>
      <div className="up-ambient-glow"></div>

      {/* Main Content Container */}
      <div className="up-container">

        {/* The sequence of words */}
        <div className="up-words-wrapper">
          {/* We absolutely position each word on top of each other */}
          {words.map((word, idx) => (
            <div key={idx} className={`up-word-group ${idx === words.length - 1 ? 'up-word-group-final' : ''}`}>
              <h1 className={`up-word ${idx === words.length - 1 ? 'up-word-final' : ''}`} ref={el => wordRefs.current[idx] = el}>
                <span className="up-word-line">{word.line1}</span>
                <span className="up-word-line">{word.line2}</span>
              </h1>
              {/* Only the last word gets the orange glow behind it */}
              {idx === words.length - 1 && (
                <div className="up-word-glow" ref={glowRef}></div>
              )}
              <div className={`up-line ${idx === words.length - 1 ? 'up-line-final' : ''}`} ref={el => lineRefs.current[idx] = el}></div>
            </div>
          ))}
        </div>

        {/* Final Sentence & Signature */}
        <div className="up-finale">
          <p className="up-sentence" ref={sentenceRef}>
            Every molecule we engineer reflects our commitment to quality, precision, innovation, and partnerships that stand the test of time.
          </p>

          <div className="up-signature-block">
            {/* Elegant SVG Signature (Fake handwritten path) */}
            <svg
              className="up-signature-svg"
              viewBox="0 0 400 100"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                ref={signatureRef}
                d="M 50 70 Q 70 30, 90 60 T 120 40 Q 130 90, 150 50 T 180 50 Q 200 20, 210 60 T 240 40 Q 260 70, 280 40 T 320 60"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="up-signature-path"
              />
            </svg>

            <div className="up-title-wrapper" ref={titleRef}>
              <p className="up-name">— Chirag Naik</p>
              <p className="up-title">CEO, Unified Amines</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
