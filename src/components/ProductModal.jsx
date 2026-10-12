import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, Check } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './ProductModal.css';

export default function ProductModal({ product, category, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!product) return;
    
    if (window.lenis) {
      window.lenis.stop();
    }
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(modalRef.current, 
        { y: 30, opacity: 0, scale: 0.98 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'expo.out' },
        "-=0.1"
      );

    return () => {
      if (window.lenis) {
        window.lenis.start();
      }
      document.body.style.overflow = '';
    };
  }, [product]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, { y: 30, opacity: 0, scale: 0.98, duration: 0.3, ease: 'power2.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.1");
  };

  if (!product) return null;

  const { name, fullName, description, purity, appearance, solubility, pH, applications, storage, usage, packaging, benefits } = product;

  return (
    <div className="product-modal-overlay" ref={overlayRef} onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}>
      <div className="product-modal" ref={modalRef}>
        <div className="modal-bg-glow"></div>
        
        <div className="modal-content-compact relative z-10">
          <div className="modal-header">
            <span className="modal-category">{category}</span>
            <h3>{name}</h3>
            {fullName && <h4 className="modal-fullname">{fullName}</h4>}
          </div>
          
          <p className="modal-description">{description}</p>
          
          <div className="modal-specs-grid">
            <div className="specs-column">
              <div className="spec-item">
                <h5>Purity Grade</h5>
                <p>{purity || 'Standard Technical Grade'}</p>
              </div>
              <div className="spec-item">
                <h5>Appearance</h5>
                <p>{appearance || 'Refer to TDS'}</p>
              </div>
            </div>
            <div className="specs-column">
              <div className="spec-item">
                <h5>Applications</h5>
                <p>{applications || 'Multiple industrial applications'}</p>
              </div>
              <div className="spec-item">
                <h5>Storage</h5>
                <p>{storage || 'Cool, dry place'}</p>
              </div>
            </div>
          </div>

          <div className="modal-footer-row">
            {benefits && benefits.length > 0 && (
              <div className="modal-benefits">
                {benefits.slice(0, 3).map((benefit, idx) => (
                  <div key={idx} className="benefit-pill">
                    <Check size={14} className="benefit-icon" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="modal-cta-wrapper">
              <MagneticButton href="/contact" className="premium-request-btn">Request Specifications</MagneticButton>
            </div>
          </div>
        </div>

        <button className="modal-close interactive" onClick={handleClose}>
          <X size={24} />
        </button>
      </div>
    </div>
  );
}
