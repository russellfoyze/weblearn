'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  Copy,
  Check,
  Sparkles,
  Sliders,
  Monitor,
  Smartphone,
  ChevronRight,
  Code2,
} from 'lucide-react';
import { GRID_PRESETS } from '@/data/gridPresetsData';
import { GridPreset } from '@/types';
import { soundEffects } from '@/utils/soundEffects';

export default function TailwindGridPlayground() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('p01');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Responsive slider for Preset 10 or custom test
  const [responsiveSliderWidth, setResponsiveSliderWidth] = useState<number>(800);

  // Custom Sandbox State
  const [sandboxCols, setSandboxCols] = useState<number>(3);
  const [sandboxGap, setSandboxGap] = useState<number>(4);
  const [sandboxItem1ColSpan, setSandboxItem1ColSpan] = useState<number>(1);
  const [sandboxItem1RowSpan, setSandboxItem1RowSpan] = useState<number>(1);
  const [sandboxItemCount, setSandboxItemCount] = useState<number>(6);
  const [sandboxCopied, setSandboxCopied] = useState<boolean>(false);

  const selectedPreset =
    GRID_PRESETS.find((p) => p.id === selectedPresetId) || GRID_PRESETS[0];

  const handleCopy = (id: string, code: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(code);
      setCopiedCodeId(id);
      soundEffects.playClick();
      setTimeout(() => setCopiedCodeId(null), 2000);
    }
  };

  const handleSandboxCopy = (code: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(code);
      setSandboxCopied(true);
      soundEffects.playClick();
      setTimeout(() => setSandboxCopied(false), 2000);
    }
  };

  // Generate sandbox class string
  const sandboxContainerClass = `grid grid-cols-${sandboxCols} gap-${sandboxGap}`;
  const sandboxGeneratedCode = `<div class="grid grid-cols-${sandboxCols} gap-${sandboxGap}">
  <div class="${
    sandboxItem1ColSpan > 1 ? `col-span-${sandboxItem1ColSpan} ` : ''
  }${sandboxItem1RowSpan > 1 ? `row-span-${sandboxItem1RowSpan} ` : ''}bg-cyan-500/20">1</div>
${Array.from({ length: sandboxItemCount - 1 })
  .map((_, i) => `  <div class="bg-slate-800">${i + 2}</div>`)
  .join('\n')}
</div>`;

  return (
    <section id="grid-lab" className="space-y-8 scroll-mt-20">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Module B • Visual Grid Laboratory</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Interactive Tailwind CSS Grid Playground
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          Master the 10 foundational Tailwind CSS Grid utilities. Click through each preset or
          drag responsive sliders to watch color-coded items animate smoothly using Framer Motion
          physics.
        </p>
      </div>

      {/* Preset Quick Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
        {GRID_PRESETS.map((preset) => {
          const isActive = selectedPresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => {
                soundEffects.playClick();
                setSelectedPresetId(preset.id);
              }}
              className={`p-3 rounded-xl border text-left transition-all select-none ${
                isActive
                  ? 'bg-slate-800/90 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-950/40'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="font-bold">{preset.number}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Utility
                </span>
              </div>
              <div className="font-mono text-xs font-bold text-white truncate">
                {preset.utility}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Preset Main Showcase Hero Card */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm px-2.5 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                Preset {selectedPreset.number}
              </span>
              <span className="font-mono text-base font-extrabold text-white">
                {selectedPreset.utility}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {selectedPreset.description}
            </p>
          </div>

          <button
            onClick={() => handleCopy(selectedPreset.id, selectedPreset.code)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700 transition shrink-0"
          >
            {copiedCodeId === selectedPreset.id ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied HTML!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Snippet</span>
              </>
            )}
          </button>
        </div>

        {/* Special Viewport Width Slider for Preset 10 (Responsive) */}
        {selectedPreset.id === 'p10' && (
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Monitor className="w-4 h-4 text-cyan-400" />
                Simulate Viewport Width (Watch 1-col stack transform into 3-col grid):
              </span>
              <span className="font-mono text-cyan-400 font-bold">
                {responsiveSliderWidth}px ({responsiveSliderWidth >= 768 ? '≥768px: 3 Cols' : '<768px: 1 Col'})
              </span>
            </div>
            <input
              type="range"
              min={340}
              max={1000}
              value={responsiveSliderWidth}
              onChange={(e) => setResponsiveSliderWidth(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>340px (Mobile Stack)</span>
              <span>768px (md Breakpoint Switch)</span>
              <span>1000px (Desktop Grid)</span>
            </div>
          </div>
        )}

        {/* Animated Live Grid Preview Box */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex justify-center items-center min-h-[260px] overflow-hidden">
          <div
            className="w-full transition-all duration-300"
            style={{
              maxWidth:
                selectedPreset.id === 'p10' ? `${responsiveSliderWidth}px` : '100%',
            }}
          >
            <div
              className={`transition-all duration-300 ${
                selectedPreset.id === 'p10'
                  ? responsiveSliderWidth >= 768
                    ? 'grid grid-cols-3 gap-4'
                    : 'grid grid-cols-1 gap-4'
                  : selectedPreset.containerClass
              }`}
            >
              {selectedPreset.itemsConfig.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className={`min-h-[70px] rounded-xl border flex flex-col items-center justify-center font-mono font-bold text-sm shadow-md transition-colors ${
                    item.color
                  } ${item.colSpan || ''} ${item.rowSpan || ''}`}
                >
                  <span className="text-base">{item.label}</span>
                  <span className="text-[10px] opacity-75 font-normal">
                    Item #{item.id}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Snippet Preview */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Tailwind HTML Snippet:</span>
            <span className="text-[11px] text-cyan-400 font-mono">
              class=&quot;{selectedPreset.containerClass}&quot;
            </span>
          </div>
          <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 p-3.5">
            <pre className="text-xs font-mono text-slate-200 overflow-x-auto">
              <code>{selectedPreset.code}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Complete 10 Presets Visual Cards Catalog */}
      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          The Complete 10 Utilities Catalog
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GRID_PRESETS.map((preset) => (
            <div
              key={preset.id}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold">
                      {preset.number}
                    </span>
                    <span className="font-mono text-xs font-bold text-white">
                      {preset.utility}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(preset.id, preset.code)}
                    className="text-slate-400 hover:text-cyan-400 p-1 transition"
                    title="Copy Snippet"
                  >
                    {copiedCodeId === preset.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              {/* Compact Mini Preview */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className={`gap-2 ${preset.containerClass}`}>
                  {preset.itemsConfig.slice(0, 4).map((it) => (
                    <div
                      key={it.id}
                      className={`h-9 rounded-md border text-[11px] font-mono flex items-center justify-center ${
                        it.color
                      } ${it.colSpan || ''} ${it.rowSpan || ''}`}
                    >
                      {it.id}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Custom Grid Sandbox Lab */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-6 shadow-2xl shadow-cyan-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-400" />
              Custom Interactive Grid Sandbox Lab
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Test any custom combination of column tracks, gutters, and item spans with real-time code generation.
            </p>
          </div>

          <button
            onClick={() => handleSandboxCopy(sandboxGeneratedCode)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition shrink-0"
          >
            {sandboxCopied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied Sandbox JSX!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Custom JSX</span>
              </>
            )}
          </button>
        </div>

        {/* Sandbox Controls Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          {/* Columns */}
          <div className="space-y-1">
            <label className="text-slate-400 block font-mono">
              grid-cols-{sandboxCols}
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 6].map((c) => (
                <button
                  key={c}
                  onClick={() => setSandboxCols(c)}
                  className={`flex-1 py-1 rounded text-center font-mono ${
                    sandboxCols === c
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Gap */}
          <div className="space-y-1">
            <label className="text-slate-400 block font-mono">
              gap-{sandboxGap}
            </label>
            <div className="flex gap-1">
              {[0, 2, 4, 6, 8].map((g) => (
                <button
                  key={g}
                  onClick={() => setSandboxGap(g)}
                  className={`flex-1 py-1 rounded text-center font-mono ${
                    sandboxGap === g
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Item 1 Col Span */}
          <div className="space-y-1">
            <label className="text-slate-400 block font-mono">
              Item 1: col-span-{sandboxItem1ColSpan}
            </label>
            <div className="flex gap-1">
              {[1, 2, 3].map((s) => (
                <button
                  key={s}
                  onClick={() => setSandboxItem1ColSpan(s)}
                  className={`flex-1 py-1 rounded text-center font-mono ${
                    sandboxItem1ColSpan === s
                      ? 'bg-purple-500 text-white font-bold'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {s === 1 ? '1' : `span-${s}`}
                </button>
              ))}
            </div>
          </div>

          {/* Item 1 Row Span */}
          <div className="space-y-1">
            <label className="text-slate-400 block font-mono">
              Item 1: row-span-{sandboxItem1RowSpan}
            </label>
            <div className="flex gap-1">
              {[1, 2].map((r) => (
                <button
                  key={r}
                  onClick={() => setSandboxItem1RowSpan(r)}
                  className={`flex-1 py-1 rounded text-center font-mono ${
                    sandboxItem1RowSpan === r
                      ? 'bg-purple-500 text-white font-bold'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {r === 1 ? '1' : 'span-2'}
                </button>
              ))}
            </div>
          </div>

          {/* Item Count */}
          <div className="space-y-1">
            <label className="text-slate-400 block font-mono">
              Items: {sandboxItemCount}
            </label>
            <input
              type="range"
              min={3}
              max={8}
              value={sandboxItemCount}
              onChange={(e) => setSandboxItemCount(Number(e.target.value))}
              className="w-full accent-cyan-400 mt-2"
            />
          </div>
        </div>

        {/* Live Sandbox Canvas */}
        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 min-h-[220px]">
          <div
            className={`transition-all duration-300 ${
              sandboxCols === 1
                ? 'grid-cols-1'
                : sandboxCols === 2
                ? 'grid-cols-2'
                : sandboxCols === 3
                ? 'grid-cols-3'
                : sandboxCols === 4
                ? 'grid-cols-4'
                : 'grid-cols-6'
            } ${
              sandboxGap === 0
                ? 'gap-0'
                : sandboxGap === 2
                ? 'gap-2'
                : sandboxGap === 4
                ? 'gap-4'
                : sandboxGap === 6
                ? 'gap-6'
                : 'gap-8'
            } grid`}
          >
            {/* Item 1 with dynamic spans */}
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className={`min-h-[70px] rounded-xl border p-3 flex flex-col items-center justify-center font-mono font-bold text-sm bg-cyan-500/20 text-cyan-200 border-cyan-400 ${
                sandboxItem1ColSpan === 2
                  ? 'col-span-2'
                  : sandboxItem1ColSpan === 3
                  ? 'col-span-3'
                  : ''
              } ${sandboxItem1RowSpan === 2 ? 'row-span-2' : ''}`}
            >
              <span>1</span>
              <span className="text-[10px] text-cyan-300 font-normal">
                {sandboxItem1ColSpan > 1 ? `col-span-${sandboxItem1ColSpan} ` : ''}
                {sandboxItem1RowSpan > 1 ? `row-span-${sandboxItem1RowSpan}` : ''}
              </span>
            </motion.div>

            {/* Remaining items */}
            {Array.from({ length: sandboxItemCount - 1 }).map((_, idx) => (
              <motion.div
                key={idx + 2}
                layout
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="min-h-[70px] rounded-xl border border-slate-800 bg-slate-900/90 text-slate-300 flex flex-col items-center justify-center font-mono text-sm"
              >
                <span>{idx + 2}</span>
                <span className="text-[10px] text-slate-400 font-normal">Item</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Live Code Output */}
        <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 p-3.5">
          <pre className="text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
            <code>{sandboxGeneratedCode}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
