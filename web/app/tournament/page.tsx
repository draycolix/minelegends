'use client';

import PageLayout from '@/components/PageLayout';
import TournamentContent from '@/components/TournamentContent';

export default function TournamentPage() {
  return (
    <PageLayout>
      <h1 className="font-display text-3xl font-bold mb-2">🏆 Tournament</h1>
      <TournamentContent />
    </PageLayout>
  );
}
