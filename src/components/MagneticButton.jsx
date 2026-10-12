import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className = '', onClick, href }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const h = rect.width / 2;
      const w = rect.height / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - w;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.8,
        ease: 'power3.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const Component = href ? 'a' : 'button';

  return (
    <div className="magnetic-btn-wrapper interactive">
      <Component 
        ref={buttonRef} 
        className={`primary-btn ${className}`}
        onClick={onClick}
        href={href}
      >
        {children}
        <span className="btn-arrow">→</span>
      </Component>
    </div>
  );
}
