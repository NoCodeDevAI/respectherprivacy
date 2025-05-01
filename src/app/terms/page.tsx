export default function TermsPage() {
  return (
    <main className="bg-background min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-accent-pink/5 z-0"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-pink to-muted-pink text-transparent bg-clip-text">Terms of Service</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            By using Respect Her Privacy, you agree to these terms.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mb-4 text-soft-pink">1. Service Description</h2>
          <p className="text-gray-300 mb-8">
            Respect Her Privacy provides a platform for anonymously reporting unauthorized sharing of private images and videos. We offer resources and support to help individuals address digital exploitation. Our service is not a substitute for legal action or professional counseling.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-soft-pink">2. User Responsibilities</h2>
          <p className="text-gray-300 mb-4">
            When using our service, you agree to:
          </p>
          <ul className="space-y-2 mb-8">
            <li className="flex items-start">
              <span className="text-accent-pink mr-3">•</span>
              <span className="text-gray-300">Provide accurate information about reported content</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-pink mr-3">•</span>
              <span className="text-gray-300">Not use our platform to harass, defame, or harm others</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-pink mr-3">•</span>
              <span className="text-gray-300">Not submit false or misleading reports</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-pink mr-3">•</span>
              <span className="text-gray-300">Not attempt to identify other users of the platform</span>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-soft-pink">3. Content Removal</h2>
          <p className="text-gray-300 mb-8">
            While we work to assist in the removal of unauthorized content, we cannot guarantee that all reported content will be removed from the internet. Content removal depends on the cooperation of third-party platforms and their respective policies.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-soft-pink">4. Privacy</h2>
          <p className="text-gray-300 mb-8">
            We are committed to protecting your privacy. Please refer to our <a href="/privacy" className="text-accent-pink hover:text-muted-pink transition">Privacy Policy</a> for information on how we collect, use, and protect your information.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-soft-pink">5. Limitations of Liability</h2>
          <p className="text-gray-300 mb-8">
            Respect Her Privacy and its team members are not liable for any damages, losses, or consequences arising from the use of our service or any actions taken based on the information provided through our platform.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-soft-pink">6. Modifications to Terms</h2>
          <p className="text-gray-300 mb-8">
            We reserve the right to modify these terms at any time. Continued use of the service after such modifications constitutes acceptance of the updated terms.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-soft-pink">7. Governing Law</h2>
          <p className="text-gray-300 mb-8">
            These terms are governed by the laws of India, without regard to its conflict of law principles.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-soft-pink">8. Contact</h2>
          <p className="text-gray-300 mb-4">
            If you have any questions about these terms, please contact us at <a href="mailto:legal@respectherprivacy.in" className="text-accent-pink hover:text-muted-pink transition">legal@respectherprivacy.in</a>.
          </p>
          <p className="text-gray-300 mb-8">
            Last updated: May 1, 2024
          </p>
        </div>
      </section>
    </main>
  );
} 