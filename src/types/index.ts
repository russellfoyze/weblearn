export type PhaseStatus = 'locked' | 'in_progress' | 'completed';

export interface LessonNode {
  id: string;
  title: string;
  shortDesc: string;
  phaseId: number;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  interactiveType:
    | 'semantic_dom'
    | 'box_model'
    | 'flex_vs_grid'
    | 'tailwind_breakpoints'
    | 'tailwind_dark_mode'
    | 'virtual_dom_diff'
    | 'use_state_sim'
    | 'use_effect_sim'
    | 'context_flow'
    | 'rsc_vs_client'
    | 'app_router_tree'
    | 'server_actions'
    | 'vercel_pipeline';
  summary: string;
  deepDive: string;
  codeSnippet: string;
  language: string;
  bestPractices: string[];
  commonMistakes: string[];
}

export interface RoadmapPhase {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  color: string;
  accentBorder: string;
  iconName: string;
  description: string;
  lessons: LessonNode[];
}

export interface GridPreset {
  id: string;
  number: string;
  utility: string;
  code: string;
  description: string;
  containerClass: string;
  itemsConfig: {
    id: number;
    label: string;
    colSpan?: string;
    rowSpan?: string;
    color: string;
  }[];
}

export interface SecurityCheckItem {
  id: number;
  title: string;
  category: 'Must-Have Security' | 'Launch Anti-Pattern';
  isAntiPattern: boolean;
  citationBadge: string;
  vulnerableState: {
    headline: string;
    description: string;
    code: string;
    risk: 'Critical' | 'High' | 'Medium';
    impact: string;
  };
  securedState: {
    headline: string;
    description: string;
    code: string;
    mitigation: string;
    standard: string;
  };
  simulationType:
    | 'env_leak'
    | 'git_scanner'
    | 'admin_lock'
    | 'cookie_flags'
    | 'idor_rls'
    | 'zod_validation'
    | 'rate_limiter'
    | 'https_hsts'
    | 'password_hash'
    | 'sql_injection'
    | 'backup_pitr'
    | 'npm_audit'
    | 'owasp_headers'
    | 'debug_mode'
    | 'error_boundary'
    | 'unused_code';
}

export interface VerificationTelemetry {
  reactionMs: number;
  slotErrorPx: number;
  ballisticPeaks: number;
  wristCoupling: number;
  submovementRateHz: number;
  holdDurationMs: number;
  sampleCount: number;
  verified: boolean;
  isBot: boolean;
  token?: string;
  mlScore?: number;
  reason?: string;
}
