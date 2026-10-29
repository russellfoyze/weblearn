import { RoadmapPhase } from '@/types';

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 1,
    title: 'Phase 1: Web Foundations',
    subtitle: 'HTML5 Semantic Tree & CSS3 Box Mechanics',
    badge: 'Foundations',
    color: 'from-cyan-500 to-blue-600',
    accentBorder: 'border-cyan-500/30',
    iconName: 'Globe',
    description:
      'Master the raw building blocks of the web: semantic DOM architecture, dimensional box-model physics, and 1D vs 2D layout systems.',
    lessons: [
      {
        id: '1-1',
        title: 'Semantic HTML5 & DOM Tree Architecture',
        shortDesc: 'Structure accessible, SEO-optimized web documents using semantic elements.',
        phaseId: 1,
        duration: '15 min',
        difficulty: 'Beginner',
        tags: ['HTML5', 'Semantic Web', 'Accessibility', 'SEO'],
        interactiveType: 'semantic_dom',
        summary:
          'Semantic HTML elements clearly describe their meaning to both the browser and screen readers, establishing a logical accessibility tree.',
        deepDive:
          'Replacing generic <div> tags with <header>, <nav>, <main>, <article>, <aside>, and <footer> grants automatic landmark roles to assistive tech, drastically improves crawler indexation, and forms a clean DOM hierarchy for CSS scoping.',
        codeSnippet: `<!-- Production Semantic Shell -->
<header role="banner" class="sticky top-0 z-50">
  <nav aria-label="Main Navigation">
    <a href="/" class="logo font-bold">NextGen</a>
    <ul class="flex gap-4">
      <li><a href="/roadmap">Roadmap</a></li>
      <li><a href="/docs">Docs</a></li>
    </ul>
  </nav>
</header>

<main id="main-content" class="container mx-auto">
  <article class="prose">
    <header>
      <h1>Full-Stack Mastery</h1>
      <time datetime="2026-10-29">October 29, 2026</time>
    </header>
    <p>Semantic markup empowers accessibility engines.</p>
  </article>
  
  <aside aria-label="Complementary Insights">
    <h3>Quick Reference</h3>
  </aside>
</main>

<footer role="contentinfo">
  <p>&copy; 2026 NextGen Mastery. MIT Licensed.</p>
</footer>`,
        language: 'html',
        bestPractices: [
          'Always use a single <main> landmark per document.',
          'Provide descriptive aria-label on <nav> when multiple navs exist.',
          'Maintain logical heading order: <h1> through <h6> with zero skipped levels.',
          'Include skip-to-content links for keyboard navigators.',
        ],
        commonMistakes: [
          'Div-soup: nesting 12 layers of <div> with no semantic boundaries.',
          'Using <b> or <i> instead of <strong> or <em> for emphasis.',
          'Placing interactive elements (e.g. <button>) inside <a> tags.',
        ],
      },
      {
        id: '1-2',
        title: 'CSS3 Box Model & Sizing Metrics',
        shortDesc: 'Master Margin, Border, Padding, and border-box sizing arithmetic.',
        phaseId: 1,
        duration: '20 min',
        difficulty: 'Beginner',
        tags: ['CSS3', 'Box Model', 'Dimensions', 'Layout'],
        interactiveType: 'box_model',
        summary:
          'Every visual element on the web is represented as a rectangular box comprising Content, Padding, Border, and Margin.',
        deepDive:
          'In standard content-box sizing, width specifies only the content area; adding padding and border inflates the element beyond its set width. In modern border-box sizing, width includes content, padding, and border, eliminating unexpected layout breaks.',
        codeSnippet: `/* Universal Modern CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Dimension Arithmetic Demo */
.card-preview {
  width: 320px;
  padding: 24px;
  border: 2px solid #06b6d4;
  margin: 16px auto;
  
  /* With border-box:
     Content Width = 320 - (24 * 2) - (2 * 2) = 268px
     Total Footprint = 320px (+ 16px external margin)
  */
}`,
        language: 'css',
        bestPractices: [
          'Set universal box-sizing: border-box on all elements.',
          'Use margin for external spacing between siblings; use padding for internal breathing room.',
          'Beware of vertical margin collapse between adjoining block-level elements.',
        ],
        commonMistakes: [
          'Leaving default content-box active, causing 100% width inputs with padding to overflow parents.',
          'Overusing negative margins to hack element positioning.',
          'Mixing inline and block padding on <span> tags without display: inline-block.',
        ],
      },
      {
        id: '1-3',
        title: 'Flexbox (1D) vs. CSS Grid (2D) Matrix',
        shortDesc: 'Choose the exact layout primitive: 1-dimensional flow vs 2-dimensional grid.',
        phaseId: 1,
        duration: '25 min',
        difficulty: 'Beginner',
        tags: ['Flexbox', 'CSS Grid', 'Responsive', 'CSS3'],
        interactiveType: 'flex_vs_grid',
        summary:
          'Flexbox handles single-axis (row OR column) component flows; CSS Grid governs complex dual-axis (row AND column) page structures.',
        deepDive:
          'Use Flexbox for navigation bars, button clusters, centered modals, and linear lists where content size dictates element dimensions. Use CSS Grid for dashboards, card galleries, Holy Grail layouts, and responsive layouts requiring explicit column/row tracks.',
        codeSnippet: `/* Flexbox: 1D Component Alignment */
.nav-cluster {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

/* CSS Grid: 2D Dashboard Gallery */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-template-rows: auto 1fr auto;
  gap: 1.5rem;
}`,
        language: 'css',
        bestPractices: [
          'Use gap property on both Flex and Grid rather than brittle child margins.',
          'Use CSS Grid auto-fit / auto-fill minmax() for effortless responsive layouts without media queries.',
          'Combine Flexbox inside Grid items for clean granular component control.',
        ],
        commonMistakes: [
          'Using CSS Grid for a simple 3-item horizontal button group.',
          'Using floating divs and clearfixes in modern 2026 browsers.',
          'Forgetting flex-wrap: wrap on responsive tag clouds, causing mobile horizontal blowout.',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Phase 2: Modern Styling',
    subtitle: 'Tailwind CSS Mastery & Responsive Breakpoints',
    badge: 'Styling Engine',
    color: 'from-cyan-400 to-teal-500',
    accentBorder: 'border-teal-500/30',
    iconName: 'Palette',
    description:
      'Accelerate UI development with utility-first composition, mobile-first responsive breakpoints, and dark mode design tokens.',
    lessons: [
      {
        id: '2-1',
        title: 'Utility-First Paradigm & Zero-Runtime CSS',
        shortDesc: 'Why utility-first CSS outperforms traditional BEM and CSS-in-JS runtimes.',
        phaseId: 2,
        duration: '20 min',
        difficulty: 'Beginner',
        tags: ['Tailwind CSS', 'Performance', 'Architecture'],
        interactiveType: 'tailwind_breakpoints',
        summary:
          'Tailwind CSS scans your markup to generate minimal, atomic CSS classes at build time with zero client JavaScript runtime overhead.',
        deepDive:
          'Traditional CSS files grow linearly as features expand. With Tailwind CSS, bundle size plateaus under 20kB regardless of app complexity because utility classes are reused endlessly. Eliminates dead-code leaks and naming fatigue.',
        codeSnippet: `// Composable Tailwind UI Component
export function ActionBadge({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={\`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 \${
        active
          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
          : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200'
      }\`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {label}
    </span>
  );
}`,
        language: 'tsx',
        bestPractices: [
          'Use tailwind-merge (twMerge) and clsx to safely handle dynamic class overrides.',
          'Extract repetitive patterns into React components rather than CSS @apply blocks.',
          'Rely on Tailwind theme tokens (e.g. text-slate-400) for strict design consistency.',
        ],
        commonMistakes: [
          'Using arbitrary values for standard sizes (e.g. w-[342px] instead of standard w-80 or w-full).',
          'Writing giant @apply utility classes in global CSS, re-introducing monolithic CSS pitfalls.',
          'Missing Purge/Content configuration paths in tailwind.config.ts.',
        ],
      },
      {
        id: '2-2',
        title: 'Responsive Design & Breakpoint Hierarchy',
        shortDesc: 'Mobile-first design principles with sm, md, lg, xl, and 2xl modifiers.',
        phaseId: 2,
        duration: '25 min',
        difficulty: 'Intermediate',
        tags: ['Tailwind CSS', 'Mobile First', 'Breakpoints'],
        interactiveType: 'tailwind_breakpoints',
        summary:
          'In Tailwind CSS, unprefixed utilities apply to mobile devices, while prefixed modifiers (md:, lg:) target larger screens.',
        deepDive:
          'Tailwind uses min-width media queries exclusively. An unprefixed class like `grid-cols-1` sets the baseline for 0px width. Adding `md:grid-cols-3` changes columns once the viewport reaches 768px. Never design desktop-first and override down.',
        codeSnippet: `<!-- Strictly Mobile-First Grid Container -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 sm:p-6 lg:p-8">
  <div class="col-span-1 sm:col-span-2 md:col-span-1 bg-slate-900 rounded-xl p-4">
    Featured Metric
  </div>
  <div class="bg-slate-900 rounded-xl p-4">Metric 2</div>
  <div class="bg-slate-900 rounded-xl p-4">Metric 3</div>
  <div class="bg-slate-900 rounded-xl p-4">Metric 4</div>
</div>`,
        language: 'html',
        bestPractices: [
          'Always style the mobile layout first without breakpoint prefixes.',
          'Verify touch targets are at least 44x44px on mobile viewports.',
          'Use overflow-x-hidden on root wrapper to prevent horizontal mobile scrolling bugs.',
        ],
        commonMistakes: [
          'Using max-w-* without a responsive w-full, causing horizontal overflows on small screens.',
          'Overriding styles with desktop-first thinking (e.g., trying to write max-md: utilities).',
          'Hardcoding fixed pixel widths on container elements.',
        ],
      },
      {
        id: '2-3',
        title: 'Dark Mode Architecture & Theme Tokens',
        shortDesc: 'Implement flicker-free dark mode with class strategy and CSS variables.',
        phaseId: 2,
        duration: '20 min',
        difficulty: 'Intermediate',
        tags: ['Dark Mode', 'Tailwind CSS', 'Theme'],
        interactiveType: 'tailwind_dark_mode',
        summary:
          'Build seamless dark and light theme switching with Tailwind dark: variants and HTML class synchronization.',
        deepDive:
          'By setting darkMode: "class" in tailwind.config.ts, you gain deterministic control over the active theme. Pair with a tiny inline head script in layout.tsx to read localStorage before React hydrates, eliminating white flash on page reload.',
        codeSnippet: `// tailwind.config.ts
export default {
  darkMode: 'class', // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      }
    }
  }
}

// React Theme Toggle Component
export function ThemeToggle({ isDark, toggle }: { isDark: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 transition"
      aria-label="Toggle Color Theme"
    >
      {isDark ? '🌙 Dark Active' : '☀️ Light Active'}
    </button>
  );
}`,
        language: 'tsx',
        bestPractices: [
          'Store theme preference in localStorage and fall back to prefers-color-scheme.',
          'Inject a synchronous inline script in root HTML to prevent theme flash (FOUC).',
          'Use high contrast dark backgrounds like #0B0F19 rather than pure black #000000 for reduced eye strain.',
        ],
        commonMistakes: [
          'Relying solely on media query dark mode, preventing users from overriding manually.',
          'Hardcoding light colors without dark: counterparts.',
          'Triggering layout shift when theme toggles by swapping borders for shadows.',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Phase 3: React.js Core & Advanced Hooks',
    subtitle: 'Virtual DOM Diffing, Reactive State & Fiber Lifecycle',
    badge: 'Component Engine',
    color: 'from-purple-500 to-indigo-600',
    accentBorder: 'border-purple-500/30',
    iconName: 'Atom',
    description:
      'Master the internal mechanisms of React 18: Fiber reconciliation, deterministic state updates, effect lifecycles, and context data trees.',
    lessons: [
      {
        id: '3-1',
        title: 'Virtual DOM Reconciliation & React Fiber',
        shortDesc: 'Understand how React diffs JSX trees and updates the real DOM with minimal mutations.',
        phaseId: 3,
        duration: '25 min',
        difficulty: 'Intermediate',
        tags: ['React 18', 'Virtual DOM', 'Fiber', 'Reconciliation'],
        interactiveType: 'virtual_dom_diff',
        summary:
          'React maintains an in-memory Virtual DOM representation. When state changes, React diffs the old and new Fiber trees and batches updates to the real DOM.',
        deepDive:
          'The React Fiber engine breaks rendering into interruptible units of work. By using stable keys in lists, React tracks items across re-renders without destroying and recreating DOM nodes, preserving input focus and CSS animations.',
        codeSnippet: `// Correct Keyed Rendering prevents DOM Recreation
export function TodoList({ items }: { items: { id: string; text: string }[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        // STABLE ID KEY: React recognizes item identity during diffing
        <li key={item.id} className="p-3 bg-slate-900 rounded-lg flex items-center justify-between">
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}`,
        language: 'tsx',
        bestPractices: [
          'Always use unique, stable IDs for list keys—never use array index for dynamic lists.',
          'Keep components pure: given the same props and state, they must return the same JSX.',
          'Extract heavy child components and wrap with React.memo only when profiler proves re-render bottlenecks.',
        ],
        commonMistakes: [
          'Using Math.random() as a key, forcing React to wipe and rebuild the entire DOM tree every frame.',
          'Mutating props or state objects directly instead of creating new object references.',
          'Performing side effects inside the component render body rather than in useEffect.',
        ],
      },
      {
        id: '3-2',
        title: 'useState & Deterministic State Machine Snapshots',
        shortDesc: 'Master asynchronous batching, functional updates, and state snapshots.',
        phaseId: 3,
        duration: '20 min',
        difficulty: 'Beginner',
        tags: ['React', 'useState', 'State Management'],
        interactiveType: 'use_state_sim',
        summary:
          'State in React behaves like a snapshot per render. Calling setState does not change the variable in the running closure, but schedules a new render.',
        deepDive:
          'In React 18, state updates are automatically batched inside timeouts, promises, and native event handlers. When your next state depends on previous state, always pass an updater function: `setCount(prev => prev + 1)` to prevent race condition bugs.',
        codeSnippet: `export function Counter() {
  const [count, setCount] = useState<number>(0);

  const handleIncrementTriple = () => {
    // Correct: Functional updater passes latest snapshot
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    // Result: +3
  };

  const handleBuggyTriple = () => {
    // Buggy: All three reference the same closure snapshot
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // Result: only +1!
  };

  return (
    <button onClick={handleIncrementTriple} className="btn-primary">
      Count: {count}
    </button>
  );
}`,
        language: 'tsx',
        bestPractices: [
          'Use functional updates `setState(prev => ...)` when next state depends on current state.',
          'Keep state minimal: compute derived values during render rather than storing duplicates in state.',
          'Group related state variables into a single object or use useReducer for complex logic.',
        ],
        commonMistakes: [
          'Reading state immediately after calling setState and expecting the new value synchronously.',
          'Directly pushing into an array: `items.push(newItem); setItems(items);` (React ignores same reference).',
          'Duplicating props into state without an explicit synchronization contract.',
        ],
      },
      {
        id: '3-3',
        title: 'useEffect Lifecycle & Dependency Mechanics',
        shortDesc: 'Synchronize components with external systems without infinite re-render loops.',
        phaseId: 3,
        duration: '30 min',
        difficulty: 'Intermediate',
        tags: ['React', 'useEffect', 'Lifecycle'],
        interactiveType: 'use_effect_sim',
        summary:
          'useEffect lets you synchronize your component with external systems (APIs, timers, event listeners) after the DOM updates.',
        deepDive:
          'The dependency array instructs React when to rerun the effect. Omitting deps runs on every render; [] runs once on mount; [dep] runs when dep changes. Crucially, always return a cleanup function to unsubscribe listeners, cancel timers, and avoid memory leaks.',
        codeSnippet: `export function LiveClock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    // 1. Setup subscription / timer
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // 2. CRUCIAL: Cleanup function executed on unmount or re-run
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty array = mount & unmount only

  return <div className="font-mono text-cyan-400">{time || 'Syncing...'}</div>;
}`,
        language: 'tsx',
        bestPractices: [
          'Always declare all values referenced inside the effect in the dependency array (or wrap in useCallback).',
          'Always return a cleanup function for event listeners, WebSocket channels, and intervals.',
          'In React 18 Strict Mode, effects run twice in development to verify clean unmount handling.',
        ],
        commonMistakes: [
          'Fetching data in useEffect without an AbortController or cancel flag, causing race condition overwrites.',
          'Mutating state inside useEffect without dependencies, causing an infinite re-render crash.',
          'Using useEffect to synchronize two pieces of internal React state (derive them in render instead).',
        ],
      },
      {
        id: '3-4',
        title: 'Context API vs Custom Hooks Data Flow',
        shortDesc: 'Solve prop-drilling without installing heavy third-party state managers.',
        phaseId: 3,
        duration: '25 min',
        difficulty: 'Intermediate',
        tags: ['React', 'Context API', 'Custom Hooks'],
        interactiveType: 'context_flow',
        summary:
          'Context provides a way to pass data through the component tree without having to pass props down manually at every level.',
        deepDive:
          'Wrap Context with a dedicated custom hook that checks for null to provide developer-friendly error messages if consumed outside the provider. Split state and dispatch contexts to prevent unnecessary re-renders of consuming components.',
        codeSnippet: `// 1. Create typed Context & Custom Hook
interface UserContextType {
  user: { name: string; role: string } | null;
  logout: () => void;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// 2. Provider Implementation
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({ name: 'Alex Developer', role: 'Architect' });
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
}`,
        language: 'tsx',
        bestPractices: [
          'Always export a custom hook like `useUser()` that throws an informative error if unprovided.',
          'Keep Context scoped locally around the subtree that requires it rather than wrapping the entire app.',
          'Memoize context value objects with useMemo if the parent component re-renders frequently.',
        ],
        commonMistakes: [
          'Putting high-frequency changing state (e.g. mouse coordinates) in a global Context, re-rendering all consumers.',
          'Consuming context without checking for undefined fallback.',
          'Using Redux/Zustand when a simple custom hook + Context is all that is needed.',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Phase 4: Next.js Full-Stack Architecture',
    subtitle: 'Server Components (RSC), App Router & Server Actions',
    badge: 'Full-Stack Framework',
    color: 'from-blue-500 to-cyan-500',
    accentBorder: 'border-blue-500/30',
    iconName: 'Server',
    description:
      'Leverage the cutting-edge Next.js App Router: zero-bundle React Server Components, server-side caching, Server Actions, and streaming SSR.',
    lessons: [
      {
        id: '4-1',
        title: 'React Server Components (RSC) vs Client Components',
        shortDesc: 'Understand the hydration boundary, zero client bundle cost, and when to use "use client".',
        phaseId: 4,
        duration: '30 min',
        difficulty: 'Advanced',
        tags: ['Next.js', 'RSC', 'App Router', 'Hydration'],
        interactiveType: 'rsc_vs_client',
        summary:
          'In Next.js App Router, all components inside the app directory are React Server Components by default.',
        deepDive:
          'RSCs execute exclusively on the server during build or request time. Their dependencies (like markdown parsers, heavy crypto libraries, or direct database clients) are never shipped to the browser, reducing JavaScript bundle size to zero. You only add "use client" when a component requires browser APIs, state (useState), or event listeners (onClick).',
        codeSnippet: `// app/users/page.tsx (React Server Component by default)
// Zero client JS bundle! Can query DB directly with async/await.
import { db } from '@/lib/db';
import { UserCardClient } from './UserCardClient'; // Client island

export default async function UsersPage() {
  // Direct server-side DB query - credentials never leak to browser!
  const users = await db.query('SELECT id, name, role FROM users');

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Team Directory (RSC)</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {users.map((u) => (
          // Pass serialized props into interactive Client Component
          <UserCardClient key={u.id} user={u} />
        ))}
      </div>
    </main>
  );
}

// app/users/UserCardClient.tsx
'use client'; // Required for browser interactivity
import { useState } from 'react';

export function UserCardClient({ user }: { user: { name: string; role: string } }) {
  const [likes, setLikes] = useState(0);
  return (
    <div className="p-4 bg-slate-900 rounded-xl">
      <h3>{user.name}</h3>
      <button onClick={() => setLikes(l => l + 1)} className="btn-cyan">
        ❤️ {likes}
      </button>
    </div>
  );
}`,
        language: 'tsx',
        bestPractices: [
          'Keep Client Components at the leaves of your component tree to maximize RSC coverage.',
          'Pass Server Components as children to Client Components when nesting is required.',
          'Never put sensitive DB connection strings or secrets inside "use client" files.',
        ],
        commonMistakes: [
          'Putting "use client" at the top of page.tsx or layout.tsx, de-optimizing the entire route subtree.',
          'Passing non-serializable values (functions, class instances) across the RSC-to-Client boundary.',
          'Attempting to use window or localStorage inside a Server Component.',
        ],
      },
      {
        id: '4-2',
        title: 'App Router File-System Hierarchy & Nested Layouts',
        shortDesc: 'Master page.tsx, layout.tsx, loading.tsx, error.tsx, and route groups.',
        phaseId: 4,
        duration: '25 min',
        difficulty: 'Intermediate',
        tags: ['Next.js', 'App Router', 'Routing'],
        interactiveType: 'app_router_tree',
        summary:
          'Next.js uses folder-based routing where folder nesting maps directly to URL paths and UI layout nesting.',
        deepDive:
          'Special reserved filenames provide instant superpowers: layout.tsx preserves state and avoids re-rendering during navigation; loading.tsx wraps subtrees in React Suspense; error.tsx creates an interactive error boundary with retry capability; and route groups `(marketing)` organize files without affecting URL paths.',
        codeSnippet: `// File-System Structure:
// src/app/
// ├── layout.tsx         -> Global Root Layout (html, body, navbar)
// ├── page.tsx           -> Home Route (/)
// ├── loading.tsx        -> Global Suspense skeleton
// ├── error.tsx          -> Global Error boundary
// ├── dashboard/
// │   ├── layout.tsx     -> Persistent Dashboard Sidebar Layout
// │   ├── page.tsx       -> Dashboard Home (/dashboard)
// │   └── settings/
// │       └── page.tsx   -> Settings Page (/dashboard/settings)
// └── (marketing)/       -> Route group: does not add '/marketing' to URL!
//     └── pricing/page.tsx -> URL: /pricing

// src/app/dashboard/error.tsx
'use client'; // Error boundaries MUST be client components

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6 bg-rose-950/40 border border-rose-800 rounded-xl">
      <h2 className="text-rose-400 font-bold">Dashboard Encountered an Error</h2>
      <p className="text-slate-300 text-sm mt-2">{error.message}</p>
      <button onClick={reset} className="mt-4 px-4 py-2 bg-rose-600 rounded-lg text-white">
        Try Again
      </button>
    </div>
  );
}`,
        language: 'tsx',
        bestPractices: [
          'Use layout.tsx for persistent UI like navigation bars and sidebars to retain scroll position.',
          'Use loading.tsx for instant server-streaming Suspense skeletons.',
          'Use error.tsx to isolate failures so one broken component does not crash the entire application.',
        ],
        commonMistakes: [
          'Forgetting "use client" in error.tsx (will cause build failure).',
          'Attempting to export metadata from a "use client" page.tsx (metadata must be in RSC).',
          'Using pages/ and app/ directories simultaneously for the same route.',
        ],
      },
      {
        id: '4-3',
        title: 'Server Actions vs REST Route Handlers',
        shortDesc: 'Mutate data securely with type-safe server actions and cache revalidation.',
        phaseId: 4,
        duration: '30 min',
        difficulty: 'Advanced',
        tags: ['Server Actions', 'Next.js', 'Mutations', 'Security'],
        interactiveType: 'server_actions',
        summary:
          'Server Actions allow Client Components to invoke asynchronous server functions directly without writing manual API endpoints.',
        deepDive:
          'Marked with "use server", Server Actions execute on the server, integrate with form progressive enhancement, support automatic CSRF protection, and allow instantaneous cache revalidation using revalidatePath() or revalidateTag() in a single network round-trip.',
        codeSnippet: `// app/actions/subscribe.ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const Schema = z.object({
  email: z.string().email('Invalid email address format'),
});

export async function subscribeNewsletter(formData: FormData) {
  // 1. Strict Server-Side Validation
  const rawEmail = formData.get('email');
  const parsed = Schema.safeParse({ email: rawEmail });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  // 2. Database Insertion (Runs securely on server)
  // await db.subscribers.create({ data: { email: parsed.data.email } });

  // 3. Instant Cache Invalidation
  revalidatePath('/newsletter');
  return { success: true, message: 'Subscribed successfully!' };
}`,
        language: 'typescript',
        bestPractices: [
          'Always validate form data on the server with Zod or a schema validator.',
          'Always authenticate the user session inside the Server Action before executing mutations.',
          'Use revalidatePath or revalidateTag to refresh stale cached data automatically.',
        ],
        commonMistakes: [
          'Assuming Server Actions are private: anyone can invoke the action endpoint, so always verify auth & role!',
          'Forgetting "use server" at the top of the action file or function body.',
          'Returning sensitive internal database error objects directly to the client.',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Phase 5: Security, Testing & Vercel Deployment',
    subtitle: 'Zero-Vulnerability Auditing & Production CI/CD',
    badge: 'Production Launch',
    color: 'from-emerald-500 to-cyan-500',
    accentBorder: 'border-emerald-500/30',
    iconName: 'Rocket',
    description:
      'Fortify your full-stack application with all 16 mission-critical security controls and deploy seamlessly to Vercel global edge infrastructure.',
    lessons: [
      {
        id: '5-1',
        title: 'The "Make No Mistakes" Production Security Standard',
        shortDesc: 'Eliminate all 13 critical vulnerabilities and 3 launch-blocking anti-patterns.',
        phaseId: 5,
        duration: '35 min',
        difficulty: 'Advanced',
        tags: ['Security', 'OWASP', 'Production', 'Audit'],
        interactiveType: 'vercel_pipeline',
        summary:
          'Before deploying any web application to production, every security control from environment variable isolation to SQL injection prevention must be verified.',
        deepDive:
          'Security is not an afterthought. Modern full-stack architecture requires defense in depth: HttpOnly cookies to defeat XSS token theft, Row-Level Security to prevent IDOR data leaks, Zod schema parsing on every Server Action, and strict CSP headers. Eliminate debug mode and stack trace leaks before launching.',
        codeSnippet: `// src/middleware.ts (Edge Access Control & Route Guard)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session_token')?.value;
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  // Verify Auth before allowing request to reach page
  if (isAdminRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Security Headers Injection
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return response;
}`,
        language: 'typescript',
        bestPractices: [
          'Use Next.js middleware.ts for centralized edge authentication redirects.',
          'Keep sensitive secrets in .env.local and NEVER prefix private keys with NEXT_PUBLIC_.',
          'Implement the complete 16-point Security Checklist in Module C before production release.',
        ],
        commonMistakes: [
          'Checking authorization on client components only, leaving API routes open to curl requests.',
          'Committing .env or .pem files into public GitHub repositories.',
          'Leaving console.log(userPassword) or debug flags enabled in production builds.',
        ],
      },
      {
        id: '5-2',
        title: 'Vercel Edge CI/CD Pipeline & Zero-Downtime Deployment',
        shortDesc: 'From git push to edge serverless deployment with automated preview environments.',
        phaseId: 5,
        duration: '20 min',
        difficulty: 'Intermediate',
        tags: ['Vercel', 'CI/CD', 'Deployment', 'DevOps'],
        interactiveType: 'vercel_pipeline',
        summary:
          'Vercel automatically triggers optimized builds on every git commit, running static analysis, type checking, and deploying to a global edge network.',
        deepDive:
          'Every pull request receives an isolated, production-identical Preview URL. When merged to main, Vercel executes an atomic instant switchover with zero downtime, instant rollback capabilities, and worldwide CDN asset distribution.',
        codeSnippet: `# Terminal: 1-Command Production Deployment
# 1. Test build locally to guarantee zero type errors:
npm run build

# 2. Push to GitHub:
git add .
git commit -m "feat: complete nextgen full-stack app"
git push origin main

# 3. Optional: Deploy directly via Vercel CLI:
npx vercel --prod`,
        language: 'bash',
        bestPractices: [
          'Always test \`npm run build\` locally before pushing to catch TypeScript or lint errors.',
          'Configure environment variables in Vercel Project Settings (Production, Preview, Development).',
          'Enable Vercel Speed Insights and Analytics to monitor Real User Web Vitals.',
        ],
        commonMistakes: [
          'Pushing code with broken TypeScript types and relying on Vercel to fail.',
          'Forgetting to configure production environment variables in the Vercel dashboard.',
          'Hardcoding localhost URLs in production API calls.',
        ],
      },
    ],
  },
];
