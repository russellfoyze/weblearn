'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ShieldAlert,
  Volume2,
  VolumeX,
  Menu,
  X,
  RotateCcw,
  Sparkles,
  LayoutGrid,
  Map,
  Shield,
  Rocket,
  Code2,
  Lock,
  Cpu,
  Globe,
  Layers,
  Gamepad2,
} from 'lucide-react';
import { soundEffects } from '@/utils/soundEffects';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';
import PlayerHudBar from '@/components/game/PlayerHudBar';
import GameArenaModal from '@/components/game/GameArenaModal';
import QuestModal from '@/components/game/QuestModal';

interface NavbarProps {
  progressPercent?: number;
  completedLessonsCount?: number;
  totalLessonsCount?: number;
  isHumanVerified?: boolean;
  onOpenVerifyModal?: () => void;
  onResetProgress?: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
  onLockVault?: () => void;
  currentTrack?: 'webdev' | 'ml';
}

export default function Navbar({
  progressPercent = 0,
  completedLessonsCount = 0,
  totalLessonsCount = 0,
  isHumanVerified = true,
  onOpenVerifyModal,
  onResetProgress,
  soundEnabled = true,
  onToggleSound,
  activeSection,
  onNavigate,
  onLockVault,
  currentTrack,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { openGame } = useGame();
  const pathname = usePathname();
  const isBn = language === 'bn';

  // Determine current active track based on prop or pathname
  const isMlTrack = currentTrack === 'ml' || pathname?.includes('/machine-learning') || pathname?.includes('/ml');

  // Web Dev Navigation Items
  const webNavItems = [
    { id: 'roadmap', label: isBn ? 'ফুল-স্ট্যাক রোডম্যাপ' : 'Full-Stack Roadmap', icon: Map },
    { id: 'grid-lab', label: isBn ? 'টেইলউইন্ড গ্রিড ল্যাব' : 'Tailwind Grid Lab', icon: LayoutGrid },
    { id: 'react-next', label: isBn ? 'রিঅ্যাক্ট ও নেক্সট ইঞ্জিন' : 'React & Next.js Engine', icon: Code2 },
    { id: 'security-audit', label: isBn ? 'সিকিউরিটি অডিট (১৬ নিয়ম)' : 'Security Audit (16 Rules)', icon: Shield },
    { id: 'vercel-deploy', label: isBn ? 'ভার্সেল ডিপ্লয়মেন্ট' : 'Vercel Deployment', icon: Rocket },
  ];

  // Machine Learning Navigation Items
  const mlNavItems = [
    { id: 'linear-regression', label: isBn ? '১. লিনিয়ার রিগ্রেশন' : '1. Linear Reg', color: '#F43F5E' },
    { id: 'logistic-regression', label: isBn ? '২. লজিস্টিক রিগ্রেশন' : '2. Logistic Reg', color: '#0EA5E9' },
    { id: 'decision-tree', label: isBn ? '৩. ডিসিশন ট্রি' : '3. Decision Tree', color: '#10B981' },
    { id: 'random-forest', label: isBn ? '৪. র‍্যান্ডম ফরেস্ট' : '4. Random Forest', color: '#F59E0B' },
    { id: 'support-vector-machine', label: isBn ? '৫. এসভিএম (SVM)' : '5. SVM', color: '#D946EF' },
    { id: 'k-nearest-neighbors', label: isBn ? '৬. কেএনএন (KNN)' : '6. KNN', color: '#8B5CF6' },
    { id: 'k-means-clustering', label: isBn ? '৭. কে-মিন্স ক্লাস্টারিং' : '7. K-Means', color: '#06B6D4' },
  ];

  const handleNavClick = (id: string) => {
    soundEffects.playClick();
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const handleLangToggle = () => {
    soundEffects.playClick();
    toggleLanguage();
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
      {/* Top Mastery Progress Micro-Bar */}
      {!isMlTrack && totalLessonsCount > 0 && (
        <div className="w-full h-1 bg-slate-900 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      )}

      {isMlTrack && (
        <div className="w-full h-1 bg-slate-900 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-rose-500 via-amber-400 via-fuchsia-500 to-cyan-400" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Track Switcher */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            onClick={() => soundEffects.playClick()}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-all shadow-lg shadow-cyan-950/40">
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  NextGen
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold hidden sm:inline">
                  Mastery
                </span>
              </div>
              <p className="text-[9px] text-slate-400 font-mono hidden md:block">
                Interactive Learning Hub
              </p>
            </div>
          </Link>

          {/* Primary Top Track Switcher: [Web Dev | Machine Learning] */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold shadow-inner">
            <Link
              href="/"
              onClick={() => soundEffects.playClick()}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg transition ${
                !isMlTrack
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="text-[11px] sm:text-xs">
                {isBn ? 'ওয়েব ডেভেলপমেন্ট' : 'Web Dev'}
              </span>
            </Link>

            <Link
              href="/machine-learning"
              onClick={() => soundEffects.playClick()}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg transition ${
                isMlTrack
                  ? 'bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span className="text-[11px] sm:text-xs">
                {isBn ? 'মেশিন লার্নিং (ML)' : 'Machine Learning (ML)'}
              </span>
              <span className="hidden sm:inline text-[9px] font-mono px-1 rounded bg-black/20 text-slate-900 font-bold">
                7 ALGS
              </span>
            </Link>
          </div>
        </div>

        {/* Center Navigation Links (Track Specific) */}
        {!isMlTrack ? (
          <nav className="hidden xl:flex items-center gap-1">
            {webNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        ) : (
          <nav className="hidden xl:flex items-center gap-1">
            {mlNavItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="px-2 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition flex items-center gap-1"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        )}

        {/* Right Action Cluster: Language Toggle + Audio + Security */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Game Mode Launcher Button */}
          <button
            onClick={() => openGame('linear-regression')}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-500 text-slate-950 font-black text-xs shadow-md shadow-amber-950/40 hover:scale-105 active:scale-95 transition"
            title={isBn ? 'এমএল আর্কেড গেম খেলুন' : 'Play ML Arcade Games'}
          >
            <Gamepad2 className="w-3.5 h-3.5 text-slate-950 animate-bounce" />
            <span className="hidden sm:inline">{isBn ? 'গেম খেলুন' : 'Game Mode'}</span>
          </button>

          {/* ======================================================== */}
          {/* BANGLA & ENGLISH TOGGLE BUTTON (Prominent in Top Header) */}
          {/* ======================================================== */}
          <button
            onClick={handleLangToggle}
            className="flex items-center p-1 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700/80 shadow-md text-xs font-bold transition group"
            title={isBn ? 'Switch to English' : 'বাংলা ভাষায় পরিবর্তন করুন'}
          >
            <div className="flex items-center gap-1 px-1.5 py-0.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-45 transition-transform" />
              <div className="flex items-center gap-1 text-[11px] font-mono">
                <span
                  className={`px-1.5 py-0.5 rounded transition ${
                    !isBn
                      ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  EN
                </span>
                <span className="text-slate-600">|</span>
                <span
                  className={`px-1.5 py-0.5 rounded transition ${
                    isBn
                      ? 'bg-rose-500 text-white font-extrabold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  বাংলা
                </span>
              </div>
            </div>
          </button>

          {/* Progress Indicator for Web Dev */}
          {!isMlTrack && totalLessonsCount > 0 && (
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
              <span className="text-slate-400">{isBn ? 'অগ্রগতি:' : 'Progress:'}</span>
              <span className="font-bold text-cyan-400">{progressPercent}%</span>
            </div>
          )}

          {/* Antibot Lock Status Badge */}
          {onOpenVerifyModal && (
            <button
              onClick={isHumanVerified && onLockVault ? onLockVault : onOpenVerifyModal}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                isHumanVerified
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-rose-500/20 hover:text-rose-300'
                  : 'bg-rose-500/15 text-rose-300 border-rose-500/30 animate-pulse'
              }`}
              title={isHumanVerified ? 'Human Verified • Lock Vault' : 'Locked'}
            >
              {isHumanVerified ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden md:inline">{isBn ? 'যাচাইকৃত মানুষ' : 'Verified'}</span>
                  <Lock className="w-3 h-3 text-slate-400 ml-0.5" />
                </>
              ) : (
                <>
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden md:inline">Locked</span>
                </>
              )}
            </button>
          )}

          {/* Sound FX Toggle */}
          {onToggleSound && (
            <button
              onClick={onToggleSound}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition"
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
          )}

          {/* Reset Progress Button */}
          {onResetProgress && (
            <button
              onClick={onResetProgress}
              className="hidden lg:flex p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-900/50 transition"
              title={isBn ? 'অগ্রগতি রিসেট করুন' : 'Reset All Progress'}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden border-t border-slate-800 bg-slate-950/95 px-4 py-4 space-y-3"
          >
            {/* Mobile Track Switching */}
            <div className="flex gap-2 pb-2 border-b border-slate-800 text-xs">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex-1 py-2 text-center rounded-lg font-bold ${
                  !isMlTrack ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-300'
                }`}
              >
                {isBn ? 'ওয়েব ডেভেলপমেন্ট' : 'Web Dev'}
              </Link>
              <Link
                href="/machine-learning"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex-1 py-2 text-center rounded-lg font-bold ${
                  isMlTrack ? 'bg-rose-500 text-white' : 'bg-slate-900 text-slate-300'
                }`}
              >
                {isBn ? 'মেশিন লার্নিং (ML)' : 'Machine Learning'}
              </Link>
            </div>

            {/* Track Items */}
            {!isMlTrack ? (
              <div className="space-y-1">
                {webNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-900"
                    >
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {mlNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-900"
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>

    {/* Gamification Player HUD Bar */}
    <PlayerHudBar />

    {/* Interactive Game Modals */}
    <GameArenaModal />
    <QuestModal />
    </>
  );
}
