import React from 'react';
import './HomeBackground.css';

export default function HomeBackground() {
  return (
    <div className="home-background-canvas">
      {/* Fixed Overlay Layers (Always fill viewport) */}
      <div className="bg-noise-overlay"></div>
      <div className="bg-vignette-overlay"></div>

      {/* Ambient Lights (Scroll with page) */}
      
      {/* Hero Lights */}
      <div className="ambient-light light-hero-blue"></div>
      <div className="ambient-light light-hero-orange"></div>
      <div className="ambient-light light-hero-3d-core"></div>

      {/* Footer Light */}
      <div className="ambient-light light-footer-orange"></div>
    </div>
  );
}
