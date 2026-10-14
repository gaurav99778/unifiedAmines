import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

export default function CustomCursor() {
  const followerRef = useRef(null);
  const [followerState, setFollowerState] = useState(''); 
  const [isIdle, setIsIdle] = useState(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const follower = followerRef.current;
    if (!follower) return;
    
    // Anchor to center and enable GPU acceleration explicitly
    gsap.set(follower, { xPercent: -50, yPercent: -50, force3D: true });
    
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    const setX = gsap.quickSetter(follower, "x", "px");
    const setY = gsap.quickSetter(follower, "y", "px");
    
    let idleTimeout;
    
    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        setIsIdle(true);
      }, 3000); // 3 seconds idle
    };

    // Dynamic Glow tracking variables
    let glowObj = { val: 0 };
    let isMoving = false;
    let moveTimeout;

    const updateGlow = () => {
      if (follower) {
        follower.style.setProperty('--glow-scale', glowObj.val);
      }
    };

    const onMouseMove = (e) => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        gsap.to(follower, { opacity: 0.9, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      resetIdle();
      
      // Activate dynamic energy glow while moving
      if (!isMoving) {
        isMoving = true;
        gsap.to(glowObj, { val: 1, duration: 0.3, onUpdate: updateGlow, ease: "power2.out", overwrite: "auto" });
      }
      
      // Debounce the settling back to default glow
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        isMoving = false;
        gsap.to(glowObj, { val: 0, duration: 0.8, onUpdate: updateGlow, ease: "power2.out", overwrite: "auto" });
      }, 80);
    };

    const onClick = () => {
      resetIdle();
      gsap.fromTo(follower, 
        { scaleX: 0.8, scaleY: 0.8 },
        { scaleX: 1, scaleY: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' }
      );
    };

    const onMouseOver = (e) => {
      resetIdle();
      const target = e.target;

      // Nav Links
      if (target.closest('.nav-link') || target.closest('.navbar-logo')) {
        setFollowerState('state-nav');
        return;
      }

      // Buttons
      if (target.closest('button') || target.closest('.btn')) {
        setFollowerState('state-button');
        return;
      }

      // Images
      if (target.closest('img') || target.classList.contains('story-image') || target.classList.contains('story-image-reveal')) {
        setFollowerState('state-image');
        return;
      }

      // Text / Cards - Keep default size
      setFollowerState('');
    };

    const onMouseOut = () => {
      setFollowerState('');
    };

    const onMouseEnterDoc = () => {
      isVisibleRef.current = true;
      gsap.to(follower, { opacity: 0.9, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
    };

    const onMouseLeaveDoc = () => {
      isVisibleRef.current = false;
      gsap.to(follower, { opacity: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onClick, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mouseout', onMouseOut, { passive: true });
    document.documentElement.addEventListener('mouseenter', onMouseEnterDoc);
    document.documentElement.addEventListener('mouseleave', onMouseLeaveDoc);
    
    resetIdle();

    // Fast, smooth, responsive spring lerp (no elasticity/bounce)
    const updateCursor = () => {
      pos.x += (mouse.x - pos.x) * 0.25;
      pos.y += (mouse.y - pos.y) * 0.25;

      setX(pos.x);
      setY(pos.y);
    };

    gsap.ticker.add(updateCursor);

    return () => {
      clearTimeout(idleTimeout);
      clearTimeout(moveTimeout);
      gsap.ticker.remove(updateCursor);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onClick);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      document.documentElement.removeEventListener('mouseenter', onMouseEnterDoc);
      document.documentElement.removeEventListener('mouseleave', onMouseLeaveDoc);
    };
  }, []);

  return (
    <div ref={followerRef} className={`mouse-follower ${followerState} ${isIdle ? 'idle' : ''}`}></div>
  );
}
