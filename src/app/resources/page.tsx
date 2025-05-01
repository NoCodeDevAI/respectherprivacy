// src/app/resources/page.tsx

import ResourcesCardList from '@/components/ResourcesCardList';
import MessageBanner from '@/components/MessageBanner';

export default function ResourcesPage() {
  return (
    <main className="bg-background min-h-screen text-white">
      <MessageBanner showClose={false} />
      
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-pink to-muted-pink text-transparent bg-clip-text">Support & Resources</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Your pain is not invisible, and you don't have to face this alone. We've gathered trusted resources to help you navigate this situation and take back control of your life.
            </p>
          </div>
          
          <div className="bg-black/30 p-6 md:p-8 rounded-xl border border-accent-pink/10 backdrop-blur mb-12">
            <h2 className="text-2xl font-semibold text-soft-pink mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Immediate Support
            </h2>
            <p className="text-gray-300 mb-6">
              If you're in crisis or need immediate emotional support, please reach out to one of these helplines:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/40 p-5 rounded-lg border border-accent-pink/20 flex items-start">
                <div className="bg-accent-pink/10 p-2 rounded-full mr-4">
                  <svg className="h-8 w-8 text-accent-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">National Helpline</h3>
                  <p className="text-gray-300 mb-2">24/7 confidential support for women in distress</p>
                  <a href="tel:1800-XXX-XXXX" className="text-2xl font-bold text-accent-pink hover:underline">1800-XXX-XXXX</a>
                </div>
              </div>
              
              <div className="bg-black/40 p-5 rounded-lg border border-accent-pink/20 flex items-start">
                <div className="bg-accent-pink/10 p-2 rounded-full mr-4">
                  <svg className="h-8 w-8 text-accent-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Crisis Text Line</h3>
                  <p className="text-gray-300 mb-2">Text-based support if you can't or don't want to call</p>
                  <p className="text-2xl font-bold text-accent-pink">Text HOME to 741741</p>
                </div>
              </div>
            </div>
          </div>
          
          <ResourcesCardList />
        </div>
      </div>
    </main>
  );
}