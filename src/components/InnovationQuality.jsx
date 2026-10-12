import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './InnovationQuality.css';

gsap.registerPlugin(ScrollTrigger);

export default function InnovationQuality() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      const imageContainer = item.querySelector('.iq-image-container');
      const image = item.querySelector('.iq-image');
      const textContent = item.querySelector('.iq-text-content');

      // Image Mask and Scale Reveal
      gsap.fromTo(imageContainer,
        { clipPath: 'inset(10% 10% 10% 10%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(image,
        { scale: 1.1, filter: 'blur(10px)' },
        {
          scale: 1,
          filter: 'blur(0px)',
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Text Stagger Reveal
      gsap.fromTo(textContent.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Subtle parallax on the image
      gsap.to(image, {
        y: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }, []);

  return (
    <section className="section iq-section" ref={sectionRef}>
      <div className="container iq-container">
        
        <div className="iq-item" ref={(el) => itemsRef.current[0] = el}>
          <div className="iq-image-col">
            <div className="iq-image-container">
              <div 
                className="iq-image" 
                style={{ backgroundImage: 'url(/images/innovation_1.png)' }}
              ></div>
            </div>
          </div>
          <div className="iq-text-col">
            <div className="iq-text-content">
              <div className="iq-label">INNOVATION</div>
              <h3 className="iq-title">Pioneering the Next Generation of Chemical Synthesis.</h3>
              <p className="iq-desc">
                Our R&D laboratories are equipped with the most advanced analytical instrumentation in the industry. We do not simply follow industry standards; we define them through rigorous testing, process optimization, and continuous technological advancement.
              </p>
            </div>
          </div>
        </div>

        <div className="iq-item iq-item-reverse" ref={(el) => itemsRef.current[1] = el}>
          <div className="iq-image-col">
            <div className="iq-image-container">
              <div 
                className="iq-image" 
                style={{ backgroundImage: 'url(/images/innovation_2.png)' }}
              ></div>
            </div>
          </div>
          <div className="iq-text-col">
            <div className="iq-text-content">
              <div className="iq-label">QUALITY ASSURANCE</div>
              <h3 className="iq-title">Uncompromising Precision in Every Drop.</h3>
              <p className="iq-desc">
                Every batch undergoes multi-tiered spectroscopic analysis. From molecular integrity to long-term stability, our quality assurance protocols ensure that our specialty amines and surfactants perform flawlessly in the most demanding applications worldwide.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
