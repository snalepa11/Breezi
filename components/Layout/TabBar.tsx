import React from 'react';
import { Screen } from '@/types';
import styles from './TabBar.module.css';

interface TabBarProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export default function TabBar({ currentScreen, onScreenChange }: TabBarProps) {
  const activeColor = '#2f93dd';
  const inactiveColor = '#9fb3c1';

  return (
    <div className={styles.tabBar}>
      <button
        onClick={() => onScreenChange('dashboard')}
        className={styles.tabButton}
        style={{ color: currentScreen === 'dashboard' ? activeColor : inactiveColor }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2M12 20v2M3 12h2M19 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
        </svg>
        <span className={styles.tabLabel}>Today</span>
      </button>

      <button
        onClick={() => onScreenChange('map')}
        className={styles.tabButton}
        style={{ color: currentScreen === 'map' ? activeColor : inactiveColor }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 20l-6 2V6l6-2 6 2 6-2v16l-6 2-6-2zM9 4v16M15 6v16" />
        </svg>
        <span className={styles.tabLabel}>Map</span>
      </button>

      <button
        onClick={() => onScreenChange('compare')}
        className={styles.tabButton}
        style={{ color: currentScreen === 'compare' ? activeColor : inactiveColor }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 20V11M10 20V4M16 20v-6M22 20H2" />
        </svg>
        <span className={styles.tabLabel}>Compare</span>
      </button>

      <button
        onClick={() => onScreenChange('chat')}
        className={styles.tabButton}
        style={{ color: currentScreen === 'chat' ? activeColor : inactiveColor }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z" />
        </svg>
        <span className={styles.tabLabel}>Assistant</span>
      </button>

      <div className={styles.homeIndicator} />
    </div>
  );
}
