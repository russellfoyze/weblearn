'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trees, Vote, RotateCcw, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundEffects } from '@/utils/soundEffects';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';

export default function ForestBattleGame() {
  const { language } = useLanguage();
  const { addXP, addCoins, recordScore } = useGame();
  const isBn = language === 'bn';

  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [anomalyType, setAnomalyType] = useState<'noisy_fraud' | 'glitch_drone' | 'cyber_worm'>('noisy_fraud');
  const [votes, setVotes] = useState<string[]>(['YES', 'YES', 'NO', 'YES', 'YES']);
  const [outcome, setOutcome] = useState<{ majority: string; agreement: number } | null>(null);

  const anomalies = [
    {
      id: 'noisy_fraud',
      name: 'Stealthy Wire Fraud',
      nameBn: 'ছদ্মবেশী ফিন্যান্সিয়াল ফ্রড',
      icon: '💳',
      desc: 'Disguised with fake benign features. Tree 3 is fooled, but the other 4 trees see through it!',
      descBn: 'সাধারণ লেনদেনের ছদ্মবেশ। গাছ ৩ বিভ্রান্ত হলেও বাকি ৪টি গাছ আসল পরিচয় ধরে ফেলেছে!',
      correctVote: 'FRAUD (Flag)',
      treeVotes: ['FRAUD', 'FRAUD', 'SAFE', 'FRAUD', 'FRAUD'],
    },
    {
      id: 'glitch_drone',
      name: 'Rogue Swarm Drone',
      nameBn: 'বিদ্রোহী নজরদারি ড্রোন',
      icon: '🛸',
      desc: 'Transmitting corrupted GPS coordinates. Majority vote detects the rogue path!',
      descBn: 'ভুল জিপিএস সিগন্যাল দিচ্ছে। সংখ্যাগরিষ্ঠ গাছেরা ড্রোনটির অবস্থান নিশ্চিত করেছে!',
      correctVote: 'ROGUE',
      treeVotes: ['ROGUE', 'ROGUE', 'ROGUE', 'FRIENDLY', 'ROGUE'],
    },
    {
      id: 'cyber_worm',
      name: 'Zero-Day Polymorphic Worm',
      nameBn: 'জিরো-ডে পলিমরফিক ম্যালওয়্যার',
      icon: '🦠',
      desc: 'Alters its signature constantly. The ensemble forest catches it with 100% agreement!',
      descBn: 'প্রতি সেকেন্ডে রূপ পরিবর্তন করে। পুরো বন মিলে শতভাগ ঐকমত্যে একে আটকে ফেলেছে!',
      correctVote: 'QUARANTINE',
      treeVotes: ['QUARANTINE', 'QUARANTINE', 'QUARANTINE', 'QUARANTINE', 'QUARANTINE'],
    },
  ];

  const currentAnomaly = anomalies.find((a) => a.id === anomalyType)!;

  const handleRunVoting = () => {
    setIsVoting(true);
    soundEffects.playLaser();
    setOutcome(null);

    setTimeout(() => {
      setVotes(currentAnomaly.treeVotes);
      const majority = currentAnomaly.correctVote;
      const agreement = Math.round(
        (currentAnomaly.treeVotes.filter((v) => v === majority).length / 5) * 100
      );

      setIsVoting(false);
      setOutcome({ majority, agreement });
      soundEffects.playLevelUp();
      addXP(140, 'Random Forest Bagging Victory');
      addCoins(35);
      recordScore('forest_battle', 900);
    }, 700);
  };

  return (
    <div className="space-y-4 select-none">
      {/* Header ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold">
            <Trees className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white">
              {isBn ? 'মিশন: র‍্যান্ডম ফরেস্ট কাউন্সিল ভোটিং' : 'Mission: Random Forest Council Voting'}
            </div>
            <div className="text-[10px] text-slate-400">
              {isBn
                ? 'একক গাছের ভুলের ঝুঁকি এনসেম্বল সংখ্যাগরিষ্ঠ ভোট দিয়ে দূর করুন!'
                : 'Watch 5 independent trees outvote corrupt noise through bagging!'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {anomalies.map((a) => (
            <button
              key={a.id}
              onClick={() => {
                setAnomalyType(a.id as typeof anomalyType);
                setOutcome(null);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition ${
                anomalyType === a.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>{a.icon}</span> <span className="hidden sm:inline">{isBn ? a.nameBn : a.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Anomaly Card & Council Visual */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="text-3xl">{currentAnomaly.icon}</div>
          <div>
            <h4 className="text-sm font-bold text-white">
              {isBn ? currentAnomaly.nameBn : currentAnomaly.name}
            </h4>
            <p className="text-xs text-slate-400">
              {isBn ? currentAnomaly.descBn : currentAnomaly.desc}
            </p>
          </div>
        </div>

        {/* 5 Tree Judge Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {votes.map((v, i) => (
            <motion.div
              key={i}
              animate={isVoting ? { scale: [1, 0.9, 1.05, 1], rotate: [0, -3, 3, 0] } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-2 text-center"
            >
              <div className="text-xs font-bold text-slate-300">Tree #{i + 1}</div>
              <div className="text-xl">🌲</div>
              <div
                className={`py-1 rounded text-[11px] font-mono font-black ${
                  outcome
                    ? v === currentAnomaly.correctVote
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {outcome ? v : 'Voting...'}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Outcome Box */}
        {outcome && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2 font-bold text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                {isBn
                  ? `ফলাফল: সংখ্যাগরিষ্ঠ মতামতে "${outcome.majority}" বিজয়ী! (${outcome.agreement}% একমত)`
                  : `Verdict: Majority Vote "${outcome.majority}" Wins! (${outcome.agreement}% agreement)`}
              </span>
            </div>
            <span className="font-mono text-emerald-400">+140 XP Awarded</span>
          </motion.div>
        )}
      </div>

      {/* Button to run vote */}
      <button
        onClick={handleRunVoting}
        disabled={isVoting}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-950/50 hover:scale-[1.01] active:scale-95 transition"
      >
        <Vote className="w-4 h-4" />
        <span>{isBn ? '🗳️ ৫টি গাছের সম্মিলিত ভোট আহ্বান করুন' : '🗳️ CONVENE THE 5-TREE COUNCIL'}</span>
      </button>
    </div>
  );
}
