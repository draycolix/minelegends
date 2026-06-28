'use client';

import { motion } from 'framer-motion';
import CharacterArt from './CharacterArt';

const bloodlines = [
  {
    name: 'Delver',
    role: 'Vein Prospector',
    quote: '"We don\'t seek the Vein. The Vein seeks us."',
    description:
      'The oldest bloodline. Delvers can HEAR the Veins — a low hum that guides them to the richest deposits. Backbone of the Vein economy.',
    stats: { mining: 5, battle: 2, hp: 2.5 },
    color: 'from-yellow-500 to-orange-600',
    icon: '⛏',
    signature: 'Vein Sense — passive mining boost',
    home: 'The Deep Warrens beneath the Rustfang Mountains',
  },
  {
    name: 'Ironblood',
    role: 'Gladiator Warrior',
    quote: '"Our blood IS the Vein."',
    description:
      'Descended from a Prime Veinwalker who infused his own blood with molten Veinstone. Their skin shimmers with metallic veins after each battle.',
    stats: { mining: 2, battle: 5, hp: 5 },
    color: 'from-red-500 to-rose-600',
    icon: '⚔',
    signature: 'First Strike — blood boils faster than any enemy',
    home: 'The Crucible, a floating colosseum over a Vein rift',
  },
  {
    name: 'Forgeborn',
    role: 'Vein-Forger',
    quote: '"Some are born of flesh. We are born of fire and Vein."',
    description:
      'Chosen through the Ritual of Reforging — stepping into a Vein-forge and emerging transformed, their blood replaced with liquid fire.',
    stats: { mining: 3, battle: 3, hp: 3.5 },
    color: 'from-amber-500 to-yellow-600',
    icon: '🔥',
    signature: 'Vein Burn — attacks set enemies ablaze with Vein-fire',
    home: 'The Ember Anvil, a forge-city inside a dormant volcano',
  },
  {
    name: 'Shadowvein',
    role: 'Vein Scout',
    quote: '"We move where the Vein is thinnest... and strike where it\'s weakest."',
    description:
      'Outcasts from every bloodline, adapted to darkness and silence. They move unseen through the Vein-silent zones between deposits.',
    stats: { mining: 2, battle: 4, hp: 2 },
    color: 'from-indigo-500 to-purple-600',
    icon: '🗡',
    signature: 'Vein Stealth — sense enemy Vein signatures before visible',
    home: 'The Grey Expanse, a labyrinth of abandoned mine tunnels',
  },
  {
    name: 'Stonewarden',
    role: 'Vein Guardian',
    quote: '"The Vein does not protect itself. WE do."',
    description:
      'Guardians of the Heartvein for 10,000 years, their bloodlines interwoven with the very rock they protect.',
    stats: { mining: 2, battle: 3, hp: 5 },
    color: 'from-slate-400 to-gray-600',
    icon: '🛡',
    signature: 'Vein Fortify — channel surrounding rock into impenetrable armor',
    home: 'The Bastion, a fortress carved into the planet\'s mantle',
  },
  {
    name: 'Veinbender',
    role: 'Vein Alchemist',
    quote: '"The Vein is not a resource. It\'s a language. And we are the only ones fluent."',
    description:
      'Mad scientists and heretic philosophers who believe the Veins are a CONSCIOUS planetary intelligence.',
    stats: { mining: 3, battle: 2, hp: 2.5 },
    color: 'from-emerald-500 to-teal-600',
    icon: '🧪',
    signature: 'Vein Transmutation — steal enemy Vein energy and convert it',
    home: 'The Synapse Spire, a crystal tower growing from a Vein intersection',
  },
];

function StatBar({
  value,
  max,
  color,
  label,
}: {
  value: number;
  max: number;
  color: string;
  label: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-dark-300">{label}</span>
        <span className="text-dark-100 font-bold">
          {value}/{max}
        </span>
      </div>
      <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} transition-all duration-500`}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default function Characters() {
  return (
    <section id="characters" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full glass text-sm text-primary-400 font-medium mb-4">
            Characters
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Six ancient <span className="text-shimmer">Bloodlines</span>
          </h2>
          <p className="text-lg text-dark-200 max-w-2xl mx-auto">
            Each Bloodline descends from the Prime Veinwalkers — unique strengths, signature abilities, and deep lore.
            Cross-breed to create hybrids with unprecedented power.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bloodlines.map((char, i) => (
            <motion.div
              key={char.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative glass rounded-2xl p-6 hover:scale-[1.03] transition-all overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${char.color} opacity-0 group-hover:opacity-15 transition-opacity`}
              />
              <div className="relative z-10">
                <div className="flex justify-center mb-3">
                  <CharacterArt bloodline={char.name} size="sm" />
                </div>
                <h3 className="font-display text-2xl font-bold text-center mb-1">
                  {char.name}
                </h3>
                <p className="text-xs text-center text-primary-400 mb-1 font-medium">
                  {char.role}
                </p>
                <p className="text-sm text-center text-dark-200 mb-3 italic">
                  &ldquo;{char.quote}&rdquo;
                </p>
                <p className="text-xs text-dark-400 text-center mb-4 leading-relaxed">
                  {char.description}
                </p>

                <div className="space-y-2 mb-4">
                  <StatBar value={char.stats.mining} max={5} color="from-yellow-500 to-orange-500" label="Mining" />
                  <StatBar value={char.stats.battle} max={5} color="from-red-500 to-rose-500" label="Battle" />
                  <StatBar value={char.stats.hp} max={5} color="from-green-500 to-emerald-500" label="HP" />
                </div>

                <div className="text-xs text-dark-300 bg-dark-800/60 rounded-lg p-2">
                  <span className="text-primary-400 font-bold">Signature:</span>{' '}
                  {char.signature}
                </div>
                <div className="text-xs text-dark-500 mt-1.5 italic text-center">
                  🏠 {char.home}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-dark-400 text-sm mt-10 italic"
        >
          &ldquo;The Veins remember everything. The question is — will they remember YOU?&rdquo;
          <br />
          <span className="text-dark-500">— Veinwalker proverb, Age of Reclamation</span>
        </motion.p>
      </div>
    </section>
  );
}
