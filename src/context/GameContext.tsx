'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundEffects } from '@/utils/soundEffects';

export interface Achievement {
  id: string;
  name: string;
  nameBn: string;
  desc: string;
  descBn: string;
  icon: string;
  unlockedAt?: string;
}

export interface Quest {
  id: string;
  title: string;
  titleBn: string;
  desc: string;
  descBn: string;
  xpReward: number;
  coinReward: number;
  progress: number;
  goal: number;
  completed: boolean;
}

interface GameContextType {
  xp: number;
  level: number;
  xpInLevel: number;
  xpRequiredForNext: number;
  coins: number;
  streak: number;
  achievements: Achievement[];
  quests: Quest[];
  highScores: Record<string, number>;
  activeGameId: string | null;
  isGameModalOpen: boolean;
  isQuestDrawerOpen: boolean;
  lastAward: { xp: number; reason: string } | null;
  openGame: (gameId: string) => void;
  closeGame: () => void;
  setQuestDrawerOpen: (open: boolean) => void;
  addXP: (amount: number, reason?: string) => void;
  addCoins: (amount: number) => void;
  recordScore: (gameId: string, score: number) => void;
  claimQuest: (questId: string) => void;
}

const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_blood',
    name: 'First Step to Mastery',
    nameBn: 'প্রথম পদক্ষেপ',
    desc: 'Played your very first interactive ML mini-game!',
    descBn: 'প্রথমবার একটি মেশিন লার্নিং মিনি-গেম খেললেন!',
    icon: '🎮',
  },
  {
    id: 'linear_sharpshooter',
    name: 'Regression Sharpshooter',
    nameBn: 'রিগ্রেশন শার্পশুটার',
    desc: 'Achieved an S-Rank on the Linear Laser Sniper!',
    descBn: 'লিনিয়ার লেজার স্নাইপার গেমে S-Rank অর্জন করলেন!',
    icon: '🎯',
  },
  {
    id: 'spam_vanquisher',
    name: 'Spam Vanquisher',
    nameBn: 'স্প্যাম ডিটেকশন চ্যাম্পিয়ন',
    desc: 'Zapped 10 consecutive spam emails with the Sigmoid Turret!',
    descBn: 'সিগময়েড টারেট দিয়ে টানা ১০টি স্প্যাম ইমেইল ধ্বংস করলেন!',
    icon: '🛡️',
  },
  {
    id: 'tree_whisperer',
    name: 'Dungeon Branch Walker',
    nameBn: 'ডিসিশন ট্রি মেজ রানার',
    desc: 'Navigated the Decision Tree Dungeon without a single mistaken branch!',
    descBn: 'একটি ভুল শাখা ছাড়াই ডিসিশন ট্রি মেজ জয় করলেন!',
    icon: '🌳',
  },
  {
    id: 'svm_blade_master',
    name: 'Hyperplane Blade Master',
    nameBn: 'হাইপারপ্লেন ব্লেড মাস্টার',
    desc: 'Maximized safety margin street without touching a single alien!',
    descBn: 'কোনো এলিয়েন স্পর্শ না করে সর্বোচ্চ মার্জিন বাউন্ডারি তৈরি করলেন!',
    icon: '⚔️',
  },
  {
    id: 'cluster_god',
    name: 'Galactic Cluster Sovereign',
    nameBn: 'গ্যালাক্টিক ক্লাস্টার মাস্টার',
    desc: 'Compactly partitioned deep-space stars into 3 perfect planetary orbits!',
    descBn: 'কে-মিন্স দিয়ে নক্ষত্রগুলোকে ৩টি নিখুঁত গ্যালাক্সিতে দলভুক্ত করলেন!',
    icon: '🌌',
  },
];

