"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Client component wrapper for the dynamic import with ssr: false
export default function ClientAnimationWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Dynamically import the animated background
  const AnimatedBackground = dynamic(
    () => import('@/components/AnimatedBackground'),
    { ssr: false }
  );
  
  if (!isMounted) {
    return null; // Return null on server-side and first client render
  }

  return <AnimatedBackground />;
}