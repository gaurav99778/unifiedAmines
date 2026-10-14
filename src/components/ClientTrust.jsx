import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ShieldCheck, Quote, CheckCircle2 } from 'lucide-react';
import './ClientTrust.css';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: "Their precision in manufacturing and consistency across batches has made them an indispensable part of our global supply chain.",
    role: "Procurement Director",
    industry: "Specialty Chemical Manufacturer",
    country: "India",
    flag: "🇮🇳",
    bgWord: "RELIABILITY",
    badge: "Tier-1 Supply Partner"
  },
  {
    quote: "A true partner who understands that in this industry, there is absolutely no margin for error or batch-to-batch variance.",
    role: "Head of Operations",
    industry: "Pharmaceuticals & APIs",
    country: "Germany",
    flag: "🇩🇪",
    bgWord: "PRECISION",
    badge: "EU REACH Verified"
  },
  {
    quote: "We don't just buy chemicals from them; we rely on their engineering standards to guarantee our own finished product quality.",
    role: "Chief Technical Officer",
    industry: "Agrochemicals & Surfactants",
    country: "Brazil",
    flag: "🇧🇷",
    bgWord: "TRUST",
    badge: "Multi-Year Allocation"
  }
];

export default function ClientTrust() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const badge = section.querySelector('.trust-badge');
      const heading = section.querySelector('.trust-heading');
      const subtitle = section.querySelector('.trust-desc');
      const cards = section.querySelectorAll('.editorial-trust-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      tl.fromTo(badge, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo(heading, 
        { opacity: 0, y: 25 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 
        '-=0.3'
      )
      .fromTo(subtitle, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 
        '-=0.4'
      )
      .fromTo(cards, 
        { opacity: 0, y: 45, scale: 0.97 }, 
        { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out' }, 
        '-=0.4'
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="editorial-section" ref={sectionRef}>
      {/* Ambient background glows */}
      <div className="trust-ambient-glow" />

      <div className="container trust-container">
        
        {/* Header */}
        <div className="trust-header text-center">
          <div className="trust-badge">
            <ShieldCheck size={14} className="badge-icon" />
            <span>ENTERPRISE VALIDATION</span>
          </div>

          <h2 className="trust-heading">
            Built on <span className="text-gradient">Long-Term Partnerships.</span>
          </h2>

          <p className="trust-desc">
            Decades of analytical chromatography purity and continuous supply reliability,
            verified by procurement leaders worldwide.
          </p>
        </div>

        {/* 3 Editorial Testimonial Bento Cards */}
        <div className="editorial-cards-grid">
          {TESTIMONIALS.map((t, idx) => (
            <div key={`testimonial-${idx}`} className="editorial-trust-card glass-panel">
              {/* Background Pillar Watermark */}
              <div className="card-bg-watermark">{t.bgWord}</div>

              {/* Card Top: 5 Stars + Verified Badge */}
              <div className="card-top-row">
                <div className="stars-row">
                  {[...Array(5)].map((_, sIdx) => (
                    <Star key={sIdx} size={15} className="star-icon" fill="var(--color-brand-orange)" />
                  ))}
                </div>
                <span className="partner-verified-badge">
                  <CheckCircle2 size={12} className="check-icon" />
                  {t.badge}
                </span>
              </div>

              {/* Quotation Mark & Quote */}
              <div className="quote-body">
                <Quote size={28} className="quote-mark-icon" />
                <p className="quote-text">"{t.quote}"</p>
              </div>

              {/* Card Bottom Attribution */}
              <div className="card-attribution-row">
                <div className="attribution-meta">
                  <strong className="client-role">{t.role}</strong>
                  <span className="client-industry">{t.industry}</span>
                </div>
                <div className="client-country-pill">
                  <span className="flag-emoji">{t.flag}</span>
                  <span className="country-name">{t.country}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
