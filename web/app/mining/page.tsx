'use client';

import Link from 'next/link';
import MiningDashboard from '@/components/MiningDashboard';

export default function MiningPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <Link href="/" className="text-dark-400 hover:text-dark-200 text-sm">← Home</Link>
      </div>
      <MiningDashboard />
    </div>
  );
}
