'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Shield, Sparkles, Sword, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import { soundEffects } from '@/utils/soundEffects';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';

interface Encounter {
  id: number;
  monsterName: string;
  monsterNameBn: string;
  monsterIcon: string;
  lore: string;
  loreBn: string;
  attributes: { label: string; value: string }[];
  steps: {
    question: string;
    questionBn: string;
    options: {
      text: string;
      textBn: string;
      isCorrect: boolean;
      feedback: string;
      feedbackBn: string;
    }[];
  }[];
}

export default function DecisionMazeGame() {
  const { language } = useLanguage();
  const { addXP, addCoins, recordScore } = useGame();
  const isBn = language === 'bn';

  const [currentEncounterIdx, setCurrentEncounterIdx] = useState<number>(0);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [defeatedMonsters, setDefeatedMonsters] = useState<number[]>([]);
  const [lastFeedback, setLastFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [dungeonClear, setDungeonClear] = useState<boolean>(false);

  const encounters: Encounter[] = [
    {
      id: 1,
      monsterName: 'Storm Harpy of Chaos',
      monsterNameBn: 'ঝড়ো দানব (স্টর্ম হার্পি)',
      monsterIcon: '🌪️',
      lore: 'The sky is black, torrential rain pours down, and wind howls at 60 km/h. Will the stadium host the match?',
      loreBn: 'আকাশ মেঘলা ও প্রবল বৃষ্টি, বাতাসের গতিবেগ ৬০ কিমি/ঘন্টা। স্টেডিয়ামে খেলা কি আয়োজন করা যাবে?',
      attributes: [
        { label: 'Outlook', value: 'Rainy' },
        { label: 'Wind', value: 'Strong (60 km/h)' },
        { label: 'Humidity', value: 'Normal' },
      ],
      steps: [
        {
          question: 'Which root feature split cuts through the storm with highest information gain?',
          questionBn: 'কোন রুট ফিচারটি দিয়ে ভাগ করলে সবচেয়ে দ্রুত সিদ্ধান্ত নেওয়া যাবে?',
          options: [
            {
              text: 'Split by Outlook (Sunny / Overcast / Rain)',
              textBn: 'আকাশ (Outlook) দিয়ে ভাগ করুন',
              isCorrect: true,
              feedback: 'Perfect! Outlook separates Overcast automatically.',
              feedbackBn: 'চমৎকার! আকাশ দেখে মেঘলা ও বৃষ্টির শাখা আলাদা করা যায়।',
            },
            {
              text: 'Split by Humidity only',
              textBn: 'শুধুমাত্র আর্দ্রতা (Humidity) দিয়ে ভাগ করুন',
              isCorrect: false,
              feedback: 'Low information gain on rainy days!',
              feedbackBn: 'বৃষ্টির দিনে আর্দ্রতা দিয়ে সঠিক রায় দেওয়া যায় না!',
            },
          ],
        },
        {
          question: 'Under the Rainy branch, what is the decisive condition for safety?',
          questionBn: 'বৃষ্টির শাখায় পৌঁছানোর পর চূড়ান্ত নিরাপত্তা শর্ত কী?',
          options: [
            {
              text: 'Is Wind Strong? If Strong ➔ NO PLAY (Cancel)',
              textBn: 'বাতাস কি প্রচণ্ড (Strong)? হ্যাঁ হলে খেলা বাতিল (NO PLAY)',
              isCorrect: true,
              feedback: 'Monster banished! Match safely evacuated.',
              feedbackBn: 'দানব পরাজিত! খেলা বাতিল করে সবাই সুরক্ষিত।',
            },
            {
              text: 'Play anyway regardless of wind storms',
              textBn: 'ঝড় যাই হোক খেলা চালু রাখুন',
              isCorrect: false,
              feedback: 'Lightning strike! Catastrophic misclassification.',
              feedbackBn: 'বিপদ! ভুল সিদ্ধান্ত নেওয়া হয়েছে।',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      monsterName: 'Default Goblin Borrower',
      monsterNameBn: 'ঋণখেলাপি অপশক্তি (লোন গবলিন)',
      monsterIcon: '👺',
      lore: 'A mysterious applicant asks for a $100,000 loan. Income: $30,000 (Low), Credit Score: 590 (Poor).',
      loreBn: 'এক আবেদনকারী ১ লাখ টাকার ঋণ চান। বার্ষিক আয়: ৩০ হাজার ডলার (কম), ক্রেডিট স্কোর: ৫৯০ (ঝুঁকিপূর্ণ)।',
      attributes: [
        { label: 'Annual Income', value: '$30,000 (≤ 4.5L)' },
        { label: 'Credit Score', value: '590 (≤ 620)' },
      ],
      steps: [
        {
          question: 'What is the primary bank risk threshold split?',
          questionBn: 'ব্যাংক লোন যাচাইয়ের প্রথম প্রধান শর্ত কী?',
          options: [
            {
              text: 'Check if Income ≤ 4.5 Lakhs ($45,000)',
              textBn: 'আয় কি ৪.৫ লাখের কম কি না পরীক্ষা করুন',
              isCorrect: true,
              feedback: 'Income is indeed ≤ 4.5L! Heading to left risk branch.',
              feedbackBn: 'আয় সত্যিই ৪.৫ লাখের কম! ঝুঁকিপূর্ণ শাখায় যাওয়া হলো।',
            },
            {
              text: 'Check applicant shoe size',
              textBn: 'আবেদনকারীর জুতার মাপ পরীক্ষা করুন',
              isCorrect: false,
              feedback: 'Irrelevant noise feature with zero entropy gain!',
              feedbackBn: 'অপ্রাসঙ্গিক ফিচার, কোনো লাভ নেই!',
            },
          ],
        },
        {
          question: 'Income is low. What is the secondary credit safety gate?',
          questionBn: 'আয় কম হওয়ায় দ্বিতীয় ক্রেডিট স্কোর শর্তটি কী হবে?',
          options: [
            {
              text: 'Is Credit Score ≤ 620? ➔ REJECT LOAN (No)',
              textBn: 'ক্রেডিট স্কোর কি ≤ ৬২০? হ্যাঁ হলে লোন বাতিল (REJECT)',
              isCorrect: true,
              feedback: 'Critical audit passed! The bank saved from bad debt.',
              feedbackBn: 'সঠিক সিদ্ধান্ত! ব্যাংক ঋণখেলাপির হাত থেকে বাঁচল।',
            },
            {
              text: 'Approve without credit check',
              textBn: 'ক্রেডিট স্কোর না দেখেই লোন মঞ্জুর করুন',
              isCorrect: false,
              feedback: 'Default alert! The bank lost $100k.',
              feedbackBn: 'ব্যাংকের বিশাল ক্ষতি হলো!',
            },
          ],
        },
      ],
    },
  ];

  const currentEncounter = encounters[currentEncounterIdx];
  const currentStep = currentEncounter ? currentEncounter.steps[currentStepIdx] : null;

  const handleOptionSelect = (isCorrect: boolean, feedback: string, feedbackBn: string) => {
    if (isCorrect) {
      soundEffects.playCombo();
      setScore((prev) => prev + 150);
      setLastFeedback({ isCorrect: true, text: isBn ? feedbackBn : feedback });

      setTimeout(() => {
        setLastFeedback(null);
        if (currentStepIdx + 1 < currentEncounter.steps.length) {
          setCurrentStepIdx((prev) => prev + 1);
        } else {
          // Monster defeated!
          soundEffects.playComplete();
          const nextDefeated = [...defeatedMonsters, currentEncounter.id];
          setDefeatedMonsters(nextDefeated);

          if (currentEncounterIdx + 1 < encounters.length) {
            setCurrentEncounterIdx((prev) => prev + 1);
            setCurrentStepIdx(0);
          } else {
            // Dungeon cleared!
            setDungeonClear(true);
            soundEffects.playLevelUp();
            addXP(180, 'Cleared Decision Tree Dungeon');
            addCoins(60);
            recordScore('decision_maze', score + 300);
          }
        }
      }, 700);
    } else {
      soundEffects.playFail();
      setLastFeedback({ isCorrect: false, text: isBn ? feedbackBn : feedback });
      setTimeout(() => setLastFeedback(null), 1200);
    }
  };

  const handleRestart = () => {
    setCurrentEncounterIdx(0);
    setCurrentStepIdx(0);
    setScore(0);
    setDefeatedMonsters([]);
    setDungeonClear(false);
    setLastFeedback(null);
  };

  return (
    <div className="space-y-4 select-none">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white">
              {isBn ? 'মিশন: ডিসিশন ট্রি মেজ রানার' : 'Mission: Decision Tree Dungeon Runner'}
            </div>
            <div className="text-[10px] text-slate-400">
              {isBn
                ? 'সঠিক শাখা বাছাই করে দানবগুলোকে পরাজিত করুন!'
                : 'Select the optimal Gini splits to vanquish mystery dungeon bosses!'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400">
            Dungeon Floor: <strong>{currentEncounterIdx + 1}/{encounters.length}</strong>
          </div>
          <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-white">
            Score: <strong className="text-amber-400">{score}</strong>
          </div>
          <button
            onClick={handleRestart}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Dungeon Stage */}
      <div className="relative p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6 overflow-hidden">
        {!dungeonClear ? (
          <>
            {/* Boss Presentation */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 border-b border-slate-800 pb-5">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-purple-500/20 to-slate-900 border-2 border-emerald-500/40 flex items-center justify-center text-4xl shadow-xl shadow-emerald-950/40"
              >
                {currentEncounter.monsterIcon}
              </motion.div>

              <div className="space-y-1.5 text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h4 className="text-base font-bold text-white">
                    {isBn ? currentEncounter.monsterNameBn : currentEncounter.monsterName}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-emerald-400">
                    Floor {currentEncounterIdx + 1} Boss
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isBn ? currentEncounter.loreBn : currentEncounter.lore}
                </p>

                {/* Attribute tags */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 font-mono text-[11px]">
                  {currentEncounter.attributes.map((attr, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-slate-300"
                    >
                      <strong className="text-emerald-400">{attr.label}:</strong> {attr.value}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Decision Branch Question */}
            {currentStep && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                  <Sword className="w-4 h-4 text-emerald-400" />
                  <span>{isBn ? currentStep.questionBn : currentStep.question}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentStep.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionSelect(opt.isCorrect, opt.feedback, opt.feedbackBn)}
                      className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 text-left transition text-xs space-y-1 group active:scale-[0.98]"
                    >
                      <div className="font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{isBn ? opt.textBn : opt.text}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback Ribbon */}
            <AnimatePresence>
              {lastFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-bold ${
                    lastFeedback.isCorrect
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                  }`}
                >
                  {lastFeedback.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  )}
                  <span>{lastFeedback.text}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          /* Victory Dungeon Clear Screen */
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-300 border-2 border-emerald-400 flex items-center justify-center text-3xl mx-auto shadow-2xl animate-bounce">
              🏆
            </div>
            <div>
              <h4 className="text-xl font-black text-white">
                {isBn ? 'ডিসিশন ট্রি ডানজন সম্পন্ন!' : 'DECISION TREE DUNGEON CONQUERED!'}
              </h4>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Total Score: <strong className="text-emerald-400">{score}</strong> • Earned +180 XP & 60 Coins!
              </p>
            </div>
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition"
            >
              {isBn ? 'পুনরায় মেজ খেলুন' : 'Replay Dungeon'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
