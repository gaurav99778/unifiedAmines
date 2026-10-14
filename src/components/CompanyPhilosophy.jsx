import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, ShieldCheck, Leaf, Flame, Activity } from 'lucide-react';
import './CompanyPhilosophy.css';

gsap.registerPlugin(ScrollTrigger);

export default function CompanyPhilosophy() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);
  const counterNumRef = useRef(null);

  const philosophies = [
    { 
      id: '01',
      title: 'Innovation', 
      tagline: 'MOLECULAR R&D BREAKTHROUGH',
      desc: 'Continuous pursuit of breakthrough molecular architectures, proprietary amine synthesis, and next-generation chemical engineering.',
      meta: 'Proprietary Formulation Lab',
      icon: Flame,
      image: '/images/industrial_innovation_v2.png',
      accent: 'orange'
    },
    { 
      id: '02',
      title: 'Precision', 
      tagline: 'ANALYTICAL PURITY BENCHMARK',
      desc: 'Exacting standards in every synthesized compound with comprehensive analytical chromatography and zero-tolerance impurity thresholds.',
      meta: '99.98% High Purity Certified',
      icon: Activity,
      image: '/images/industrial_precision_v2.png',
      accent: 'blue'
    },
    { 
      id: '03',
      title: 'Reliability', 
      tagline: 'ENTERPRISE PRODUCTION AT SCALE',
      desc: 'Unwavering batch consistency, massive synthesis capacity, and resilient multi-modal logistics across 40+ global destinations.',
      meta: 'Tier-1 Enterprise Distribution',
      icon: ShieldCheck,
      image: '/images/industrial_reliability_v2.png',
      accent: 'gold'
    },
    { 
      id: '04',
      title: 'Sustainability', 
      tagline: 'GREEN OLEOCHEMICAL ENGINEERING',
      desc: 'Pioneering eco-friendly catalytic synthesis, bio-based derivatives, and reduced carbon impact for sustainable global manufacturing.',
      meta: 'REACH & Eco-Compliant',
      icon: Leaf,
      image: '/images/industrial_sustainability_v2.png',
      accent: 'green'
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // Calculate exact horizontal scroll amount to bring the 4th card comfortably into view
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const windowWidth = window.innerWidth;
        return Math.max(0, trackWidth - windowWidth + (windowWidth > 1200 ? 100 : 40));
      };

      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        // Desktop Pinned Horizontal Scroll
        gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getScrollAmount()}`, // Exact distance so unpinning connects seamlessly with next section
            pin: true,
            scrub: 0.5, // Fluid, snappy responsiveness with Lenis
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Direct DOM manipulation - NO React re-renders while pinned!
              if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${self.progress})`;
              }

              if (counterNumRef.current) {
                const index = Math.min(4, Math.max(1, Math.floor(self.progress * 3.99) + 1));
                counterNumRef.current.textContent = `0${index}`;
              }
            }
          }
        });

        // Individual Card Parallax Shift on Industrial Images
        const cards = track.querySelectorAll('.philosophy-card');
        cards.forEach((card) => {
          const img = card.querySelector('.industrial-image');
          if (img) {
            gsap.fromTo(img, 
              { xPercent: 6 },
              {
                xPercent: -6,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top top',
                  end: () => `+=${getScrollAmount()}`,
                  scrub: true
                }
              }
            );
          }
        });
      });

      // Synchronize ScrollTrigger positions across the document
      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => clearTimeout(refreshTimeout);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    const imageContainer = e.currentTarget.querySelector('.philosophy-image-container');
    const glow = e.currentTarget.querySelector('.philosophy-glow');
    
    if (imageContainer) {
      gsap.to(imageContainer, {
        x: x * -12,
        y: y * -12,
        duration: 0.5,
        ease: 'power2.out'
      });
    }

    if (glow) {
      gsap.to(glow, {
        x: x * 25,
        y: y * 25,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = (e) => {
    const imageContainer = e.currentTarget.querySelector('.philosophy-image-container');
    const glow = e.currentTarget.querySelector('.philosophy-glow');
    
    if (imageContainer) {
      gsap.to(imageContainer, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
    }

    if (glow) {
      gsap.to(glow, { x: 0, y: 0, duration: 0.8, ease: 'power2.out' });
    }
  };

  return (
    <section className="philosophy-pinned-section" ref={sectionRef}>
      {/* Ambient background glow */}
      <div className="philosophy-bg-glow"></div>

      {/* Persistent Pinned Header Area */}
      <div className="philosophy-header-wrapper">
        <div className="container philosophy-header-inner">
          <div className="philosophy-title-block">
            <div  className="">
             
            </div>
            <h2 style={{marginTop:40}} className="philosophy-title ">
              Core <span className="text-gradient">Philosophy</span>
            </h2>
          </div>

          {/* Real-time Scroll Progress Indicator */}
          <div className="philosophy-progress-meta">
            <div className="progress-counter">
              <span className="current-num" ref={counterNumRef}>01</span>
              <span className="slash">/</span>
              <span className="total-num">04</span>
            </div>
            <div className="progress-track-bar">
              <div className="progress-fill" ref={progressBarRef}></div>
            </div>
            <span className="scroll-hint">SCROLL HORIZONTALLY</span>
          </div>
        </div>
      </div>

      {/* Horizontal Sliding Cards Track */}
      <div className="philosophy-viewport">
        <div className="philosophy-track" ref={trackRef}>
          {philosophies.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className={`philosophy-card accent-${item.accent}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Background Image Container with Soft Gradient Fade */}
                <div className="philosophy-image-container">
                  <div className="industrial-image-wrapper">
                    <div 
                      className="industrial-image" 
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    <div className="industrial-gradient-overlay"></div>
                  </div>
                </div>

                {/* Ambient Radial Hover Glow */}
                <div className="philosophy-glow"></div>
                <div className="card-top-light"></div>

                {/* Card Top Information */}
                <div className="card-top-bar">
                  <div className={`card-icon-pill icon-${item.accent}`}>
                    <Icon size={18} />
                    <span>{item.tagline}</span>
                  </div>
                  <span className="card-num-watermark">{item.id}</span>
                </div>

                {/* Card Content & Description */}
                <div className="philosophy-content">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.desc}</p>
                </div>

                {/* Card Footer Meta */}
                <div className="card-footer-bar">
                  <span className={`footer-status-dot dot-${item.accent}`}></span>
                  <span className="footer-meta-text">{item.meta}</span>
                  <ArrowRight size={15} className="footer-arrow" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
