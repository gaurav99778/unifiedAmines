import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutScenePinned.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutScenePinned() {
  const containerRef = useRef(null);
  const imageColRef = useRef(null);
  const textColRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    // Pin the image column while the text scrolls
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: imageColRef.current,
      pinSpacing: false
    });

    // Reveal text lines individually as they scroll into the center of the screen
    linesRef.current.forEach((line) => {
      if (!line) return;
      gsap.fromTo(line,
        { opacity: 0.1, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 70%',
            end: 'top 40%',
            scrub: true
          }
        }
      );
      
      // Fade them out as they go up
      gsap.to(line, {
        opacity: 0.1,
        y: -50,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: line,
          start: 'top 20%',
          end: 'top -10%',
          scrub: true
        }
      });
    });

  }, []);

  return (
    <section className="scene-pinned" ref={containerRef}>
      
      <div className="scene-pinned-left" ref={textColRef}>
        <div className="scene-pinned-text-container">
          {/* We use multiple massive text blocks to force scrolling */}
          <div className="scene-pinned-line" ref={el => linesRef.current[0] = el}>
            We began with<br/>a single<br/>molecular vision.
          </div>
          <div className="scene-pinned-line" ref={el => linesRef.current[1] = el}>
            A relentless pursuit<br/>of absolute<br/>purity.
          </div>
          <div className="scene-pinned-line" ref={el => linesRef.current[2] = el}>
            Scaling from<br/>pilot reactors to<br/>global infrastructure.
          </div>
          <div className="scene-pinned-line" ref={el => linesRef.current[3] = el}>
            We are the<br/>architects of<br/>tomorrow's chemistry.
          </div>
        </div>
      </div>

      <div className="scene-pinned-right" ref={imageColRef}>
        <div 
          className="scene-pinned-image"
          style={{ backgroundImage: 'url(/images/industrial_story.png)' }}
        ></div>
        <div className="scene-pinned-image-overlay"></div>
      </div>

    </section>
  );
}
