'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Character } from '@/lib/characters';
import { getNamedHeroes, generateGenericPool } from '@/lib/characters';
import type { ActiveCard } from '@/lib/cards';
import {
  initBattle, playCard, aiTurn, endTurn, autoBattle,
  type BattleState, type BattleFighter, type BattleEvent,
} from '@/lib/battle';
import HeroCard from '@/components/HeroCard';

const POOL = [...getNamedHeroes(), ...generateGenericPool()];

export default function BattlePage() {
  const [team1, setTeam1] = useState<Character[]>([]);
  const [team2, setTeam2] = useState<Character[]>([]);
  const [battle, setBattle] = useState<BattleState | null>(null);
  const [autoPlaying, setAutoPlaying] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  const maxTeam = 3;
  const ready = team1.length === maxTeam && team2.length === maxTeam;
  const fighting = battle && battle.phase !== 'game_over';
  const done = battle?.phase === 'game_over';

  const toggleTeam = (c: Character, team: 1 | 2) => {
    if (battle) return;
    const setter = team === 1 ? setTeam1 : setTeam2;
    const current = team === 1 ? team1 : team2;
    setter(prev => prev.find(p => p.id === c.id)
      ? prev.filter(p => p.id !== c.id)
      : prev.length < maxTeam ? [...prev, c] : prev);
  };

  const startBattle = () => {
    if (!ready) return;
    setBattle(initBattle(team1, team2));
  };

  const handlePlay = (idx: number) => {
    if (!battle || battle.phase !== 'player_turn') return;
    setBattle(playCard(battle, idx).state);
  };

  const handleEndTurn = () => {
    if (!battle) return;
    let s: BattleState = { ...battle, phase: 'ai_turn' };
    s = aiTurn(s);
    s = endTurn(s);
    setBattle(s);
  };

  const handleInstant = () => {
    if (!battle) return;
    setBattle(autoBattle(battle, 30));
  };

  useEffect(() => {
    if (!autoPlaying || !battle || battle.phase === 'game_over') return;
    const t = setTimeout(() => {
      setBattle(prev => {
        if (!prev || prev.phase === 'game_over') return prev;
        let s = { ...prev };
        if (s.phase === 'player_turn') {
          const cards = s.hand
            .map((c, i) => ({ c, i }))
            .filter(({ c }) => c.energy <= s.energy && c.type === 'attack')
            .sort((a, b) => a.c.energy - b.c.energy);
          if (cards.length > 0) s = playCard(s, cards[0].i).state;
          s = { ...s, phase: 'ai_turn' };
        }
        if (s.phase === 'ai_turn') s = aiTurn(s);
        if (s.phase === 'resolve') s = endTurn(s);
        return s;
      });
    }, 1200);
    return () => clearTimeout(t);
  }, [autoPlaying, battle]);

  const reset = () => { setBattle(null); setAutoPlaying(false); setShowLog(false); };

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* SELECTION */}
        {!battle && (
          <>
            <div className="flex items-center gap-4 mb-8">
              <Link href="/" className="text-dark-400 hover:text-dark-200 text-sm">← Home</Link>
              <h1 className="font-display text-3xl font-bold">⚔ Battle Arena</h1>
            </div>
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {([1, 2] as const).map(t => (
                <div key={t} className={`glass rounded-2xl p-6 border-2 ${t === 1 ? 'border-yellow-500/30' : 'border-red-500/30'}`}>
                  <h3 className={`font-bold text-lg mb-4 text-center ${t === 1 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {t === 1 ? '🎮 Your Team' : '🤖 AI Team'} ({(t === 1 ? team1 : team2).length}/3)
                  </h3>
                  <div className="flex justify-center gap-3 flex-wrap">
                    {(t === 1 ? team1 : team2).map(c => (
                      <div key={c.id} className="relative">
                        <HeroCard character={c} size="sm" />
                        <button onClick={() => toggleTeam(c, t)} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center">✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mb-8">
              <motion.button whileHover={ready ? { scale: 1.05 } : {}} whileTap={ready ? { scale: .95 } : {}}
                onClick={startBattle} disabled={!ready}
                className={`px-12 py-5 rounded-2xl font-bold text-2xl transition-all ${ready ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-2xl shadow-red-500/40' : 'bg-dark-700 text-dark-400 cursor-not-allowed'}`}>
                ⚔ START BATTLE
              </motion.button>
            </div>
            <h4 className="font-bold text-dark-300 text-center mb-4">Warrior Pool ({POOL.length})</h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2.5">
              {POOL.map(c => {
                const inT1 = team1.some(x => x.id === c.id);
                const inT2 = team2.some(x => x.id === c.id);
                return <HeroCard key={c.id} character={c} size="sm" selected={inT1 || inT2}
                  onClick={() => {
                    if (!inT1 && !inT2) toggleTeam(c, team1.length < 3 ? 1 : team2.length < 3 ? 2 : 1);
                    else toggleTeam(c, inT1 ? 1 : 2);
                  }} />;
              })}
            </div>
          </>
        )}

        {/* FIGHTING */}
        {battle && (
          <>
            <div className="flex items-center justify-between mb-6">
              <button onClick={reset} className="text-dark-400 hover:text-dark-200 text-sm">← Quit</button>
              <h1 className="font-display text-2xl font-bold">⚔ Battle Arena</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${fighting ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                {fighting ? `Turn ${battle.currentTurn}` : 'DONE'}
              </span>
            </div>

            {/* Energy */}
            <div className="glass rounded-xl p-3 mb-6 flex items-center gap-3">
              <span className="text-dark-400 text-sm">Energy</span>
              <div className="flex gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className={`w-3 h-5 rounded ${i < battle.energy ? 'bg-gradient-to-b from-cyan-400 to-blue-600' : 'bg-dark-600'}`} />
                ))}
              </div>
              <span className="font-bold text-cyan-400">{battle.energy}/10</span>
            </div>

            {/* Teams */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {([battle.team1, battle.team2] as BattleFighter[][]).map((team, ti) => (
                <div key={ti}>
                  <h4 className={`font-bold text-center mb-3 ${ti === 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {ti === 0 ? '🎮 Your Team' : '🤖 AI'}
                  </h4>
                  {team.map(f => {
                    const hpPct = Math.max(0, Math.round((f.currentHp / f.maxHp) * 100));
                    return (
                      <div key={f.id} className={`glass rounded-xl p-3 mb-2 ${!f.isAlive ? 'opacity-30 grayscale' : ''}`}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{!f.isAlive ? '💀' : f.bloodline === 'Delver' ? '⛏' : f.bloodline === 'Ironblood' ? '⚔' : f.bloodline === 'Forgeborn' ? '🔥' : f.bloodline === 'Shadowvein' ? '🗡' : f.bloodline === 'Stonewarden' ? '🛡' : '🧪'}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-xs">{f.name}</p>
                            <div className="h-1.5 bg-dark-700 rounded-full mt-1">
                              <div className={`h-full rounded-full ${hpPct > 60 ? 'bg-green-500' : hpPct > 30 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${hpPct}%` }} />
                            </div>
                            <div className="flex justify-between text-[9px] text-dark-500 mt-0.5">
                              <span>{f.currentHp}/{f.maxHp}</span>
                              {f.shield > 0 && <span className="text-cyan-400">🛡{f.shield}</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Events */}
            {battle.events.length > 0 && (
              <motion.div key={battle.events.length} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="text-center mb-4 py-2 px-4 rounded-xl font-bold text-sm bg-dark-700 text-dark-200">
                {battle.events[battle.events.length - 1].message}
              </motion.div>
            )}

            {/* Victory */}
            {done && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
                className="glass rounded-2xl p-8 text-center mb-6">
                <p className="text-6xl mb-3">{battle.winner === 1 ? '🏆' : '💀'}</p>
                <p className={`font-bold text-3xl ${battle.winner === 1 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {battle.winner === 1 ? 'VICTORY!' : 'DEFEAT!'}
                </p>
                {battle.rewards && (
                  <div className="mt-4 text-lg">
                    <span className="text-yellow-400 font-bold">+{battle.rewards.vein} $VEIN</span>
                    {' '}<span className="text-dark-400">+{battle.rewards.ore} Ore</span>
                  </div>
                )}
                <button onClick={reset} className="mt-6 px-6 py-2 glass text-dark-200 rounded-xl">New Battle</button>
              </motion.div>
            )}

            {/* Controls */}
            {fighting && (
              <div className="flex justify-center gap-3 mb-6">
                {battle.phase === 'player_turn' && (
                  <button onClick={handleEndTurn} className="px-6 py-2 bg-yellow-500/20 text-yellow-400 rounded-xl font-bold">⏭ End Turn</button>
                )}
                <button onClick={() => setAutoPlaying(!autoPlaying)}
                  className={`px-4 py-2 rounded-xl font-bold ${autoPlaying ? 'bg-yellow-500 text-dark-900' : 'glass text-dark-200'}`}>
                  {autoPlaying ? '⏸ Stop' : '⏩ Auto'}
                </button>
                <button onClick={handleInstant} className="px-4 py-2 glass text-dark-200 rounded-xl font-bold">⚡ Instant</button>
              </div>
            )}

            {/* Hand */}
            {battle.phase === 'player_turn' && (
              <div>
                <h4 className="text-dark-300 text-center text-sm mb-3">Your Hand ({battle.hand.length} cards)</h4>
                <div className="flex justify-center gap-3 flex-wrap">
                  {battle.hand.map((c, i) => {
                    const owner = battle.team1.find(f => f.id === c.ownerId && f.isAlive);
                    const stunned = owner?.statusEffects.some(e => e.stun);
                    const playable = c.energy <= battle.energy && !!owner && !stunned;
                    return (
                      <motion.div key={`${c.id}-${i}`}
                        whileHover={playable ? { scale: 1.08, y: -8 } : {}}
                        whileTap={playable ? { scale: .95 } : {}}
                        onClick={() => playable && handlePlay(i)}
                        onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                        className={`relative w-[140px] rounded-2xl overflow-hidden border-2 ${playable ? 'cursor-pointer border-dark-600 hover:border-yellow-500/50' : 'border-dark-700 opacity-40 cursor-not-allowed'}`}>
                        <div className={`absolute inset-0 bg-gradient-to-b ${c.color} opacity-20`} />
                        <div className="relative p-3">
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-dark-900/80 flex items-center justify-center">
                            <span className={`text-xs font-bold ${c.energy <= battle.energy ? 'text-cyan-400' : 'text-red-400'}`}>{c.energy}</span>
                          </div>
                          <div className="text-2xl mb-1">{c.icon}</div>
                          <p className="font-bold text-xs">{c.name}</p>
                          <span className={`inline-block text-[9px] px-1.5 py-0.5 rounded mt-1 ${c.type === 'attack' ? 'bg-red-500/20 text-red-400' : c.type === 'defense' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>{c.type.toUpperCase()}</span>
                          <p className="text-[9px] text-dark-500 mt-1 truncate">{c.ownerName}</p>
                          {c.damage > 0 && <p className="text-xs font-bold text-red-400 mt-1">⚔{c.damage}</p>}
                        </div>
                        {hovered === i && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[200px] bg-dark-800 border border-dark-600 rounded-xl p-3 z-20">
                            <p className="text-xs text-dark-300">{c.description}</p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Log */}
            <div className="mt-4">
              <button onClick={() => setShowLog(!showLog)} className="text-sm text-dark-400 hover:text-dark-200">
                📜 Battle Log ({battle.events.length}) {showLog ? '▲' : '▼'}
              </button>
              {showLog && (
                <div className="glass rounded-xl p-4 max-h-48 overflow-y-auto space-y-1 mt-2">
                  {battle.events.map((e, i) => (
                    <p key={i} className="text-xs text-dark-300"><span className="text-dark-600">T{e.turn}</span> {e.message}</p>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
