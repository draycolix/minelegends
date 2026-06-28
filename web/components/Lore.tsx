'use client';

import { motion } from 'framer-motion';

const timeline = [
  {
    era: 'Age of Concord',
    time: '1,000+ years ago',
    desc: 'Six Bloodlines united under the Vein Concord — sharing the planet\'s Vein network equally. A golden age of prosperity.',
  },
  {
    era: 'The Sundering',
    time: '500 years ago',
    desc: 'An unknown catastrophe shattered the Heartvein at the planet\'s core. The Vein network splintered into isolated fragments. The Bloodlines blamed each other.',
  },
  {
    era: 'The Bloodline Wars',
    time: '300 years of conflict',
    desc: 'Endless war between the Bloodlines. Each fought for control of the remaining Vein fragments. Millions perished. The Veins began dying.',
  },
  {
    era: 'Age of Reclamation',
    time: 'NOW',
    desc: 'A new generation of Veinwalkers rises. They understand: the Veins are dying. Only cross-Bloodline hybrids can reconnect the shattered Heartvein.',
  },
];

const factions = [
  {
    name: 'The Restoration Concord',
    goal: 'Heal the Sundering, reunite the Bloodlines',
    style: 'from-blue-500 to-cyan-600',
  },
  {
    name: 'The Deep Extraction Guild',
    goal: 'Extract maximum $VEIN before the Veins die',
    style: 'from-yellow-500 to-orange-600',
  },
  {
    name: 'The Veinsbane Cult',
    goal: 'Prevent the Sundering from being healed — keep the entity imprisoned',
    style: 'from-red-500 to-rose-600',
  },
];

const threats = [
  {
    name: 'The Hollowed',
    desc: 'Failed hybrids who burned out their Vein receptors. Now they roam the dead zones, draining $VEIN from any living being. The dark mirror: what every Veinwalker could become.',
    icon: '💀',
  },
  {
    name: 'The Veinsbane',
    desc: 'An ancient entity imprisoned inside the Heartvein at the moment of the Sundering. As players breed stronger hybrids, the Veinsbane grows stronger — feeding on the energy of every new bloodline combination.',
    icon: '👁',
  },
];

const terms = [
  { term: 'Vein', def: 'Channel of life-force and mineral wealth running through Gea Prime' },
  { term: 'Veinstone', def: 'Solidified Vein energy — the most valuable mineral in existence' },
  { term: 'Veinwalker', def: 'One who can sense and channel Vein energy (YOU)' },
  { term: 'Bloodline', def: 'Inherited genetic connection to a specific Vein frequency' },
  { term: 'Heartvein', def: 'The planet\'s core Vein — shattered during the Sundering' },
  { term: 'Prime Hybrid', def: 'The ultimate Veinwalker — goal of the Veinblood Trials' },
];

export default function Lore() {
  return (
    <section id="lore" className="py-24 px-4 relative">
      {/* Dark atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-900/95 to-dark-900 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full glass text-sm text-primary-400 font-medium mb-4">
            Lore
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            The World of <span className="text-shimmer">Gea Prime</span>
          </h2>
          <p className="text-lg text-dark-200 max-w-3xl mx-auto">
            A living planet threaded with glowing channels called The Veins — simultaneously
            mineral deposits, life essence, and the accumulated memory of every bloodline
            that has ever walked the surface.
          </p>
        </motion.div>

        {/* Premise Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-2xl p-8 md:p-10 mb-16 border-l-4 border-primary-500"
        >
          <p className="text-lg md:text-xl text-dark-100 italic leading-relaxed">
            &ldquo;The world has been drained. The Veins — ancient channels of life-force
            and mineral wealth that once pulsed through the earth — have gone silent. Without
            them, Kingdoms crumble. Without them, bloodlines wither. Without them, there is
            no future. But deep beneath the surface, the Veins are waking up. And they&apos;re
            calling for new blood.&rdquo;
          </p>
          <footer className="mt-4 text-sm text-dark-400">
            — Prologue to the Veinblood Trials
          </footer>
        </motion.blockquote>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="font-display text-2xl font-bold text-center mb-10">
            History of Gea Prime
          </h3>

          <div className="space-y-6">
            {timeline.map((event, i) => (
              <motion.div
                key={event.era}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6"
              >
                <div className="hidden sm:flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      i === 3 ? 'bg-primary-400 animate-pulse shadow-lg shadow-primary-500/50' : 'bg-dark-600'
                    }`}
                  />
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-dark-700 mt-1" />
                  )}
                </div>
                <div className="flex-1 glass rounded-xl p-5">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-display font-bold text-dark-100">
                      {event.era}
                    </span>
                    <span className="text-xs text-dark-400 font-mono">{event.time}</span>
                    {i === 3 && (
                      <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-0.5 rounded-full">
                        YOU ARE HERE
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-dark-300 mt-2">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Threats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="font-display text-2xl font-bold text-center mb-8">
            ⚠ The Threats
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {threats.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border border-red-500/10 hover:border-red-500/30 transition-colors"
              >
                <div className="text-3xl mb-3">{t.icon}</div>
                <h4 className="font-display text-xl font-bold text-red-400 mb-2">
                  {t.name}
                </h4>
                <p className="text-sm text-dark-300 leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Factions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="font-display text-2xl font-bold text-center mb-8">
            🏛 The Factions
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {factions.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform"
              >
                <div
                  className={`w-12 h-1 bg-gradient-to-r ${f.style} rounded-full mx-auto mb-4`}
                />
                <h4 className="font-display font-bold text-dark-100 mb-2">{f.name}</h4>
                <p className="text-xs text-dark-400">{f.goal}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Terms glossary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-display text-2xl font-bold text-center mb-8">
            📖 Glossary
          </h3>

          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {terms.map((t) => (
                <div key={t.term} className="flex gap-3 items-start">
                  <span className="text-primary-400 font-bold text-sm flex-shrink-0">
                    {t.term}
                  </span>
                  <span className="text-xs text-dark-300">{t.def}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
