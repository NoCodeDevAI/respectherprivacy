'use client';

import { useState } from 'react';
import Link from 'next/link';

// Resource categories
const categories = [
  { id: 'all', label: 'All Resources' },
  { id: 'immediate', label: 'Immediate Help' },
  { id: 'legal', label: 'Legal Support' },
  { id: 'mental', label: 'Mental Health' },
  { id: 'technical', label: 'Technical Help' },
  { id: 'education', label: 'Education' }
];

// Resources with categories
const resources = [
  {
    title: "Women's Helpline (24/7)",
    url: "https://wcd.gov.in/",
    description: "National 24/7 helpline for women affected by violence or harassment. Immediate assistance and support available.",
    phone: "181",
    categories: ['immediate'],
    featured: true
  },
  {
    title: "Cyber Crime Reporting",
    url: "https://cybercrime.gov.in/",
    description: "Official portal to report cyber crimes, with special focus on crimes against women and children. File complaints securely and anonymously.",
    categories: ['immediate', 'legal'],
    steps: [
      "Visit the portal and click 'File a Complaint'",
      "Select 'Report content harmful to women'",
      "Upload screenshots if available (blur sensitive content)"
    ]
  },
  {
    title: "NCW Online Complaint System",
    url: "http://ncw.nic.in/",
    description: "National Commission for Women's portal for registering complaints related to harassment, violence, and cyber crimes.",
    phone: "011-26942369",
    categories: ['legal']
  },
  {
    title: "Digital Safety Resources",
    url: "https://cybercrime.gov.in/Webform/Crime_OnlineSafety.aspx",
    description: "Learn about online safety, preventive measures, and steps to protect yourself from cyber harassment.",
    categories: ['technical', 'education']
  },
  {
    title: "Legal Aid Services",
    url: "https://nalsa.gov.in/",
    description: "Connect with free legal services provided by National Legal Services Authority for victims of cyber crimes and harassment.",
    phone: "15100",
    categories: ['legal'],
    featured: true
  },
  {
    title: "She-Box Portal",
    url: "http://shebox.nic.in/",
    description: "Online complaint management system for women facing harassment. Register complaints and track their status securely.",
    categories: ['legal', 'immediate']
  },
  {
    title: "Cyber Peace Foundation",
    url: "https://www.cyberpeace.org/",
    description: "NGO providing technical assistance, education, and support for victims of cyber crimes. Offers step-by-step guidance for content removal.",
    categories: ['technical', 'education'],
    featured: true
  },
  {
    title: "NIMHANS Mental Health Support",
    url: "https://www.nimhans.ac.in/contact-us",
    description: "Professional mental health support and counseling for trauma and stress. Specialized services for victims of online harassment.",
    phone: "080-26995573",
    categories: ['mental'],
    featured: true
  },
  {
    title: "Take It Down Tool",
    url: "https://takeitdown.ncmec.org/",
    description: "Tool to help remove explicit images of minors from participating platforms without having to share the actual images.",
    categories: ['technical'],
    steps: [
      "Generate a digital fingerprint of the image (no upload needed)",
      "Submit the fingerprint to the database",
      "Participating platforms will detect and remove matches"
    ]
  },
  {
    title: "Revenge Porn Helpline",
    url: "https://revengepornhelpline.org.uk/",
    description: "International resource providing support and practical advice for removing intimate images shared without consent.",
    categories: ['technical', 'mental']
  },
  {
    title: "Platform-Specific Reporting Guides",
    url: "/resources/platform-guides",
    description: "Step-by-step guides for reporting non-consensual intimate images on social media, messaging apps, and websites.",
    categories: ['technical', 'education']
  },
  {
    title: "Digital Security Toolkit",
    url: "/resources/security",
    description: "Tools and guides to secure your accounts, protect your privacy, and prevent further harassment or unauthorized access.",
    categories: ['technical', 'education']
  }
];

