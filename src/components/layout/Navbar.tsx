'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { soundEffects } from '@/utils/soundEffects';

interface NavbarProps {
  progressPercent: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
  isHumanVerified: boolean;
  onOpenVerifyModal: () => void;
  onResetProgress: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onLockVault?: () => void;
}

export default function Navbar({
  progressPercent,
  completedLessonsCount,
  totalLessonsCount,
  isHumanVerified,
  onOpenVerifyModal,
  onResetProgress,
  soundEnabled,
  onToggleSound,
  activeSection,
  onNavigate,
  onLockVault,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'roadmap', label: 'Full-Stack Roadmap', icon: Map },
    { id: 'grid-lab', label: 'Tailwind Grid Lab', icon: LayoutGrid },
    { id: 'react-next', label: 'React & Next.js Engine', icon: Code2 },
    { id: 'security-audit', label: 'Security Audit (16 Rules)', icon: Shield },
    { id: 'vercel-deploy', label: 'Vercel Deployment', icon: Rocket },
  ];

  const handleNavClick = (id: string) => {
    soundEffects.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      {/* Top Mastery Progress Micro-Bar */}
      <div className="w-full h-1 bg-slate-900 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('roadmap')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-all shadow-lg shadow-cyan-950/40">
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                NextGen Mastery
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                Zero to Expert
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
              Interactive Full-Stack Architecture
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-950/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Progress Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Mastery:</span>
            <span className="font-bold text-cyan-400">{progressPercent}%</span>
            <span className="text-[11px] text-slate-400">
              ({completedLessonsCount}/{totalLessonsCount})
            </span>
          </div>

          {/* Antibot Human Gate Status Badge */}
          <button
            onClick={isHumanVerified && onLockVault ? onLockVault : onOpenVerifyModal}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all ${
              isHumanVerified
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40'
                : 'bg-rose-500/15 text-rose-300 border-rose-500/30 hover:bg-rose-500/25 animate-pulse'
            }`}
            title={isHumanVerified ? 'Human Verified • Click to Re-Lock Vault' : 'Antibot Gate Active'}
          >
            {isHumanVerified ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline">Verified Human</span>
                <Lock className="w-3 h-3 text-slate-400 ml-0.5 hover:text-rose-400" />
              </>
            ) : (
              <>
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden md:inline">Antibot Locked</span>
              </>
            )}
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition"
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reset Progress Button */}
          <button
            onClick={onResetProgress}
            className="hidden sm:flex p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-900/50 transition"
            title="Reset All Progress"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
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
            className="lg:hidden border-t border-slate-800 bg-slate-950/95 px-4 py-4 space-y-2"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                    isActive
                      ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {isHumanVerified && onLockVault && (
              <button
                onClick={() => {
                  onLockVault();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-rose-400 bg-rose-950/30 border border-rose-800/40 hover:bg-rose-900/40"
              >
                <Lock className="w-4 h-4" />
                <span>Re-Lock Access Gate</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
