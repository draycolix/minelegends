'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Stats = dynamic(() => import('@/components/Stats'), { ssr: false });

const HUBS = [
  {
    title: '⛏ Mining',
    desc: 'Deploy warriors to mine $VEIN. Better stats = faster rate. Works offline.',
    href: '/mining',
    color: 'from-yellow-500 to-amber-600',
    glow: 'shadow-yellow-500/20',
  },
  {
    title: '⚔ Battle Arena',
    desc: 'Axie-style 3v3 card battles. 24 unique cards, energy system, status effects.',
    href: '/battle',
    color: 'from-red-500 to-orange-600',
    glow: 'shadow-red-500/20',
  },
  {
    title: '🏆 Tournament',
    desc: '8-warrior elimination bracket. Single elimination. Champion takes 2,500 $VEIN.',
    href: '/tournament',
    color: 'from-purple-500 to-pink-600',
    glow: 'shadow-purple-500/20',
  },
  {
    title: '📜 Quests',
    desc: 'Daily & weekly quests. Complete objectives, earn $VEIN + Ore rewards.',
    href: '/quests',
    color: 'from-cyan-500 to-blue-600',
    glow: 'shadow-cyan-500/20',
  },
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="animate-pulse text-dark-400 text-lg">Loading VeinLegends...</div>
    </div>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 bg-grid pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-dark-900 via-dark-900 to-dark-800 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

      <Navbar />

      <main className="relative z-10">
        {/* Hero */}
        <section className="pt-32 pb-20 px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block px-4 py-1.5 rounded-full glass text-sm text-secondary-400 font-medium mb-6">
              Web3 Idle RPG on Solana
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
              Mine. Battle. <span className="text-shimmer">Earn.</span>
            </h1>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto mb-10">
              Deploy warriors to mine $VEIN. Breed legendary bloodlines.
              Battle in 3v3 card combat. Compete in tournaments.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/battle"
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-red-500/30 hover:scale-105 transition-transform">
                ⚔ Battle Now
              </Link>
              <Link href="/mining"
                className="px-8 py-4 glass text-dark-200 rounded-2xl font-bold text-lg hover:bg-dark-700/50 transition-colors">
                ⛏ Start Mining
              </Link>
            </div>
          </motion.div>
        </section>

        <Stats />

        {/* Hub Cards */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-center mb-12">
              Choose Your <span className="text-shimmer">Path</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {HUBS.map((hub, i) => (
                <motion.div key={hub.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}>
                  <Link href={hub.href}>
                    <div className={`glass rounded-2xl p-6 h-full border border-dark-700 hover:border-yellow-500/30 transition-all hover:scale-[1.02] ${hub.glow} hover:shadow-xl`}>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${hub.color} flex items-center justify-center text-2xl mb-4`}>
                        {hub.title.split(' ')[0]}
                      </div>
                      <h3 className="font-display font-bold text-lg mb-2">{hub.title}</h3>
                      <p className="text-sm text-dark-400">{hub.desc}</p>
                      <p className="text-xs text-yellow-400 mt-4 font-bold">Explore →</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ecosystem Stats */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto glass rounded-3xl p-8">
            <h2 className="font-display text-2xl font-bold text-center mb-8">VeinLegends Economy</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl mb-2">💰</p>
                <p className="font-bold text-xl text-yellow-400">$VEIN</p>
                <p className="text-xs text-dark-400 mt-1">Utility token — earned via mining & battles</p>
              </div>
              <div>
                <p className="text-3xl mb-2">🏛</p>
                <p className="font-bold text-xl text-purple-400">$VLS</p>
                <p className="text-xs text-dark-400 mt-1">Governance — 100M fixed supply</p>
              </div>
              <div>
                <p className="text-3xl mb-2">🧬</p>
                <p className="font-bold text-xl text-green-400">6 Bloodlines</p>
                <p className="text-xs text-dark-400 mt-1">Delver · Ironblood · Forgeborn · Shadowvein · Stonewarden · Veinbender</p>
              </div>
              <div>
                <p className="text-3xl mb-2">🃏</p>
                <p className="font-bold text-xl text-red-400">24 Cards</p>
                <p className="text-xs text-dark-400 mt-1">4 unique cards per bloodline</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Ready to Mine?</h2>
          <p className="text-dark-400 mb-8">Deploy your first warrior and start earning $VEIN.</p>
          <Link href="/mining"
            className="px-10 py-5 bg-gradient-to-r from-yellow-500 to-amber-600 text-dark-900 rounded-2xl font-bold text-xl shadow-2xl shadow-yellow-500/30 hover:scale-105 transition-transform inline-block">
            ⛏ Start Mining Now
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
