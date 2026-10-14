import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  MapPin, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Award, 
  FlaskConical, 
  ExternalLink 
} from 'lucide-react';
import { 
  RiLinkedinFill, 
  RiInstagramLine, 
  RiTwitterXLine, 
  RiMailLine 
} from 'react-icons/ri';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Top subtle ambient light */}
      <div className="footer-ambient-glow" />

      <div className="container footer-container">
        
        {/* Pre-Footer Action CTA Dock */}
        <div className="footer-cta-dock glass-panel">
          <div className="cta-dock-text">
            <span className="cta-dock-badge">
              <span className="badge-dot"></span>
              DIRECT TECHNICAL INQUIRIES
            </span>
            <h3 className="cta-dock-title">
              Ready to engineer your custom formulation?
            </h3>
            <p className="cta-dock-sub">
              Connect directly with our senior synthesis chemists and commercial dispatch desk.
            </p>
          </div>
          <div className="cta-dock-action">
            <Link to="/contact" className="footer-cta-btn">
              <span>Request Formulation Quote</span>
              <ArrowUpRight size={18} className="btn-icon" />
            </Link>
          </div>
        </div>

        {/* 4-Column Main Grid */}
        <div className="footer-main-grid">
          
          {/* Column 1: Brand & Credentials */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand-logo">
              Unified <span className="text-orange">Amines</span> <span className="pvt-tag">Pvt. Ltd.</span>
            </Link>

            <p className="footer-brand-desc">
              Pioneering high-purity molecular amine technology, specialized surfactants, and customized esters 
              manufactured for global enterprise industries with zero-tolerance variance.
            </p>

            {/* Certifications Badge Pills */}
          
          </div>

          {/* Column 2: Product Universe */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Product Portfolio</h4>
            <ul className="footer-links-list">
              <li><Link to="/products">Specialty Amines & Derivatives</Link></li>
              <li><Link to="/products">Cationic Surfactant Systems</Link></li>
              <li><Link to="/products">Fatty Acid Esters & Emulsifiers</Link></li>
              <li><Link to="/products">Corrosion Inhibitor Bases</Link></li>
              <li><Link to="/products">High-Purity Quaternary Salts</Link></li>
              <li><Link to="/products">Custom Synthesis & R&D Batching</Link></li>
            </ul>
          </div>

          {/* Column 3: Corporate & Infrastructure */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Corporate & Quality</h4>
            <ul className="footer-links-list">
              <li><Link to="/about">About Our Heritage (Est. 1996)</Link></li>
              <li><Link to="/about">Synthesis Complex & Plant</Link></li>
              <li><Link to="/about">Analytical Chromatography Lab</Link></li>
              <li><Link to="/about">Sustainability & Green Chemistry</Link></li>
              <li><Link to="/products">Global Export Network</Link></li>
              <li><Link to="/contact">Technical Documentation (TDS / SDS)</Link></li>
            </ul>
          </div>

          {/* Column 4: Synthesis Complex & Direct Desk */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title">Manufacturing & Dispatch</h4>
            
            <div className="contact-info-block">
              <div className="contact-item">
                <MapPin size={17} className="contact-icon" />
                <div className="contact-text">
                  <strong>Synthesis Complex:</strong>
                  <span>GIDC Industrial Area, Vadodara, Gujarat - 390010, India</span>
                </div>
              </div>

              <div className="contact-item">
                <Mail size={17} className="contact-icon" />
                <div className="contact-text">
                  <strong>Commercial Desk:</strong>
                  <a href="mailto:export@unifiedamines.com">export@unifiedamines.com</a>
                </div>
              </div>

              <div className="contact-item">
                <Phone size={17} className="contact-icon" />
                <div className="contact-text">
                  <strong>Direct Inquiries:</strong>
                  <a href="tel:+912652834900">+91 (0265) 283-4900</a>
                </div>
              </div>

           
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="copyright-section">
            <p className="copyright-text">
              &copy; {new Date().getFullYear()} Unified Amines Pvt. Ltd. All Rights Reserved.
            </p>
            <span className="mfg-tag">Synthesized in India for Global Industries.</span>
          </div>

          <div className="footer-legal-links">
            <a href="#privacy">Privacy Policy</a>
            <span className="legal-dot">•</span>
            <a href="#terms">Terms of Supply</a>
            <span className="legal-dot">•</span>
            <a href="#quality">Quality Benchmark</a>
            <span className="legal-dot">•</span>
            <a href="#compliance">Global Compliance</a>
          </div>

          <div className="footer-social-dock">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-pill">
              <RiLinkedinFill size={16} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-pill">
              <RiInstagramLine size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="social-pill">
              <RiTwitterXLine size={16} />
            </a>
            <a href="mailto:export@unifiedamines.com" aria-label="Email Dispatch" className="social-pill">
              <RiMailLine size={16} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
