'use client';

import Link from 'next/link';
import BreedSimulator from '@/components/BreedSimulator';

export default function BreedPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-2">
        <Link href="/" className="text-dark-400 hover:text-dark-200 text-sm">← Home</Link>
      </div>
      <BreedSimulator />
    </div>
  );
}
