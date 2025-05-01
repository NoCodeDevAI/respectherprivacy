// src/app/thanks/page.tsx
import Link from 'next/link';

export default function ThanksPage() {
  return (
    <main className="bg-background flex items-center justify-center min-h-screen px-6 text-center text-white">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Thank you for speaking up.</h2>
        <p className="mb-6 text-gray-300">
          You&apos;re not alone.
        </p>
        <Link href="/" className="text-accent-pink underline hover:text-soft-pink transition">Return Home</Link>
      </div>
    </main>
  );
}