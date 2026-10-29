'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Layout,
  Maximize2,
  Minimize2,
  Smartphone,
  Tablet,
  Monitor,
  RefreshCw,
  GitBranch,
  Server,
  Terminal,
  ShieldCheck,
  Check,
  AlertTriangle,
  Play,
  Database,
  ArrowRight,
  Code,
  Zap,
} from 'lucide-react';

interface SimulatorProps {
  type: string;
}

export default function InteractiveLessonSimulator({ type }: SimulatorProps) {
  // 1. Semantic DOM Visualizer
  if (type === 'semantic_dom') {
    return <SemanticDomSimulator />;
  }

  // 2. Box Model Interactive Sliders
  if (type === 'box_model') {
    return <BoxModelSimulator />;
  }

  // 3. Flexbox vs Grid Interactive Toggle
  if (type === 'flex_vs_grid') {
    return <FlexVsGridSimulator />;
  }

  // 4. Tailwind Breakpoints Simulator
  if (type === 'tailwind_breakpoints') {
    return <TailwindBreakpointsSimulator />;
  }

  // 5. Virtual DOM Diffing Simulator
  if (type === 'virtual_dom_diff') {
    return <VirtualDomSimulator />;
  }

  // 6. useState Snapshot Simulator
  if (type === 'use_state_sim') {
    return <UseStateSimulator />;
  }

  // 7. useEffect Lifecycle Simulator
  if (type === 'use_effect_sim') {
    return <UseEffectSimulator />;
  }

  // 8. RSC vs Client Components
  if (type === 'rsc_vs_client') {
    return <RscVsClientSimulator />;
  }

  // 9. App Router File-System Tree
  if (type === 'app_router_tree') {
    return <AppRouterTreeSimulator />;
  }

  // 10. Server Actions
  if (type === 'server_actions') {
    return <ServerActionsSimulator />;
  }

  // 11. Vercel CI/CD Pipeline
  if (type === 'vercel_pipeline') {
    return <VercelPipelineSimulator />;
  }

  // Default fallback
  return <TailwindBreakpointsSimulator />;
}

