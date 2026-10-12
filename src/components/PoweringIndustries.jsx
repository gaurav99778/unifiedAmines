import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './PoweringIndustries.css';

gsap.registerPlugin(ScrollTrigger);

export default function PoweringIndustries() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  const countries = [
    "INDIA", "UAE", "SAUDI ARABIA", "SINGAPORE", 
    "MALAYSIA", "EGYPT", "SOUTH AFRICA", "BRAZIL"
  ];

  const industries = [
    "PHARMACEUTICALS", "AGROCHEMICALS", "PERSONAL CARE", 
    "PAINTS & COATINGS", "TEXTILES", "WATER TREATMENT", 
    "HOME CARE", "INDUSTRIAL CHEMICALS"
  ];

  useLayoutEffect(() => {
    let splitTitle;

    let ctx = gsap.context(() => {
      const section = sectionRef.current;
      const title = titleRef.current;
      
      // Split text into words and lines
      splitTitle = new SplitType(title, { types: 'lines,words' });
      
      // Initial states via JS so CSS defaults to visible (fixes hydration/refresh bugs)
      gsap.set(splitTitle.words, { y: '100%', opacity: 0, filter: 'blur(5px)' });
      gsap.set('.powering-line', { width: '0%' });
      
      const marquee1 = gsap.to(row1Ref.current, {
        xPercent: -50,
        ease: "none",
        duration: 35, 
        repeat: -1
      });

      const marquee2 = gsap.fromTo(row2Ref.current, 
        { xPercent: -50 },
        {
          xPercent: 0,
          ease: "none",
          duration: 40,
          repeat: -1
        }
      );

      // Entrance Animation Timeline - triggers slightly later when scrolling
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%', // Starts later when section is 25% into viewport
        }
      });

      tl.to('.powering-line', {
        width: '100%',
        duration: 1.2,
        stagger: 0.2, // Animate top line, then bottom line
        ease: "power3.inOut"
      })
      .to(splitTitle.words, {
        y: '0%',
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.8");

    }, sectionRef);

    // Call ScrollTrigger.refresh() after the layout is fully ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      if (splitTitle) splitTitle.revert();
      ctx.revert(); 
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="powering-section" ref={sectionRef}>
      <div className="powering-header">
        <div className="powering-line"></div>
        <h2 className="powering-title" ref={titleRef}>
          Powering Industries<br />Worldwide.
        </h2>
        <div className="powering-line"></div>
      </div>

      <div className="powering-marquee-container">
        {/* First Row: Countries */}
        <div className="marquee-row" ref={row1Ref}>
          <div className="marquee-content">
            {countries.map((item, idx) => (
              <React.Fragment key={`c1-${idx}`}>
                <span className="marquee-item">{item}</span>
                <span className="marquee-separator">◇</span>
              </React.Fragment>
            ))}
          </div>
          <div className="marquee-content">
            {countries.map((item, idx) => (
              <React.Fragment key={`c2-${idx}`}>
                <span className="marquee-item">{item}</span>
                <span className="marquee-separator">◇</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Second Row: Industries */}
        <div className="marquee-row" ref={row2Ref}>
          <div className="marquee-content">
            {industries.map((item, idx) => (
              <React.Fragment key={`i1-${idx}`}>
                <span className="marquee-item">{item}</span>
                <span className="marquee-separator">◇</span>
              </React.Fragment>
            ))}
          </div>
          <div className="marquee-content">
            {industries.map((item, idx) => (
              <React.Fragment key={`i2-${idx}`}>
                <span className="marquee-item">{item}</span>
                <span className="marquee-separator">◇</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
