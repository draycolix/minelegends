'use client';

import PageLayout from '@/components/PageLayout';
import BattleContent from '@/components/BattleContent';

export default function BattlePage() {
  return (
    <PageLayout>
      <h1 className="font-display text-3xl font-bold mb-2">⚔ Battle Arena</h1>
      <BattleContent />
    </PageLayout>
  );
}
