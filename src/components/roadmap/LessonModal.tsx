'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Clock,
  Tag,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  Lightbulb,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LessonNode } from '@/types';
import InteractiveLessonSimulator from './InteractiveLessonSimulators';
import { soundEffects } from '@/utils/soundEffects';

interface LessonModalProps {
  lesson: LessonNode | null;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: (lessonId: string) => void;
}

export default function LessonModal({
  lesson,
  isOpen,
  onClose,
  isCompleted,
  onToggleComplete,
}: LessonModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !lesson) return null;

  const handleCopyCode = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(lesson.codeSnippet);
      setCopied(true);
      soundEffects.playClick();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleToggle = () => {
    if (!isCompleted) {
      soundEffects.playComplete();
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#06b6d4', '#10b981', '#a855f7'],
        });
      } catch {}
    } else {
      soundEffects.playClick();
    }
    onToggleComplete(lesson.id);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-cyan-950/30 flex flex-col text-slate-100 overflow-hidden"
        >
          {/* Top Decorative Gradient Accent */}
          <div className="h-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400" />

          {/* Modal Header */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold">
                  Phase {lesson.phaseId}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {lesson.duration}
                </span>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${
                    lesson.difficulty === 'Beginner'
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      : lesson.difficulty === 'Intermediate'
                      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                      : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                  }`}
                >
                  {lesson.difficulty}
                </span>
              </div>

              <h2 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
                {lesson.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lesson.shortDesc}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Live Interactive Simulator Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>Live Interactive Visualizer</span>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 shadow-inner">
                <InteractiveLessonSimulator type={lesson.interactiveType} />
              </div>
            </div>

            {/* Deep Dive Breakdown */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-purple-400" />
                Architectural Deep Dive
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                {lesson.deepDive}
              </p>
            </div>

            {/* Production Code Snippet */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                  <span>{lesson.language.toUpperCase()}</span>
                  <span className="text-xs text-slate-400 font-normal">
                    Production Implementation
                  </span>
                </h3>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700 transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                  <code>{lesson.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Best Practices vs Common Mistakes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Best Practices */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2.5">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Engineering Best Practices
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {lesson.bestPractices.map((bp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 shrink-0 mt-0.5">•</span>
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Pitfalls */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2.5">
                <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  Common Beginner Pitfalls
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {lesson.commonMistakes.map((cm, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 shrink-0 mt-0.5">•</span>
                      <span>{cm}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                Topics:
              </span>
              {lesson.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
            >
              Close
            </button>

            <button
              onClick={handleToggle}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg ${
                isCompleted
                  ? 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/40'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-950/50'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isCompleted ? 'Marked as Completed ✓' : 'Mark as Complete'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
