'use client';

import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  useEffect(() => {
    // Dynamically import GSAP to avoid SSR issues
    import('gsap').then((gsapModule) => {
      const gsap = gsapModule.default;
      
      // Animate sections to visible
      gsap.to('.skills, .about, .projects, .contact', {
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.5,
        ease: 'power2.out'
      });
    });
  }, []);

  return (
    <main className="flex flex-col">
      <HeroSection />
      <SkillsSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
