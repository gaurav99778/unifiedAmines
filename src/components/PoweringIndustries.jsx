import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Pill, 
  Sprout, 
  Sparkles, 
  Layers, 
  Droplets, 
  Scissors, 
  ShieldCheck, 
  Factory,
  Globe2
} from 'lucide-react';
import './PoweringIndustries.css';

gsap.registerPlugin(ScrollTrigger);

const INDUSTRIES_DATA = [
  { name: 'Pharmaceuticals', icon: Pill, tag: 'API Intermediate' },
  { name: 'Agrochemicals', icon: Sprout, tag: 'Surfactant Systems' },
  { name: 'Personal Care', icon: Sparkles, tag: 'Cationic Conditioning' },
  { name: 'Paints & Coatings', icon: Layers, tag: 'Crosslinking Agents' },
  { name: 'Water Treatment', icon: Droplets, tag: 'Flocculation Chemistry' },
  { name: 'Textile Processing', icon: Scissors, tag: 'Auxiliary Esters' },
  { name: 'Home Care & Biocides', icon: ShieldCheck, tag: 'Antimicrobial Quats' },
  { name: 'Industrial Synthesis', icon: Factory, tag: 'Bulk Amine Catalysts' }
];

const MARKETS_DATA = [
  { name: 'India (HQ)', flag: '🇮🇳', region: 'Domestic Manufacturing' },
  { name: 'Germany', flag: '🇩🇪', region: 'European Union' },
  { name: 'United States', flag: '🇺🇸', region: 'North America' },
  { name: 'United Arab Emirates', flag: '🇦🇪', region: 'Middle East' },
  { name: 'Singapore', flag: '🇸🇬', region: 'Asia-Pacific' },
  { name: 'Saudi Arabia', flag: '🇸🇦', region: 'GCC Terminal' },
  { name: 'Brazil', flag: '🇧🇷', region: 'Latin America' },
  { name: 'South Africa', flag: '🇿🇦', region: 'African Trade Corridor' },
  { name: 'Japan', flag: '🇯🇵', region: 'East Asia' },
  { name: 'Egypt', flag: '🇪🇬', region: 'North Africa' }
];

export default function PoweringIndustries() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const header = headerRef.current;
      if (!section || !header) return;

      const badge = header.querySelector('.powering-badge');
      const title = header.querySelector('.powering-title');
      const desc = header.querySelector('.powering-desc');
      const lines = header.querySelectorAll('.powering-rule');
      const marquees = section.querySelector('.powering-marquee-container');

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
      .fromTo(title, 
        { opacity: 0, y: 25 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 
        '-=0.3'
      )
      .fromTo(desc, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 
        '-=0.4'
      )
      .fromTo(lines, 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 1.0, ease: 'power3.inOut' }, 
        '-=0.5'
      )
      .fromTo(marquees, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 
        '-=0.5'
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="powering-section" ref={sectionRef}>
      {/* Soft Ambient Radial Light */}
      <div className="powering-ambient-glow" />

      <div className="powering-header" ref={headerRef}>
        <div className="powering-badge">
          <Globe2 size={14} className="badge-icon" />
          <span>CROSS-SECTOR DEPLOYMENT</span>
        </div>

        <div className="powering-rule top-rule"></div>

        <h2 className="powering-title">
          Powering Industries <span className="text-gradient">Worldwide.</span>
        </h2>

        <p className="powering-desc">
          Precision amine chemistry and surfactant formulations engineered for mission-critical reliability 
          across 8 foundational global industries.
        </p>

        <div className="powering-rule bottom-rule"></div>
      </div>

      <div className="powering-marquee-container">
        {/* Track 1: Strategic Industries (Leftwards Continuous Flow) */}
        <div className="marquee-wrapper">
          <div className="marquee-track track-left">
            {[...INDUSTRIES_DATA, ...INDUSTRIES_DATA].map((ind, i) => {
              const Icon = ind.icon;
              return (
                <div key={`ind-${i}`} className="industry-capsule glass-panel">
                  <div className="capsule-icon-box">
                    <Icon size={18} />
                  </div>
                  <div className="capsule-info">
                    <span className="capsule-name">{ind.name}</span>
                    <span className="capsule-tag">{ind.tag}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Track 2: Global Markets (Rightwards Continuous Flow) */}
        <div className="marquee-wrapper">
          <div className="marquee-track track-right">
            {[...MARKETS_DATA, ...MARKETS_DATA].map((mkt, i) => (
              <div key={`mkt-${i}`} className="market-capsule glass-panel">
                <span className="market-flag">{mkt.flag}</span>
                <div className="market-info">
                  <span className="market-name">{mkt.name}</span>
                  <span className="market-region">{mkt.region}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
