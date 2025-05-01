"use client";

import dynamic from 'next/dynamic';

// Client component wrapper for the dynamic import with ssr: false
export default function ClientAnimationWrapper() {
  // Dynamically import the animated background
  const AnimatedBackground = dynamic(
    () => import('@/components/AnimatedBackground'),
    { ssr: false }
  );
  
  return <AnimatedBackground />;
} 