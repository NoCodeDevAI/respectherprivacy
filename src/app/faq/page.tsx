// src/app/faq/page.tsx

'use client';

import { useState } from 'react';
import MessageBanner from '@/components/MessageBanner';

// FAQ data structure
const faqs = [
  {
    question: "Is my report really anonymous?",
    answer: "Yes, absolutely. We do not collect any personally identifiable information like your name, email address, or IP address. Our platform is designed from the ground up with anonymity as the top priority. All reports are completely anonymous and encrypted."
  },
  {
    question: "What happens after I submit a report?",
    answer: "Our team reviews the report and adds it to our database of reported content. This helps us identify patterns and work with platforms to address systemic issues. While we don't provide individual follow-up (to maintain your anonymity), your report contributes to our broader efforts to combat content abuse."
  },
  {
    question: "Can you remove the harmful content?",
    answer: "We cannot directly remove content ourselves, but we provide detailed guides on how to report it to the specific platforms where it appears. Our resources section includes platform-specific reporting instructions, and in some cases, we can assist with escalating reports to platform trust and safety teams."
  },
  {
    question: "How quickly will content be removed after reporting?",
    answer: "Content removal timelines vary by platform. Some platforms respond within 24 hours, while others may take several days. Factors like the nature of the content, the platform's policies, and the quality of the report can all influence response times. Our resources section provides expected timeframes for different platforms."
  },
  {
    question: "What if I'm being blackmailed or extorted?",
    answer: "If someone is threatening you or demanding payment, this is a crime. You should report it to local law enforcement immediately. Our resources section includes information on filing police reports and contacting specialized cyber crime units. Don't pay extortion demands, as this often leads to additional demands and doesn't guarantee content removal."
  },
  {
    question: "Can I report content on behalf of someone else?",
    answer: "Yes, you can submit a report on behalf of a friend or family member who is being affected. However, please note that some platforms may require verification from the person in the content before taking it down. Our guides cover how to help someone else through this process."
  },
  {
    question: "What information should I include in my report?",
    answer: "Include the direct URL(s) to the harmful content, a brief description of what the content contains, and which platform it appears on. If you're comfortable, a screenshot can help (with sensitive areas blurred). The more specific your report, the more effectively we can document the issue."
  },
  {
    question: "Are there legal actions I can take?",
    answer: "Yes, depending on your country, there may be laws against non-consensual image sharing, harassment, and other forms of online abuse. Our resources section includes information about legal options and how to connect with pro bono legal services that specialize in these cases."
  },
  {
    question: "Will my family or friends find out about this?",
    answer: "Not through us. We maintain strict confidentiality and never share any details from reports. Your privacy is paramount. We also provide guidance on digital security to help you maintain your privacy while dealing with this situation."
  },
  {
    question: "What mental health support is available?",
    answer: "We provide links to trauma-informed counseling services, support groups, and resources specifically designed for survivors of image-based abuse. Many of these services offer free or sliding-scale options. Remember that seeking support is a sign of strength, not weakness."
  }
];

export default function FAQPage() {
  // State to track which FAQ items are open
  const [openItems, setOpenItems] = useState<number[]>([]);

  // Toggle FAQ item open/closed
  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index) 
        : [...prev, index]
    );
  };

  return (
    <main className="bg-background min-h-screen text-white">
      <MessageBanner showClose={false} />
      
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-pink to-muted-pink text-transparent bg-clip-text">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your questions answered with care and compassion. If you don't see your question here, please <a href="/contact" className="text-accent-pink hover:underline">contact us</a>.
            </p>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-accent-pink/10">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-800 last:border-b-0 pb-4 last:pb-0">
                  <button
                    onClick={() => toggleItem(index)}
                    className="flex justify-between items-center w-full text-left py-4 focus:outline-none group"
                    aria-expanded={openItems.includes(index)}
                  >
                    <h2 className="text-xl font-semibold text-accent-pink group-hover:text-muted-pink transition-colors duration-300">
                      {faq.question}
                    </h2>
                    <span className="ml-6 flex-shrink-0 text-accent-pink">
                      {openItems.includes(index) ? (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </span>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      openItems.includes(index) 
                      ? 'max-h-96 opacity-100 pt-2 pb-4' 
                      : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-300 mb-6">Still have questions or need more personalized support?</p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-8 py-4 bg-accent-pink hover:bg-muted-pink rounded-full transition-all duration-300 transform hover:scale-105 font-medium shadow-pink"
            >
              Contact Our Support Team
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}