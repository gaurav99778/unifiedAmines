import React from 'react';
import { RiLinkedinFill, RiInstagramLine, RiTwitterXLine, RiMailLine } from "react-icons/ri";
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer section">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h2 className="footer-logo">
              Unified <span className="text-orange">Amines</span> <span className="pvt-ltd">Pvt. Ltd.</span>
            </h2>
            <p className="footer-mission">
              Pioneering molecular technology to engineer a more connected, efficient, and sustainable world.
            </p>
            <p className="footer-sub-mission">
              Manufacturer of Specialty Surfactants, Esters & Performance Chemicals.
            </p>
          </div>
          <div className="footer-links-grid">
            <div className="footer-col">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#products">Product Universe</a></li>
                <li><a href="#industries">Industries We Serve</a></li>
                <li><a href="#sustainability">Sustainability</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#quality">Quality Policy</a></li>
                <li><a href="#compliance">Compliance</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright-text">&copy; 2026 Unified Amines Pvt. Ltd. All Rights Reserved.</p>
          <div className="footer-socials">
            <a href="#linkedin" aria-label="LinkedIn"><RiLinkedinFill size={24} /></a>
            <a href="#instagram" aria-label="Instagram"><RiInstagramLine size={24} /></a>
            <a href="#twitter" aria-label="Twitter"><RiTwitterXLine size={24} /></a>
            <a href="#email" aria-label="Email"><RiMailLine size={24} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
