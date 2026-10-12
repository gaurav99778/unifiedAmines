import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './ClientTrust.css';

gsap.registerPlugin(ScrollTrigger);

const StarIcon = () => (
  <svg className="editorial-star" viewBox="0 0 24 24" fill="var(--color-brand-orange)" width="16" height="16">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

export default function ClientTrust() {
  const sectionRef = useRef(null);

  const testimonials = [
    {
      quote: <>Their precision in manufacturing and consistency across batches<br/>has made them an indispensable part of our supply chain.</>,
      role: "Procurement Director",
      industry: "Specialty Chemical Manufacturer",
      country: "India",
      bgWord: "RELIABILITY"
    },
    {
      quote: <>A true partner who understands that in this industry,<br/>there is absolutely no margin for error.</>,
      role: "Head of Operations",
      industry: "Pharmaceuticals",
      country: "Germany",
      bgWord: "PRECISION"
    },
    {
      quote: <>We don't just buy chemicals from them; we rely on their<br/>engineering standards to guarantee our own product quality.</>,
      role: "Chief Technical Officer",
      industry: "Agrochemicals",
      country: "Brazil",
      bgWord: "TRUST"
    }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const section = sectionRef.current;
      
      const headingText = section.querySelector('.editorial-heading');
      const headingLines = section.querySelectorAll('.editorial-heading-line');
      const headingWrapper = section.querySelector('.editorial-heading-wrapper');
      
      // GSAP Initial Setup (Ensures default visible state is hidden safely before animation)
      gsap.set(headingLines, { scaleX: 0 });
      gsap.set('.editorial-quote-container', { opacity: 0, scale: 0.98 });
      gsap.set('.editorial-bg-word', { opacity: 0, y: 50 });
      gsap.set('.editorial-progress-line', { scaleX: 0 });
      gsap.set('.editorial-attribution', { y: 20, opacity: 0 });
      gsap.set('.editorial-star', { opacity: 0.2, filter: 'drop-shadow(0 0 0px var(--color-brand-orange))' });

      const splitHeading = new SplitType(headingText, { types: 'lines,words' });
      gsap.set(splitHeading.words, { yPercent: 120, opacity: 0, filter: 'blur(10px)' });

      const quoteContainers = gsap.utils.toArray('.editorial-quote-container', section);
      const bgWords = gsap.utils.toArray('.editorial-bg-word', section);
      const progressLines = gsap.utils.toArray('.editorial-progress-line', section);

      const splitQuotes = quoteContainers.map(q => {
        const textElement = q.querySelector('.editorial-quote-text');
        const split = new SplitType(textElement, { types: 'lines,words' });
        gsap.set(split.words, { yPercent: 120, opacity: 0, filter: 'blur(8px)', color: 'rgba(255, 255, 255, 0.3)' });
        return split;
      });

      // 1. Entrance Animation - Starts almost immediately when entering viewport
      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          toggleActions: 'play none none none'
        }
      });

      enterTl.to(headingLines, {
        scaleX: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power3.inOut'
      })
      .to(splitHeading.words, {
        yPercent: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out'
      }, "-=0.8");

      // 2. Pinned Scrub Sequence
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=3000' // Reduced distance to speed up flow
        }
      });

      // Hide the initial heading
      scrubTl.to(headingWrapper, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut'
      });

      // Sequence the testimonials
      testimonials.forEach((testi, index) => {
        const quoteEl = quoteContainers[index];
        const bgWordEl = bgWords[index];
        const attributionEl = quoteEl.querySelector('.editorial-attribution');
        const progressLineEl = progressLines[index];
        const stars = quoteEl.querySelectorAll('.editorial-star');
        const splitQuote = splitQuotes[index];

        // Fade in Background Word with very slow upward parallax
        scrubTl.fromTo(bgWordEl, 
          { opacity: 0, y: 50 },
          { opacity: 1, y: -50, duration: 3, ease: 'none' }, 
          "-=0.5" 
        );

        // Reveal Quote Container & subtle scale from 0.98 -> 1
        scrubTl.to(quoteEl, { opacity: 1, scale: 1, duration: 0.5 }, "<");
        
        // Reveal Quote Text Words
        scrubTl.to(splitQuote.words, {
          yPercent: 0,
          opacity: 1,
          filter: 'blur(0px)',
          color: '#ffffff',
          duration: 1,
          stagger: 0.05,
          ease: 'power2.out'
        }, "<0.2");

        // Stagger Stars
        scrubTl.to(stars, {
          opacity: 1,
          filter: 'drop-shadow(0 0 4px var(--color-brand-orange))',
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        }, "<0.4");

        // Reveal Attribution
        scrubTl.to(attributionEl, {
          opacity: 0.6,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        }, "-=0.2");

        // Animate the progress line (divider) as user reads
        scrubTl.to(progressLineEl, {
          scaleX: 1,
          duration: 0.8,
          ease: 'none'
        });

        // Fade out entire block and Background Word (only for non-final testimonials)
        if (index < testimonials.length - 1) {
          scrubTl.to([quoteEl, bgWordEl, progressLineEl], {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut'
          });
        } else {
          // Final Quote specific behavior
          // Do NOT fade out. Keep it visible so it scrolls naturally up into the next section.
          // Add a dummy duration so it remains pinned long enough for the user to read it before unpinning.
          scrubTl.to({}, { duration: 1 });
        }
      });

      // Synchronize GSAP with Lenis after all layout operations are completed
      // to fix any delayed triggers
      ScrollTrigger.refresh();

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="editorial-section" ref={sectionRef}>
      <div className="editorial-container">

        {/* Layer 1: Background Words */}
        <div className="editorial-bg-layer">
          {testimonials.map((t, i) => (
            <div 
              key={`bg-${i}`} 
              className="editorial-bg-word"
            >
              <div className="editorial-bg-word-inner">{t.bgWord}</div>
            </div>
          ))}
        </div>

        {/* Layer 2: Heading */}
        <div className="editorial-heading-layer">
          <div className="editorial-heading-wrapper">
            <div className="editorial-heading-line"></div>
            <h2 className="editorial-heading">
              BUILT ON<br />
              LONG-TERM PARTNERSHIPS.
            </h2>
            <div className="editorial-heading-line"></div>
          </div>
        </div>

        {/* Layer 3: Testimonials */}
        <div className="editorial-testimonial-layer">
          {testimonials.map((t, i) => (
            <div 
              key={`quote-${i}`} 
              className="editorial-quote-container"
            >
              <div className="editorial-quote-mark">“</div>
              
              <p className="editorial-quote-text">{t.quote}</p>
              
              <div className="editorial-stars-container">
                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
              </div>

              <div className="editorial-attribution">
                <span className="editorial-role">{t.role}</span>
                <span className="editorial-industry">{t.industry}</span>
                <span className="editorial-country">{t.country}</span>
              </div>
              
              <div className="editorial-progress-line"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
