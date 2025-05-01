// src/components/Footer.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="bg-black text-gray-400 py-8 text-sm" suppressHydrationWarning>
        <div className="max-w-6xl mx-auto px-6" suppressHydrationWarning>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8" suppressHydrationWarning>
            <div className="mb-6 md:mb-0" suppressHydrationWarning>
              <Link href="/" className="flex items-center gap-3 text-white font-semibold text-lg hover:text-accent-pink transition">
                <Image src="/images/face.svg" alt="Face Icon" width={32} height={32} className="h-8 w-8" />
                Respect Her Privacy
              </Link>
              <p className="mt-2 max-w-md text-gray-500">
                <span className="text-soft-pink font-medium">Your Pain Is Not Invisible.</span> A safe, anonymous space for reporting unauthorized content sharing.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6" suppressHydrationWarning>
              <Link href="/about" className="hover:text-accent-pink transition">About</Link>
              <Link href="/resources" className="hover:text-accent-pink transition">Resources</Link>
              <Link href="/faq" className="hover:text-accent-pink transition">FAQ</Link>
              <Link href="/privacy" className="hover:text-accent-pink transition">Privacy</Link>
              <Link href="/terms" className="hover:text-accent-pink transition">Terms</Link>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center" suppressHydrationWarning>
            <p>© {currentYear} Respect Her Privacy. All rights reserved.</p>
            <div className="mt-4 sm:mt-0 flex gap-4" suppressHydrationWarning>
              <Link href="/contact" className="text-accent-pink hover:text-muted-pink transition">Contact</Link>
              <a href="mailto:support@respectherprivacy.in" className="text-accent-pink hover:text-muted-pink transition">Email Us</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }