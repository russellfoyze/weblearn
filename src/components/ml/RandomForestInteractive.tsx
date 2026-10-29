'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trees, Vote, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function RandomForestInteractive() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // State
  const [customerType, setCustomerType] = useState<'student_tech' | 'budget_shopper' | 'executive'>('student_tech');
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [voteTally, setVoteTally] = useState<{ yes: number; no: number }>({ yes: 4, no: 1 });

  // Simulate ensemble voting animation
  const handleSimulateVote = () => {
    setIsVoting(true);
    setTimeout(() => {
      if (customerType === 'student_tech') {
        setVoteTally({ yes: 4, no: 1 });
      } else if (customerType === 'budget_shopper') {
        setVoteTally({ yes: 1, no: 4 });
      } else {
        setVoteTally({ yes: 5, no: 0 });
      }
      setIsVoting(false);
    }, 600);
  };

  // 5 Ensemble Trees in the Forest
  const forestTrees = [
    {
      id: 1,
      name: 'Tree 1',
      features: ['Age ≤ 25', 'Student = Yes'],
      vote: customerType === 'budget_shopper' ? 'NO' : 'YES',
      confidence: '92%',
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    },
    {
      id: 2,
      name: 'Tree 2',
      features: ['Income > $40k', 'Credit Good'],
      vote: customerType === 'budget_shopper' ? 'NO' : 'YES',
      confidence: '85%',
      color: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300',
    },
    {
      id: 3,
      name: 'Tree 3',
      features: ['Prior Tech Purchases', 'Cart Count'],
      vote: customerType === 'student_tech' ? 'NO' : customerType === 'executive' ? 'YES' : 'NO',
      confidence: '78%',
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    },
    {
      id: 4,
      name: 'Tree 4',
      features: ['Device: Mac/Win', 'Session Duration'],
      vote: customerType === 'budget_shopper' ? 'NO' : 'YES',
      confidence: '88%',
      color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300',
    },
    {
      id: 5,
      name: 'Tree 5',
      features: ['Discount Code Clicked', 'Brand Loyalty'],
      vote: customerType === 'budget_shopper' ? 'YES' : 'YES',
      confidence: '91%',
      color: 'border-orange-500/40 bg-orange-500/10 text-orange-300',
    },
  ];

  const totalVotes = voteTally.yes + voteTally.no;
  const isMajorityBuy = voteTally.yes > voteTally.no;

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-6 space-y-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Trees className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              {isBn ? 'র‍্যান্ডম ফরেস্ট এনসেম্বল ভোটিং ল্যাব' : 'Random Forest Bagging & Voting Lab'}
            </h4>
            <p className="text-[11px] text-slate-400 font-mono">
              {isBn
                ? 'একাধিক গাছের সম্মিলিত ভোট (Majority Vote) কীভাবে একক ভুলের ঝুঁকি দূর করে'
                : 'Watch how multiple independent trees eliminate single-model bias'}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSimulateVote}
          disabled={isVoting}
          className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isVoting ? 'animate-spin' : ''}`} />
          <span>{isBn ? 'পুনরায় ভোট গণনা করুন' : 'Simulate Bagging Vote'}</span>
        </button>
      </div>

      {/* Customer Scenario Selector */}
      <div className="space-y-2">
        <span className="text-xs text-slate-400 font-mono">
          {isBn ? 'পরীক্ষামূলক গ্রাহক প্রোফাইল নির্বাচন করুন:' : 'Select Sample Test Customer Profile:'}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => {
              setCustomerType('student_tech');
              setVoteTally({ yes: 4, no: 1 });
            }}
            className={`p-3 rounded-xl border text-left transition ${
              customerType === 'student_tech'
                ? 'bg-amber-500/15 border-amber-500/50 ring-1 ring-amber-500/40'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-xs font-bold text-amber-300">
              {isBn ? '১. টেক স্টুডেন্ট (বয়স ২২)' : '1. CS Student (Age 22)'}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {isBn ? 'ছাত্র = হ্যাঁ, বাজেট = স্টুডেন্ট লোন' : 'Student=Yes, Needs Laptop'}
            </div>
          </button>

          <button
            onClick={() => {
              setCustomerType('budget_shopper');
              setVoteTally({ yes: 1, no: 4 });
            }}
            className={`p-3 rounded-xl border text-left transition ${
              customerType === 'budget_shopper'
                ? 'bg-amber-500/15 border-amber-500/50 ring-1 ring-amber-500/40'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-xs font-bold text-amber-300">
              {isBn ? '২. সাধারণ ব্রাউজার (বয়স ৪৫)' : '2. Casual Browser (Age 45)'}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {isBn ? 'শুধু দেখতে এসেছে, কেনার ইচ্ছা নেই' : 'Student=No, Low Buying Intent'}
            </div>
          </button>

          <button
            onClick={() => {
              setCustomerType('executive');
              setVoteTally({ yes: 5, no: 0 });
            }}
            className={`p-3 rounded-xl border text-left transition ${
              customerType === 'executive'
                ? 'bg-amber-500/15 border-amber-500/50 ring-1 ring-amber-500/40'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-xs font-bold text-amber-300">
              {isBn ? '৩. কর্পোরেট এক্সিকিউটিভ (বয়স ৩৬)' : '3. Corporate Pro (Age 36)'}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {isBn ? 'উচ্চ আয়, হাই-এন্ড গ্যাজেট ক্রেতা' : 'High Income, High Loyalty'}
            </div>
          </button>
        </div>
      </div>

      {/* The 5 Forest Trees Display */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>{isBn ? '৫টি স্বাধীন ডিসিশন ট্রির রায়:' : 'Independent Decision Tree Votes:'}</span>
          <span className="text-amber-400">Feature Randomness Active</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {forestTrees.map((tree) => {
            const isBuy = tree.vote === 'YES';
            return (
              <motion.div
                key={tree.id}
                animate={isVoting ? { scale: [1, 0.95, 1.03, 1] } : {}}
                transition={{ duration: 0.4, delay: tree.id * 0.08 }}
                className={`p-3 rounded-xl border ${tree.color} flex flex-col justify-between space-y-2`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>{tree.name}</span>
                    <span className="text-[9px] font-mono text-slate-400">{tree.confidence}</span>
                  </div>
                  <div className="text-[9px] text-slate-400 font-mono mt-1 space-y-0.5">
                    {tree.features.map((f, i) => (
                      <div key={i} className="truncate">• {f}</div>
                    ))}
                  </div>
                </div>

                {/* Vote badge */}
                <div
                  className={`py-1 text-center rounded text-xs font-extrabold ${
                    isBuy
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {isBuy ? (isBn ? 'কিনবে (BUY)' : 'BUY (Yes)') : (isBn ? 'কিনবে না (NO)' : 'NO BUY')}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Aggregated Majority Vote Box */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2 text-white">
            <Vote className="w-4 h-4 text-amber-400" />
            <span>
              {isBn ? 'চূড়ান্ত সংখ্যাগরিষ্ঠ রায় (Majority Voting):' : 'Final Ensemble Consensus:'}
            </span>
          </div>
          <span className="font-mono text-amber-400">
            {voteTally.yes} BUY vs {voteTally.no} NO
          </span>
        </div>

        {/* Voting Bar */}
        <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
          <motion.div
            className="bg-emerald-500 h-full"
            initial={false}
            animate={{ width: `${(voteTally.yes / totalVotes) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="bg-rose-500 h-full"
            initial={false}
            animate={{ width: `${(voteTally.no / totalVotes) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Result Verdict Ribbon */}
        <div
          className={`p-2.5 rounded-lg border flex items-center justify-between text-xs font-bold ${
            isMajorityBuy
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}
        >
          <span>
            {isMajorityBuy
              ? isBn
                ? `ফলাফল: গ্রাহক ল্যাপটপটি কিনবেন! (${Math.round((voteTally.yes / totalVotes) * 100)}% একমত)`
                : `Prediction: Customer WILL BUY LAPTOP! (${Math.round((voteTally.yes / totalVotes) * 100)}% agreement)`
              : isBn
              ? `ফলাফল: গ্রাহক কিনবেন না (${Math.round((voteTally.no / totalVotes) * 100)}% না ভোট)`
              : `Prediction: Customer Will NOT Buy (${Math.round((voteTally.no / totalVotes) * 100)}% voted No)`}
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            {isBn ? 'ভুলের বিরুদ্ধে সুরক্ষিত' : 'Noise-Proofed by Ensemble'}
          </span>
        </div>
      </div>
    </div>
  );
}
