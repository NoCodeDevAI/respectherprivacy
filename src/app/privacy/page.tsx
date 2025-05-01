// src/app/privacy/page.tsx

export default function PrivacyPolicyPage() {
    return (
    <main className="bg-background min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-accent-pink/5 z-0"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-pink to-muted-pink text-transparent bg-clip-text">Privacy Policy</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Your privacy and safety are our highest priorities. We've designed our platform with anonymity at its core.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="prose prose-invert max-w-none">
          <div className="mb-12 bg-black/30 p-8 rounded-xl border border-accent-pink/10">
            <h2 className="text-2xl font-semibold mb-4 text-soft-pink flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Our Privacy Commitment
            </h2>
            <p className="text-gray-300">
              At Respect Her Privacy, we are committed to protecting your anonymity. Our platform has been built from the ground up to minimize data collection and maximize privacy.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-soft-pink">Information We Collect</h2>
          <p className="text-gray-300 mb-4">
            We collect only the minimal information needed to process your report:
          </p>
          <ul className="space-y-2 mb-8">
            <li className="flex items-start">
              <span className="text-accent-pink mr-3">•</span>
              <span className="text-gray-300"><strong className="text-white">Reported Links</strong>: URLs to content you are reporting</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-pink mr-3">•</span>
              <span className="text-gray-300"><strong className="text-white">Optional Description</strong>: Any context you choose to provide about the reported content</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-pink mr-3">•</span>
              <span className="text-gray-300"><strong className="text-white">Optional Screenshots</strong>: Images uploaded as evidence (we recommend removing any metadata before uploading)</span>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-soft-pink">What We Don't Collect</h2>
          <ul className="space-y-2 mb-8">
            <li className="flex items-start">
              <span className="text-accent-pink mr-3">•</span>
              <span className="text-gray-300">We <strong className="text-white">do not</strong> collect your name, email address, or any other personal identifiers</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-pink mr-3">•</span>
              <span className="text-gray-300">We <strong className="text-white">do not</strong> track your browsing behavior across other websites</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-pink mr-3">•</span>
              <span className="text-gray-300">We <strong className="text-white">do not</strong> use cookies for advertising purposes</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-pink mr-3">•</span>
              <span className="text-gray-300">We <strong className="text-white">do not</strong> sell or share your data with third parties</span>
            </li>
          </ul>
        
          <h2 className="text-2xl font-semibold mb-4 text-soft-pink">How We Use Your Information</h2>
          <p className="text-gray-300 mb-4">
            The information you provide is used solely for:
          </p>
          <ul className="space-y-2 mb-8">
            <li className="flex items-start">
              <span className="text-accent-pink mr-3">•</span>
              <span className="text-gray-300">Processing your report of unauthorized content</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-pink mr-3">•</span>
              <span className="text-gray-300">Working with platforms to remove reported content</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-pink mr-3">•</span>
              <span className="text-gray-300">Identifying patterns of abuse to improve protection mechanisms</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-pink mr-3">•</span>
              <span className="text-gray-300">Aggregated, anonymized statistical analysis to improve our services</span>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-soft-pink">Data Security</h2>
          <p className="text-gray-300 mb-8">
            All data is stored securely in our encrypted database. Access is strictly limited to authorized team members who have undergone specialized training in handling sensitive content and maintaining confidentiality.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-soft-pink">Data Retention</h2>
          <p className="text-gray-300 mb-8">
            We retain report information only for as long as necessary to address the reported content. Screenshots and descriptions may be deleted upon request by emailing <a href="mailto:privacy@respectherprivacy.in" className="text-accent-pink hover:text-muted-pink transition">privacy@respectherprivacy.in</a> with your report identifier.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-soft-pink">Contact Us</h2>
          <p className="text-gray-300 mb-4">
            If you have any questions about our privacy practices, please contact us at <a href="mailto:privacy@respectherprivacy.in" className="text-accent-pink hover:text-muted-pink transition">privacy@respectherprivacy.in</a>.
          </p>
          <p className="text-gray-300 mb-8">
            This privacy policy was last updated on May 1, 2024.
          </p>
        </div>
      </section>
      </main>
    );
  }