// ==========================================
// 1. SEMANTIC DOM TREE SIMULATOR
// ==========================================
function SemanticDomSimulator() {
  const [selectedTag, setSelectedTag] = useState<string>('main');

  const tagDetails: Record<string, { role: string; a11y: string; seo: string; desc: string }> = {
    header: {
      role: 'banner',
      a11y: 'Top-level landmark for page or section introduction.',
      seo: 'Contains site title and primary branding.',
      desc: 'Introductory container typically wrapping logo, navigation, and search.',
    },
    nav: {
      role: 'navigation',
      a11y: 'Screen readers provide direct jump shortcuts to this landmark.',
      seo: 'High authority internal site link graph.',
      desc: 'Contains primary or secondary navigation links.',
    },
    main: {
      role: 'main',
      a11y: 'The single dominant content region of the document. Only 1 per page.',
      seo: 'Primary indexable text and media evaluated by search crawlers.',
      desc: 'Contains unique content distinct from repeated headers or footers.',
    },
    article: {
      role: 'article',
      a11y: 'Self-contained, syndicatable composition (blog post, news story).',
      seo: 'Critical for Google Rich Snippets and Schema.org Article data.',
      desc: 'Independently distributable content block that makes sense on its own.',
    },
    aside: {
      role: 'complementary',
      a11y: 'Secondary content tangentially related to the surrounding context.',
      seo: 'Provides contextual metadata, related tags, or sidebars.',
      desc: 'Sidebar, callout box, or glossary related to main article.',
    },
    footer: {
      role: 'contentinfo',
      a11y: 'Closing landmark containing authorship, legal, and copyright.',
      seo: 'Contains sitemap, privacy policies, and contact information.',
      desc: 'Standardized footer for copyright, terms, and auxiliary links.',
    },
  };

  const current = tagDetails[selectedTag] || tagDetails.main;

  return (
    <div className="space-y-4">
      <div className="text-xs text-slate-400">
        Click any semantic HTML tag below to inspect its accessibility landmark, SEO weight, and DOM tree hierarchy:
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Visual DOM Tree Mockup */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono select-none">
          <div className="text-slate-400">&lt;!DOCTYPE html&gt;</div>
          <div className="text-slate-400">&lt;html lang=&quot;en&quot;&gt;</div>
          <div className="pl-3 space-y-2">
            <button
              onClick={() => setSelectedTag('header')}
              className={`w-full text-left p-2 rounded-lg border transition ${
                selectedTag === 'header'
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-950'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              &lt;header role=&quot;banner&quot;&gt;
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTag('nav');
                }}
                className={`ml-4 mt-1 block px-2 py-1 rounded border text-[11px] ${
                  selectedTag === 'nav'
                    ? 'bg-purple-500/30 border-purple-400 text-purple-200'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400'
                }`}
              >
                &lt;nav aria-label=&quot;Primary&quot;&gt; Links... &lt;/nav&gt;
              </button>
            </button>

            <button
              onClick={() => setSelectedTag('main')}
              className={`w-full text-left p-2 rounded-lg border transition ${
                selectedTag === 'main'
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-950'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              &lt;main id=&quot;content&quot;&gt;
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTag('article');
                  }}
                  className={`p-1.5 rounded border text-[11px] ${
                    selectedTag === 'article'
                      ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                      : 'bg-slate-800/80 border-slate-700 text-slate-400'
                  }`}
                >
                  &lt;article&gt; Post &lt;/article&gt;
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTag('aside');
                  }}
                  className={`p-1.5 rounded border text-[11px] ${
                    selectedTag === 'aside'
                      ? 'bg-amber-500/30 border-amber-400 text-amber-200'
                      : 'bg-slate-800/80 border-slate-700 text-slate-400'
                  }`}
                >
                  &lt;aside&gt; Sidebar &lt;/aside&gt;
                </button>
              </div>
            </button>

            <button
              onClick={() => setSelectedTag('footer')}
              className={`w-full text-left p-2 rounded-lg border transition ${
                selectedTag === 'footer'
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-950'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              &lt;footer role=&quot;contentinfo&quot;&gt; &copy; 2026 NextGen &lt;/footer&gt;
            </button>
          </div>
          <div className="text-slate-400">&lt;/html&gt;</div>
        </div>

        {/* Selected Tag Inspector Card */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono text-cyan-400 font-bold text-sm">
              &lt;{selectedTag}&gt;
            </span>
            <span className="font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              role=&quot;{current.role}&quot;
            </span>
          </div>

          <p className="text-slate-300 leading-relaxed">{current.desc}</p>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div>
              <span className="text-purple-400 font-semibold block">Screen Reader / A11y:</span>
              <span className="text-slate-400">{current.a11y}</span>
            </div>
            <div>
              <span className="text-emerald-400 font-semibold block">SEO & Web Crawler Impact:</span>
              <span className="text-slate-400">{current.seo}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. CSS BOX MODEL INTERACTIVE SLIDERS
// ==========================================
function BoxModelSimulator() {
  const [contentWidth, setContentWidth] = useState<number>(240);
  const [padding, setPadding] = useState<number>(20);
  const [border, setBorder] = useState<number>(4);
  const [margin, setMargin] = useState<number>(16);
  const [boxSizing, setBoxSizing] = useState<'border-box' | 'content-box'>('border-box');

  const totalCalculatedWidth =
    boxSizing === 'border-box'
      ? contentWidth + margin * 2
      : contentWidth + (padding + border + margin) * 2;

  const innerContentComputedWidth =
    boxSizing === 'border-box'
      ? Math.max(20, contentWidth - (padding + border) * 2)
      : contentWidth;

  return (
    <div className="space-y-4">
      {/* Controls & Box-sizing toggle */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div>
          <label className="text-slate-400 block mb-1">
            Width: <span className="text-cyan-400 font-mono">{contentWidth}px</span>
          </label>
          <input
            type="range"
            min={160}
            max={320}
            value={contentWidth}
            onChange={(e) => setContentWidth(Number(e.target.value))}
            className="w-full accent-cyan-400"
          />
        </div>
        <div>
          <label className="text-slate-400 block mb-1">
            Padding: <span className="text-emerald-400 font-mono">{padding}px</span>
          </label>
          <input
            type="range"
            min={0}
            max={36}
            value={padding}
            onChange={(e) => setPadding(Number(e.target.value))}
            className="w-full accent-emerald-400"
          />
        </div>
        <div>
          <label className="text-slate-400 block mb-1">
            Border: <span className="text-purple-400 font-mono">{border}px</span>
          </label>
          <input
            type="range"
            min={0}
            max={12}
            value={border}
            onChange={(e) => setBorder(Number(e.target.value))}
            className="w-full accent-purple-400"
          />
        </div>
        <div>
          <label className="text-slate-400 block mb-1">
            Margin: <span className="text-amber-400 font-mono">{margin}px</span>
          </label>
          <input
            type="range"
            min={0}
            max={28}
            value={margin}
            onChange={(e) => setMargin(Number(e.target.value))}
            className="w-full accent-amber-400"
          />
        </div>
      </div>

      {/* Box Sizing Toggle */}
      <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
        <span className="text-slate-400">Active box-sizing mode:</span>
        <div className="flex items-center gap-1.5 font-mono">
          <button
            onClick={() => setBoxSizing('border-box')}
            className={`px-2.5 py-1 rounded transition ${
              boxSizing === 'border-box'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            border-box (Modern)
          </button>
          <button
            onClick={() => setBoxSizing('content-box')}
            className={`px-2.5 py-1 rounded transition ${
              boxSizing === 'content-box'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            content-box (Legacy)
          </button>
        </div>
      </div>

      {/* Visual Nested Concentric Boxes */}
      <div className="relative p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden min-h-[200px]">
        {/* Margin Box */}
        <div
          className="border-2 border-dashed border-amber-500/40 bg-amber-500/5 transition-all flex items-center justify-center p-2"
          style={{ padding: `${margin}px` }}
        >
          {/* Border Box */}
          <div
            className="bg-purple-500/10 border-purple-500 transition-all flex items-center justify-center"
            style={{
              borderWidth: `${border}px`,
              borderStyle: 'solid',
            }}
          >
            {/* Padding Box */}
            <div
              className="bg-emerald-500/10 border border-emerald-500/30 transition-all flex items-center justify-center"
              style={{ padding: `${padding}px` }}
            >
              {/* Content Box */}
              <div
                className="bg-cyan-500/20 border border-cyan-400 rounded p-2 text-center text-xs font-mono text-cyan-300 transition-all shadow-inner"
                style={{ width: `${innerContentComputedWidth}px` }}
              >
                <div className="font-bold">Content</div>
                <div className="text-[10px] text-cyan-400">
                  {innerContentComputedWidth}px × 40px
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Computed Arithmetic Result */}
      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono flex flex-wrap items-center justify-between gap-2">
        <span className="text-slate-400">Total Computed Footprint:</span>
        <span className="text-emerald-400 font-bold">{totalCalculatedWidth}px</span>
        <span className="text-[11px] text-slate-400">
          {boxSizing === 'border-box'
            ? `Width(${contentWidth}px) + Margin(${margin * 2}px)`
            : `Content(${contentWidth}px) + Pad(${padding * 2}px) + Border(${border * 2}px) + Margin(${margin * 2}px)`}
        </span>
      </div>
    </div>
  );
}

// ==========================================
// 3. FLEXBOX VS GRID INTERACTIVE TOGGLE
// ==========================================
function FlexVsGridSimulator() {
  const [layoutMode, setLayoutMode] = useState<'flex' | 'grid'>('flex');
  const [flexDirection, setFlexDirection] = useState<'row' | 'column'>('row');
  const [justifyContent, setJustifyContent] = useState<string>('space-between');

  return (
    <div className="space-y-4">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
        <span className="text-slate-400">Layout Primitive:</span>
        <div className="flex gap-2">
          <button
            onClick={() => setLayoutMode('flex')}
            className={`px-3 py-1.5 rounded-lg font-mono transition ${
              layoutMode === 'flex'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Flexbox (1D Single Axis)
          </button>
          <button
            onClick={() => setLayoutMode('grid')}
            className={`px-3 py-1.5 rounded-lg font-mono transition ${
              layoutMode === 'grid'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            CSS Grid (2D Dual Axis)
          </button>
        </div>
      </div>

      {/* Flex controls if in flex mode */}
      {layoutMode === 'flex' && (
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Direction:</span>
            <button
              onClick={() => setFlexDirection('row')}
              className={`px-2 py-1 rounded text-[11px] ${
                flexDirection === 'row' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              row
            </button>
            <button
              onClick={() => setFlexDirection('column')}
              className={`px-2 py-1 rounded text-[11px] ${
                flexDirection === 'column' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              column
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Justify:</span>
            {['flex-start', 'center', 'space-between'].map((j) => (
              <button
                key={j}
                onClick={() => setJustifyContent(j)}
                className={`px-2 py-1 rounded text-[11px] font-mono ${
                  justifyContent === j ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {j}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Live Canvas Mockup */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 min-h-[160px] flex items-center justify-center">
        {layoutMode === 'flex' ? (
          <div
            className="w-full h-full min-h-[130px] p-2 rounded-lg border border-dashed border-cyan-500/30 flex transition-all gap-3"
            style={{
              flexDirection,
              justifyContent: justifyContent as any,
              alignItems: 'center',
            }}
          >
            {['Item 1 (Nav)', 'Item 2 (Search)', 'Item 3 (Profile)'].map((item, idx) => (
              <div
                key={idx}
                className="px-3 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs shadow"
              >
                {item}
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full grid grid-cols-3 gap-3 p-2 rounded-lg border border-dashed border-purple-500/30">
            <div className="col-span-3 p-2.5 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-200 text-xs font-mono text-center">
              Header Track (col-span-3)
            </div>
            <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono text-center">
              Sidebar
            </div>
            <div className="col-span-2 p-2.5 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-200 text-xs font-mono text-center">
              Main Feed (col-span-2)
            </div>
            <div className="col-span-3 p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono text-center">
              Footer Track
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. TAILWIND BREAKPOINTS SIMULATOR
// ==========================================
function TailwindBreakpointsSimulator() {
  const [viewportWidth, setViewportWidth] = useState<number>(768);

  // Determine current active breakpoint
  let activeBreakpoint = 'Mobile (<640px)';
  let activePrefix = 'base (unprefixed)';
  let columns = 1;

  if (viewportWidth >= 1280) {
    activeBreakpoint = 'xl (≥1280px)';
    activePrefix = 'xl:';
    columns = 4;
  } else if (viewportWidth >= 1024) {
    activeBreakpoint = 'lg (≥1024px)';
    activePrefix = 'lg:';
    columns = 3;
  } else if (viewportWidth >= 768) {
    activeBreakpoint = 'md (≥768px)';
    activePrefix = 'md:';
    columns = 3;
  } else if (viewportWidth >= 640) {
    activeBreakpoint = 'sm (≥640px)';
    activePrefix = 'sm:';
    columns = 2;
  }

  return (
    <div className="space-y-4">
      {/* Slider Controls */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Monitor className="w-4 h-4 text-cyan-400" />
            Drag Viewport Width Slider:
          </span>
          <span className="font-mono text-cyan-400 font-bold">{viewportWidth}px</span>
        </div>
        <input
          type="range"
          min={320}
          max={1280}
          value={viewportWidth}
          onChange={(e) => setViewportWidth(Number(e.target.value))}
          className="w-full accent-cyan-400"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-400 px-1">
          <span>320px (Mobile)</span>
          <span>640px (sm)</span>
          <span>768px (md)</span>
          <span>1024px (lg)</span>
          <span>1280px (xl)</span>
        </div>
      </div>

      {/* Active Breakpoint Pill Banner */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Active Rule:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono font-bold">
            {activeBreakpoint}
          </span>
        </div>
        <div className="text-emerald-400 font-mono font-bold">
          Columns: {columns}
        </div>
      </div>

      {/* Simulated Viewport Frame */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center overflow-x-auto">
        <div
          className="transition-all duration-300 bg-slate-900/90 border border-slate-700 rounded-xl p-4 shadow-xl"
          style={{ width: `${Math.min(100, Math.max(45, (viewportWidth / 1280) * 100))}%` }}
        >
          <div className="text-[10px] font-mono text-slate-400 mb-2 flex items-center justify-between border-b border-slate-800 pb-1">
            <span>Viewport Screen</span>
            <span>{viewportWidth}px</span>
          </div>

          <div
            className="grid gap-2 transition-all duration-300"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className="p-3 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-center font-mono text-xs"
              >
                Item #{num}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. VIRTUAL DOM DIFFING SIMULATOR
// ==========================================
function VirtualDomSimulator() {
  const [count, setCount] = useState<number>(0);
  const [diffHighlight, setDiffHighlight] = useState<boolean>(false);

  const handleUpdate = () => {
    setCount((c) => c + 1);
    setDiffHighlight(true);
    setTimeout(() => setDiffHighlight(false), 900);
  };

  return (
    <div className="space-y-4">
      <div className="text-xs text-slate-400">
        Click the button below to mutate state. Watch React Fiber compare the Virtual DOM trees and surgically patch ONLY the altered leaf node in the Real DOM:
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-950 transition active:scale-95"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Trigger State Update (count = {count})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Virtual DOM Fiber Tree */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
          <div className="text-purple-400 font-bold flex items-center justify-between">
            <span>React Fiber WorkInProgress Tree</span>
            <span className="text-[10px] text-slate-400">In-Memory Memory Graph</span>
          </div>
          <div className="pl-3 border-l border-slate-800 space-y-1 text-slate-400">
            <div>&lt;App /&gt; (No Change)</div>
            <div className="pl-3 border-l border-slate-800 space-y-1">
              <div>&lt;Header /&gt; (Memoized, Skip)</div>
              <div
                className={`p-1.5 rounded border transition-all ${
                  diffHighlight
                    ? 'bg-purple-500/30 border-purple-400 text-purple-200 font-bold animate-pulse'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                &lt;Counter value={count} /&gt;
                <span className="block text-[10px] text-purple-400">
                  {diffHighlight ? '⚡ DIFF DETECTED: Props changed' : 'Fiber node stable'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Real Browser DOM */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
          <div className="text-emerald-400 font-bold flex items-center justify-between">
            <span>Real Browser DOM</span>
            <span className="text-[10px] text-slate-400">HTML Renderer</span>
          </div>
          <div className="pl-3 border-l border-slate-800 space-y-1 text-slate-400">
            <div>&lt;div id=&quot;root&quot;&gt; (Preserved)</div>
            <div className="pl-3 border-l border-slate-800 space-y-1">
              <div>&lt;h1&gt;Header&lt;/h1&gt; (Preserved, 0 repaints)</div>
              <div
                className={`p-1.5 rounded border transition-all ${
                  diffHighlight
                    ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                &lt;span&gt;Count: {count}&lt;/span&gt;
                <span className="block text-[10px] text-emerald-400">
                  {diffHighlight ? '✅ Repainted: 1 DOM node mutation' : 'DOM idle'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. USE_STATE SNAPSHOT SIMULATOR
// ==========================================
function UseStateSimulator() {
  const [count, setCount] = useState<number>(0);
  const [log, setLog] = useState<string[]>([]);

  const handleTripleBuggy = () => {
    // Closes over current snapshot of count
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    setLog((prev) => [
      `[Snapshot Call] 3x setCount(count + 1) where count was ${count} -> Result will only be +1!`,
      ...prev.slice(0, 4),
    ]);
  };

  const handleTripleFunctional = () => {
    // Functional updater reads pending state
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setLog((prev) => [
      `[Functional Call] 3x setCount(prev => prev + 1) -> Accurately increments by +3!`,
      ...prev.slice(0, 4),
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
        <span className="text-slate-400">Current Render State:</span>
        <span className="text-cyan-400 font-mono font-bold text-base">count = {count}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={handleTripleBuggy}
          className="p-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-left transition space-y-1"
        >
          <div className="font-bold text-xs flex items-center justify-between">
            <span>Triple Direct Increment</span>
            <span className="text-[10px] bg-rose-500/20 px-1.5 py-0.5 rounded">Buggy</span>
          </div>
          <div className="font-mono text-[11px] text-slate-300">
            setCount(count + 1); // 3 times
          </div>
        </button>

        <button
          onClick={handleTripleFunctional}
          className="p-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-left transition space-y-1"
        >
          <div className="font-bold text-xs flex items-center justify-between">
            <span>Triple Functional Updater</span>
            <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded">Correct</span>
          </div>
          <div className="font-mono text-[11px] text-slate-300">
            setCount(prev =&gt; prev + 1); // 3 times
          </div>
        </button>
      </div>

      {/* Log Output */}
      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1 max-h-32 overflow-y-auto">
        <div className="text-slate-400 font-bold mb-1">State Batching Telemetry Log:</div>
        {log.length === 0 ? (
          <div className="text-slate-400">Click either button above to see batching behavior...</div>
        ) : (
          log.map((entry, idx) => (
            <div key={idx} className="text-cyan-300">
              {entry}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ==========================================
// 7. USE_EFFECT LIFECYCLE SIMULATOR
// ==========================================
function UseEffectSimulator() {
  const [activeTab, setActiveTab] = useState<'empty_deps' | 'with_deps' | 'no_deps'>('empty_deps');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 text-xs">
        <button
          onClick={() => setActiveTab('empty_deps')}
          className={`p-2 rounded-lg font-mono text-center transition ${
            activeTab === 'empty_deps'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
              : 'bg-slate-900 border border-slate-800 text-slate-400'
          }`}
        >
          useEffect(..., [])
        </button>
        <button
          onClick={() => setActiveTab('with_deps')}
          className={`p-2 rounded-lg font-mono text-center transition ${
            activeTab === 'with_deps'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
              : 'bg-slate-900 border border-slate-800 text-slate-400'
          }`}
        >
          useEffect(..., [id])
        </button>
        <button
          onClick={() => setActiveTab('no_deps')}
          className={`p-2 rounded-lg font-mono text-center transition ${
            activeTab === 'no_deps'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
              : 'bg-slate-900 border border-slate-800 text-slate-400'
          }`}
        >
          useEffect(...) (No Deps)
        </button>
      </div>

      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3 font-mono">
        {activeTab === 'empty_deps' && (
          <div className="space-y-2 text-slate-300">
            <div className="text-cyan-400 font-bold">Mount & Unmount Only:</div>
            <p className="text-slate-400 leading-relaxed font-sans">
              Executes once when the component is inserted into the DOM. The returned cleanup function runs when the component unmounts. Ideal for one-time event listeners or subscriptions.
            </p>
            <div className="p-2 rounded bg-slate-900 text-cyan-300 border border-slate-800">
              Mount ➔ Run Effect ➔ (Idle during re-renders) ➔ Unmount ➔ Run Cleanup
            </div>
          </div>
        )}

        {activeTab === 'with_deps' && (
          <div className="space-y-2 text-slate-300">
            <div className="text-purple-400 font-bold">Reactive Dependency Watcher:</div>
            <p className="text-slate-400 leading-relaxed font-sans">
              Runs on mount, and re-runs whenever <code className="text-purple-300">id</code> changes by shallow comparison (Object.is). Always runs cleanup for previous ID before initiating next run.
            </p>
            <div className="p-2 rounded bg-slate-900 text-purple-300 border border-slate-800">
              Mount ➔ Run Effect ➔ ID Changes ➔ Run Previous Cleanup ➔ Run New Effect
            </div>
          </div>
        )}

        {activeTab === 'no_deps' && (
          <div className="space-y-2 text-slate-300">
            <div className="text-rose-400 font-bold">Every Single Render (Danger Zone):</div>
            <p className="text-slate-400 leading-relaxed font-sans">
              Without dependencies, this effect runs after EVERY render. If this effect sets state, it triggers an infinite re-render loop that freezes the browser tab.
            </p>
            <div className="p-2 rounded bg-rose-950/40 text-rose-300 border border-rose-800">
              ⚠️ Warning: Calling setState here without dependencies causes an infinite crash loop.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 8. RSC VS CLIENT COMPONENTS
// ==========================================
function RscVsClientSimulator() {
  const [componentType, setComponentType] = useState<'rsc' | 'client'>('rsc');

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-3 text-xs">
        <button
          onClick={() => setComponentType('rsc')}
          className={`px-4 py-2 rounded-xl font-mono transition ${
            componentType === 'rsc'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold'
              : 'bg-slate-900 border border-slate-800 text-slate-400'
          }`}
        >
          React Server Component (RSC)
        </button>
        <button
          onClick={() => setComponentType('client')}
          className={`px-4 py-2 rounded-xl font-mono transition ${
            componentType === 'client'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
              : 'bg-slate-900 border border-slate-800 text-slate-400'
          }`}
        >
          Client Component (&apos;use client&apos;)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-slate-400 text-[11px]">Bundle Size Shipped to Client</div>
          <div
            className={`font-mono text-base font-bold ${
              componentType === 'rsc' ? 'text-emerald-400' : 'text-amber-400'
            }`}
          >
            {componentType === 'rsc' ? '0 KB (Zero JS)' : '~14 KB + Hydration'}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-slate-400 text-[11px]">Direct DB & Backend Access</div>
          <div
            className={`font-mono text-base font-bold ${
              componentType === 'rsc' ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {componentType === 'rsc' ? '✅ Allowed (Direct async/await)' : '❌ Prohibited (Requires API)'}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-slate-400 text-[11px]">Interactivity & State</div>
          <div
            className={`font-mono text-base font-bold ${
              componentType === 'rsc' ? 'text-slate-400' : 'text-cyan-400'
            }`}
          >
            {componentType === 'rsc' ? '❌ Static HTML Stream' : '✅ useState / onClick'}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. APP ROUTER FILE-SYSTEM SIMULATOR
// ==========================================
function AppRouterTreeSimulator() {
  const [selectedFile, setSelectedFile] = useState<string>('layout');

  const files: Record<string, { role: string; desc: string; sample: string }> = {
    layout: {
      role: 'Persistent Shell & State Preservation',
      desc: 'Shared UI that wraps pages. Does not re-render or lose scroll position on navigation.',
      sample: 'export default function RootLayout({ children }: { children: React.ReactNode })',
    },
    page: {
      role: 'Unique Route UI Endpoint',
      desc: 'Makes a route publicly accessible. Represents the main content of the current URL path.',
      sample: 'export default function Page() { return <main>Dashboard</main>; }',
    },
    loading: {
      role: 'Automatic React Suspense Boundary',
      desc: 'Shows an instantaneous skeleton fallback while the server streams async page data.',
      sample: 'export default function Loading() { return <SkeletonCard />; }',
    },
    error: {
      role: 'Isolated Error Boundary (Client Component)',
      desc: 'Catches runtime exceptions in the subtree without crashing the entire app shell.',
      sample: "'use client'; export default function Error({ error, reset }: { ... })",
    },
  };

  const current = files[selectedFile] || files.layout;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        {Object.keys(files).map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFile(f)}
            className={`p-2 rounded-lg font-mono text-center transition ${
              selectedFile === f
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400'
            }`}
          >
            {f}.tsx
          </button>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
        <div className="flex items-center justify-between text-cyan-400 font-bold">
          <span>{selectedFile}.tsx Specification</span>
          <span className="text-slate-400 text-[10px]">{current.role}</span>
        </div>
        <p className="text-slate-300 font-sans leading-relaxed">{current.desc}</p>
        <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 text-[11px]">
          {current.sample}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 10. SERVER ACTIONS SIMULATOR
// ==========================================
function ServerActionsSimulator() {
  const [status, setStatus] = useState<string>('idle');
  const [email, setEmail] = useState<string>('');

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('validating');
    setTimeout(() => {
      if (!email.includes('@')) {
        setStatus('error');
      } else {
        setStatus('success');
      }
    }, 600);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSimulate} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter email (e.g. dev@vercel.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
        >
          Invoke Action
        </button>
      </form>

      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
        <div className="text-slate-400 mb-1">Server Action Lifecycle:</div>
        {status === 'idle' && <div className="text-slate-400">Ready to invoke &apos;use server&apos; mutation...</div>}
        {status === 'validating' && <div className="text-cyan-400 animate-pulse">Running Zod parsing on Node/Edge runtime...</div>}
        {status === 'error' && (
          <div className="text-rose-400 font-bold">
            ❌ Zod Error: Invalid email format. Server rejected mutation.
          </div>
        )}
        {status === 'success' && (
          <div className="text-emerald-400 font-bold">
            ✅ Validated! Database written, revalidatePath(&apos;/&apos;) triggered.
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 11. VERCEL CI/CD PIPELINE SIMULATOR
// ==========================================
function VercelPipelineSimulator() {
  const [stage, setStage] = useState<number>(0);
  const stages = [
    { title: 'Git Push', desc: 'Commit tagged with SHA pushed to GitHub' },
    { title: 'Static Analysis', desc: 'Next.js linting & TypeScript type checking' },
    { title: 'Bundle & Tree Shake', desc: 'Serverless Functions & Edge Middleware optimization' },
    { title: 'Global Edge Deploy', desc: 'Propagation across 300+ Edge POP locations' },
  ];

  const handleStep = () => {
    setStage((s) => (s + 1) % stages.length);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">Continuous Deployment Pipeline:</span>
        <button
          onClick={handleStep}
          className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono transition"
        >
          Advance Stage ➔
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {stages.map((st, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl border text-xs space-y-1 transition ${
              idx <= stage
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <div className="font-mono font-bold flex items-center justify-between">
              <span>0{idx + 1}</span>
              {idx <= stage && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </div>
            <div className="font-semibold text-white">{st.title}</div>
            <div className="text-[10px] text-slate-400">{st.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
