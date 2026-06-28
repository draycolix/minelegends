'use client';

import dynamic from 'next/dynamic';
import { type ReactNode } from 'react';

// Lazy-load the ENTIRE wallet provider — avoids ESM module evaluation during SSR
const WalletProviderInner = dynamic(
  () => import('./wallet-provider-inner').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="animate-pulse text-dark-400 text-lg">Loading VeinLegends...</div>
      </div>
    ),
  }
);

export function WalletContextProvider({ children }: { children: ReactNode }) {
  return <WalletProviderInner>{children}</WalletProviderInner>;
}

// Re-export hook via lazy load
export function useWalletConnection() {
  // This hook is never called during SSR (only from client components)
  const { useWalletConnection: inner } = require('./wallet-provider-inner');
  return inner();
}
