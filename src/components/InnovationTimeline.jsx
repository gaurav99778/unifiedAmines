import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./InnovationTimeline.css";

gsap.registerPlugin(ScrollTrigger);

export default function InnovationTimeline() {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const itemsRef = useRef([]);
  const progressLineRef = useRef(null);
  const activeIndexRef = useRef(-1);
  const [activeIndex, setActiveIndex] = useState(-1);

  const timelineEvents = [
    {
      year: "1998",
      title: "Foundation",
      desc: "Unified Amines established with a focus on core surfactants.",
    },
    {
      year: "2005",
      title: "Global Reach",
      desc: "Expanded export operations to over 20 countries worldwide.",
    },
    {
      year: "2012",
      title: "R&D Center",
      desc: "Opened state-of-the-art molecular research facility.",
    },
    {
      year: "2018",
      title: "Eco-Synthesis",
      desc: "Launched sustainable, zero-emission manufacturing processes.",
    },
    {
      year: "2022",
      title: "Digital Integration",
      desc: "Implemented supply chain and quality control.",
    },
    {
      year: "2026",
      title: "The Future",
      desc: "Pioneering next-generation nanotechnology applications.",
    },
  ];

  useEffect(() => {
    const scrollWrapper = scrollWrapperRef.current;

    // Calculate the amount to scroll horizontally
    const getScrollAmount = () => {
      let scrollWidth = scrollWrapper.scrollWidth;
      return -(scrollWidth - window.innerWidth);
    };

    // Ensure ScrollTrigger calculates correct heights after custom fonts load
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    // 1. Horizontal Scroll Pin
    const pinTween = gsap.to(scrollWrapper, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 20%", // Pins much earlier, almost immediately after heading is well into viewport
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // 2. Timeline Progress Line & Active States
    const progressTween = gsap.fromTo(
      progressLineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Start detecting progress immediately
          end: () => `+=${getScrollAmount() * -1 + window.innerHeight}`,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: () => {
            const viewportWidth = window.innerWidth;
            const activationLine = viewportWidth * 0.7; // 30% from the right edge
            const deactivationLine = viewportWidth * 0.1; // far left

            let activeCandidates = [];

            itemsRef.current.forEach((item, index) => {
              if (!item) return;
              const rect = item.getBoundingClientRect();
              const itemCenter = rect.left + rect.width / 2;

              // Calculate continuous proximity for smooth opacity fade
              const proximity = Math.max(
                0,
                1 -
                  Math.abs(viewportWidth / 2 - itemCenter) /
                    (viewportWidth * 0.7),
              );
              item.style.setProperty("--proximity", proximity.toFixed(3));

              if (
                itemCenter <= activationLine &&
                itemCenter >= deactivationLine
              ) {
                activeCandidates.push(index);
              }
            });

            let newActiveIndex = activeIndexRef.current;
            if (activeCandidates.length > 0) {
              // Pick the card that most recently entered the activation zone from the right
              newActiveIndex = activeCandidates[activeCandidates.length - 1];
            } else {
              // Fallback if none in zone
              let closestDistance = Infinity;
              itemsRef.current.forEach((item, index) => {
                if (!item) return;
                const rect = item.getBoundingClientRect();
                const itemCenter = rect.left + rect.width / 2;
                const distance = Math.abs(viewportWidth / 2 - itemCenter);
                if (distance < closestDistance) {
                  closestDistance = distance;
                  newActiveIndex = index;
                }
              });
            }

            if (newActiveIndex !== activeIndexRef.current) {
              activeIndexRef.current = newActiveIndex;
              setActiveIndex(newActiveIndex);
            }
          },
        },
      },
    );

    return () => {
      if (pinTween.scrollTrigger) pinTween.scrollTrigger.kill();
      if (progressTween.scrollTrigger) progressTween.scrollTrigger.kill();
    };
  }, []);

  return (
    <section className="timeline-section" ref={containerRef}>
      {/* Reusing the premium background from the Our Story / Philosophy section */}
      <div className="philosophy-bg-canvas">
        <div className="philosophy-ambient-glow"></div>
        <div className="philosophy-noise"></div>
      </div>

      <div className="timeline-header">
        <div className="container">
          <h2 className="section-title text-center">
            Years of <span className="text-gradient">Innovation</span>
          </h2>
        </div>
      </div>

      <div className="timeline-scroll-wrapper" ref={scrollWrapperRef}>
        <div className="timeline-track">
          <div className="timeline-track-base"></div>
          <div className="timeline-progress-line" ref={progressLineRef}></div>

          {timelineEvents.map((item, index) => (
            <div
              className={`timeline-item glass-panel ${index === activeIndex ? "active" : ""}`}
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
            >
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <div className="timeline-node"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
