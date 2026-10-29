'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Table as TableIcon,
  Cpu,
  ArrowRight,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Gamepad2,
  Flame,
  Award,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MlOverviewHero from '@/components/ml/MlOverviewHero';
import MlAlgorithmCard from '@/components/ml/MlAlgorithmCard';
import { ML_ALGORITHMS, MLAlgorithmData } from '@/data/mlAlgorithmsData';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';
import { soundEffects } from '@/utils/soundEffects';

export default function MachineLearningPage() {
  const { language } = useLanguage();
  const { openGame } = useGame();
  const isBn = language === 'bn';

  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Toggle Sound FX
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEffects.enabled = next;
    if (next) soundEffects.playClick();
  };

  // Filter algorithms
  const filteredAlgorithms = useMemo(() => {
    return ML_ALGORITHMS.filter((alg) => {
      // Category filter
      if (selectedCategory === 'supervised' && alg.typeBadge !== 'Supervised') return false;
      if (selectedCategory === 'unsupervised' && alg.typeBadge !== 'Unsupervised') return false;
      if (selectedCategory === 'ensemble' && alg.typeBadge !== 'Ensemble') return false;
      if (selectedCategory === 'regression' && alg.taskType !== 'Regression' && alg.taskType !== 'Both')
        return false;
      if (selectedCategory === 'classification' && alg.taskType !== 'Classification' && alg.taskType !== 'Both')
        return false;
      if (selectedCategory === 'clustering' && alg.taskType !== 'Clustering') return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = alg.name.toLowerCase().includes(query) || alg.nameBn.includes(query);
        const matchesSubtitle =
          alg.subtitle.toLowerCase().includes(query) || alg.subtitleBn.includes(query);
        const matchesSummary =
          alg.summary.toLowerCase().includes(query) || alg.summaryBn.includes(query);
        return matchesName || matchesSubtitle || matchesSummary;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  const categories = [
    { id: 'all', label: isBn ? 'সকল অ্যালগরিদম (৭টি)' : 'All 7 Algorithms' },
    { id: 'supervised', label: isBn ? 'তত্ত্বাবধানাধীন (Supervised)' : 'Supervised' },
    { id: 'unsupervised', label: isBn ? 'তত্ত্বাবধানহীন (Unsupervised)' : 'Unsupervised' },
    { id: 'ensemble', label: isBn ? 'এনসেম্বল (Ensemble)' : 'Ensemble' },
    { id: 'regression', label: isBn ? 'রিগ্রেশন (Regression)' : 'Regression' },
    { id: 'classification', label: isBn ? 'ক্লাসিফিকেশন (Classification)' : 'Classification' },
    { id: 'clustering', label: isBn ? 'ক্লাস্টারিং (Clustering)' : 'Clustering' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-100 selection:bg-rose-500/30 selection:text-rose-200">
      {/* Top Navbar */}
      <Navbar
        currentTrack="ml"
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
        {/* ======================================================== */}
        {/* MODULE 1: THE 7-ALGORITHM OVERVIEW HERO (PAGE 1 INFOGRAPHIC) */}
        {/* ======================================================== */}
        <MlOverviewHero />

        {/* ======================================================== */}
        {/* GAMIFIED ARCADE STATION BANNER (PLAY & LEARN) */}
        {/* ======================================================== */}
        <section className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-rose-950/40 border-2 border-cyan-500/40 shadow-2xl overflow-hidden space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
                <Gamepad2 className="w-3.5 h-3.5 animate-pulse" />
                <span>{isBn ? 'গেম খেলে শিখুন • ML আর্কেড মোড' : 'PLAY & LEARN • ML ARCADE MODE'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {isBn
                  ? 'থিওরি নয়, গেম খেলেই হয়ে উঠুন এআই মাস্টার!'
                  : 'Level Up Your Skills Through Playable Mini-Games!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {isBn
                  ? 'প্রতিটি অ্যালগরিদমের জন্য তৈরি করা হয়েছে আকর্ষণীয় গেম। লেজার দিয়ে রিগ্রেশন লাইন নিশানা করুন, সিগময়েড দিয়ে স্প্যাম ধ্বংস করুন, আর ডিসিশন ট্রি দিয়ে মেজ জয় করুন!'
                  : 'Test your intuition in interactive arcade challenges. Slice targets with Linear Lasers, vaporize spam with the Sigmoid Cannon, and battle dungeon bosses with Decision Trees!'}
              </p>
            </div>

            {/* Launch Arcade Master Button */}
            <button
              onClick={() => openGame('linear-regression')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-rose-500 hover:from-cyan-300 hover:to-rose-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-cyan-950/60 hover:scale-105 active:scale-95 transition flex items-center gap-2"
            >
              <Gamepad2 className="w-4 h-4 text-slate-950 animate-bounce" />
              <span>{isBn ? '🎮 আর্কেড এরিনায় প্রবেশ করুন' : '🎮 ENTER ARCADE ARENA'}</span>
            </button>
          </div>

          {/* Quick Mini-Game Launcher Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            {[
              { id: 'linear-regression', title: isBn ? '🎯 লিনিয়ার স্নাইপার' : '🎯 Linear Sniper', desc: isBn ? 'MSE নিশানা করুন' : 'Align Laser Beam', color: 'border-rose-500/40 bg-rose-500/10' },
              { id: 'logistic-regression', title: isBn ? '🛡️ স্প্যাম ডিফেন্ডার' : '🛡️ Spam Defender', desc: isBn ? 'সিগময়েড টারেট' : 'Sigmoid Cannon', color: 'border-sky-500/40 bg-sky-500/10' },
              { id: 'decision-tree', title: isBn ? '🌳 ডিসিশন মেজ' : '🌳 Decision Dungeon', desc: isBn ? 'শর্ত মেনে দানব বধ' : 'Gini Split RPG', color: 'border-emerald-500/40 bg-emerald-500/10' },
              { id: 'k-nearest-neighbors', title: isBn ? '📡 কেএনএন রাডার' : '📡 KNN Radar', desc: isBn ? 'দূরত্ব মেপে রহস্য ভেদ' : 'Proximity Scanner', color: 'border-violet-500/40 bg-violet-500/10' },
            ].map((game) => (
              <button
                key={game.id}
                onClick={() => openGame(game.id)}
                className={`p-3 rounded-2xl border text-left transition hover:scale-[1.03] active:scale-95 ${game.color}`}
              >
                <div className="text-xs font-bold text-white">{game.title}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{game.desc}</div>
              </button>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* FILTER & SEARCH CONTROLS */}
        {/* ======================================================== */}
        <section className="p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={
                  isBn
                    ? 'অ্যালগরিদমের নাম দিয়ে খুঁজুন (যেমন: লিনিয়ার, ট্রি, SVM, KNN, ক্লাস্টার)...'
                    : 'Search algorithms by name or concept (e.g. regression, tree, svm, knn)...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            {/* Total Filter Count */}
            <div className="text-xs font-mono text-slate-400">
              {isBn ? 'প্রদর্শিত হচ্ছে:' : 'Showing:'}{' '}
              <strong className="text-cyan-400">{filteredAlgorithms.length}</strong> / 7
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedCategory === cat.id
                    ? 'bg-rose-500 text-white font-bold shadow-md shadow-rose-950/40'
                    : 'bg-slate-950/80 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* MODULE 2: DEEP-DIVE CARDS FOR ALL 7 ALGORITHMS */}
        {/* ======================================================== */}
        <section className="space-y-16">
          {filteredAlgorithms.map((algorithm) => (
            <MlAlgorithmCard key={algorithm.id} algorithm={algorithm} />
          ))}

          {filteredAlgorithms.length === 0 && (
            <div className="text-center py-16 p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3">
              <Cpu className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="text-lg font-bold text-white">
                {isBn ? 'কোনো অ্যালগরিদম পাওয়া যায়নি' : 'No matching algorithms found'}
              </h4>
              <p className="text-xs text-slate-400">
                {isBn
                  ? 'অনুগ্রহ করে সার্চ কোয়েরি বা ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।'
                  : 'Try clearing your search query or choosing another filter category.'}
              </p>
            </div>
          )}
        </section>

        {/* ======================================================== */}
        {/* MODULE 3: MASTER COMPARISON MATRIX & CHEAT SHEET */}
        {/* ======================================================== */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <TableIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {isBn ? '৭টি অ্যালগরিদমের তুলনা ও চিট-শীট' : 'Algorithm Decision Matrix & Cheat Sheet'}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {isBn
                  ? 'কখন কোন অ্যালগরিদম বেছে নেবেন তার দ্রুত সিদ্ধান্ত গাইড'
                  : 'Quick reference matrix to choose the right model for any real-world problem'}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-300">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">{isBn ? 'অ্যালগরিদম' : 'Algorithm'}</th>
                  <th className="p-3">{isBn ? 'ধরন (Type)' : 'Type'}</th>
                  <th className="p-3">{isBn ? 'মূল কাজ' : 'Primary Task'}</th>
                  <th className="p-3">{isBn ? 'ব্যাখ্যাযোগ্যতা' : 'Interpretability'}</th>
                  <th className="p-3">{isBn ? 'বাস্তব ব্যবহার' : 'Ideal Real-World Use'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
                {ML_ALGORITHMS.map((alg) => (
                  <tr key={alg.id} className="hover:bg-slate-800/30 transition">
                    <td className="p-3 font-bold text-slate-400">{alg.number}</td>
                    <td className="p-3">
                      <div className="font-bold text-white flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: alg.pillColor }}
                        />
                        <span>{isBn ? alg.nameBn : alg.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-300">
                      {isBn ? alg.typeBadgeBn : alg.typeBadge}
                    </td>
                    <td className="p-3 text-slate-300">
                      {isBn ? alg.taskTypeBn : alg.taskType}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          alg.id === 'decision-tree' || alg.id === 'linear-regression'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : alg.id === 'logistic-regression' || alg.id === 'k-nearest-neighbors'
                            ? 'bg-sky-500/20 text-sky-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {alg.id === 'decision-tree' || alg.id === 'linear-regression'
                          ? isBn
                            ? 'উচ্চ (White-Box)'
                            : 'High (White-Box)'
                          : alg.id === 'logistic-regression' || alg.id === 'k-nearest-neighbors'
                          ? isBn
                            ? 'মাঝারি (Moderate)'
                            : 'Moderate'
                          : isBn
                          ? 'জটিল (Black-Box)'
                          : 'Complex'}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">
                      {alg.id === 'linear-regression' && (isBn ? 'বাড়ি বা পণ্যের দাম অনুমান' : 'House prices, sales trends')}
                      {alg.id === 'logistic-regression' && (isBn ? 'ইমেইল স্প্যাম ফিল্টারিং' : 'Spam filter, disease risk')}
                      {alg.id === 'decision-tree' && (isBn ? 'ব্যাংক লোন অনুমোদন যাচাই' : 'Loan approvals, rule pipelines')}
                      {alg.id === 'random-forest' && (isBn ? 'জটিল ব্যবসায়িক প্রেডিকশন' : 'High-stakes tabular prediction')}
                      {alg.id === 'support-vector-machine' && (isBn ? 'টেক্সট ও ইমেজ ক্লাসিফিকেশন' : 'Text NLP, image boundary')}
                      {alg.id === 'k-nearest-neighbors' && (isBn ? 'সিনেমা ও পণ্য সুপারিশ' : 'Movie recommender, spatial query')}
                      {alg.id === 'k-means-clustering' && (isBn ? 'কাস্টমার মার্কেট সেগমেন্টেশন' : 'Customer market clustering')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
