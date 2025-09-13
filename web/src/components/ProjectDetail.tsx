// src/components/ProjectDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import DownloadSection from './DownloadSection';
import styles from '../styles/components/ProjectDetail.module.scss';

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

function withBase(p: string) {
  const base = import.meta.env.BASE_URL || "/";
  return p.startsWith("/") ? base.replace(/\/$/, "") + p : base + p;
}

type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  link: string;
  thumbnail: string;
  stack: string[];
  bullets: string[];
  jar_url?: string | null;
  abstract?: string;
  download?: {
    primaryHref?: string;
    primaryLabel?: string;
    secondaryHref?: string | null;
    secondaryLabel?: string | null;
  };
};

export default function ProjectDetail(props: { project?: Project | null }) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [project, setProject] = useState<Project | null>(props.project ?? null);
  const [loading, setLoading] = useState<boolean>(!props.project);
  const [error, setError] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState<boolean>(false);

  useEffect(() => {
    if (props.project) return; // already have the project
    let cancelled = false;

    async function loadFromStatic() {
      try {
        setLoading(true);
        const [projectsRes, gamesRes] = await Promise.allSettled([
          fetch(withBase("data/projects.json")).then(r => r.json()),
          fetch(withBase("data/games.json")).then(r => r.json()),
        ]);

        const projects = projectsRes.status === "fulfilled" ? projectsRes.value as Project[] : [];
        const games = gamesRes.status === "fulfilled" ? gamesRes.value as Project[] : [];

        const all = [...projects, ...games];
        const slug = params.slug;
        const found = all.find(p => p.slug === slug) ?? null;

        if (!cancelled) {
          if (found) {
            setProject(found);
            setError(null);
          } else {
            setError("Not found");
          }
        }
      } catch {
        if (!cancelled) setError("Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadFromStatic();
    return () => { cancelled = true; };
  }, [params.slug, props.project]);

  // Close zoom on Escape
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => { if (e.key === 'Escape') setZoomed(false); };
    if (zoomed) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoomed]);

  if (loading) return <div>Loading…</div>;
  if (error || !project) return <div>Not found.</div>;

  const isClue = project.slug === 'clue';
  const heroContainerClass = isClue ? styles.heroSmall : styles.hero;
  const heroImageClass = isClue ? styles.heroImageSmall : styles.heroImage;

  const highlightEmojis = ['✨', '🚀', '🧩', '⚙️', '✅', '📈', '🧪', '💡'];
  const getEmoji = (i: number) => highlightEmojis[i % highlightEmojis.length];

  return (
    <main className={`${styles.projectDetailPage} ${zoomed ? 'zoomedActive' : ''}`}>
      {/* HERO IMAGE */}
      {project.thumbnail && (
        <section className={heroContainerClass}>
          <img
            src={project.thumbnail}
            alt={project.title}
            className={`${styles.projectDetailImage} ${heroImageClass} ${zoomed ? 'zoomed' : ''}`}
            onClick={() => setZoomed((z) => !z)}
          />
        </section>
      )}

      {/* TITLE + DESCRIPTION */}
      <section className={styles.section}>
        <h1 className={styles.projectDetailTitle}>{project.title}</h1>
        {project.description && (
          <p className="sectionParagraph">{project.description}</p>
        )}
      </section>

      {/* TECH */}
      {!!project.stack?.length && (
        <section className={`${styles.section} ${styles.sectionWithHeader}`}>
          <h2 className={styles.sectionTitle}>Tech</h2>
          <ul className={styles.stackPills} role="list">
            {project.stack.map((t, i) => (
              <li key={i}>
                <span className={styles.pill}>{t}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* HIGHLIGHTS */}
      {!!project.bullets?.length && (
        <section className={`${styles.section} ${styles.sectionWithHeader}`}>
          <h2 className={styles.sectionTitle}>Highlights</h2>
          <div className={styles.projectBullets}>
            {project.bullets.map((b, i) => (
              <div
                key={i}
                className={[styles.projectBullet, styles.inView].join(' ')}
              >
                <p className={styles.bulletBody}>
                  <span
                    className={styles.bulletIcon}
                    aria-hidden="true"
                    style={{ marginRight: 8 }}
                  >
                    {getEmoji(i)}
                  </span>
                  {b}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* DOWNLOADS */}
      {project?.download?.primaryHref && (
        <DownloadSection
          id="download"
          primaryHref={project.download.primaryHref}
          primaryLabel={project.download.primaryLabel}
          secondaryHref={project.download.secondaryHref || undefined}
          secondaryLabel={project.download.secondaryLabel || undefined}
        />
      )}
    </main>
  );
}