export default function ResourcesCardList() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter resources by active category
  const filteredResources = activeCategory === 'all'
    ? resources
    : resources.filter(resource => resource.categories.includes(activeCategory));

  return (
    <div id="resources" className="py-8">
      {/* Category Tabs */}
      <div className="mb-12 overflow-x-auto hide-scrollbar">
        <div className="flex space-x-2 pb-2 min-w-max mx-auto justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                ${activeCategory === category.id 
                  ? 'bg-accent-pink text-white shadow-lg' 
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'}`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Resources (when showing All) */}
      {activeCategory === 'all' && (
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-soft-pink mb-6 px-4">Priority Resources</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {resources.filter(r => r.featured).map((resource, i) => (
              <FeaturedResourceCard key={i} resource={resource} />
            ))}
          </div>
        </div>
      )}

      {/* Main Resources Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources
          .filter(r => activeCategory !== 'all' || !r.featured) // Don't show featured resources twice in All view
          .map((resource, i) => (
            <ResourceCard key={i} resource={resource} />
          ))}
      </div>

      {/* No Results */}
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No resources found in this category. Please try another category.</p>
        </div>
      )}

      {/* Additional Help CTA */}
      <div className="mt-16 p-8 bg-black/30 rounded-2xl border border-accent-pink/10 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Need More Personalized Help?</h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Our team is here to provide guidance specific to your situation. We can help identify the right resources and steps to take.
        </p>
        <Link 
          href="/contact" 
          className="inline-flex items-center px-8 py-4 bg-accent-pink hover:bg-muted-pink rounded-full transition-all duration-300 font-medium shadow-pink"
        >
          Contact Support Team
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// Resource Card Component
function ResourceCard({ resource }: { resource: any }) {
  return (
    <div className="group bg-gray-800/30 backdrop-blur-sm border border-accent-pink/20 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-accent-pink/40 transition-all duration-500 transform hover:-translate-y-1 flex flex-col h-full">
      <h3 className="text-xl font-bold text-accent-pink mb-3 group-hover:text-muted-pink transition-colors duration-300">{resource.title}</h3>
      <p className="text-gray-300 mb-4 flex-grow">{resource.description}</p>
      
      {resource.phone && (
        <div className="flex items-center gap-2 mb-4 p-2.5 bg-accent-pink/5 rounded-lg border border-accent-pink/10">
          <svg className="h-5 w-5 text-accent-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <a href={`tel:${resource.phone.replace(/[^\d+]/g, '')}`} className="text-white font-medium">
            {resource.phone}
          </a>
        </div>
      )}
      
      {resource.steps && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-soft-pink mb-2">Steps to Follow:</h4>
          <ol className="list-decimal list-inside text-sm space-y-1 text-gray-300">
            {resource.steps.map((step: string, i: number) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}
      
      <a 
        href={resource.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-flex items-center justify-center gap-2 mt-2 px-5 py-2.5 bg-accent-pink/10 hover:bg-accent-pink/20 text-accent-pink rounded-full transition-all duration-300 font-medium group-hover:shadow-lg self-start"
      >
        Access Resource
        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>
  );
}

// Featured Resource Card Component
function FeaturedResourceCard({ resource }: { resource: any }) {
  return (
    <div className="relative group overflow-hidden rounded-2xl border-2 border-accent-pink/30 shadow-lg hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm">
      <div className="absolute top-0 right-0 bg-accent-pink text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
        Priority Resource
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-4">{resource.title}</h3>
        <p className="text-gray-300 mb-5">{resource.description}</p>
        
        {resource.phone && (
          <div className="flex items-center gap-3 mb-6 p-3 bg-white/5 rounded-lg backdrop-blur-sm">
            <svg className="h-6 w-6 text-accent-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href={`tel:${resource.phone.replace(/[^\d+]/g, '')}`} className="text-white text-lg font-semibold tracking-wide">
              {resource.phone}
            </a>
          </div>
        )}
        
        <a 
          href={resource.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-accent-pink hover:bg-muted-pink text-white rounded-lg transition-all duration-300 font-medium shadow-lg"
        >
          Access Now
          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}