'use client';
import React, { useState } from 'react';
import styles from './ColorDemo.module.css';

export default function ColorDemo() {
  const [color, setColor] = useState('#3367d6');

  return (
    <div
      className={`${styles.container} ${styles.dynamicColor}`}
      style={{ '--dynamic-color': color } as React.CSSProperties}>
      <h2>🎨 Interactive Color Demo</h2>
      <p>🔥 Live coding session activated! Watch this change in real-time.</p>
      <label htmlFor="color-input">
        Pick a color:
        <input
          id="color-input"
          className={styles.input}
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
          title="Choose color"
        />
      </label>
      <span className={styles.label}>{color}</span>
    </div>
  );
}
