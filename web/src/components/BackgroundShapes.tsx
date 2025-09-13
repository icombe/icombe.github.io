import React, { useMemo } from "react";
import styles from "../styles/components/BackgroundShapes.module.scss";

type Spark = { x: number; y: number; size: number; delay?: string };

function ring(count: number, cxVw: number, cyVh: number, rVw: number, size: number, offset = 0): Spark[] {
  return Array.from({ length: count }, (_, i) => {
    const t = (i / count) * Math.PI * 2 + offset;
    // slight ellipse so it looks organic
    return {
      x: cxVw + rVw * Math.cos(t),
      y: cyVh + (rVw * 0.6) * Math.sin(t),
      size,
      delay: `${(i % 6) * 0.35}s`,
    };
  });
}

export default function BackgroundShapes() {
  const sparks = useMemo<Spark[]>(
    () => [
      // two subtle rings
      ...ring(10, 18, 28, 10, 16, 0.2),
      ...ring(12, 78, 62, 12, 14, 0.6),
      // scattered accents
      { x: 28, y: 18, size: 18, delay: "0s" },
      { x: 12, y: 56, size: 14, delay: "0.2s" },
      { x: 46, y: 72, size: 12, delay: "0.4s" },
      { x: 82, y: 24, size: 16, delay: "0.1s" },
      { x: 68, y: 14, size: 12, delay: "0.5s" },
      { x: 88, y: 84, size: 15, delay: "0.3s" },
    ],
    []
  );

  return (
    <div className={styles.bgRoot} aria-hidden="true">
      <div className={styles.bgShapes}>
        <span className={`${styles.blob} ${styles.blobLeft}`} />
        <span className={`${styles.blob} ${styles.blobRight}`} />

        {sparks.map((s, i) => (
          <span
            key={i}
            className={styles.spark}
            style={
              {
                "--x": `${s.x}vw`,
                "--y": `${s.y}vh`,
                "--size": `${s.size}px`,
                "--delay": s.delay || "0s",
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
