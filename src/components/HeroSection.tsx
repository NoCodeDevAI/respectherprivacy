'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const empoweringMessages = [
    "What happened to you is not your fault. We believe you.",
    "Report. Heal. Reclaim your voice — anonymously.",
    "When the world looks away, we listen.",
    "Behind every leaked video is a silenced scream. Let it be heard.",
    "You are not alone. And you never deserved this.",
    "Expose the harm. Not yourself.",
    "Courage starts with one step — tell your story safely.",
    "We fight for your dignity, your safety, your silence to be heard.",
    "Let truth be louder than shame."
];

export default function HeroSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const messageInterval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % empoweringMessages.length);
        }, 6000); // Change message every 6 seconds

        return () => clearInterval(messageInterval);
    }, []);
    
    useEffect(() => {
        if (!isMounted) return;

        // Register ScrollTrigger with GSAP
        gsap.registerPlugin(ScrollTrigger);
        
        // Create the main timeline
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        // Animate the hero elements if they exist
        if (titleRef.current && subtitleRef.current && textRef.current && buttonsRef.current) {
            tl.fromTo(
                titleRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1 }
            )
            .fromTo(
                subtitleRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8 },
                "-=0.6" // Overlap with previous animation
            )
            .fromTo(
                textRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8 },
                "-=0.5"
            )
            .fromTo(
                buttonsRef.current?.children,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.2 },
                "-=0.4"
            );
        }
    }, [isMounted]);
    
    return (
      <section 
        ref={sectionRef}
        className="text-white min-h-[70vh] md:min-h-[90vh] flex items-center justify-center flex-col px-4 sm:px-6 py-16 sm:py-20 relative overflow-hidden"
        style={{ 
          backgroundSize: '400% 400%',
          backgroundPosition: '0 0',
          background: 'linear-gradient(-45deg, #1a0f1a, #2c1f2d, #331f33, #2c1f2d)',
          animation: 'gradient 15s ease infinite'
        }}
        suppressHydrationWarning
      >
        <style jsx>{`
          @keyframes gradient {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }
        `}</style>
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c1f2d] via-[#331f33] to-[#FF69B4] opacity-10" suppressHydrationWarning></div>
         
        {/* Animated particles */}
        <div className="particle absolute top-20 left-10 w-64 h-64 bg-[#FF69B4] rounded-full filter blur-[100px] opacity-15" suppressHydrationWarning></div>
        <div className="particle absolute bottom-20 right-10 w-64 h-64 bg-[#FFA5C1] rounded-full filter blur-[100px] opacity-15" suppressHydrationWarning></div>
        <div className="particle absolute top-1/2 right-20 w-32 h-32 bg-[#FF69B4] rounded-full filter blur-[70px] opacity-15" suppressHydrationWarning></div>
        <div className="particle absolute bottom-1/3 left-20 w-40 h-40 bg-[#FFA5C1] rounded-full filter blur-[80px] opacity-15" suppressHydrationWarning></div>
     
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10" suppressHydrationWarning>
          <div className="space-y-3 sm:space-y-4" suppressHydrationWarning>
            <h1 
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#FF69B4] via-[#FF8AB4] to-[#FFA5C1] text-transparent bg-clip-text leading-tight opacity-0 tracking-tight"
            >
              Your Pain Is Not Invisible
            </h1>
            <h2 
              ref={subtitleRef}
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#FFA5C1] opacity-0 tracking-wide transition-opacity duration-500"
            >
              {empoweringMessages[currentMessageIndex]}
            </h2>
          </div>
          <p 
            ref={textRef}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed opacity-0"
          >
            We understand your fear and pain. You're not alone in this fight. Every woman deserves digital dignity. Report unauthorized content sharing safely and anonymously.
          </p>
          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6 sm:mt-8"
            suppressHydrationWarning
          >
            <a 
              href="#report-form" 
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#FF69B4] hover:bg-[#FF8AB4] rounded-full transition-all duration-300 transform hover:scale-105 font-medium shadow-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF69B4] text-white"
              aria-label="Go to Report Form"
            >
              Report Harmful Content
            </a>
            <a 
              href="#resources" 
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#FF69B4] text-[#FF69B4] hover:bg-[#FF69B4] hover:text-white rounded-full transition-all duration-300 font-medium text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF69B4] backdrop-blur-sm"
              aria-label="Go to Support Resources"
            >
              Get Support
            </a>
          </div>
        </div>
      </section>
    );
  }