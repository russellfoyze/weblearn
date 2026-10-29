'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, CheckCircle2, Award, Zap, Sparkles } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { useLanguage } from '@/context/LanguageContext';

export default function QuestModal() {
  const { isQuestDrawerOpen, setQuestDrawerOpen, quests, achievements, claimQuest } = useGame();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  if (!isQuestDrawerOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xl select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-amber-500/30 p-5 sm:p-7 space-y-6 shadow-2xl"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-xl shadow-lg">
                🏆
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {isBn ? 'ডেইলি কোয়েস্ট ও ট্রফি রুম' : 'Daily Quests & Trophy Room'}
                </h3>
                <p className="text-[11px] text-slate-400 font-mono">
                  {isBn
                    ? 'মিশন সম্পন্ন করে এক্সপি এবং কয়েন সংগ্রহ করুন'
                    : 'Complete daily missions to claim XP & level up your rank'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setQuestDrawerOpen(false)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quests Section */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
              {isBn ? '🎯 সক্রিয় মিশনসমূহ (Active Quests):' : '🎯 Active Quests:'}
            </div>

            <div className="space-y-2.5">
              {quests.map((q) => (
                <div
                  key={q.id}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 max-w-md">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>{isBn ? q.titleBn : q.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                        +{q.xpReward} XP • 🪙 {q.coinReward}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {isBn ? q.descBn : q.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => claimQuest(q.id)}
                    disabled={q.completed}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      q.completed
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                        : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-md shadow-amber-950/40 hover:scale-105 active:scale-95'
                    }`}
                  >
                    {q.completed ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isBn ? 'সংগ্রহীত (Claimed)' : 'Claimed'}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isBn ? 'পুরস্কার নিন' : 'Claim Reward'}</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Trophy Room / Achievements Section */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-purple-300 uppercase tracking-wider font-mono">
              {isBn ? '🏅 আনলকড ট্রফিসমূহ (Trophy Badges):' : '🏅 Unlocked Trophies:'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="p-3 rounded-2xl bg-slate-950 border border-purple-500/30 flex items-center gap-3 text-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xl flex-shrink-0">
                    {ach.icon}
                  </div>
                  <div>
                    <div className="font-bold text-white">
                      {isBn ? ach.nameBn : ach.name}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                      {isBn ? ach.descBn : ach.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
