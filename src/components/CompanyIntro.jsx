import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, FlaskConical, Globe, ShieldCheck, Atom } from 'lucide-react';
import './CompanyIntro.css';

gsap.registerPlugin(ScrollTrigger);

export default function CompanyIntro() {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef(null);
  const capRef = useRef(null);

  const stats = [
    {
      id: 'years',
      number: 28,
      suffix: '+',
      isDecimal: false,
      badge: 'EST. 1996',
      title: 'Years of Synthesis Excellence',
      description: 'Three decades of breakthrough molecular engineering and continuous industrial reliability.',
      meta: 'Tier-1 Enterprise Supplier',
      icon: Award,
      accent: 'orange'
    },
    {
      id: 'products',
      number: 60,
      suffix: '+',
      isDecimal: false,
      badge: 'PROPRIETARY R&D',
      title: 'Specialty Formulations',
      description: 'Engineered amines, high-yield surfactants, and tailored esters built for mission-critical applications.',
      meta: 'Custom Molecular Tailoring',
      icon: FlaskConical,
      accent: 'blue'
    },
    {
      id: 'countries',
      number: 40,
      suffix: '+',
      isDecimal: false,
      badge: 'GLOBAL FOOTPRINT',
      title: 'International Markets',
      description: 'Compliant worldwide distribution supplying manufacturers across Europe, the Americas, APAC, and MEA.',
      meta: 'REACH & Global Certified',
      icon: Globe,
      accent: 'gold'
    },
    {
      id: 'purity',
      number: 99.98,
      suffix: '%',
      isDecimal: true,
      badge: 'QUALITY THRESHOLD',
      title: 'Batch Purity Benchmark',
      description: 'Uncompromising analytical chromatography standards with zero-tolerance for batch inconsistency.',
      meta: 'ISO 9001:2015 Verified',
      icon: ShieldCheck,
      accent: 'orange'
    }
  ];

  const domains = [
    'Specialty Amines',
    'Cationic Surfactants',
    'Fatty Acid Esters',
    'Corrosion Inhibitors',
    'Emulsifying Systems'
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for header text reveal
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });

      if (badgeRef.current) {
        introTl.fromTo(badgeRef.current,
          { opacity: 0, y: 25, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
        );
      }

      if (headingRef.current) {
        introTl.fromTo(headingRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.5'
        );
      }

      if (descRef.current) {
        introTl.fromTo(descRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        );
      }

      // Cards staggered reveal
      const cardElements = cardsRef.current?.querySelectorAll('.stat-card');
      if (cardElements && cardElements.length > 0) {
        introTl.fromTo(cardElements,
          { opacity: 0, y: 45, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
          '-=0.4'
        );

        // Counter animations for each card
        cardElements.forEach((card) => {
          const counterEl = card.querySelector('.counter');
          if (counterEl) {
            const target = parseFloat(counterEl.getAttribute('data-target'));
            const isDec = counterEl.getAttribute('data-decimal') === 'true';
            const counterObj = { val: 0 };

            gsap.to(counterObj, {
              val: target,
              duration: 2.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                once: true
              },
              onUpdate: () => {
                counterEl.textContent = isDec ? counterObj.val.toFixed(2) : Math.round(counterObj.val);
              }
            });
          }
        });
      }

      // Capabilities strip reveal
      if (capRef.current) {
        introTl.fromTo(capRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.2'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="section intro-section" ref={containerRef}>
      {/* Ambient background atmosphere */}
      <div className="intro-bg-glow-primary"></div>
      <div className="intro-bg-glow-secondary"></div>
      <div className="intro-tech-grid"></div>

      <div className="container intro-container">
        <div className="intro-header">
          {/* Eyebrow badge matching the hero's aesthetic */}
          <div className="intro-eyebrow" ref={badgeRef}>
          
            <span className="eyebrow-text">MOLECULAR INNOVATION & SYNTHESIS</span>
            <span className="eyebrow-separator">/</span>
            <span className="eyebrow-sub">SPECIALTY CHEMICALS</span>
          </div>

          {/* Majestic Heroic Title with dynamic gradient */}
          <h2 className="intro-heading" ref={headingRef}>
            <span className="intro-heading-lead">We Don't Just Supply Chemicals.</span>
            <span className="intro-heading-gradient">We Engineer Potential.</span>
          </h2>

          {/* Refined editorial lead text */}
          <p className="intro-text" ref={descRef}>
            For over two decades, <strong className="intro-highlight-text">Unified Amines</strong> has been at the forefront of molecular innovation. 
            We synthesize high-purity surfactants, fatty acid esters, and specialty amines that form the invisible, mission-critical foundation of the world’s most advanced industries.
          </p>
        </div>

        {/* High-Tech Telemetry Bento Cards */}
        <div className="stats-bento-grid" ref={cardsRef}>
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className={`stat-card glass-panel accent-${item.accent}`}
                onMouseMove={handleCardMouseMove}
              >
                {/* Spotlight hover effect layer */}
                <div className="card-spotlight"></div>
                <div className="card-top-accent"></div>

                <div className="card-header">
                  <div className={`card-icon-wrapper icon-${item.accent}`}>
                    <Icon size={20} />
                  </div>
                  <span className="card-tag">{item.badge}</span>
                </div>

                <div className="card-body">
                  <div className="stat-number-wrapper">
                    <span 
                      className="counter" 
                      data-target={item.number}
                      data-decimal={item.isDecimal ? "true" : "false"}
                    >
                      0
                    </span>
                    <span className="stat-suffix">{item.suffix}</span>
                  </div>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.description}</p>
                </div>

                <div className="card-footer">
                  <span className="footer-meta">{item.meta}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Synthesis Capabilities Domain Bar */}
        <div className="intro-capabilities-bar" ref={capRef}>
          <div className="capabilities-label">
            <Atom size={16} style={{margin:5}} className="cap-icon " />
            <span>CORE SYNTHESIS DOMAINS</span>
          </div>
          <div className="capabilities-divider"></div>
          <div className="capabilities-list">
            {domains.map((title, idx) => (
              <div key={idx} className="capability-pill">
                <span className="cap-pulse-dot"></span>
                <span className="cap-pill-title">{title}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
