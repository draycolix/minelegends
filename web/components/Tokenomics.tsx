'use client';

import { motion } from 'framer-motion';

const distribution = [
  { label: 'Community rewards', value: 35, color: 'bg-primary-500' },
  { label: 'Treasury DAO', value: 20, color: 'bg-secondary-500' },
  { label: 'Public sale', value: 15, color: 'bg-blue-500' },
  { label: 'Team (4yr vest)', value: 10, color: 'bg-purple-500' },
  { label: 'Initial liquidity', value: 10, color: 'bg-cyan-500' },
  { label: 'Advisors/KOLs', value: 5, color: 'bg-pink-500' },
  { label: 'Partnerships', value: 5, color: 'bg-orange-500' },
];

const burnStats = [
  { action: 'Forge Character', burn: 80, cost: '1K-100K $VEIN' },
  { action: 'Character Upgrade', burn: 60, cost: '10-50K $VEIN' },
  { action: 'Tournament Entry', burn: 50, cost: '10-1K $VEIN' },
  { action: 'PvP Battle Entry', burn: 50, cost: '10-1K $VEIN' },
  { action: 'Breed Characters', burn: 25, cost: '1K-11K $VEIN' },
  { action: 'Stamina Refill', burn: 100, cost: '10 $VEIN' },
  { action: 'Marketplace Fee', burn: 100, cost: '2% of sale' },
  { action: 'Custom Name', burn: 100, cost: '1K $VEIN' },
];

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full glass text-sm text-primary-400 font-medium mb-4">
            Tokenomics
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Dual-token <span className="text-shimmer">economy</span>
          </h2>
          <p className="text-lg text-dark-200 max-w-2xl mx-auto">
            $VEIN powers the game. $VLS governs the future. Deflationary by design —
            60% of every in-game action permanently burns tokens.
          </p>
        </motion.div>

        {/* ===== $VEIN Section ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="font-display text-3xl font-bold">
            <span className="text-yellow-400">⛏ $VEIN</span>{' '}
            <span className="text-dark-300">— Utility Token</span>
          </h3>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Distribution chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <h4 className="font-display text-xl font-bold mb-2">Token Distribution</h4>
            <p className="text-sm text-dark-300 mb-6">Total supply: 1,000,000,000 $VEIN (1B)</p>

            <div className="space-y-3">
              {distribution.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-dark-100">{item.label}</span>
                    <span className="text-dark-300 font-mono">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value * 2.857}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.05 }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Burn mechanisms */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <h4 className="font-display text-xl font-bold mb-2">Burn Mechanisms</h4>
            <p className="text-sm text-dark-300 mb-6">
              Every action burns — creating permanent deflationary pressure
            </p>

            <div className="space-y-2">
              {burnStats.map((item, i) => (
                <motion.div
                  key={item.action}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-dark-800/50 hover:bg-dark-800 transition-colors"
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium text-dark-100">{item.action}</div>
                    <div className="text-xs text-dark-400">{item.cost}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-red-400 text-sm">{item.burn}%</div>
                    <div className="text-xs text-dark-500">burned</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* $VEIN Key metrics */}
        <div className="grid sm:grid-cols-4 gap-4 mb-16">
          {[
            { value: '~80M', label: 'Initial circulating', sub: '$VEIN' },
            { value: '60%', label: 'Avg burn rate', sub: 'per action' },
            { value: '50K', label: 'Target burn', sub: '6.25M $VEIN/mo at 50K MAU' },
            { value: '9', label: 'Token decimals', sub: 'SPL standard' },
          ].map((m) => (
            <div key={m.label} className="glass rounded-2xl p-5 text-center">
              <div className="text-2xl font-display font-bold text-yellow-400">{m.value}</div>
              <div className="text-xs text-dark-300 mt-1">{m.label}</div>
              <div className="text-xs text-dark-500">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* ===== $VLS Section ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent mx-auto mb-6" />
          <h3 className="font-display text-3xl font-bold">
            <span className="text-purple-400">🏛 $VLS</span>{' '}
            <span className="text-dark-300">— Governance Token</span>
          </h3>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8 border border-purple-500/20"
          >
            <h4 className="font-display text-xl font-bold mb-4 text-purple-300">
              🗳 What $VLS Controls
            </h4>
            <div className="space-y-4">
              {[
                {
                  icon: '📜',
                  title: 'Protocol Parameters',
                  desc: 'Vote on burn rates, emission schedules, breeding costs, and tournament prize pools.',
                },
                {
                  icon: '💰',
                  title: 'Treasury Allocation',
                  desc: 'Direct 200M $VEIN treasury — fund grants, partnerships, liquidity, and ecosystem growth.',
                },
                {
                  icon: '🎮',
                  title: 'Game Design Proposals',
                  desc: 'New Bloodlines, seasonal events, arena modes — the DAO decides what gets built.',
                },
                {
                  icon: '⚖',
                  title: 'Dispute Resolution',
                  desc: 'Community-governed moderation: bans, appeals, and marketplace arbitration.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <div className="font-bold text-dark-100 text-sm">{item.title}</div>
                    <div className="text-xs text-dark-400 mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8 border border-purple-500/20"
          >
            <h4 className="font-display text-xl font-bold mb-4 text-purple-300">
              📊 $VLS Token Specs
            </h4>
            <div className="space-y-3">
              {[
                { label: 'Total Supply', value: '100,000,000 $VLS' },
                { label: 'Network', value: 'Solana (SPL Token)' },
                { label: 'Inflation', value: '2% / year via staking' },
                { label: 'Earned By', value: 'PvP wins, tournaments, guild wars, liquidity providing' },
                { label: 'Voting Power', value: '1 $VLS = 1 vote (quadratic for large proposals)' },
                { label: 'Staking APR', value: 'Earn $VLS by staking in governance (target ~5-8%)' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 rounded-lg bg-dark-800/40"
                >
                  <span className="text-xs text-dark-300">{item.label}</span>
                  <span className="text-xs font-mono font-bold text-purple-300 text-right ml-4">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* $VLS metrics */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { value: '100M', label: 'Total $VLS Supply' },
            { value: '2%', label: 'Annual inflation (staking)' },
            { value: '1:1', label: 'Voting power per $VLS' },
          ].map((m) => (
            <div key={m.label} className="glass rounded-2xl p-5 text-center">
              <div className="text-2xl font-display font-bold text-purple-400">{m.value}</div>
              <div className="text-xs text-dark-300 mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
