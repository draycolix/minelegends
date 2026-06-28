'use client';

import { motion } from 'framer-motion';
import type { Character } from '@/lib/characters';
import { BLOODLINES, RARITY_CONFIG } from '@/lib/characters';
import CharacterArt from './CharacterArt';

interface Props {
  character: Character;
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
  disabled?: boolean;
  disabledReason?: string;
  onClick?: () => void;
  showLineage?: boolean;
}

export default function CharacterCard({
  character,
  size = 'md',
  selected = false,
  disabled = false,
  disabledReason,
  onClick,
  showLineage = false,
}: Props) {
  const bloodline = BLOODLINES[character.bloodline];
  const rarity = RARITY_CONFIG[character.rarity];
  const artSize = size === 'lg' ? 'md' : 'sm';

  const sizeClasses = {
    sm: 'p-3 rounded-xl',
    md: 'p-5 rounded-2xl',
    lg: 'p-6 rounded-2xl',
  }[size];

  return (
    <motion.div
      whileHover={!disabled && onClick ? { scale: 1.03 } : undefined}
      onClick={disabled ? undefined : onClick}
      className={`
        relative glass ${sizeClasses} transition-all overflow-hidden cursor-pointer
        ${selected ? `ring-2 ${rarity.glow} ring-offset-2 ring-offset-dark-900` : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-dark-700/30'}
      `}
    >
      {/* Rarity glow background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${bloodline.color} opacity-5`}
      />

      {/* Generation badge */}
      <div className="absolute top-2 right-2 z-20">
        <span className="text-[10px] font-mono font-bold bg-dark-900/80 px-1.5 py-0.5 rounded text-dark-300">
          Gen {character.generation}
        </span>
      </div>

      {/* Rarity badge */}
      <div className="absolute top-2 left-2 z-20">
        <span
          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${rarity.color} ${rarity.textColor.replace('text-', 'text-dark-900').replace('text-yellow-300', 'text-yellow-900').replace('text-purple-300', 'text-purple-900').replace('text-blue-300', 'text-blue-900').replace('text-gray-300', 'text-gray-900')}`}
        >
          {rarity.label}
        </span>
      </div>

      {/* Disabled overlay */}
      {disabled && disabledReason && (
        <div className="absolute inset-0 bg-dark-900/60 flex items-center justify-center z-30 rounded-2xl">
          <p className="text-xs text-red-400 font-medium text-center px-2">{disabledReason}</p>
        </div>
      )}

      <div className="relative z-10">
        {/* Art */}
        <div className="flex justify-center mb-2">
          <CharacterArt bloodline={character.bloodline} size={artSize} />
        </div>

        {/* Name & Bloodline */}
        <h3 className="font-display font-bold text-center text-sm">
          {character.name}
        </h3>
        <p className="text-xs text-center text-dark-400 mb-3">
          {character.bloodline}
        </p>

        {/* Stats */}
        <div className="space-y-1.5 mb-3">
          {[
            { label: 'MNG', value: character.stats.mining, color: 'bg-yellow-500' },
            { label: 'BTL', value: character.stats.battle, color: 'bg-red-500' },
            { label: 'HP', value: character.stats.hp, color: 'bg-green-500' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-[10px] text-dark-400 w-6 font-mono">{s.label}</span>
              <div className="flex-1 h-1.5 bg-dark-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${s.color} rounded-full transition-all`}
                  style={{ width: `${s.value * 10}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-dark-200 w-4 text-right">
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* Breed count */}
        {size !== 'sm' && (
          <p className="text-[10px] text-dark-500 text-center">
            Breeds: {character.breedCount}
            {character.generation >= 7 && ' ⚠ Sterile'}
          </p>
        )}

        {/* Lineage */}
        {showLineage && character.parentIds && (
          <p className="text-[9px] text-dark-600 text-center mt-1 italic">
            ← Gen {character.generation - 1} parents
          </p>
        )}
      </div>
    </motion.div>
  );
}
