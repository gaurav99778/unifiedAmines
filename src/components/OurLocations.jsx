import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ArrowRight } from 'lucide-react';
import './OurLocations.css';

gsap.registerPlugin(ScrollTrigger);

export default function OurLocations() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        [titleRef.current, subtitleRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Cards Reveal Animation
      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation (-1.5 to 1.5 degrees for a max 3 degree parallax)
    const rotateX = ((y / rect.height) - 0.5) * -3;
    const rotateY = ((x / rect.width) - 0.5) * 3;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (card) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'power3.out',
    });
  };

  const locations = [
    {
      label: 'CORPORATE OFFICE',
      title: 'Vadodara, Gujarat',
      address: '-',
      mapLink: 'https://maps.google.com/?q=Vadodara,+Gujarat',
    },
    {
      label: 'MANUFACTURING FACILITY',
      title: 'Nardana, Maharashtra',
      address: '-',
      mapLink: 'https://maps.google.com/?q=Nardana,+Maharashtra',
    }
  ];

  return (
    <section className="section our-locations-section" ref={sectionRef}>
      <div className="container" style={{ maxWidth: '1200px' }}>

        <div className="locations-header text-center">
          <h2 className="section-title" ref={titleRef}>
            Our <span className="text-gradient">Locations</span>
          </h2>
          <p className="section-subtitle" ref={subtitleRef} style={{ marginBottom: '4rem' }}>
            Visit our headquarters and manufacturing facility.
          </p>
        </div>

        <div className="locations-grid">
          {locations.map((loc, index) => (
            <div
              key={index}
              className="location-card"
              ref={el => cardsRef.current[index] = el}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <div className="card-accent-line"></div>

              <div className="card-content">
                <div className="card-top">
                  <div className="card-left">
                    <span className="location-label">{loc.label}</span>
                    <h3 className="location-title">{loc.title}</h3>

                    <div className="address-container">
                      <div className="vertical-divider"></div>
                      <div className="location-address">
                        <span className="address-label">Address:</span>
                        <p>{loc.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="card-right">
                    <div className="icon-wrapper">
                      <MapPin size={32} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

              </div>

              <div className="card-bottom">
                <a
                  href={loc.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-map-btn"
                >
                  <MapPin size={16} className="btn-icon" />
                  <span>View on Google Maps</span>
                  <ArrowRight size={16} className="btn-arrow" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
