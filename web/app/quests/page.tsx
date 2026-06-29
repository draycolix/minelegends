'use client';

import PageLayout from '@/components/PageLayout';
import QuestsContent from '@/components/QuestsContent';

export default function QuestsPage() {
  return (
    <PageLayout>
      <h1 className="font-display text-3xl font-bold mb-2">📜 Quests</h1>
      <QuestsContent />
    </PageLayout>
  );
}
