// src/app/thanks/page.tsx

export default function ThanksPage() {
    return (
      <main className="bg-background flex items-center justify-center min-h-screen px-6 text-center text-white">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Thank you for speaking up.</h2>
          <p className="mb-6 text-gray-300">
            Your voice helps protect others. You're not alone.
          </p>
          <a href="/" className="text-accent-pink underline hover:text-soft-pink transition">Return Home</a>
        </div>
      </main>
    );
  }