const INITIAL_QUESTS: Quest[] = [
  {
    id: 'quest_sniper',
    title: 'Linear Laser Sniper',
    titleBn: 'লিনিয়ার লেজার স্নাইপার মিশন',
    desc: 'Play Regression Sniper and tune the line to low MSE error.',
    descBn: 'রিগ্রেশন স্নাইপার গেম খেলে কম ত্রুটি (MSE) বজায় রাখুন।',
    xpReward: 120,
    coinReward: 40,
    progress: 0,
    goal: 1,
    completed: false,
  },
  {
    id: 'quest_spam',
    title: 'Sigmoid Spam Defense',
    titleBn: 'সিগময়েড স্প্যাম ডিফেন্স',
    desc: 'Catch 5 suspicious spam emails before they breach the server.',
    descBn: 'সার্ভারে প্রবেশের আগেই ৫টি স্প্যাম ইমেইল আটকে দিন।',
    xpReward: 150,
    coinReward: 50,
    progress: 0,
    goal: 5,
    completed: false,
  },
  {
    id: 'quest_tree',
    title: 'Decision Tree Detective',
    titleBn: 'ডিসিশন ট্রি গোয়েন্দা',
    desc: 'Classify 3 mysterious creatures correctly in the Dungeon.',
    descBn: 'ডিসিশন ট্রির সাহায্যে ৩টি রহস্যময় প্রাণীর সঠিক শ্রেণি নির্ণয় করুন।',
    xpReward: 140,
    coinReward: 45,
    progress: 0,
    goal: 3,
    completed: false,
  },
];

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [xp, setXp] = useState<number>(120);
  const [coins, setCoins] = useState<number>(50);
  const [streak, setStreak] = useState<number>(3);
  const [achievements, setAchievements] = useState<Achievement[]>(ALL_ACHIEVEMENTS.slice(0, 1));
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [highScores, setHighScores] = useState<Record<string, number>>({});
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState<boolean>(false);
  const [isQuestDrawerOpen, setQuestDrawerOpen] = useState<boolean>(false);
  const [lastAward, setLastAward] = useState<{ xp: number; reason: string } | null>(null);

  // Level calculations: 250 XP per level
  const XP_PER_LEVEL = 250;
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const xpInLevel = xp % XP_PER_LEVEL;
  const xpRequiredForNext = XP_PER_LEVEL;

  // Load persisted player data
  useEffect(() => {
    try {
      const saved = localStorage.getItem('antigravity_player_save_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.xp) setXp(parsed.xp);
        if (parsed.coins) setCoins(parsed.coins);
        if (parsed.streak) setStreak(parsed.streak);
        if (parsed.achievements) setAchievements(parsed.achievements);
        if (parsed.quests) setQuests(parsed.quests);
        if (parsed.highScores) setHighScores(parsed.highScores);
      }
    } catch {}
  }, []);

  // Save changes to localStorage
  const saveState = (newXp = xp, newCoins = coins, newQuests = quests, newScores = highScores, newAch = achievements) => {
    try {
      localStorage.setItem(
        'antigravity_player_save_v1',
        JSON.stringify({
          xp: newXp,
          coins: newCoins,
          streak,
          achievements: newAch,
          quests: newQuests,
          highScores: newScores,
        })
      );
    } catch {}
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06B6D4', '#F43F5E', '#10B981', '#F59E0B', '#8B5CF6'],
      });
    } catch {}
  };

  const addXP = (amount: number, reason: string = 'Challenge Completed') => {
    const oldLevel = Math.floor(xp / XP_PER_LEVEL) + 1;
    const nextXp = xp + amount;
    const newLevel = Math.floor(nextXp / XP_PER_LEVEL) + 1;

    setXp(nextXp);
    setLastAward({ xp: amount, reason });
    saveState(nextXp);

    if (newLevel > oldLevel) {
      soundEffects.playLevelUp();
      triggerConfetti();
    } else {
      soundEffects.playSuccess();
    }

    // Auto-clear toast
    setTimeout(() => {
      setLastAward(null);
    }, 3500);
  };

  const addCoins = (amount: number) => {
    const nextCoins = coins + amount;
    setCoins(nextCoins);
    soundEffects.playCoin();
    saveState(xp, nextCoins);
  };

  const openGame = (gameId: string) => {
    soundEffects.playClick();
    setActiveGameId(gameId);
    setIsGameModalOpen(true);
  };

  const closeGame = () => {
    soundEffects.playClick();
    setIsGameModalOpen(false);
  };

  const recordScore = (gameId: string, score: number) => {
    const currentHigh = highScores[gameId] || 0;
    if (score > currentHigh) {
      const updatedScores = { ...highScores, [gameId]: score };
      setHighScores(updatedScores);
      saveState(xp, coins, quests, updatedScores);
    }
  };

  const claimQuest = (questId: string) => {
    const quest = quests.find((q) => q.id === questId);
    if (!quest || quest.completed) return;

    const updatedQuests = quests.map((q) =>
      q.id === questId ? { ...q, completed: true } : q
    );
    setQuests(updatedQuests);
    addXP(quest.xpReward, `Completed Quest: ${quest.title}`);
    addCoins(quest.coinReward);
    triggerConfetti();
    saveState(xp + quest.xpReward, coins + quest.coinReward, updatedQuests);
  };

  return (
    <GameContext.Provider
      value={{
        xp,
        level,
        xpInLevel,
        xpRequiredForNext,
        coins,
        streak,
        achievements,
        quests,
        highScores,
        activeGameId,
        isGameModalOpen,
        isQuestDrawerOpen,
        lastAward,
        openGame,
        closeGame,
        setQuestDrawerOpen,
        addXP,
        addCoins,
        recordScore,
        claimQuest,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
