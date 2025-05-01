'use client';
import Link from 'next/link';

import { useState } from 'react';
import { submitContactForm } from '@/lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError(result.message || 'Failed to send message. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="bg-background min-h-screen text-white py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-black/30 p-8 rounded-xl border border-accent-pink/20 backdrop-blur">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-accent-pink mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="text-2xl font-bold mb-4 text-white">Thank You for Reaching Out</h2>
            <p className="text-gray-300 mb-6">
              We&apos;ve received your message and will respond to you as soon as possible.
            </p>
            <Link href="/" className="inline-block px-8 py-3 bg-accent-pink hover:bg-muted-pink rounded-full transition-all duration-300 transform hover:scale-105 font-medium shadow-pink">
              Return to Homepage
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-accent-pink/5 z-0"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-pink to-muted-pink text-transparent bg-clip-text">Contact Us</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Have questions about our work? Want to partner with us? Reach out below.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-soft-pink">Get in Touch</h2>
            <p className="text-gray-300 mb-6">
              We're here to answer your questions about our platform, provide assistance, or discuss potential partnerships.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-pink mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 className="text-white font-medium">Email</h3>
                  <a href="mailto:contact@respectherprivacy.in" className="text-gray-300 hover:text-accent-pink transition">contact@respectherprivacy.in</a>
                </div>
              </div>

              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-pink mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <div>
                  <h3 className="text-white font-medium">Support</h3>
                  <p className="text-gray-300">For urgent support needs, please use our reporting form.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-black/30 p-6 rounded-xl border border-accent-pink/20 backdrop-blur">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-soft-pink font-medium mb-1">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-gray-800/70 border border-accent-pink/20 text-white placeholder-gray-400 focus:border-accent-pink focus:ring-1 focus:ring-accent-pink outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-soft-pink font-medium mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-gray-800/70 border border-accent-pink/20 text-white placeholder-gray-400 focus:border-accent-pink focus:ring-1 focus:ring-accent-pink outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-soft-pink font-medium mb-1">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-gray-800/70 border border-accent-pink/20 text-white placeholder-gray-400 focus:border-accent-pink focus:ring-1 focus:ring-accent-pink outline-none"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Partnership">Partnership Opportunity</option>
                    <option value="Media">Media Request</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-soft-pink font-medium mb-1">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 rounded-lg bg-gray-800/70 border border-accent-pink/20 text-white placeholder-gray-400 focus:border-accent-pink focus:ring-1 focus:ring-accent-pink outline-none resize-none"
                    required
                    suppressHydrationWarning
                  ></textarea>
                </div>
                
                {error && (
                  <div className="p-3 bg-red-900/30 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-3 bg-accent-pink hover:bg-muted-pink text-white rounded-lg transition-all duration-300 flex justify-center items-center font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}