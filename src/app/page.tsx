'use client';

import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ReportForm from '@/components/ReportForm';
import ResourcesCardList from '@/components/ResourcesCardList';
import Testimonials from '@/components/Testimonials';
import { FadeIn, SlideInFromRight } from '@/components/AnimatedElements';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HomePage() {
  useEffect(() => {
    // Register ScrollTrigger with GSAP
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Set up scroll triggers for sections
      const sections = document.querySelectorAll('.animate-section');
      
      sections.forEach(section => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }
    
    return () => {
      // Clean up animations
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);
  
  return (
    <main className="bg-background min-h-screen text-white">
      <HeroSection />
      
      <section id="report-form" className="py-12 px-6 max-w-3xl mx-auto scroll-mt-24">
        <FadeIn className="mb-6">
          <h2 className="text-2xl font-semibold text-center animate-section">Report Harmful Content</h2>
        </FadeIn>
        <ReportForm />
      </section>
      
      <div className="animate-section">
        <Testimonials />
      </div>
      
      <section id="resources" className="py-12 px-6 max-w-5xl mx-auto scroll-mt-24 animate-section">
        <SlideInFromRight className="mb-6">
          <h2 className="text-2xl font-semibold">Support & Resources</h2>
        </SlideInFromRight>
        <ResourcesCardList />
      </section>
    </main>
  );
}