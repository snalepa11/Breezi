'use client';

import React, { useState, useMemo } from 'react';
import { Screen } from '@/types';
import { generateHourlyData } from '@/utils/weather';
import StatusBar from '@/components/Layout/StatusBar';
import TabBar from '@/components/Layout/TabBar';
import Dashboard from '@/components/Screens/Dashboard';
import Map from '@/components/Screens/Map';
import Compare from '@/components/Screens/Compare';
import Chat from '@/components/Screens/Chat';
import styles from './page.module.css';

export default function Home() {
  const [screen, setScreen] = useState<Screen>('dashboard');
  const hourly = useMemo(() => generateHourlyData(), []);

  const statusColor = screen === 'dashboard' ? '#1c2b39' : '#fff';

  return (
    <div className={styles.device}>
      <div className={styles.screen}>
        <StatusBar color={statusColor} />

        {screen === 'dashboard' && <Dashboard hourly={hourly} onNavigateToCompare={() => setScreen('compare')} />}
        {screen === 'map' && <Map />}
        {screen === 'compare' && <Compare />}
        {screen === 'chat' && <Chat />}

        <TabBar currentScreen={screen} onScreenChange={setScreen} />
      </div>
    </div>
  );
}
