"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create particles
    const particlesCount = 30;
    const particles: HTMLDivElement[] = [];
    
    // Clear any existing particles
    containerRef.current.innerHTML = '';
    
    // Create new particles
    for (let i = 0; i < particlesCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-accent-pink opacity-0';
      
      // Random size between 10px and 50px
      const size = Math.random() * 40 + 10;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Set initial position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Add blur effect
      particle.style.filter = `blur(${Math.random() * 10 + 5}px)`;
      
      containerRef.current.appendChild(particle);
      particles.push(particle);
    }
    
    // Animate particles
    particles.forEach((particle) => {
      // Initial position for animation
      gsap.set(particle, { 
        x: 0,
        y: 0,
        opacity: 0,
        scale: 0
      });
      
      // Create timeline for this particle
      const tl = gsap.timeline({ repeat: -1 });
      
      // Random duration
      const duration = Math.random() * 10 + 15;
      
      // Animate
      tl.to(particle, {
        opacity: Math.random() * 0.2 + 0.05,
        scale: Math.random() * 1 + 0.5,
        duration: duration * 0.2,
        ease: "power2.inOut"
      })
      .to(particle, {
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        rotation: Math.random() * 360,
        duration: duration,
        ease: "none"
      }, "-=5")
      .to(particle, {
        opacity: 0,
        scale: 0,
        duration: duration * 0.2,
        ease: "power2.inOut"
      }, `-=${duration * 0.2}`);
      
      // Random delay for starting
      tl.delay(Math.random() * 10);
    });
    
    return () => {
      // Cleanup animations
      gsap.killTweensOf(particles);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none" ref={containerRef}>
      {/* Particles will be added here dynamically */}
    </div>
  );
} 