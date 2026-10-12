import React from 'react';
import TypographyHero from '../components/TypographyHero';
import CompanyStory from '../components/CompanyStory';
import InnovationTimeline from '../components/InnovationTimeline';
import UnifiedPrinciple from '../components/UnifiedPrinciple';
import './PageHeader.css';

export default function About() {
  return (
    <div className="page-wrapper" style={{ backgroundColor: 'var(--bg-deep-space)' }}>
      <TypographyHero />
      <CompanyStory />
      <InnovationTimeline />
      <UnifiedPrinciple />
    </div>
  );
}
