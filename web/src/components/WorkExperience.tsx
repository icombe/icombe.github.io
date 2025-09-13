import React, { useEffect, useState } from 'react';
import styles from '../styles/components/Experience.module.scss';

type ExperienceItem = {
  id: number;
  title: string;
  company: string;
  dates: string;
  bullets: string[];
};

export default function WorkExperience() {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/experience/');
        if (!res.ok) throw new Error('failed');
        const data = await res.json();
        if (!cancelled) setItems(data);
      } catch {
        // ignore and show nothing
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) return null;

  if (!items.length) {
    // No data (e.g., API error) – render nothing to avoid empty header blocks
    return null;
  }

  return (
    <div className={styles.experienceGrid}>
      {items.map((item) => (
        <div
          key={item.id}
          className={styles.experienceCard}
          tabIndex={0}
          role="group"
          aria-label={`${item.title} at ${item.company}`}
        >
          <h3 className={styles.experienceCardTitle}>{item.title}</h3>
          <p className={styles.experienceCardCompany}>{item.company}</p>
          <p className={styles.experienceCardDates}>{item.dates}</p>
          <ul className={styles.experienceCardBullets}>
            {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}