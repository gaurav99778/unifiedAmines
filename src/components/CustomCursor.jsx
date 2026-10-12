import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

export default function CustomCursor() {
  const followerRef = useRef(null);
  const [followerState, setFollowerState] = useState(''); 
  const [isIdle, setIsIdle] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!followerRef.current) return;
    
    let targetOpacity = 0;
    if (isVisible) {
      if (followerState === 'state-button') targetOpacity = 1;
      else if (isIdle) targetOpacity = 0.25;
      else targetOpacity = 0.9;
    }
    
    gsap.to(followerRef.current, { 
      opacity: targetOpacity, 
      duration: 0.3, 
      ease: 'power2.out',
      overwrite: 'auto' 
    });
  }, [isVisible, isIdle, followerState]);
  
  useEffect(() => {
    const follower = followerRef.current;
    
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
      setIsVisible(prev => {
        if (!prev) return true;
        return prev;
      });
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
      // Quick scale down to 80% and back, no ripple, no flashy effects
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

      // Text / Cards - Keep default size (no enlargement)
      setFollowerState('');
    };

    const onMouseOut = () => {
      setFollowerState('');
    };

    const onMouseEnterDoc = () => setIsVisible(true);
    const onMouseLeaveDoc = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onClick);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);
    document.documentElement.addEventListener('mouseenter', onMouseEnterDoc);
    document.documentElement.addEventListener('mouseleave', onMouseLeaveDoc);
    
    resetIdle();

    // Fast, smooth, responsive spring lerp (no elasticity/bounce)
    gsap.ticker.add(() => {
      // 0.25 is fast enough to feel very responsive without lagging, but remains smooth
      pos.x += (mouse.x - pos.x) * 0.25;
      pos.y += (mouse.y - pos.y) * 0.25;

      setX(pos.x);
      setY(pos.y);
    });

    return () => {
      clearTimeout(idleTimeout);
      clearTimeout(moveTimeout);
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
