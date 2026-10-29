'use client';

import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { GameProvider } from '@/context/GameContext';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <GameProvider>{children}</GameProvider>
    </LanguageProvider>
  );
}
