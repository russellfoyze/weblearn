'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Sun, Cloud, CloudRain, CheckCircle2, XCircle, DollarSign } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function DecisionTreeInteractive() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // Toggle between Weather Tree and Loan Approval Tree
  const [treeMode, setTreeMode] = useState<'weather' | 'loan'>('weather');

  // Weather Tree state
  const [outlook, setOutlook] = useState<'sunny' | 'overcast' | 'rainy'>('sunny');
  const [humidity, setHumidity] = useState<'high' | 'normal'>('normal');
  const [wind, setWind] = useState<'strong' | 'weak'>('weak');

  // Loan Tree state
  const [income, setIncome] = useState<number>(5.5);
  const [creditScore, setCreditScore] = useState<number>(720);

  // Determine Weather outcome
  const getWeatherOutcome = () => {
    if (outlook === 'overcast') return { play: true, reason: 'Overcast skies always allow play!' };
    if (outlook === 'sunny') {
      if (humidity === 'normal') return { play: true, reason: 'Sunny & normal humidity = Great weather!' };
      return { play: false, reason: 'Too hot and humid for outdoor sports.' };
    }
    // rainy
    if (wind === 'weak') return { play: true, reason: 'Gentle drizzle with light wind = Playable!' };
    return { play: false, reason: 'Heavy rainstorm with strong wind.' };
  };

  // Determine Loan outcome
  const getLoanOutcome = () => {
    if (income <= 4.5) {
      if (creditScore <= 620) {
        return { approved: false, rule: 'Income ≤ 4.5L & Credit ≤ 620' };
      }
      return { approved: true, rule: 'Income ≤ 4.5L & Credit > 620' };
    } else {
      if (creditScore <= 700) {
        return { approved: false, rule: 'Income > 4.5L but Credit ≤ 700' };
      }
      return { approved: true, rule: 'Income > 4.5L & Credit > 700' };
    }
  };

  const weatherOutcome = getWeatherOutcome();
  const loanOutcome = getLoanOutcome();

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-6 space-y-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              {isBn ? 'ইন্টারেক্টিভ ডিসিশন ট্রি ট্রাভার্সাল' : 'Interactive Decision Tree Explorer'}
            </h4>
            <p className="text-[11px] text-slate-400 font-mono">
              {isBn
                ? 'ফিচার নির্বাচন করুন এবং দেখুন কীভাবে ডেটা শাখা বেয়ে চূড়ান্ত সিদ্ধান্তে পৌঁছায়'
                : 'Select conditions and watch the decision path light up through the tree'}
            </p>
          </div>
        </div>

        {/* Tree Mode Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setTreeMode('weather')}
            className={`px-3 py-1 rounded-lg transition ${
              treeMode === 'weather'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isBn ? '১. আবহাওয়া ট্রি' : '1. Weather Play Tree'}
          </button>
          <button
            onClick={() => setTreeMode('loan')}
            className={`px-3 py-1 rounded-lg transition ${
              treeMode === 'loan'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isBn ? '২. ব্যাংক লোন ট্রি' : '2. Bank Loan Tree'}
          </button>
        </div>
      </div>

      {/* WEATHER TREE MODE */}
      {treeMode === 'weather' && (
        <div className="space-y-6">
          {/* Interactive Condition Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Outlook selector */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <label className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>{isBn ? 'আকাশ / Outlook:' : 'Outlook (Root):'}</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {(['sunny', 'overcast', 'rainy'] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setOutlook(opt)}
                    className={`py-1.5 rounded-lg capitalize font-medium transition ${
                      outlook === opt
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {opt === 'sunny' ? (isBn ? 'রোদ' : 'Sunny') : opt === 'overcast' ? (isBn ? 'মেঘলা' : 'Overcast') : (isBn ? 'বৃষ্টি' : 'Rainy')}
                  </button>
                ))}
              </div>
            </div>

            {/* Humidity selector (if sunny) */}
            <div
              className={`p-3 rounded-xl border space-y-2 transition ${
                outlook === 'sunny'
                  ? 'bg-slate-950/60 border-emerald-500/40'
                  : 'bg-slate-950/20 border-slate-800/40 opacity-40'
              }`}
            >
              <label className="text-xs text-slate-400 font-mono">
                {isBn ? 'আর্দ্রতা / Humidity (যদি রোদ হয়):' : 'Humidity (if Sunny):'}
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {(['high', 'normal'] as const).map((opt) => (
                  <button
                    key={opt}
                    disabled={outlook !== 'sunny'}
                    onClick={() => setHumidity(opt)}
                    className={`py-1.5 rounded-lg capitalize font-medium transition ${
                      humidity === opt && outlook === 'sunny'
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {opt === 'high' ? (isBn ? 'অতিরিক্ত (High)' : 'High') : (isBn ? 'স্বাভাবিক (Normal)' : 'Normal')}
                  </button>
                ))}
              </div>
            </div>

            {/* Wind selector (if rainy) */}
            <div
              className={`p-3 rounded-xl border space-y-2 transition ${
                outlook === 'rainy'
                  ? 'bg-slate-950/60 border-emerald-500/40'
                  : 'bg-slate-950/20 border-slate-800/40 opacity-40'
              }`}
            >
              <label className="text-xs text-slate-400 font-mono">
                {isBn ? 'বাতাস / Wind (যদি বৃষ্টি হয়):' : 'Wind (if Rainy):'}
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {(['strong', 'weak'] as const).map((opt) => (
                  <button
                    key={opt}
                    disabled={outlook !== 'rainy'}
                    onClick={() => setWind(opt)}
                    className={`py-1.5 rounded-lg capitalize font-medium transition ${
                      wind === opt && outlook === 'rainy'
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {opt === 'strong' ? (isBn ? 'ঝড়ো (Strong)' : 'Strong') : (isBn ? 'মৃদু (Weak)' : 'Weak')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Graphical Tree Visualization */}
          <div className="p-4 sm:p-6 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col items-center select-none overflow-x-auto">
            {/* Level 0: Root Node */}
            <div className="flex flex-col items-center">
              <div className="px-5 py-2 rounded-xl bg-purple-500/20 border border-purple-500/50 text-purple-200 text-xs font-bold shadow-lg shadow-purple-950/30 flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-purple-300" />
                <span>{isBn ? 'আকাশ কেমন? (Outlook?)' : 'Outlook? [Root Node]'}</span>
              </div>

              {/* Connecting branches to level 1 */}
              <div className="w-64 h-6 border-b-2 border-slate-700 relative">
                <div className="absolute left-0 bottom-0 w-0.5 h-6 bg-slate-700" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0.5 h-6 bg-slate-700" />
                <div className="absolute right-0 bottom-0 w-0.5 h-6 bg-slate-700" />
              </div>
            </div>

            {/* Level 1: Three Branches (Sunny, Overcast, Rainy) */}
            <div className="grid grid-cols-3 gap-6 sm:gap-12 pt-2 text-center w-full max-w-xl">
              {/* Branch 1: Sunny */}
              <div className="flex flex-col items-center space-y-2">
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    outlook === 'sunny'
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                      : 'text-slate-400'
                  }`}
                >
                  {isBn ? 'রোদ (Sunny)' : 'Sunny'}
                </span>
                <div
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium ${
                    outlook === 'sunny'
                      ? 'bg-sky-500/20 border-sky-500/50 text-sky-200 ring-2 ring-sky-500/30'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {isBn ? 'আর্দ্রতা? (Humidity?)' : 'Humidity?'}
                </div>

                {/* Sub branches under sunny */}
                <div className="w-24 h-4 border-b border-slate-700 relative mt-1">
                  <div className="absolute left-0 bottom-0 w-px h-4 bg-slate-700" />
                  <div className="absolute right-0 bottom-0 w-px h-4 bg-slate-700" />
                </div>
                <div className="flex justify-between w-28 text-[9px] font-mono pt-0.5">
                  <span className={humidity === 'high' && outlook === 'sunny' ? 'text-rose-400 font-bold' : 'text-slate-500'}>
                    High
                  </span>
                  <span className={humidity === 'normal' && outlook === 'sunny' ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                    Normal
                  </span>
                </div>
                <div className="flex justify-between w-28 pt-1">
                  <div
                    className={`px-2 py-1 rounded text-[10px] font-bold ${
                      outlook === 'sunny' && humidity === 'high'
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-950/50'
                        : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}
                  >
                    No (Play)
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-[10px] font-bold ${
                      outlook === 'sunny' && humidity === 'normal'
                        ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-950/50'
                        : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}
                  >
                    Yes (Play)
                  </div>
                </div>
              </div>

              {/* Branch 2: Overcast (Direct Leaf) */}
              <div className="flex flex-col items-center space-y-2">
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    outlook === 'overcast'
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                      : 'text-slate-400'
                  }`}
                >
                  {isBn ? 'মেঘলা (Overcast)' : 'Overcast'}
                </span>
                <div className="w-px h-6 bg-slate-700" />
                <div
                  className={`px-3 py-2 rounded-lg text-xs font-bold border transition ${
                    outlook === 'overcast'
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-xl shadow-emerald-950/50 ring-2 ring-emerald-400/30'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}
                >
                  Yes (Play)
                </div>
              </div>

              {/* Branch 3: Rainy */}
              <div className="flex flex-col items-center space-y-2">
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    outlook === 'rainy'
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                      : 'text-slate-400'
                  }`}
                >
                  {isBn ? 'বৃষ্টি (Rainy)' : 'Rainy'}
                </span>
                <div
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium ${
                    outlook === 'rainy'
                      ? 'bg-sky-500/20 border-sky-500/50 text-sky-200 ring-2 ring-sky-500/30'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {isBn ? 'বাতাস কেমন? (Wind?)' : 'Wind?'}
                </div>

                {/* Sub branches under rainy */}
                <div className="w-24 h-4 border-b border-slate-700 relative mt-1">
                  <div className="absolute left-0 bottom-0 w-px h-4 bg-slate-700" />
                  <div className="absolute right-0 bottom-0 w-px h-4 bg-slate-700" />
                </div>
                <div className="flex justify-between w-28 text-[9px] font-mono pt-0.5">
                  <span className={wind === 'strong' && outlook === 'rainy' ? 'text-rose-400 font-bold' : 'text-slate-500'}>
                    Strong
                  </span>
                  <span className={wind === 'weak' && outlook === 'rainy' ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                    Weak
                  </span>
                </div>
                <div className="flex justify-between w-28 pt-1">
                  <div
                    className={`px-2 py-1 rounded text-[10px] font-bold ${
                      outlook === 'rainy' && wind === 'strong'
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-950/50'
                        : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}
                  >
                    No (Play)
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-[10px] font-bold ${
                      outlook === 'rainy' && wind === 'weak'
                        ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-950/50'
                        : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}
                  >
                    Yes (Play)
                  </div>
                </div>
              </div>
            </div>

            {/* Tree Outcome Ribbon */}
            <div
              className={`mt-6 w-full max-w-md p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
                weatherOutcome.play
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}
            >
              <div className="flex items-center gap-2">
                {weatherOutcome.play ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400" />
                )}
                <span>
                  {weatherOutcome.play
                    ? isBn
                      ? 'মডেলের রায়: খেলা হবে (Play = Yes)!'
                      : 'Decision: Play Outside (Yes)!'
                    : isBn
                    ? 'মডেলের রায়: খেলা বাতিল (Play = No)!'
                    : 'Decision: Do Not Play (No)!'}
                </span>
              </div>
              <span className="text-[11px] font-normal text-slate-400">
                {weatherOutcome.reason}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* LOAN APPROVAL TREE MODE */}
      {treeMode === 'loan' && (
        <div className="space-y-6">
          {/* Sliders for Income & Credit Score */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">
                  {isBn ? 'বার্ষিক আয় (Lakhs ৳):' : 'Annual Income (Lakhs):'}
                </span>
                <span className="font-mono text-emerald-400 font-bold">{income.toFixed(1)} L</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="8.0"
                step="0.5"
                value={income}
                onChange={(e) => setIncome(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Threshold: ≤ 4.5 L</span>
                <span>Max: 8.0 L</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">
                  {isBn ? 'ক্রেডিট স্কোর (Credit Score):' : 'Credit Score:'}
                </span>
                <span className="font-mono text-emerald-400 font-bold">{creditScore}</span>
              </div>
              <input
                type="range"
                min="500"
                max="850"
                step="10"
                value={creditScore}
                onChange={(e) => setCreditScore(parseInt(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Checks: ≤ 620 or ≤ 700</span>
                <span>Top: 850</span>
              </div>
            </div>
          </div>

          {/* Graphical Loan Tree */}
          <div className="p-4 sm:p-6 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col items-center">
            {/* Root: Income Check */}
            <div className="flex flex-col items-center">
              <div className="px-5 py-2 rounded-xl bg-blue-500/20 border border-blue-500/50 text-blue-200 text-xs font-bold shadow-lg flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-blue-300" />
                <span>Income ≤ 4.5 Lakhs?</span>
              </div>

              <div className="w-56 h-6 border-b-2 border-slate-700 relative">
                <div className="absolute left-0 bottom-0 w-0.5 h-6 bg-slate-700" />
                <div className="absolute right-0 bottom-0 w-0.5 h-6 bg-slate-700" />
              </div>
            </div>

            {/* Level 1: Sub Checks */}
            <div className="grid grid-cols-2 gap-10 sm:gap-20 pt-2 text-center w-full max-w-lg">
              {/* Left Subtree: Income <= 4.5 */}
              <div className="flex flex-col items-center space-y-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${income <= 4.5 ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-500'}`}>
                  Yes (Income ≤ 4.5L)
                </span>
                <div className={`px-3 py-1.5 rounded-lg border text-xs font-medium ${income <= 4.5 ? 'bg-amber-500/20 border-amber-500/50 text-amber-200' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                  Credit Score ≤ 620?
                </div>

                <div className="flex justify-between w-36 pt-2">
                  <div className={`px-2.5 py-1.5 rounded text-[10px] font-bold ${income <= 4.5 && creditScore <= 620 ? 'bg-rose-500 text-white shadow-lg' : 'bg-slate-900 border border-slate-800 text-slate-500'}`}>
                    Reject (No)
                  </div>
                  <div className={`px-2.5 py-1.5 rounded text-[10px] font-bold ${income <= 4.5 && creditScore > 620 ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'bg-slate-900 border border-slate-800 text-slate-500'}`}>
                    Approve (Yes)
                  </div>
                </div>
              </div>

              {/* Right Subtree: Income > 4.5 */}
              <div className="flex flex-col items-center space-y-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${income > 4.5 ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-500'}`}>
                  No (Income &gt; 4.5L)
                </span>
                <div className={`px-3 py-1.5 rounded-lg border text-xs font-medium ${income > 4.5 ? 'bg-amber-500/20 border-amber-500/50 text-amber-200' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                  Credit Score ≤ 700?
                </div>

                <div className="flex justify-between w-36 pt-2">
                  <div className={`px-2.5 py-1.5 rounded text-[10px] font-bold ${income > 4.5 && creditScore <= 700 ? 'bg-rose-500 text-white shadow-lg' : 'bg-slate-900 border border-slate-800 text-slate-500'}`}>
                    Reject (No)
                  </div>
                  <div className={`px-2.5 py-1.5 rounded text-[10px] font-bold ${income > 4.5 && creditScore > 700 ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'bg-slate-900 border border-slate-800 text-slate-500'}`}>
                    Approve (Yes)
                  </div>
                </div>
              </div>
            </div>

            {/* Loan Outcome Ribbon */}
            <div
              className={`mt-6 w-full max-w-md p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
                loanOutcome.approved
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}
            >
              <div className="flex items-center gap-2">
                {loanOutcome.approved ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400" />
                )}
                <span>
                  {loanOutcome.approved
                    ? isBn
                      ? 'অনুমোদন: লোন মঞ্জুর করা হলো (Approved)!'
                      : 'LOAN APPROVED!'
                    : isBn
                    ? 'প্রত্যাখ্যাত: ঋণ আবেদন বাতিল (Rejected)!'
                    : 'LOAN REJECTED!'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {loanOutcome.rule}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
