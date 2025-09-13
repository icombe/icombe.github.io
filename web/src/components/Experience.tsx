// src/components/Experience.tsx
import React, { useEffect, useState } from "react";
import styles from "../styles/components/Experience.module.scss";

type ExperienceItem = {
  id: number;
  title: string;
  company: string;
  dates: string;
  bullets: string[];
};

export default function Experience() {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/experience/")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !items.length) return null;

  return (
    <section id="experience" className={styles.experienceSection}>
      <div className={styles.experienceContainer}>
        <h2 className={styles.experienceTitle}>Work Experience</h2>
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
                {item.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
