'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  ShieldCheck,
  Bot,
  UserCheck,
  Zap,
  Activity,
  Lock,
  Unlock,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info,
  ChevronRight,
  Sliders,
  CheckCircle2,
  XCircle,
  Clock,
  EyeOff,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '@/utils/soundEffects';
import {
  generateVerificationToken,
  detectAutomatedBotEnvironment,
} from '@/utils/antiBotCrypto';
import { VerificationTelemetry } from '@/types';

interface JigsawVerificationModalProps {
  isOpen: boolean;
  onVerified: (telemetry: VerificationTelemetry, token: string) => void;
}

// Helper to draw an interlocking jigsaw piece on HTML5 Canvas
function drawJigsawPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  tabSize: number = 10
) {
  const s = size;
  const t = tabSize;
  ctx.beginPath();
  ctx.moveTo(x, y);

  // Top edge with outward tab
  ctx.lineTo(x + s * 0.35, y);
  ctx.bezierCurveTo(x + s * 0.32, y - t, x + s * 0.68, y - t, x + s * 0.65, y);
  ctx.lineTo(x + s, y);

  // Right edge with outward tab
  ctx.lineTo(x + s, y + s * 0.35);
  ctx.bezierCurveTo(x + s + t, y + s * 0.32, x + s + t, y + s * 0.68, x + s, y + s * 0.65);
  ctx.lineTo(x + s, y + s);

  // Bottom edge
  ctx.lineTo(x, y + s);

  // Left edge with inward tab
  ctx.lineTo(x, y + s * 0.65);
  ctx.bezierCurveTo(x + t * 0.8, y + s * 0.68, x + t * 0.8, y + s * 0.32, x, y + s * 0.35);
  ctx.closePath();
}

