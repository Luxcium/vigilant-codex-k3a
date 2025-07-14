'use client';
import React, { useState } from 'react';
import styles from './ColorDemo.module.css';

export default function ColorDemo() {
  const [color, setColor] = useState('#3367d6');
  // Introduce a runtime error: undefined function call
  // eslint-disable-next-line
  (window as any).triggerError();
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: color } as React.CSSProperties}>
      <h2>Color Demo Component</h2>
      <p>This box changes color in watch mode.</p>
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
