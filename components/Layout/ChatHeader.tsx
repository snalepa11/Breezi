import React from "react";
import styles from "./ChatHeader.module.css";

export default function ChatHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
            <path d="M12 2l1.7 4.6L18.5 8.4 13.9 10.2 12 15l-1.9-4.8L5.5 8.4l4.8-1.8z" />
          </svg>
        </div>
        <div>
          <div className={styles.headerTitle}>Weather Assistant</div>
          <div className={styles.headerSubtitle}>New York · powered by AI</div>
        </div>
      </div>
    </div>
  );
}
