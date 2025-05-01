'use client';

import { useEffect, useState } from 'react';

export default function AboutPage() {
    return (
    <main className="bg-background min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-accent-pink/5 z-0"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-accent-pink rounded-full filter blur-[120px] opacity-5"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-pink to-muted-pink text-transparent bg-clip-text">Our Mission</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            We believe that <span className="text-soft-pink font-medium">Your Pain Is Not Invisible <i>( You didn&apos;t deserve this. Not then. Not now. Not ever. )</i></span>. At Respect Her Privacy, we&apos;re committed to creating a safer digital world by combating the non-consensual sharing of intimate images and videos.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-soft-pink">Who We Are</h2>
          <p className="text-gray-300 mb-4">
              Founded in 2023, Respect Her Privacy is an initiative created by a team of technologists, legal experts, and survivors who understand the devastating impact of digital exploitation.
          </p>
          <p className="text-gray-300">
              Our platform was built with a survivor-centered approach, prioritizing anonymity, safety, and access to resources. We work closely with law enforcement, technology platforms, and advocacy groups to address the root causes of image-based abuse.
            </p>
          </div>
          <div className="bg-black/30 p-8 rounded-xl border border-accent-pink/10 backdrop-blur">
            <h2 className="text-2xl font-semibold mb-4 text-soft-pink">Our Impact</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-accent-pink mr-3 mt-1">•</span>
                <span className="text-gray-300">Provided support to over <strong className="text-white">500 survivors</strong> of digital exploitation</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-pink mr-3 mt-1">•</span>
                <span className="text-gray-300">Facilitated the removal of <strong className="text-white">thousands of unauthorized images</strong> from platforms</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-pink mr-3 mt-1">•</span>
                <span className="text-gray-300">Partnered with <strong className="text-white">20+ organizations</strong> to improve support systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-pink mr-3 mt-1">•</span>
                <span className="text-gray-300">Trained <strong className="text-white">dozens of volunteers</strong> in trauma-informed response</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-soft-pink">Our Approach</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-accent-pink/30 transition-all">
              <h3 className="text-xl font-medium mb-3 text-accent-pink">Anonymous Reporting</h3>
              <p className="text-gray-300">We prioritize your privacy above all else. Report harmful content without sharing any identifying information.</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-accent-pink/30 transition-all">
              <h3 className="text-xl font-medium mb-3 text-accent-pink">Support & Resources</h3>
              <p className="text-gray-300">Connect with legal aid, mental health resources, and practical guidance for taking back control.</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-accent-pink/30 transition-all">
              <h3 className="text-xl font-medium mb-3 text-accent-pink">Advocacy & Education</h3>
              <p className="text-gray-300">We work to change attitudes, policies, and laws around digital privacy and consent.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 text-soft-pink">Our Promise</h2>
          <p className="text-gray-300 mb-8 text-center text-xl">
            "Your Pain Is Not Invisible. Your voice matters. Your dignity matters. We stand with you."
          </p>
          
          <div className="flex justify-center">
            <a href="/contact" className="inline-flex items-center px-8 py-4 bg-accent-pink hover:bg-muted-pink rounded-full transition-all duration-300 transform hover:scale-105 font-medium shadow-pink">
              Join Our Mission
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      </main>
    );
  }