'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, ShieldCheck, Mail, Zap, RotateCcw, Sliders, Flame } from 'lucide-react';
import { soundEffects } from '@/utils/soundEffects';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';

interface EmailPacket {
  id: number;
  subject: string;
  subjectBn: string;
  links: number;
  hasSpamWord: boolean;
  isRealSpam: boolean;
}

export default function SpamDefenderGame() {
  const { language } = useLanguage();
  const { addXP, addCoins, recordScore } = useGame();
  const isBn = language === 'bn';

  // Game state
  const [threshold, setThreshold] = useState<number>(0.5);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeEmailIdx, setActiveEmailIdx] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [shields, setShields] = useState<number>(3);
  const [clearedPackets, setClearedPackets] = useState<{ id: number; result: 'correct' | 'wrong' }[]>([]);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  // Email wave
  const emailQueue: EmailPacket[] = [
    {
      id: 1,
      subject: 'WIN $1,000,000 CASH NOW! CLICK HERE',
      subjectBn: '১০ লাখ টাকা ক্যাশ জিতুন! এখনই ক্লিক করুন',
      links: 4,
      hasSpamWord: true,
      isRealSpam: true,
    },
    {
      id: 2,
      subject: 'Weekly Team Sprint Review & Meeting Link',
      subjectBn: 'সাপ্তাহিক টিম স্প্রিন্ট মিটিং ও আলোচনার নোটস',
      links: 1,
      hasSpamWord: false,
      isRealSpam: false,
    },
    {
      id: 3,
      subject: 'URGENT: Free Crypto Giveaway for First 100 Users',
      subjectBn: 'জরুরি: প্রথম ১০০ জনের জন্য ফ্রি ক্রিপ্টো বোনাস',
      links: 3,
      hasSpamWord: true,
      isRealSpam: true,
    },
    {
      id: 4,
      subject: 'Project Architecture Blueprint Documentation (PDF)',
      subjectBn: 'প্রজেক্ট আর্কিটেকচার ব্লুপ্রিন্ট ডকুমেন্টেশন',
      links: 0,
      hasSpamWord: false,
      isRealSpam: false,
    },
    {
      id: 5,
      subject: 'Claim 100% Free Gift Card Voucher Today',
      subjectBn: '১০০% ফ্রি গিফট কার্ড কুপন এখনই ক্লেইম করুন',
      links: 2,
      hasSpamWord: true,
      isRealSpam: true,
    },
  ];

  // Sigmoid calculation
  const calculateProbability = (packet: EmailPacket) => {
    const z = -2.2 + 1.2 * packet.links + (packet.hasSpamWord ? 2.6 : 0);
    return 1 / (1 + Math.exp(-z));
  };

  const handleStartDefense = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setClearedPackets([]);
    setGameFinished(false);
    setScore(0);
    setCombo(0);
    setShields(3);

    let currentScore = 0;
    let currentCombo = 0;
    let currentShields = 3;
    const history: { id: number; result: 'correct' | 'wrong' }[] = [];

    for (let i = 0; i < emailQueue.length; i++) {
      setActiveEmailIdx(i);
      const packet = emailQueue[i];
      const prob = calculateProbability(packet);
      const isPredictedSpam = prob >= threshold;

      // Small delay for animation
      await new Promise((r) => setTimeout(r, 800));

      const isCorrect = isPredictedSpam === packet.isRealSpam;

      if (isCorrect) {
        currentCombo += 1;
        currentScore += 200 + currentCombo * 50;
        soundEffects.playCombo();
        history.push({ id: packet.id, result: 'correct' });
      } else {
        currentCombo = 0;
        currentShields = Math.max(0, currentShields - 1);
        soundEffects.playFail();
        history.push({ id: packet.id, result: 'wrong' });
      }

      setScore(currentScore);
      setCombo(currentCombo);
      setShields(currentShields);
      setClearedPackets([...history]);

      await new Promise((r) => setTimeout(r, 400));
    }

    setActiveEmailIdx(null);
    setIsRunning(false);
    setGameFinished(true);

    const accuracy = history.filter((h) => h.result === 'correct').length / history.length;
    if (accuracy >= 0.8) {
      soundEffects.playLevelUp();
      addXP(160, 'Sigmoid Spam Defense Champion');
      addCoins(50);
      recordScore('spam_defender', currentScore);
    } else {
      soundEffects.playSuccess();
      addXP(60, 'Spam Defense Attempt');
      addCoins(15);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setActiveEmailIdx(null);
    setGameFinished(false);
    setScore(0);
    setCombo(0);
    setShields(3);
    setClearedPackets([]);
  };

  return (
    <div className="space-y-4 select-none">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/80 border border-sky-500/30 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/40 flex items-center justify-center font-bold">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white">
              {isBn ? 'মিশন: সিগময়েড স্প্যাম টারেট ডিফেন্স' : 'Mission: Sigmoid Spam Turret Defense'}
            </div>
            <div className="text-[10px] text-slate-400">
              {isBn
                ? 'থ্রেশহোল্ড সেট করুন এবং সার্ভারে ইনকামিং স্প্যাম ধ্বংস করুন!'
                : 'Calibrate the decision cutoff to incinerate spam before it enters the inbox!'}
            </div>
          </div>
        </div>

        {/* Live HUD: Shields, Score, Combo */}
        <div className="flex items-center gap-3 font-mono">
          <div className="flex items-center gap-1 text-rose-400">
            <span>Shields:</span>
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={i < shields ? 'text-rose-500' : 'text-slate-700'}>
                ❤️
              </span>
            ))}
          </div>

          <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-sky-300">
            Score: <strong className="text-white">{score}</strong>
          </div>

          {combo > 1 && (
            <div className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold flex items-center gap-1 animate-pulse">
              <Flame className="w-3 h-3 text-amber-400" />
              <span>{combo}x Combo!</span>
            </div>
          )}

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Conveyor Belt Queue Display */}
      <div className="space-y-2 p-3 sm:p-4 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="text-xs font-mono text-slate-400 flex items-center justify-between pb-1">
          <span>{isBn ? 'ইনকামিং ইমেইল কিউ (৫টি প্যাকেট):' : 'Incoming Security Packet Queue (5):'}</span>
          <span>Cutoff: <strong className="text-sky-400">{threshold.toFixed(2)}</strong></span>
        </div>

        <div className="space-y-2">
          {emailQueue.map((packet, idx) => {
            const isActive = activeEmailIdx === idx;
            const historyItem = clearedPackets.find((h) => h.id === packet.id);
            const prob = calculateProbability(packet);
            const isPredictedSpam = prob >= threshold;

            return (
              <motion.div
                key={packet.id}
                animate={isActive ? { scale: [1, 1.02, 1], borderColor: '#0EA5E9' } : {}}
                className={`p-3 rounded-xl border transition flex flex-wrap items-center justify-between gap-3 text-xs ${
                  historyItem
                    ? historyItem.result === 'correct'
                      ? 'bg-emerald-950/20 border-emerald-500/40 opacity-90'
                      : 'bg-rose-950/20 border-rose-500/40 opacity-90'
                    : isActive
                    ? 'bg-sky-950/40 border-sky-400 ring-2 ring-sky-500/30'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-mono text-[11px] text-slate-400 font-bold">
                    #{packet.id}
                  </span>
                  <div>
                    <div className="font-bold text-white">
                      {isBn ? packet.subjectBn : packet.subject}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                      <span>Links: {packet.links}</span>
                      <span>•</span>
                      <span>Trigger: {packet.hasSpamWord ? 'YES' : 'NONE'}</span>
                    </div>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex items-center gap-2 font-mono">
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-sky-400 text-[10px]">
                    σ(z): {(prob * 100).toFixed(0)}%
                  </span>

                  {historyItem ? (
                    historyItem.result === 'correct' ? (
                      <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{packet.isRealSpam ? 'SPAM ZAPPED' : 'INBOX SAVED'}</span>
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded bg-rose-500/20 text-rose-300 font-bold flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>{packet.isRealSpam ? 'SPAM LEAKED' : 'FALSE POSITIVE'}</span>
                      </span>
                    )
                  ) : (
                    <span className="text-slate-500 text-[11px]">Pending...</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Threshold Slider & Start Defense Trigger */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-8 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-300 flex items-center gap-1.5 font-bold">
              <Sliders className="w-3.5 h-3.5 text-sky-400" />
              {isBn ? 'সিগময়েড কাট-অফ থ্রেশহোল্ড:' : 'Decision Threshold Cutoff:'}
            </span>
            <span className="text-sky-400 font-bold">{threshold.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="0.8"
            step="0.05"
            disabled={isRunning}
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            className="w-full accent-sky-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer disabled:opacity-50"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Aggressive (0.20)</span>
            <span>Balanced (0.50)</span>
            <span>Permissive (0.80)</span>
          </div>
        </div>

        {/* Start Defense Button */}
        <div className="sm:col-span-4">
          <button
            onClick={handleStartDefense}
            disabled={isRunning}
            className="w-full py-5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-sky-950/50 hover:scale-[1.02] active:scale-95 transition disabled:opacity-50"
          >
            <Zap className={`w-4 h-4 ${isRunning ? 'animate-bounce' : ''}`} />
            <span>
              {isRunning
                ? isBn
                  ? 'টার্রেট ডিফেন্স চলছে...'
                  : 'DEFENDING INBOX...'
                : isBn
                ? '🛡️ স্প্যাম ডিফেন্স চালু করুন!'
                : '🛡️ ACTIVATE DEFENSE!'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
