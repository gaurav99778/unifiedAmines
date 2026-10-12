import React from 'react';
import ProductUniverse from '../components/ProductUniverse';
import FeaturedTechnology from '../components/FeaturedTechnology';
import IndustriesWeServe from '../components/IndustriesWeServe';
import PremiumCTA from '../components/PremiumCTA';
import TypographyHero from '../components/TypographyHero';
import './PageHeader.css';

export default function Products() {
  return (
    <div className="page-wrapper" style={{ backgroundColor: 'var(--bg-deep-space)' }}>
      <TypographyHero 
        headline="Advanced Specialty<br/>Chemicals."
        subtitle="Engineered specialty chemicals designed for high-performance industries worldwide."
        ctaText="EXPLORE PRODUCTS →"
        ctaLink="#product-universe"
        highlightWord="Chemicals"
      />
      <ProductUniverse />
      <FeaturedTechnology />
      <IndustriesWeServe />
      <PremiumCTA />
    </div>
  );
}
