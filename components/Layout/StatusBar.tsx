import React from 'react';
import styles from './StatusBar.module.css';

interface StatusBarProps {
  color: string;
}

export default function StatusBar({ color }: StatusBarProps) {
  return (
    <div className={styles.statusBar} style={{ color }}>
      <span style={{ letterSpacing: '0.3px' }}>9:41</span>
      <div className={styles.icons}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
          <rect x="0" y="7" width="3" height="5" rx="1" />
          <rect x="5" y="4.5" width="3" height="7.5" rx="1" />
          <rect x="10" y="2" width="3" height="10" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 13" fill="currentColor">
          <path d="M8.5 2.4c2.6 0 5 1 6.8 2.7l-1.4 1.5A7.5 7.5 0 0 0 8.5 4.4 7.5 7.5 0 0 0 3.1 6.6L1.7 5.1A9.6 9.6 0 0 1 8.5 2.4zm0 3.6c1.3 0 2.5.5 3.4 1.4l-1.5 1.5a2.7 2.7 0 0 0-3.8 0L5.1 7.4A4.7 4.7 0 0 1 8.5 6zm0 3.4 1.4 1.4-1.4 1.4-1.4-1.4z" />
        </svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
          <rect x="0.5" y="0.5" width="21" height="12" rx="3.5" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="16" height="9" rx="2" fill="currentColor" />
          <rect x="23.5" y="4" width="2" height="5" rx="1" fill="currentColor" opacity="0.5" />
        </svg>
      </div>
    </div>
  );
}
