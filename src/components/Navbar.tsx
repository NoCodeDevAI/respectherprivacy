// src/components/NavBar.tsx

'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-background/80 backdrop-blur-sm border-b border-accent-pink/20 relative z-20 h-[60px] shadow-lg">
      <div className="max-w-6xl h-full mx-auto px-6 py-4 flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
  <img src="/images/logo-text.svg" alt="Logo" className="h-10 w-10" />
 
</Link>
        
        {/* Desktop Menu */}
        <div className="space-x-6 text-sm hidden md:flex">
          <Link href="/" className="text-gray-300 hover:text-accent-pink  transition-all duration-300">Home</Link>
          <Link href="/about" className="text-gray-300 hover:text-accent-pink  transition-all duration-300">About</Link>
          <Link href="/resources" className="text-gray-300 hover:text-accent-pink  transition-all duration-300">Resources</Link>
          <Link href="/faq" className="text-gray-300 hover:text-accent-pink  transition-all duration-300">FAQ</Link>
          <Link href="/privacy" className="text-gray-300 hover:text-accent-pink transition-all duration-300">Privacy</Link>
          <Link href="/contact" className="text-gray-300 hover:text-accent-pink transition-all duration-300">Contact</Link>
          <Link href="/status" className="text-gray-300 hover:text-accent-pink transition-all duration-300">Status Check</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-accent-pink hover:text-muted-pink focus:outline-none transition-colors duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-accent-pink/20 absolute w-full animate-fadeIn shadow-lg">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-accent-pink hover:shadow-pink transition-all duration-300 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-gray-300 hover:text-accent-pink hover:shadow-pink transition-all duration-300 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/resources" 
              className="text-gray-300 hover:text-accent-pink hover:shadow-pink transition-all duration-300 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link 
              href="/faq" 
              className="text-gray-300 hover:text-accent-pink hover:shadow-pink transition-all duration-300 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link 
              href="/privacy" 
              className="text-gray-300 hover:text-accent-pink hover:shadow-pink transition-all duration-300 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Privacy
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-300 hover:text-accent-pink hover:shadow-pink transition-all duration-300 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/status" 
              className="text-gray-300 hover:text-accent-pink hover:shadow-pink transition-all duration-300 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Status Check
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}