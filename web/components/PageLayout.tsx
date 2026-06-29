'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function PageLayout({
  children,
  backLabel = '← Home',
  backHref = '/',
}: {
  children: React.ReactNode;
  backLabel?: string;
  backHref?: string;
}) {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-2">
        <Link href={backHref} className="text-dark-400 hover:text-dark-200 text-sm">
          {backLabel}
        </Link>
      </div>
      {children}
    </div>
  );
}
