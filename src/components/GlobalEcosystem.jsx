import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Ship, ShieldCheck, Truck } from 'lucide-react';
import { WORLD_MAP_PATH } from './worldMapData';
import './GlobalEcosystem.css';

gsap.registerPlugin(ScrollTrigger);

const HUBS = [
  {
    id: 'europe',
    city: 'Rotterdam',
    x: 512.4,
    y: 110.2,
    path: 'M 703.3,212.6 C 635,135 570,95 512.4,110.2',
    dur: '3.4s'
  },
  {
    id: 'americas',
    city: 'Houston',
    x: 235.1,
    y: 186.8,
    path: 'M 703.3,212.6 C 560,35 365,55 235.1,186.8',
    dur: '4.6s'
  },
  {
    id: 'middle-east',
    city: 'Dubai',
    x: 653.5,
    y: 202.6,
    path: 'M 703.3,212.6 Q 678,192 653.5,202.6',
    dur: '2.0s'
  },
  {
    id: 'apac',
    city: 'Singapore',
    x: 788.4,
    y: 285.1,
    path: 'M 703.3,212.6 Q 755,242 788.4,285.1',
    dur: '2.7s'
  },
  {
    id: 'east-asia',
    city: 'Tokyo',
    x: 888.0,
    y: 166.4,
    path: 'M 703.3,212.6 Q 810,140 888.0,166.4',
    dur: '3.6s'
  },
  {
    id: 'latam',
    city: 'Santos',
    x: 371.3,
    y: 372.6,
    path: 'M 703.3,212.6 C 580,310 470,390 371.3,372.6',
    dur: '4.8s'
  },
  {
    id: 'africa',
    city: 'Durban',
    x: 586.2,
    y: 393.0,
    path: 'M 703.3,212.6 Q 660,310 586.2,393.0',
    dur: '3.8s'
  }
];

