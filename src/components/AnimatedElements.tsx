"use client";

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface AnimatedElementsProps {
  children: ReactNode;
  className?: string;
}

export function FadeIn({ children, className = "" }: AnimatedElementsProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    gsap.fromTo(
      elementRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  }, []);
  
  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

export function SlideInFromRight({ children, className = "" }: AnimatedElementsProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    gsap.fromTo(
      elementRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
    );
  }, []);
  
  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

export function PulseElement({ children, className = "" }: AnimatedElementsProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    tl.to(elementRef.current, {
      scale: 1.05,
      duration: 1.5,
      ease: "sine.inOut"
    });
    
    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

export function AnimatedButton({ children, className = "" }: AnimatedElementsProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!buttonRef.current) return;
    
    // Initial animation
    gsap.fromTo(
      buttonRef.current,
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
    
    // Hover effect
    const element = buttonRef.current;
    
    const onMouseEnter = () => {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.2,
        ease: "power1.out"
      });
    };
    
    const onMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.2,
        ease: "power1.out"
      });
    };
    
    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mouseleave', onMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);
  
  return (
    <div ref={buttonRef} className={className}>
      {children}
    </div>
  );
} 