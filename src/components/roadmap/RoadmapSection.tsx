'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Palette,
  Atom,
  Server,
  Rocket,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ChevronRight,
  ArrowDown,
} from 'lucide-react';
import { RoadmapPhase, LessonNode } from '@/types';
import { ROADMAP_PHASES } from '@/data/roadmapData';
import LessonModal from './LessonModal';
import { soundEffects } from '@/utils/soundEffects';

interface RoadmapSectionProps {
  completedLessons: string[];
  onToggleComplete: (lessonId: string) => void;
}

const PHASE_ICONS: Record<number, React.ElementType> = {
  1: Globe,
  2: Palette,
  3: Atom,
  4: Server,
  5: Rocket,
};

export default function RoadmapSection({
  completedLessons,
  onToggleComplete,
}: RoadmapSectionProps) {
  const [activeLesson, setActiveLesson] = useState<LessonNode | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<number | 'all'>('all');

  const handleOpenLesson = (lesson: LessonNode) => {
    soundEffects.playClick();
    setActiveLesson(lesson);
    setModalOpen(true);
  };

  const filteredPhases =
    selectedPhaseFilter === 'all'
      ? ROADMAP_PHASES
      : ROADMAP_PHASES.filter((p) => p.id === selectedPhaseFilter);

  return (
    <section id="roadmap" className="space-y-8 scroll-mt-20">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Module A • Full-Stack Curriculum</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          The Interactive Full-Stack Roadmap
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          From the foundational HTML semantic tree and CSS box model, to React Fiber
          reconciliation, Next.js App Router Server Components, and zero-vulnerability Vercel deployment.
        </p>
      </div>

      {/* Phase Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-slate-800 pb-4">
        <button
          onClick={() => setSelectedPhaseFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
            selectedPhaseFilter === 'all'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          All 5 Phases
        </button>
        {ROADMAP_PHASES.map((p) => {
          const completedInPhase = p.lessons.filter((l) => completedLessons.includes(l.id)).length;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPhaseFilter(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1.5 ${
                selectedPhaseFilter === p.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>Phase {p.id}</span>
              <span className="text-[10px] text-slate-400">
                ({completedInPhase}/{p.lessons.length})
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive Timeline & Node Phases */}
      <div className="space-y-12 relative">
        {filteredPhases.map((phase, pIndex) => {
          const Icon = PHASE_ICONS[phase.id] || Globe;
          const completedInPhase = phase.lessons.filter((l) =>
            completedLessons.includes(l.id)
          ).length;
          const phasePercent = Math.round((completedInPhase / phase.lessons.length) * 100);

          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: pIndex * 0.1 }}
              className="relative rounded-2xl bg-slate-900/70 border border-slate-800 p-4 sm:p-6 shadow-xl space-y-6"
            >
              {/* Phase Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${phase.color} bg-opacity-20 flex items-center justify-center text-white shadow-lg shrink-0`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {phase.title}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
                        {phase.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300">
                      {phase.subtitle}
                    </p>
                  </div>
                </div>

                {/* Progress Mini Badge */}
                <div className="flex items-center gap-3 text-xs font-mono">
                  <div className="text-right">
                    <div className="text-slate-400 text-[10px]">Phase Mastery</div>
                    <div className="text-cyan-400 font-bold">{phasePercent}%</div>
                  </div>
                  <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                      style={{ width: `${phasePercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Lesson Nodes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {phase.lessons.map((lesson) => {
                  const isDone = completedLessons.includes(lesson.id);

                  return (
                    <motion.div
                      key={lesson.id}
                      whileHover={{ scale: 1.015, y: -2 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => handleOpenLesson(lesson)}
                      className={`relative p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                        isDone
                          ? 'bg-slate-900/90 border-emerald-500/40 shadow-sm shadow-emerald-950/20'
                          : 'bg-slate-950/80 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-[10px] text-cyan-400 font-semibold">
                            Module {lesson.id}
                          </span>
                          <span className="flex items-center gap-1 text-slate-400 font-mono text-[10px]">
                            <Clock className="w-3 h-3" />
                            {lesson.duration}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {lesson.title}
                        </h4>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {lesson.shortDesc}
                        </p>
                      </div>

                      <div className="pt-4 mt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span
                          className={`flex items-center gap-1.5 font-mono text-[11px] ${
                            isDone ? 'text-emerald-400 font-semibold' : 'text-slate-400'
                          }`}
                        >
                          {isDone ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              Completed
                            </>
                          ) : (
                            <>
                              <Circle className="w-3.5 h-3.5 text-slate-400" />
                              Click to Learn
                            </>
                          )}
                        </span>

                        <span className="text-cyan-400 flex items-center gap-0.5 text-[11px] font-medium">
                          Inspect <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lesson Modal */}
      <LessonModal
        lesson={activeLesson}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        isCompleted={activeLesson ? completedLessons.includes(activeLesson.id) : false}
        onToggleComplete={onToggleComplete}
      />
    </section>
  );
}