export default function GlobalEcosystem() {
  const sectionRef = useRef(null);
  const mapSvgRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const badge = section.querySelector('.ecosystem-badge');
      const title = section.querySelector('.ecosystem-heading');
      const subtitle = section.querySelector('.ecosystem-desc');
      const mapWrapper = section.querySelector('.ecosystem-map-frame');
      const cards = section.querySelectorAll('.ecosystem-card');
      const nodes = section.querySelectorAll('.hub-node-group');

      // Entrance animation timeline
      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });

      enterTl
        .fromTo(badge, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        )
        .fromTo(title, 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 
          '-=0.3'
        )
        .fromTo(subtitle, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 
          '-=0.4'
        )
        .fromTo(mapWrapper, 
          { opacity: 0, y: 40, scale: 0.97 }, 
          { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out' }, 
          '-=0.4'
        )
        .fromTo(nodes, 
          { scale: 0, opacity: 0 }, 
          { scale: 1, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'back.out(2)' }, 
          '-=0.6'
        )
        .fromTo(cards, 
          { opacity: 0, y: 35 }, 
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' }, 
          '-=0.5'
        );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section ecosystem-section" ref={sectionRef}>
      {/* Background ambient lighting */}
      <div className="ecosystem-ambient-glow glow-top" />
      <div className="ecosystem-ambient-glow glow-bottom" />

      <div className="container ecosystem-container">
        
        {/* Header Block */}
        <div className="ecosystem-header text-center">
          <div className="ecosystem-badge">
            <span className="badge-radar-dot">
              <span className="radar-core"></span>
              <span className="radar-wave"></span>
            </span>
            <span className="badge-text">GLOBAL SUPPLY NETWORK</span>
          </div>

          <h2 className="ecosystem-heading">
            Global <span className="text-gradient">Chemical</span> Ecosystem
          </h2>

          <p className="ecosystem-desc">
            Connecting local manufacturing with worldwide demand through an intelligent, unified supply chain.
          </p>
        </div>

        {/* The World Map Stage */}
        <div className="ecosystem-map-frame">
          <div className="map-glass-backdrop">
            <svg 
              className="ecosystem-svg" 
              viewBox="0 0 1000 500" 
              preserveAspectRatio="xMidYMid meet"
              ref={mapSvgRef}
            >
              <defs>
                {/* Neon Route Gradients */}
                <linearGradient id="routeOrange" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF5A00" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#FF8340" stopOpacity="0.4" />
                </linearGradient>

                <linearGradient id="routeCyan" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF5A00" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#00D2FF" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.35" />
                </linearGradient>

                {/* HQ Radial Glow */}
                <radialGradient id="hqAmbientGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FF5A00" stopOpacity="0.35" />
                  <stop offset="50%" stopColor="#FF8340" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#FF5A00" stopOpacity="0" />
                </radialGradient>

                {/* Glow Filters */}
                <filter id="glowOrange" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter id="glowCyan" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Dot Matrix Pattern for Futuristic Map Grid */}
                <pattern id="matrixDots" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.8" fill="rgba(255,255,255,0.06)" />
                </pattern>
              </defs>

              {/* Background Dot Matrix */}
              <rect width="1000" height="500" fill="url(#matrixDots)" />

              {/* Planetary Graticule Lines */}
              <g className="graticules" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.8" strokeDasharray="3 6">
                <line x1="0" y1="125" x2="1000" y2="125" />
                <line x1="0" y1="212" x2="1000" y2="212" stroke="rgba(255, 90, 0, 0.12)" />
                <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(255, 255, 255, 0.08)" />
                <line x1="0" y1="375" x2="1000" y2="375" />
                <line x1="200" y1="0" x2="200" y2="500" />
                <line x1="350" y1="0" x2="350" y2="500" />
                <line x1="500" y1="0" x2="500" y2="500" stroke="rgba(255, 255, 255, 0.08)" />
                <line x1="703" y1="0" x2="703" y2="500" stroke="rgba(255, 90, 0, 0.12)" />
                <line x1="850" y1="0" x2="850" y2="500" />
              </g>

              {/* HQ Ambient Light Circle */}
              <circle cx="703.3" cy="212.6" r="160" fill="url(#hqAmbientGlow)" pointerEvents="none" />

              {/* Vectorized World Continents */}
              <path 
                d={WORLD_MAP_PATH} 
                className="continent-silhouette"
                fill="rgba(255, 255, 255, 0.035)"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.85"
                strokeLinejoin="round"
              />

              {/* Shipping Corridors & Flows */}
              <g className="corridors-layer">
                {HUBS.map(hub => (
                  <g key={hub.id} className="corridor-group">
                    {/* Underlying dashed reference path */}
                    <path 
                      d={hub.path} 
                      className="route-underlay"
                      fill="none" 
                      stroke="rgba(255, 255, 255, 0.08)" 
                      strokeWidth="1.2" 
                      strokeDasharray="4 6" 
                    />

                    {/* Glowing energetic route path */}
                    <path 
                      d={hub.path} 
                      className="route-glow-path"
                      fill="none" 
                      stroke={hub.id === 'americas' || hub.id === 'europe' ? 'url(#routeCyan)' : 'url(#routeOrange)'} 
                      strokeWidth="2.0" 
                      filter="url(#glowOrange)"
                    />

                    {/* Animated Photon / Vessel Packet */}
                    <circle r="3.2" fill="#FF5A00">
                      <animateMotion 
                        path={hub.path} 
                        dur={hub.dur} 
                        repeatCount="indefinite" 
                        keyPoints="0;1" 
                        keyTimes="0;1"
                      />
                    </circle>
                    <circle r="1.6" fill="#FFFFFF">
                      <animateMotion 
                        path={hub.path} 
                        dur={hub.dur} 
                        repeatCount="indefinite" 
                        keyPoints="0;1" 
                        keyTimes="0;1"
                      />
                    </circle>

                    {/* Motion particle halo */}
                    <circle r="6" fill="#FF8340" opacity="0.3">
                      <animateMotion 
                        path={hub.path} 
                        dur={hub.dur} 
                        repeatCount="indefinite" 
                        keyPoints="0;1" 
                        keyTimes="0;1"
                      />
                    </circle>
                  </g>
                ))}
              </g>

              {/* Strategic Destination Nodes */}
              <g className="hubs-layer">
                {HUBS.map(hub => (
                  <g 
                    key={hub.id} 
                    className="hub-node-group"
                    transform={`translate(${hub.x}, ${hub.y})`}
                  >
                    {/* Pulse ring */}
                    <circle 
                      r="12" 
                      className="hub-ping-ring" 
                      fill="none" 
                      stroke="#00D2FF" 
                      strokeWidth="1" 
                      opacity="0.4"
                    />

                    {/* Node Outer Circle */}
                    <circle 
                      r="5.5" 
                      fill="var(--bg-onyx)" 
                      stroke="#38BDF8" 
                      strokeWidth="1.5" 
                    />

                    {/* Node Core Dot */}
                    <circle 
                      r="2.5" 
                      fill="#FFFFFF" 
                      filter="url(#glowCyan)"
                    />

                    {/* Hub City Badge / Label */}
                    <g className="hub-text-badge" transform="translate(10, 3)">
                      <rect 
                        x="-2" 
                        y="-9" 
                        width={hub.city.length * 6.8 + 14} 
                        height="14" 
                        rx="3" 
                        fill="rgba(10, 10, 15, 0.85)" 
                        stroke="rgba(255, 255, 255, 0.12)" 
                        strokeWidth="0.8" 
                      />
                      <text 
                        x="5" 
                        y="1" 
                        fill="#E2E8F0" 
                        fontSize="8.5" 
                        fontFamily="var(--font-display)" 
                        fontWeight="600" 
                        letterSpacing="0.5"
                      >
                        {hub.city.toUpperCase()}
                      </text>
                    </g>
                  </g>
                ))}
              </g>

              {/* PRIMARY SYNTHESIS HQ (Vadodara, India) */}
              <g className="hq-group" transform="translate(703.3, 212.6)">
                {/* Expanding Sonar Waves */}
                <circle className="hq-sonar-1" r="28" fill="none" stroke="#FF5A00" strokeWidth="1" opacity="0.3" />
                <circle className="hq-sonar-2" r="18" fill="none" stroke="#FF5A00" strokeWidth="1.2" opacity="0.5" />
                
                {/* Precision Crosshair Reticle */}
                <circle r="11" fill="none" stroke="#FF8340" strokeWidth="1" strokeDasharray="2 3" />
                
                {/* Core Nucleus */}
                <circle r="6.5" fill="#FF5A00" filter="url(#glowOrange)" />
                <circle r="3" fill="#FFFFFF" />

                {/* HQ Label */}
                <g className="hq-tag-wrapper" transform="translate(-65, -34)">
                  <rect 
                    x="0" 
                    y="0" 
                    width="130" 
                    height="24" 
                    rx="4" 
                    fill="rgba(15, 8, 4, 0.9)" 
                    stroke="rgba(255, 90, 0, 0.6)" 
                    strokeWidth="1" 
                    filter="drop-shadow(0 4px 12px rgba(255, 90, 0, 0.25))"
                  />
                  <text 
                    x="65" 
                    y="11" 
                    textAnchor="middle" 
                    fill="#FF8340" 
                    fontSize="7.5" 
                    fontFamily="var(--font-display)" 
                    fontWeight="700" 
                    letterSpacing="1"
                  >
                    ★ SYNTHESIS HQ // VADODARA
                  </text>
                  <text 
                    x="65" 
                    y="19" 
                    textAnchor="middle" 
                    fill="#E2E8F0" 
                    fontSize="7" 
                    fontFamily="var(--font-body)" 
                    fontWeight="500"
                  >
                    50,000 MT/YR SYNTHESIS CORE
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* 4 Bento Telemetry Intelligence Cards */}
        <div className="ecosystem-cards-grid">
          
          {/* Card 1 */}
          <div className="ecosystem-card glass-panel">
            <div className="card-top">
              <div className="card-icon-box orange">
                <Globe size={22} />
              </div>
              <span className="card-status-badge">GLOBAL REACH</span>
            </div>
            <div className="card-stat">
              <strong>40+</strong>
              <span className="stat-unit">Nations</span>
            </div>
            <h4 className="card-title">Intercontinental Reach</h4>
            <p className="card-desc">
              Direct chemical distribution across Europe, North America, APAC, the Middle East, and Latin America.
            </p>
            <div className="card-footer">
              <span className="compliance-tag">REACH & GHS Certified</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="ecosystem-card glass-panel">
            <div className="card-top">
              <div className="card-icon-box blue">
                <Ship size={22} />
              </div>
              <span className="card-status-badge">PORT BERTHING</span>
            </div>
            <div className="card-stat">
              <strong>30+</strong>
              <span className="stat-unit">Global Ports</span>
            </div>
            <h4 className="card-title">Dedicated ISO Tank Fleets</h4>
            <p className="card-desc">
              Berth clearance at Rotterdam, Houston, Singapore, and Jebel Ali with dedicated bulk liquid containers.
            </p>
            <div className="card-footer">
              <span className="compliance-tag">Multimodal Logistics</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="ecosystem-card glass-panel">
            <div className="card-top">
              <div className="card-icon-box gold">
                <ShieldCheck size={22} />
              </div>
              <span className="card-status-badge">PRECISION SLA</span>
            </div>
            <div className="card-stat">
              <strong>99.9%</strong>
              <span className="stat-unit">On-Time</span>
            </div>
            <h4 className="card-title">Zero-Variance Fulfillment</h4>
            <p className="card-desc">
              End-to-end climate monitoring ensuring batch purity, zero moisture ingress, and intact seals upon arrival.
            </p>
            <div className="card-footer">
              <span className="compliance-tag">ISO 9001:2015 Verified</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="ecosystem-card glass-panel">
            <div className="card-top">
              <div className="card-icon-box orange">
                <Truck size={22} />
              </div>
              <span className="card-status-badge">STRATEGIC BUFFER</span>
            </div>
            <div className="card-stat">
              <strong>&lt;48h</strong>
              <span className="stat-unit">Dispatch</span>
            </div>
            <h4 className="card-title">Emergency Buffer Release</h4>
            <p className="card-desc">
              Continuous synthesis lines and strategic finished-product reserves ensure zero plant downtime for clients.
            </p>
            <div className="card-footer">
              <span className="compliance-tag">24/7 Automated Dispatch</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
