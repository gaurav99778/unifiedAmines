import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import SplitType from 'split-type';
import { MapPin, Plane, Truck, Ship } from 'lucide-react';
import './GlobalEcosystem.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function GlobalEcosystem() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const section = sectionRef.current;
      const mapContainer = section.querySelector('.map-container');

      const title = section.querySelector('.section-title');
      const subtitle = section.querySelector('.section-subtitle');
      const stats = section.querySelectorAll('.map-stat');

      const solidPath = section.querySelector('.route-solid');
      const trailPath = section.querySelector('.route-trail');
      const nodeOrange = section.querySelector('.node-orange');
      const nodeBlue = section.querySelector('.node-blue');
      const nodeSignal = section.querySelector('.node-signal');

      const splitTitle = new SplitType(title, { types: 'lines,words' });

      // Set initial states
      gsap.set(splitTitle.lines, { y: 30, opacity: 0 });
      gsap.set(subtitle, { y: 20, opacity: 0 });
      gsap.set(stats, { y: 20, opacity: 0 });

      // Graphic initial states
      gsap.set([nodeOrange, nodeBlue, nodeSignal], { scale: 0, opacity: 0 });
      gsap.set(solidPath, { strokeDasharray: '0 1000' });
      gsap.set(trailPath, { strokeDasharray: '0 1000', opacity: 1 });

      // --------------------------------------------
      // Phase 1: Text Animation
      // --------------------------------------------
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      textTl.to(splitTitle.lines, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      }, 0.0);

      textTl.to(subtitle, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, 0.15);

      // --------------------------------------------
      // Phase 2: Molecular Graphic Animation
      // --------------------------------------------
      const mapTl = gsap.timeline({
        scrollTrigger: {
          trigger: mapContainer,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });

      // 0.0s -> Main blue path begins drawing
      mapTl.to(solidPath, {
        strokeDasharray: '1000 1000',
        duration: 2.5,
        ease: 'power2.inOut'
      }, 0.0);

      // 0.5s -> Orange node glows (appears)
      mapTl.to(nodeOrange, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(2)'
      }, 0.5);

      // 0.9s -> White node (signal) appears and starts travelling
      mapTl.to(nodeSignal, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      }, 0.9);

      mapTl.to(nodeSignal, {
        motionPath: {
          path: '#main-route',
          align: '#main-route',
          alignOrigin: [0.5, 0.5]
        },
        duration: 1.3,
        ease: 'power2.inOut'
      }, 0.9);

      // 0.9s -> Bright blue trail follows the signal
      mapTl.to(trailPath, {
        strokeDasharray: '1000 1000',
        duration: 1.3,
        ease: 'power2.inOut'
      }, 0.9);

      // 1.9s -> Blue node activates (grows slightly before impact)
      mapTl.to(nodeBlue, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(2)'
      }, 1.9);

      // 2.2s -> Final connection completes

      // Signal disappears smoothly
      mapTl.to(nodeSignal, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      }, 2.2);

      // Trail settles back to normal blue (fades out revealing the solid blue beneath)
      mapTl.to(trailPath, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, 2.2);

      // Clean energy pulse down the path
      mapTl.to(solidPath, {
        stroke: '#4facfe',
        duration: 0.1
      }, 2.2);
      mapTl.to(solidPath, {
        stroke: 'var(--color-brand-blue)',
        duration: 0.6,
        ease: 'power2.out'
      }, 2.3);

      // 2.3s -> Stats animate in as a result of the connection
      mapTl.to(stats, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      }, 2.3);

      ScrollTrigger.refresh();

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section ecosystem-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title text-center">
          Global <span className="text-gradient">Chemical</span> Ecosystem
        </h2>
        <p className="section-subtitle text-center">
          Connecting local manufacturing with worldwide demand through an intelligent, unified supply chain.
        </p>

        <div className="map-container">
          <svg className="world-map-svg" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
            {/* Abstract Base Map */}
            <path className="map-base" d="M100,150 Q150,100 250,120 T400,100 T600,150 T800,120 T950,180" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="20" strokeLinecap="round" />

            {/* Main Path (Invisible guide for MotionPath) */}
            <path id="main-route" d="M250,120 Q425,50 600,150 Q700,200 800,120" fill="none" stroke="none" />

            {/* Solid drawing path */}
            <path className="route-solid" d="M250,120 Q425,50 600,150 Q700,200 800,120" fill="none" stroke="var(--color-brand-blue)" strokeWidth="2" strokeDasharray="10 10" />

            {/* Bright Trail (signal tail) */}
            <path className="route-trail" d="M250,120 Q425,50 600,150 Q700,200 800,120" fill="none" stroke="#4facfe" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 4px #4facfe)' }} />

            {/* Nodes */}
            <circle className="node-orange" cx="250" cy="120" r="8" fill="var(--color-brand-orange)" />
            <circle className="node-blue" cx="800" cy="120" r="8" fill="var(--color-brand-blue)" />

            {/* Signal Node (White) */}
            <circle className="node-signal" cx="0" cy="0" r="6" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 6px #ffffff)' }} />
          </svg>

          <div className="map-stats">
            <div className="map-stat glass-panel">
              <Ship className="stat-icon" />
              <div>
                <strong>30+</strong>
                <span>Ports</span>
              </div>
            </div>
            <div className="map-stat glass-panel">
              <Plane className="stat-icon" />
              <div>
                <strong>40+</strong>
                <span>Countries</span>
              </div>
            </div>
            <div className="map-stat glass-panel">
              <Truck className="stat-icon" />
              <div>
                <strong>99.9%</strong>
                <span>On-Time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
