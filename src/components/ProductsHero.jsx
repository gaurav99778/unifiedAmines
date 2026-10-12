import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ProductsHero.css';

gsap.registerPlugin(ScrollTrigger);

// Utility component for the Magnetic Glass Button
const MagneticButton = ({ children, className, to, href, ...props }) => {
  const btnRef = useRef(null);
  
  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // For CSS radial gradient glow
    btnRef.current.style.setProperty('--mouse-x', `${x}px`);
    btnRef.current.style.setProperty('--mouse-y', `${y}px`);

    // Magnetic pull (max 15px)
    const centerX = width / 2;
    const centerY = height / 2;
    const moveX = ((x - centerX) / centerX) * 15;
    const moveY = ((y - centerY) / centerY) * 15;
    
    gsap.to(btnRef.current, {
      x: moveX,
      y: moveY,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  const Element = href ? 'a' : (to && to.startsWith('#') ? 'a' : Link);
  const linkProps = href ? { href } : (to && to.startsWith('#') ? { href: to } : { to });

  return (
    <Element 
      ref={btnRef}
      className={`ph-glass-btn ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...linkProps}
      {...props}
    >
      {children}
    </Element>
  );
};

export default function ProductsHero() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const btnRef = useRef(null);
  const scrollIndRef = useRef(null);
  const bgGridRef = useRef(null);
  const wordsRef = useRef(null);
  const moleculesRef = useRef(null);

  // Molecular Network State
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    // Generate static nodes once
    const numNodes = 25;
    const newNodes = [];
    for (let i = 0; i < numNodes; i++) {
      newNodes.push({
        id: i,
        x: Math.random() * 100, // percentage
        y: Math.random() * 100, // percentage
        radius: Math.random() * 2 + 1,
        isOrange: Math.random() > 0.85, 
      });
    }

    // Connect close nodes
    const newLinks = [];
    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        const dx = newNodes[i].x - newNodes[j].x;
        const dy = newNodes[i].y - newNodes[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 20) { 
          newLinks.push({ source: i, target: j, opacity: 1 - (dist/20) });
        }
      }
    }
    
    setNodes(newNodes);
    setLinks(newLinks);
  }, []);

  useLayoutEffect(() => {
    const tl = gsap.timeline();

    // 1. Text Splitting for Headline (Opacity -> translateY -> blur)
    const textElement = headlineRef.current;
    if (textElement) {
      const text = 'Precision<br/>Engineered<br/><span class="text-gradient">Products.</span>';
      const lines = text.split('<br/>');
      textElement.innerHTML = '';
      
      lines.forEach((line) => {
        const lineDiv = document.createElement('div');
        lineDiv.style.overflow = 'hidden'; // Vertical mask
        lineDiv.style.display = 'block';
        lineDiv.style.lineHeight = '1.1';
        lineDiv.style.paddingBottom = '0.1em'; // Prevent clipping descenders
        
        // Handle HTML inside the line (for the gradient span)
        if (line.includes('<span')) {
          // This line contains HTML, we'll split text content inside the span
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = line;
          const spanElement = tempDiv.querySelector('span');
          const spanClass = spanElement.className;
          const innerText = spanElement.innerText;
          
          const words = innerText.split(' ');
          const masterSpan = document.createElement('span');
          masterSpan.className = spanClass;
          
          words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            if (wordIndex < words.length - 1) wordSpan.style.marginRight = '0.3em';
            
            word.split('').forEach((char) => {
              const charSpan = document.createElement('span');
              charSpan.innerText = char;
              charSpan.className = 'god-char';
              charSpan.style.transform = 'translateY(120%) scale(0.98)';
              charSpan.style.opacity = '0';
              charSpan.style.filter = 'blur(10px)';
              wordSpan.appendChild(charSpan);
            });
            masterSpan.appendChild(wordSpan);
          });
          lineDiv.appendChild(masterSpan);
        } else {
          // Normal line
          const words = line.split(' ');
          words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            if (wordIndex < words.length - 1) wordSpan.style.marginRight = '0.3em';
            
            word.split('').forEach((char) => {
              const charSpan = document.createElement('span');
              charSpan.innerText = char;
              charSpan.className = 'god-char';
              charSpan.style.transform = 'translateY(120%) scale(0.98)';
              charSpan.style.opacity = '0';
              charSpan.style.filter = 'blur(10px)';
              wordSpan.appendChild(charSpan);
            });
            lineDiv.appendChild(wordSpan);
          });
        }
        
        textElement.appendChild(lineDiv);
      });

      const chars = textElement.querySelectorAll('.god-char');

      // The God-Level Entrance Animation
      tl.to(chars, {
        y: '0%',
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        stagger: 0.03,
        ease: 'power4.out',
        delay: 0.2
      });
    }

    // 2. Fade in subtitle, CTA, and scroll indicator
    tl.fromTo([subtitleRef.current, btnRef.current, scrollIndRef.current], 
      { opacity: 0, y: 30, filter: 'blur(5px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, stagger: 0.2, ease: 'power3.out' },
      "-=1.0"
    );

    // 3. Slow Marquee for Background Words
    if (wordsRef.current) {
      const rows = wordsRef.current.children;
      gsap.to(rows[0], { x: '-20%', duration: 40, repeat: -1, yoyo: true, ease: 'none' });
      gsap.to(rows[1], { x: '20%', duration: 45, repeat: -1, yoyo: true, ease: 'none' });
      gsap.to(rows[2], { x: '-15%', duration: 35, repeat: -1, yoyo: true, ease: 'none' });
    }

    // 4. Molecular Network Organic Drift
    if (moleculesRef.current) {
       const circles = moleculesRef.current.querySelectorAll('circle');
       circles.forEach((circle) => {
         gsap.to(circle, {
           x: `+=${(Math.random() - 0.5) * 40}`,
           y: `+=${(Math.random() - 0.5) * 40}`,
           duration: 15 + Math.random() * 10,
           repeat: -1,
           yoyo: true,
           ease: 'sine.inOut'
         });
       });
       const lines = moleculesRef.current.querySelectorAll('line');
       lines.forEach((line) => {
         gsap.to(line, {
           opacity: `*=${Math.random() * 0.5 + 0.5}`,
           duration: 5 + Math.random() * 5,
           repeat: -1,
           yoyo: true,
           ease: 'sine.inOut'
         });
       });
    }

    // 5. Mouse Parallax Setup
    const xToGrid = gsap.quickTo(bgGridRef.current, "x", {duration: 0.6, ease: "power3"});
    const yToGrid = gsap.quickTo(bgGridRef.current, "y", {duration: 0.6, ease: "power3"});
    
    const xToWords = gsap.quickTo(wordsRef.current, "x", {duration: 1.0, ease: "power3"});
    const yToWords = gsap.quickTo(wordsRef.current, "y", {duration: 1.0, ease: "power3"});
    
    const xToMolecules = gsap.quickTo(moleculesRef.current, "x", {duration: 0.4, ease: "power3"});
    const yToMolecules = gsap.quickTo(moleculesRef.current, "y", {duration: 0.4, ease: "power3"});

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5); // -0.5 to 0.5
      const y = (e.clientY / innerHeight - 0.5);

      // Parallax depths
      xToGrid(x * -15); yToGrid(y * -15);
      xToWords(x * -30); yToWords(y * -30);
      xToMolecules(x * 20); yToMolecules(y * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Subtle scroll-away scale down
    gsap.to(sectionRef.current, {
      y: '15%',
      scale: 0.95,
      opacity: 0,
      filter: 'blur(10px)',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      tl.kill();
    };
  }, [nodes]);

  return (
    <section className="products-hero" ref={sectionRef}>
      
      {/* Background Atmosphere */}
      <div className="ph-ambient-glow ph-ambient-blue"></div>
      <div className="ph-ambient-glow ph-ambient-orange"></div>
      <div className="ph-blueprint-grid" ref={bgGridRef}></div>
      <div className="ph-noise-texture"></div>

      {/* Background Technical Words */}
      <div className="ph-bg-typography" ref={wordsRef}>
        <div className="ph-tech-row">SURFACTANTS • ESTERS • POLYMERS • AMINES</div>
        <div className="ph-tech-row" style={{ marginLeft: '-15%' }}>SYNTHESIS • ETHOXYLATION • CATALYSIS</div>
        <div className="ph-tech-row" style={{ marginLeft: '10%' }}>MOLECULAR • SPECIALTY CHEMICALS • PRECISION</div>
      </div>

      {/* SVG Molecular Network */}
      <svg className="ph-molecular-canvas" ref={moleculesRef}>
        {links.map((link, idx) => {
          const source = nodes[link.source];
          const target = nodes[link.target];
          return (
            <line 
              key={idx}
              x1={`${source.x}%`} y1={`${source.y}%`}
              x2={`${target.x}%`} y2={`${target.y}%`}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
              opacity={link.opacity}
            />
          );
        })}
        {nodes.map(node => (
          <circle 
            key={node.id}
            cx={`${node.x}%`} 
            cy={`${node.y}%`} 
            r={node.radius}
            fill={node.isOrange ? 'var(--color-brand-orange)' : 'var(--color-brand-blue)'}
            opacity={node.isOrange ? 0.8 : 0.4}
            filter={node.isOrange ? 'drop-shadow(0 0 6px var(--color-brand-orange))' : 'none'}
          />
        ))}
      </svg>

      {/* Centered Main Content */}
      <div className="ph-content">
        <h1 className="ph-headline" ref={headlineRef}>
          {/* Injected by JS SplitText */}
        </h1>
        
        <p className="ph-subtitle" ref={subtitleRef}>
          High-performance specialty chemicals engineered for industries that demand precision.
        </p>
        
        <div className="ph-cta-container" ref={btnRef}>
          <MagneticButton to="#product-universe">
            <span className="ph-btn-content">
              Explore Products <ArrowRight size={18} className="ph-btn-arrow" />
            </span>
          </MagneticButton>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="ph-scroll-indicator" ref={scrollIndRef}>
        <div className="ph-scroll-line"></div>
      </div>

    </section>
  );
}
