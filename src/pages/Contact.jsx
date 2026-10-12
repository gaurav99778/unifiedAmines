import React from 'react';
import ContactExperience from '../components/ContactExperience';
import OurLocations from '../components/OurLocations';
import './PageHeader.css';

export default function Contact() {
  return (
    <div className="page-wrapper">
      <div className="pt-32">
        <ContactExperience />
        <OurLocations />
      </div>
    </div>
  );
}
