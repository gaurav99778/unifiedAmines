import React from 'react';
import HomeBackground from '../components/HomeBackground';
import Hero from '../components/Hero';
import CompanyIntro from '../components/CompanyIntro';
import CompanyPhilosophy from '../components/CompanyPhilosophy';
import PoweringIndustries from '../components/PoweringIndustries';
import ClientTrust from '../components/ClientTrust';
import GlobalEcosystem from '../components/GlobalEcosystem';

export default function Home({ isPreloading }) {
  return (
    <div className="page-wrapper" style={{ position: 'relative' }}>
      <HomeBackground />
      <Hero isPreloading={isPreloading} />
      <CompanyIntro />
      <CompanyPhilosophy />
      <PoweringIndustries />
      <ClientTrust />
      <GlobalEcosystem />
    </div>
  );
}