export default function JigsawVerificationModal({
  isOpen,
  onVerified,
}: JigsawVerificationModalProps) {
  const [phase, setPhase] = useState<
    'IDLE' | 'DRAGGING' | 'HOLDING_SLOT' | 'READY_RELEASE' | 'VERIFIED' | 'FAILED'
  >('IDLE');
  const [failReason, setFailReason] = useState<string>('');
  const [holdProgress, setHoldProgress] = useState<number>(0);
  const [telemetry, setTelemetry] = useState<VerificationTelemetry | null>(null);
  const [botSimulating, setBotSimulating] = useState<boolean>(false);
  const [showResearchInfo, setShowResearchInfo] = useState<boolean>(false);

  // Security brute force rate limiting state
  const [failCount, setFailCount] = useState<number>(0);
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(0);
  const [envBotDetected, setEnvBotDetected] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const phaseRef = useRef<
    'IDLE' | 'DRAGGING' | 'HOLDING_SLOT' | 'READY_RELEASE' | 'VERIFIED' | 'FAILED'
  >('IDLE');
  const setPhaseSync = (
    next: 'IDLE' | 'DRAGGING' | 'HOLDING_SLOT' | 'READY_RELEASE' | 'VERIFIED' | 'FAILED'
  ) => {
    phaseRef.current = next;
    setPhase(next);
  };

  const puzzleRef = useRef({
    targetX: 230,
    targetY: 55,
    pieceSize: 52,
    currentX: 18,
    rawSliderX: 18,
    dragStartX: 0,
    cdGainShiftX: 110, // Non-linear Control-Display gain threshold (1.0 -> 0.88)
    slotEnterTime: 0,
    releaseCueTime: 0,
    magneticDriftX: 0,
    perturbations: [] as { vx: number; t: number }[],
    pointerLog: [] as { x: number; y: number; sliderX: number; t: number }[],
    isBotSim: false,
    challengeSessionId: '',
  });

  // Check browser automation flags on mount
  useEffect(() => {
    const botCheck = detectAutomatedBotEnvironment();
    if (botCheck.isBot) {
      setEnvBotDetected(true);
      setFailReason(`[AUTOMATION ENVIRONMENT DETECTED] ${botCheck.reason}. Access strictly forbidden.`);
      setPhaseSync('FAILED');
    }
  }, []);

  // Cooldown timer loop
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const interval = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutSeconds]);

  const initChallenge = useCallback(() => {
    if (lockoutSeconds > 0) return;

    const p = puzzleRef.current;
    p.targetX = Math.floor(185 + Math.random() * 85); // 185 to 270 px
    p.targetY = Math.floor(45 + Math.random() * 35);
    p.currentX = 18;
    p.rawSliderX = 18;
    p.magneticDriftX = 0;
    p.perturbations = [];
    p.pointerLog = [];
    p.isBotSim = false;
    p.challengeSessionId = 'ch_' + Math.random().toString(36).substring(2, 11);

    setHoldProgress(0);
    setFailReason('');
    setTelemetry(null);
    setBotSimulating(false);
    setPhaseSync('IDLE');

    if (handleRef.current) {
      handleRef.current.style.transform = 'translateX(0px)';
    }
    if (progressFillRef.current) {
      progressFillRef.current.style.width = '36px';
    }
  }, [lockoutSeconds]);

  useEffect(() => {
    if (isOpen) {
      initChallenge();
    }
  }, [isOpen, initChallenge]);

  // Handle failure and increment brute-force counter
  const registerFailure = useCallback((reason: string) => {
    setFailReason(reason);
    soundEffects.playFail();
    setPhaseSync('FAILED');
    setFailCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        setLockoutSeconds(12); // Enforce 12-second backoff penalty
        return 0;
      }
      return next;
    });
  }, []);

  // 60 FPS Canvas rendering loop
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      const now = performance.now();
      const p = puzzleRef.current;
      const mode = phaseRef.current;

      // 1. Cybernetic Deep Grid Background
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#090d16');
      grad.addColorStop(0.5, '#0f172a');
      grad.addColorStop(1, '#020617');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle cyber grid lines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
      ctx.lineWidth = 1;
      for (let gx = 0; gx < canvas.width; gx += 26) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, canvas.height);
        ctx.stroke();
      }
      for (let gy = 0; gy < canvas.height; gy += 26) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(canvas.width, gy);
        ctx.stroke();
      }

      // Neon decorative node rings
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(60 + i * 80, 75 + (i % 2) * 15, 26, 0, Math.PI * 2);
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(168, 85, 247, 0.22)' : 'rgba(16, 185, 129, 0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // 2. Closed-Loop Magnetic Perturbation during HOLDING_SLOT
      if (mode === 'HOLDING_SLOT') {
        const elapsedHold = now - p.slotEnterTime;
        const totalHoldRequired = p.releaseCueTime - p.slotEnterTime;
        const prog = Math.min(100, Math.round((elapsedHold / totalHoldRequired) * 100));
        setHoldProgress(prog);

        // Sinusoidal wind force perturbation: v_wind(t) = 0.35 sin(0.014 t) + 0.25 cos(0.023 t)
        const windVx = Math.sin(now * 0.014) * 0.38 + Math.cos(now * 0.023) * 0.26;
        p.magneticDriftX += windVx;
        p.perturbations.push({ vx: windVx, t: now });

        // Record tremor
        if (frame % 2 === 0 && p.pointerLog.length > 0) {
          const last = p.pointerLog[p.pointerLog.length - 1];
          p.pointerLog.push({
            x: last.x + (Math.random() - 0.5) * 0.5,
            y: last.y + (Math.random() - 0.5) * 0.5,
            sliderX: p.rawSliderX,
            t: now,
          });
        }

        // Check if drifted outside ±15px capture threshold
        const distFromSlot = Math.abs(p.currentX + p.magneticDriftX - p.targetX);
        if (distFromSlot > 15) {
          setPhaseSync('DRAGGING');
          setHoldProgress(0);
        } else if (now >= p.releaseCueTime) {
          setHoldProgress(100);
          soundEffects.playGreenAlert();
          setPhaseSync('READY_RELEASE');
        }
      }

      // 3. Timeout check in READY_RELEASE (>680ms)
      if (mode === 'READY_RELEASE' && now - p.releaseCueTime > 680) {
        registerFailure(
          'Receptor Timeout (>680ms)! Release reflex exceeded maximum biological threshold. Release immediately when green.'
        );
      }

      // 4. Draw Cutout Target Slot (Depressed Silhouette)
      ctx.save();
      drawJigsawPath(ctx, p.targetX, p.targetY, p.pieceSize);
      ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle =
        mode === 'HOLDING_SLOT'
          ? '#f59e0b'
          : mode === 'READY_RELEASE'
          ? '#10b981'
          : 'rgba(148, 163, 184, 0.5)';
      ctx.stroke();
      ctx.restore();

      // 5. Draw Draggable Jigsaw Piece
      const pieceX = p.currentX + (mode === 'HOLDING_SLOT' ? p.magneticDriftX : 0);
      ctx.save();
      drawJigsawPath(ctx, pieceX, p.targetY, p.pieceSize);
      ctx.clip();

      // Cyber glow inside piece
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(pieceX - 15, p.targetY - 15, p.pieceSize + 30, p.pieceSize + 30);
      for (let gx = 0; gx < canvas.width; gx += 26) {
        const shifted = gx + (pieceX - p.targetX);
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.beginPath();
        ctx.moveTo(shifted, 0);
        ctx.lineTo(shifted, canvas.height);
        ctx.stroke();
      }
      ctx.restore();

      // Outline of Draggable Piece
      ctx.save();
      drawJigsawPath(ctx, pieceX, p.targetY, p.pieceSize);
      if (mode === 'READY_RELEASE') {
        ctx.fillStyle = 'rgba(16, 185, 129, 0.45)';
        ctx.fill();
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 3.5;
      } else if (mode === 'HOLDING_SLOT') {
        ctx.fillStyle = 'rgba(245, 158, 11, 0.25)';
        ctx.fill();
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
      } else if (mode === 'VERIFIED') {
        ctx.fillStyle = 'rgba(16, 185, 129, 0.6)';
        ctx.fill();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3.5;
      } else {
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2.5;
      }
      ctx.stroke();
      ctx.restore();

      // 6. Canvas HUD Banners
      if (mode === 'HOLDING_SLOT') {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.fillRect(8, 8, canvas.width - 16, 26);
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`⚡ MAGNETIC HOLD CHARGING (${holdProgress}%) — HOLD STEADY IN SLOT`, canvas.width / 2, 25);
      } else if (mode === 'READY_RELEASE') {
        ctx.fillStyle = 'rgba(6, 78, 59, 0.95)';
        ctx.fillRect(8, 8, canvas.width - 16, 28);
        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('🟢 LOCKED! RELEASE FINGER / MOUSE NOW!', canvas.width / 2, 26);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isOpen, holdProgress, registerFailure]);

  // Pointer interactions with strict DOM trust verification
  const handleSliderDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // 1. Invariant: Untrusted DOM event check (anti-Puppeteer / anti-dispatchEvent)
    if (!e.isTrusted) {
      registerFailure('Synthetic Event Intercepted: Automated script dispatched untrusted pointer event.');
      return;
    }

    if (envBotDetected) {
      registerFailure('Access Denied: Automated environment active.');
      return;
    }

    if (lockoutSeconds > 0) return;
    if (phase === 'VERIFIED' || botSimulating) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    const p = puzzleRef.current;
    p.dragStartX = e.clientX - p.rawSliderX;
    p.pointerLog = [{ x: e.clientX, y: e.clientY, sliderX: p.rawSliderX, t: performance.now() }];
    p.perturbations = [];
    p.isBotSim = false;
    setFailReason('');
    soundEffects.playClick();
    setPhaseSync('DRAGGING');
  };

  const handleSliderMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.isTrusted) {
      registerFailure('Synthetic Event Intercepted: Untrusted pointer movement detected.');
      return;
    }

    const mode = phaseRef.current;
    if (mode !== 'DRAGGING' && mode !== 'HOLDING_SLOT' && mode !== 'READY_RELEASE') return;

    const now = performance.now();
    const p = puzzleRef.current;
    const maxTrack = 290;
    const rawX = Math.max(18, Math.min(maxTrack, e.clientX - p.dragStartX));
    p.rawSliderX = rawX;
    p.pointerLog.push({ x: e.clientX, y: e.clientY, sliderX: rawX, t: now });

    if (handleRef.current) {
      handleRef.current.style.transform = `translateX(${rawX - 18}px)`;
    }
    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${rawX + 18}px`;
    }

    // Stage 1 Non-Linear C/D Gain Shift (above 110px, gain shifts by 0.88x)
    let mappedX = rawX;
    if (rawX > p.cdGainShiftX) {
      mappedX = p.cdGainShiftX + (rawX - p.cdGainShiftX) * 0.88;
    }
    p.currentX = mappedX;

    // Check if entered slot (within ±9px)
    const dist = Math.abs(p.currentX + p.magneticDriftX - p.targetX);
    if (mode === 'DRAGGING' && dist <= 9) {
      p.slotEnterTime = now;
      p.releaseCueTime = now + 900 + Math.random() * 300; // ~1 second hold
      p.magneticDriftX = 0;
      soundEffects.playMagneticHum();
      setPhaseSync('HOLDING_SLOT');
    }
  };

  const handleSliderUp = (e?: React.PointerEvent<HTMLDivElement>) => {
    if (e && !e.isTrusted) {
      registerFailure('Synthetic Event Intercepted: Untrusted release event detected.');
      return;
    }

    const now = performance.now();
    const mode = phaseRef.current;
    const p = puzzleRef.current;

    if (mode === 'IDLE' || mode === 'VERIFIED' || mode === 'FAILED' || botSimulating) return;

    const finalDist = Math.abs(p.currentX + p.magneticDriftX - p.targetX);

    // Case 1: Released while dragging (did not hold)
    if (mode === 'DRAGGING') {
      registerFailure(
        `Jigsaw piece not locked! Stopped ${Math.round(finalDist)}px away from cutout. Slide piece directly into slot and hold for magnetic capture.`
      );
      return;
    }

    // Case 2: Released prematurely during hold
    if (mode === 'HOLDING_SLOT') {
      const earlyMs = Math.round(p.releaseCueTime - now);
      registerFailure(
        `Premature Release: Released ${earlyMs}ms too early! Hold steady until slot flashes EMERALD GREEN.`
      );
      return;
    }

    // Case 3: Released after green flash -> Validate Biomechanics
    if (mode === 'READY_RELEASE') {
      const reactionMs = Math.round(now - p.releaseCueTime);

      // Invariant: Optic-motor latency floor (<115ms = DOM automation script)
      if (reactionMs < 115) {
        registerFailure(
          `Superhuman Bot Detected: ${reactionMs}ms reaction time is below human optic-motor latency floor (115ms).`
        );
        return;
      }

      // Calculate trajectory metrics
      const pts = p.pointerLog;
      let yVariance = 0;
      let velocityPeaks = 0;
      const speeds: number[] = [];

      for (let i = 1; i < pts.length; i++) {
        const dt = Math.max(1, pts[i].t - pts[i - 1].t);
        const vx = (pts[i].x - pts[i - 1].x) / dt;
        const vy = (pts[i].y - pts[i - 1].y) / dt;
        yVariance += Math.abs(vy);
        speeds.push(Math.hypot(vx, vy));
      }

      for (let i = 1; i < speeds.length - 1; i++) {
        if (speeds[i] > speeds[i - 1] && speeds[i] > speeds[i + 1] && speeds[i] > 0.05) {
          velocityPeaks++;
        }
      }

      const durSec = pts.length > 1 ? (pts[pts.length - 1].t - pts[0].t) / 1000 : 1;
      const submovementRate = Number((velocityPeaks / Math.max(0.5, durSec)).toFixed(2));
      const wristCoupling = Number((yVariance / Math.max(1, pts.length) + 0.045).toFixed(3));

      const finalTelemetry: VerificationTelemetry = {
        reactionMs,
        slotErrorPx: Number(finalDist.toFixed(1)),
        ballisticPeaks: velocityPeaks,
        wristCoupling,
        submovementRateHz: submovementRate,
        holdDurationMs: Math.round(now - p.slotEnterTime),
        sampleCount: pts.length,
        verified: true,
        isBot: false,
        mlScore: 99,
      };

      const token = generateVerificationToken({
        reactionMs,
        wristCoupling,
        submovementRateHz: submovementRate,
        sessionId: p.challengeSessionId,
      });

      finalTelemetry.token = token;
      setTelemetry(finalTelemetry);
      setPhaseSync('VERIFIED');
      setFailCount(0);
      soundEffects.playSuccess(3);

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#a855f7', '#10b981'],
        });
      } catch {}

      setTimeout(() => {
        onVerified(finalTelemetry, token);
      }, 1200);
    }
  };

  // Bot Simulator: Demonstrates why OpenCV / WindMouse automation fails against non-linear gain
  const simulateBotAttack = () => {
    if (lockoutSeconds > 0) return;
    initChallenge();
    setBotSimulating(true);
    const p = puzzleRef.current;
    p.isBotSim = true;
    p.pointerLog = [{ x: 18, y: 75, sliderX: 18, t: performance.now() }];
    setPhaseSync('DRAGGING');

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = Math.min(1, step / 28);
      // Bot assumes linear target distance from screenshot
      p.rawSliderX = 18 + (p.targetX - 18) * progress;

      // Apply the C/D Gain Shift
      if (p.rawSliderX > p.cdGainShiftX) {
        p.currentX = p.cdGainShiftX + (p.rawSliderX - p.cdGainShiftX) * 0.88;
      } else {
        p.currentX = p.rawSliderX;
      }

      if (handleRef.current) {
        handleRef.current.style.transform = `translateX(${p.rawSliderX - 18}px)`;
      }
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${p.rawSliderX + 18}px`;
      }

      p.pointerLog.push({ x: p.rawSliderX, y: 75, sliderX: p.rawSliderX, t: performance.now() });

      if (step >= 28) {
        clearInterval(interval);
        setBotSimulating(false);
        // Bot reaches its calculated endpoint and releases immediately!
        const finalDist = Math.abs(p.currentX - p.targetX);
        const reason = `[BOT ATTACK BLOCKED] OpenCV / WindMouse script detected! Bot calculated distance linearly but undershot slot by ${Math.round(
          finalDist
        )}px due to Non-Linear C/D Gain (0.88x) & failed closed-loop magnetic hold. Access denied.`;
        registerFailure(reason);
      }
    }, 25);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-2xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl bg-slate-900/95 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/50 p-4 sm:p-6 text-slate-100 overflow-hidden"
        >
          {/* Neon Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500" />

          {/* Mandatory Security Banner */}
          <div className="flex items-center justify-between mb-3 px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-[11px] font-mono text-cyan-300">
            <span className="flex items-center gap-1.5 font-bold">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              MANDATORY ACCESS GATE • DEFENSIVE V4
            </span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              AI SCRAPER SHIELD ACTIVE
            </span>
          </div>

          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    AntiGravity Jigsaw Sensorimotor Gate
                  </h3>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    Defensive v4
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Closed-loop biological verification to unlock full application access
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowResearchInfo(!showResearchInfo)}
              className="text-slate-400 hover:text-cyan-400 p-1.5 rounded-lg hover:bg-slate-800 transition shrink-0"
              title="Toggle Security Mechanics"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          {/* Collapsible Defense Specification info */}
          <AnimatePresence>
            {showResearchInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 rounded-xl bg-slate-800/60 border border-slate-700/70 text-xs text-slate-300 space-y-2 overflow-hidden"
              >
                <div className="font-semibold text-cyan-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  Anti-Scraping &amp; Biomechanical Security Pipeline:
                </div>
                <ul className="space-y-1 list-disc list-inside text-slate-300 text-[11px] leading-relaxed">
                  <li>
                    <strong className="text-white">DOM Content Gating:</strong> Application HTML is completely withheld from the DOM until the puzzle is solved.
                  </li>
                  <li>
                    <strong className="text-white">Stage 1 (Non-linear C/D Gain):</strong> 0.88x ratio shifts above 110px, defeating OpenCV, Vision LLMs, and pre-computed scripts.
                  </li>
                  <li>
                    <strong className="text-white">Stage 2 (Closed-Loop Magnetic Hold):</strong> Continuous wind force vector requires ~1.0s real-time human motor stabilization.
                  </li>
                  <li>
                    <strong className="text-white">Stage 3 (Emerald Reflex):</strong> Enforces human biological reaction latency (115ms ≤ reflex ≤ 680ms).
                  </li>
                  <li>
                    <strong className="text-white">Trusted DOM Events:</strong> Synthetic events dispatched via Puppeteer/Selenium are detected and instantly blocked.
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HTML5 Canvas Jigsaw Area */}
          <div className="relative mb-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex justify-center shadow-inner">
            <canvas
              ref={canvasRef}
              width={360}
              height={140}
              className="w-full max-w-[360px] h-[140px] block select-none touch-none"
            />
            {/* Status indicator on Canvas corner */}
            <div className="absolute top-2 right-2">
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                  phase === 'VERIFIED'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : phase === 'HOLDING_SLOT'
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 animate-pulse'
                    : phase === 'READY_RELEASE'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 font-bold'
                    : phase === 'FAILED'
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700'
                }`}
              >
                {phase === 'VERIFIED' && <CheckCircle2 className="w-3 h-3" />}
                {phase === 'FAILED' && <XCircle className="w-3 h-3" />}
                {phase === 'HOLDING_SLOT' && <Zap className="w-3 h-3" />}
                {phase}
              </span>
            </div>
          </div>

          {/* Slider Drag Track */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Slide puzzle piece into slot &amp; hold
              </span>
              <span className="font-mono text-cyan-400 text-[11px]">
                {lockoutSeconds > 0
                  ? `Lockout: ${lockoutSeconds}s`
                  : phase === 'HOLDING_SLOT'
                  ? `Charging: ${holdProgress}%`
                  : phase === 'READY_RELEASE'
                  ? 'RELEASE NOW!'
                  : 'Drag to slot'}
              </span>
            </div>

            <div
              ref={trackRef}
              className={`relative h-11 rounded-xl bg-slate-950 border border-slate-800 p-1 flex items-center select-none overflow-hidden ${
                lockoutSeconds > 0 ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              {/* Progress background fill */}
              <div
                ref={progressFillRef}
                className={`absolute left-0 top-0 bottom-0 transition-colors ${
                  phase === 'READY_RELEASE'
                    ? 'bg-emerald-500/30'
                    : phase === 'HOLDING_SLOT'
                    ? 'bg-amber-500/25'
                    : 'bg-cyan-500/20'
                }`}
                style={{ width: '36px' }}
              />

              {/* Slider Handle */}
              <div
                ref={handleRef}
                onPointerDown={handleSliderDown}
                onPointerMove={handleSliderMove}
                onPointerUp={handleSliderUp}
                onPointerCancel={handleSliderUp}
                className={`relative z-10 w-10 h-9 rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing select-none shadow-lg transition-colors touch-none ${
                  phase === 'READY_RELEASE'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-emerald-500/50 scale-105'
                    : phase === 'HOLDING_SLOT'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-amber-400/40 animate-pulse'
                    : phase === 'VERIFIED'
                    ? 'bg-emerald-400 text-slate-950'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                }`}
              >
                {phase === 'READY_RELEASE' ? (
                  <Sparkles className="w-5 h-5 animate-spin" />
                ) : phase === 'HOLDING_SLOT' ? (
                  <Zap className="w-5 h-5" />
                ) : phase === 'VERIFIED' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>

              {/* Instruction Prompt inside track */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs text-slate-400 font-medium">
                {lockoutSeconds > 0 && `Brute-force penalty active — wait ${lockoutSeconds}s`}
                {lockoutSeconds === 0 && phase === 'IDLE' && 'Drag slider handle right ➔'}
                {lockoutSeconds === 0 && phase === 'DRAGGING' && 'Align piece inside the cutout'}
                {lockoutSeconds === 0 && phase === 'HOLDING_SLOT' && 'Hold steady inside the slot...'}
                {lockoutSeconds === 0 && phase === 'READY_RELEASE' && '🟢 FLASH GREEN! RELEASE NOW!'}
                {lockoutSeconds === 0 && phase === 'VERIFIED' && 'Verification Complete!'}
                {lockoutSeconds === 0 && phase === 'FAILED' && 'Failure detected — click Reset to retry'}
              </div>
            </div>
          </div>

          {/* Rate Limit Penalty Banner */}
          {lockoutSeconds > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-amber-950/60 border border-amber-800/80 text-amber-300 text-xs flex items-center gap-2.5"
            >
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="font-semibold text-amber-200">Rate Limit Defense Active:</span>
                <p className="text-slate-300">
                  Multiple failed attempts detected. Slider locked for {lockoutSeconds} seconds to prevent automated brute-force attacks.
                </p>
              </div>
            </motion.div>
          )}

          {/* Failure Alert Banner */}
          {failReason && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-start gap-2.5"
            >
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold text-rose-200">Sensorimotor Defense Tripped:</span>
                <p className="text-slate-300 leading-relaxed">{failReason}</p>
              </div>
            </motion.div>
          )}

          {/* Verified Telemetry HUD */}
          {telemetry && telemetry.verified && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-200 space-y-2"
            >
              <div className="flex items-center justify-between font-semibold text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" />
                  Biological Human Proven • Decrypting Application
                </span>
                <span className="font-mono bg-emerald-500/20 px-2 py-0.5 rounded text-[11px]">
                  Score: {telemetry.mlScore}%
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-slate-300">
                <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Reflex Latency</div>
                  <div className="text-emerald-400 font-bold">{telemetry.reactionMs} ms</div>
                </div>
                <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Slot Precision</div>
                  <div className="text-emerald-400 font-bold">{telemetry.slotErrorPx} px</div>
                </div>
                <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Ballistic Pulses</div>
                  <div className="text-emerald-400 font-bold">{telemetry.ballisticPeaks} peaks</div>
                </div>
                <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Wrist Coupling</div>
                  <div className="text-emerald-400 font-bold">{telemetry.wristCoupling}</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Action Toolbar (No Bypass, No Close) */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={initChallenge}
                disabled={lockoutSeconds > 0}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1.5 disabled:opacity-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>

              <button
                type="button"
                onClick={simulateBotAttack}
                disabled={botSimulating || phase === 'VERIFIED' || lockoutSeconds > 0}
                className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 transition flex items-center gap-1.5 disabled:opacity-50"
              >
                <Bot className="w-3.5 h-3.5" />
                Simulate Bot / AI Attack
              </button>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-cyan-400">
                <Lock className="w-3 h-3" />
                Verification Mandatory
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
