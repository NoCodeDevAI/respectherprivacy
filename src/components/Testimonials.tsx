'use client';

import { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: "I was terrified and felt completely alone. This platform showed me that my pain is not invisible, and I'm not alone in this fight.",
    author: "Anonymous, 24"
  },
  {
    quote: "When I discovered my private photos online, I felt helpless. Having a place to report it anonymously gave me back some control.",
    author: "Anonymous, 19"
  },
  {
    quote: "The resources here guided me through the legal process when I thought there was no hope. My voice was finally heard.",
    author: "Anonymous, 22"
  },
  {
    quote: "Knowing that someone acknowledged my pain and was working to help me meant everything during the darkest time of my life.",
    author: "Anonymous, 28"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        setFade(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-6 bg-black/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-accent-pink/10 opacity-30 z-0"></div>
      <div className="absolute top-10 left-20 w-96 h-96 bg-accent-pink rounded-full filter blur-[120px] opacity-5"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-accent-pink to-soft-pink text-transparent bg-clip-text">
        Your story doesn’t end with what they did. It begins with what you choose now.
        </h2>
        
        <div className="min-h-[200px] flex items-center justify-center">
          <div 
            className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
          >
            <blockquote className="text-xl md:text-2xl text-gray-300 italic mb-6 leading-relaxed">
              "{testimonials[currentIndex].quote}"
            </blockquote>
            <p className="text-accent-pink">— {testimonials[currentIndex].author}</p>
          </div>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-accent-pink scale-125' : 'bg-gray-600'
              }`}
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setFade(true);
                }, 500);
              }}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 