import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ParticlesBackground.css';

export default function ParticlesBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];
    const numParticles = 40;

    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Randomly make some orange for brand color mix
      if (Math.random() > 0.7) {
        particle.classList.add('orange');
      }

      // Random size
      const size = Math.random() * 80 + 20;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Random initial position
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      gsap.set(particle, { x, y });

      container.appendChild(particle);
      particles.push(particle);

      // Animate
      animateParticle(particle);
    }

    function animateParticle(particle) {
      const duration = Math.random() * 20 + 20; // 20-40s
      const delay = Math.random() * -20; // Random negative delay to start mid-animation
      
      gsap.to(particle, {
        x: `+=${Math.random() * 400 - 200}`,
        y: `+=${Math.random() * 400 - 200}`,
        opacity: Math.random() * 0.4 + 0.1,
        duration: duration,
        delay: delay,
        ease: 'sine.inOut',
        onComplete: () => {
          // Keep it in bounds roughly
          const rect = particle.getBoundingClientRect();
          if (rect.left < -100) gsap.set(particle, { x: window.innerWidth + 100 });
          if (rect.right > window.innerWidth + 100) gsap.set(particle, { x: -100 });
          if (rect.top < -100) gsap.set(particle, { y: window.innerHeight + 100 });
          if (rect.bottom > window.innerHeight + 100) gsap.set(particle, { y: -100 });
          animateParticle(particle);
        }
      });
    }

    return () => {
      // Cleanup
      particles.forEach(p => gsap.killTweensOf(p));
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div className="particles-container" ref={containerRef}></div>;
}
