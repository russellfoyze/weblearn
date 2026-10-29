'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Target, Zap, Clock, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';
import { soundEffects } from '@/utils/soundEffects';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';

export default function KnnRadarGame() {
  const { language } = useLanguage();
  const { addXP, addCoins, recordScore } = useGame();
  const isBn = language === 'bn';

  // State
  const [kValue, setKValue] = useState<number>(3);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [gameOutcome, setGameOutcome] = useState<'won' | 'lost' | null>(null);

  // Mystery query location
  const mysteryPoint = { x: 230, y: 135 };

  // Known radar signals
  const signals = [
    { id: 1, x: 140, y: 80, type: 'rogue', name: 'Rogue Drone #1' },
    { id: 2, x: 170, y: 110, type: 'rogue', name: 'Rogue Drone #2' },
    { id: 3, x: 190, y: 160, type: 'rogue', name: 'Rogue Drone #3' },
    { id: 4, x: 210, y: 90, type: 'friendly', name: 'Allied Probe #1' },
    { id: 5, x: 260, y: 115, type: 'friendly', name: 'Allied Probe #2' },
    { id: 6, x: 280, y: 155, type: 'friendly', name: 'Allied Probe #3' },
    { id: 7, x: 310, y: 95, type: 'friendly', name: 'Allied Probe #4' },
    { id: 8, x: 150, y: 190, type: 'rogue', name: 'Rogue Drone #4' },
  ];

  // Distances to mystery point
  const distances = signals.map((s) => {
    const d = Math.sqrt(Math.pow(s.x - mysteryPoint.x, 2) + Math.pow(s.y - mysteryPoint.y, 2));
    return { ...s, distance: d };
  });
  distances.sort((a, b) => a.distance - b.distance);
  const kNearest = distances.slice(0, kValue);

  const friendlyVotes = kNearest.filter((s) => s.type === 'friendly').length;
  const rogueVotes = kNearest.filter((s) => s.type === 'rogue').length;
  const radarPrediction = friendlyVotes > rogueVotes ? 'friendly' : 'rogue';

  // Radar circle radius
  const radarRadius = kNearest.length > 0 ? kNearest[kNearest.length - 1].distance : 50;

  // Countdown timer
  useEffect(() => {
    if (!isTimerActive || gameOutcome) return;
    if (timeLeft <= 0) {
      setGameOutcome('lost');
      soundEffects.playFail();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isTimerActive, gameOutcome]);

  const handleIdentify = (guessedType: 'friendly' | 'rogue') => {
    setIsTimerActive(false);

    if (guessedType === radarPrediction) {
      soundEffects.playLevelUp();
      setGameOutcome('won');
      const earnedScore = 800 + timeLeft * 50;
      setScore(earnedScore);
      addXP(150, 'KNN Mystery Radar Deciphered');
      addCoins(40);
      recordScore('knn_radar', earnedScore);
    } else {
      soundEffects.playFail();
      setGameOutcome('lost');
    }
  };

  const handleRestart = () => {
    setTimeLeft(15);
    setIsTimerActive(true);
    setGameOutcome(null);
  };

  return (
    <div className="space-y-4 select-none">
      {/* Header ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/80 border border-violet-500/30 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-500/20 text-violet-400 border border-violet-500/40 flex items-center justify-center font-bold">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white">
              {isBn ? 'মিশন: কেএনএন স্পেস রাডার ডিটেকটিভ' : 'Mission: KNN Space Radar Detective'}
            </div>
            <div className="text-[10px] text-slate-400">
              {isBn
                ? 'সময় শেষ হওয়ার আগে K নিকটতম প্রতিবেশীর দূরত্ব গুনে অজানা বস্তুর পরিচয় দিন!'
                : 'Measure Euclidean proximity to identify the unknown satellite before timeout!'}
            </div>
          </div>
        </div>

        {/* Live Timer & K Selector */}
        <div className="flex items-center gap-3 font-mono">
          <div
            className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 font-bold ${
              timeLeft <= 5
                ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
                : 'bg-slate-900 border-slate-800 text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}s</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-xs">
            <span className="text-slate-400 px-1.5">K =</span>
            {[1, 3, 5].map((k) => (
              <button
                key={k}
                onClick={() => setKValue(k)}
                className={`w-6 h-6 rounded font-bold transition ${
                  kValue === k ? 'bg-violet-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {k}
              </button>
            ))}
          </div>

          <button
            onClick={handleRestart}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Radar Canvas */}
      <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-2 sm:p-4 overflow-hidden">
        <svg viewBox="0 0 460 250" className="w-full h-auto select-none overflow-visible">
          {/* Radar Circles */}
          {[50, 100, 150].map((r) => (
            <circle
              key={r}
              cx="230"
              cy="125"
              r={r}
              fill="none"
              stroke="#1E293B"
              strokeDasharray="4 4"
            />
          ))}

          {/* Radar Sweep Line */}
          <line
            x1="230"
            y1="125"
            x2="380"
            y2="125"
            stroke="#8B5CF6"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            className="animate-spin"
            style={{ transformOrigin: '230px 125px', animationDuration: '4s' }}
          />

          {/* Expanding K-Nearest Ring */}
          <motion.circle
            cx={mysteryPoint.x}
            cy={mysteryPoint.y}
            r={radarRadius + 5}
            fill="#8B5CF6"
            fillOpacity="0.1"
            stroke="#8B5CF6"
            strokeWidth="2"
            strokeDasharray="4 2"
            animate={{ r: radarRadius + 5 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />

          {/* Connecting Distance Beams */}
          {kNearest.map((s) => (
            <line
              key={s.id}
              x1={mysteryPoint.x}
              y1={mysteryPoint.y}
              x2={s.x}
              y2={s.y}
              stroke={s.type === 'friendly' ? '#38BDF8' : '#F43F5E'}
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
          ))}

          {/* Known Signals */}
          {signals.map((s) => {
            const isNear = kNearest.some((k) => k.id === s.id);
            const isFriendly = s.type === 'friendly';
            return (
              <g key={s.id}>
                {isNear && (
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r="10"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    className="animate-ping"
                  />
                )}
                {isFriendly ? (
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r="6"
                    fill="#0EA5E9"
                    stroke="#FFFFFF"
                    strokeWidth={isNear ? '2' : '1'}
                  />
                ) : (
                  <polygon
                    points={`${s.x},${s.y - 7} ${s.x - 6},${s.y + 5} ${s.x + 6},${s.y + 5}`}
                    fill="#F43F5E"
                    stroke="#FFFFFF"
                    strokeWidth={isNear ? '2' : '1'}
                  />
                )}
              </g>
            );
          })}

          {/* The Mystery Object '?' */}
          <g transform={`translate(${mysteryPoint.x}, ${mysteryPoint.y})`}>
            <circle r="12" fill="#8B5CF6" stroke="#FFFFFF" strokeWidth="2.5" />
            <text
              x="0"
              y="4.5"
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="monospace"
            >
              ?
            </text>
          </g>
        </svg>

        {/* Game Finished Overlay */}
        <AnimatePresence>
          {gameOutcome && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-3 z-30"
            >
              <div className="text-4xl">{gameOutcome === 'won' ? '🎉' : '⚠️'}</div>
              <h4 className="text-lg font-bold text-white">
                {gameOutcome === 'won'
                  ? isBn
                    ? 'সঠিক সনাক্তকরণ সম্পন্ন!'
                    : 'IDENTITY VERIFIED!'
                  : isBn
                  ? 'সনাক্তকরণ ব্যর্থ হয়েছে!'
                  : 'IDENTIFICATION FAILED!'}
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                {gameOutcome === 'won'
                  ? `Deciphered via K=${kValue} neighbors • Score: +${score} pts`
                  : 'Time expired or misclassified signal.'}
              </p>
              <button
                onClick={handleRestart}
                className="px-5 py-2 rounded-xl bg-violet-500 hover:bg-violet-400 text-white font-bold text-xs shadow-lg transition"
              >
                {isBn ? 'আবার চেষ্টা করুন' : 'Try Again'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decision Buttons: Friendly vs Rogue */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleIdentify('friendly')}
          disabled={!isTimerActive || !!gameOutcome}
          className="py-4 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 font-bold text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
        >
          <span className="w-3 h-3 rounded-full bg-sky-400" />
          <span>{isBn ? 'মিত্র প্রোব (Allied Probe)' : 'Identify: ALLIED PROBE'}</span>
        </button>

        <button
          onClick={() => handleIdentify('rogue')}
          disabled={!isTimerActive || !!gameOutcome}
          className="py-4 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
        >
          <span className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-rose-400" />
          <span>{isBn ? 'শত্রু ড্রোন (Rogue Drone)' : 'Identify: ROGUE DRONE'}</span>
        </button>
      </div>
    </div>
  );
}
