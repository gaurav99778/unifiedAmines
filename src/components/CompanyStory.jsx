import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CompanyStory.css';

gsap.registerPlugin(ScrollTrigger);

export default function CompanyStory() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  // The story text defined as a constant to easily map over it in React
  const storyText = "We began with a single molecular vision. Today, we are engineering the building blocks of tomorrow, pushing the boundaries of what is possible in chemical synthesis and sustainable innovation.";
  const words = storyText.split(' ');

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const wordElements = gsap.utils.toArray('.split-word');
      
      // Set initial states via GSAP (so it resets properly on revert)
      gsap.set(wordElements, { 
        color: '#4d4d4d', 
        y: 3,
        filter: 'blur(2px)'
      });

      // Cinematic overlapping scrub animation
      gsap.to(wordElements, {
        color: '#FFFFFF',
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.1, // Overlapping transition for fluidity
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
          end: 'bottom 45%',
          scrub: true,
          invalidateOnRefresh: true, // Recalculate on resize/refresh
        }
      });
    }, sectionRef); // Scope to sectionRef
    
    return () => ctx.revert(); // Clean up everything gracefully
  }, []);

  return (
    <section className="section company-story" ref={sectionRef}>
      <div className="container story-container">
        
        <h2 className="section-title text-gradient story-heading">Our Story</h2>
        
        <div className="story-text" ref={textRef}>
          {words.map((word, index) => (
            <span 
              key={index} 
              className="split-word" 
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              {word}
            </span>
          ))}
        </div>
        
      </div>
    </section>
  );
}
