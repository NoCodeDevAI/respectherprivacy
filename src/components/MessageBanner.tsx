'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const messages = [
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

interface MessageBannerProps {
  showClose?: boolean;
}

export default function MessageBanner({ showClose = true }: MessageBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out
      setTimeout(() => {
        setCurrentMessage((prevMessage) => {
          const currentIndex = messages.indexOf(prevMessage);
          return messages[(currentIndex + 1) % messages.length];
        });
        setFade(true); // Start fade in
      }, 400); // Wait for fade out to complete
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="relative bg-accent-pink/10 backdrop-blur-sm border-b border-accent-pink/20" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8" suppressHydrationWarning>
        <div className="flex items-center justify-between flex-wrap" suppressHydrationWarning>
          <div className="w-0 flex-1 flex items-center" suppressHydrationWarning>
            <span className="flex p-2 rounded-lg bg-accent-pink/20" suppressHydrationWarning>
              <svg className="h-5 w-5 text-accent-pink" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            <p className="ml-3 font-medium text-white" suppressHydrationWarning>
              <span className={`hidden md:inline transition-opacity duration-400 ${fade ? 'opacity-100' : 'opacity-0'}`}>{currentMessage}</span>
              <span className={`inline md:hidden transition-opacity duration-400 ${fade ? 'opacity-100' : 'opacity-0'}`}>{currentMessage}</span>
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto" suppressHydrationWarning>
            <Link
              href="/#report-form"
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-soft-pink hover:bg-muted-pink"
            >
              Report Now
            </Link>
          </div>
          {showClose && (
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3" suppressHydrationWarning>
              <button
                type="button"
                className="-mr-1 flex p-2 rounded-md hover:bg-accent-pink/20 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                onClick={() => setIsVisible(false)}
                aria-label="Dismiss"
              >
                <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}