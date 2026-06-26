import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  variant?: 'default' | 'gradient';
  label?: string;
  title?: string;
  subtitle?: string;
}

export default function Header({ variant = 'default', label, title, subtitle }: HeaderProps) {
  if (variant === 'gradient') {
    return (
      <div className={styles.headerGradient}>
        <div className={styles.gradientContent}>
          {label && <div className={styles.gradientLabel}>{label}</div>}
          {title && <div className={styles.gradientTitle}>{title}</div>}
          {subtitle && <div className={styles.gradientSubtitle}>{subtitle}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.header}>
      <div className={styles.logo}>Breezi</div>
      {title && <div className={styles.title}>{title}</div>}
    </div>
  );
}
