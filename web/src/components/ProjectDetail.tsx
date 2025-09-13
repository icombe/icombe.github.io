// src/components/ProjectDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import DownloadSection from './DownloadSection';
import styles from '../styles/components/ProjectDetail.module.scss';

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

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

  const slug = (params.slug as string | undefined) ?? undefined;
  const collection = location.pathname.startsWith("/games/") ? "games" : "projects";

  useEffect(() => {
    let cancelled = false;

    if (props.project) {
      setLoading(false);
      return;
    }
    if (!slug) {
      setProject(null);
      setLoading(false);
      setError('Not found');
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE}/api/${collection}/slug/${slug}`);
        if (!res.ok) throw new Error(`fetch-failed:${res.status}`);
        const data: Project = await res.json();
        if (cancelled) return;

        if (data?.slug && data.slug !== slug) {
          navigate(`/${collection}/${data.slug}`, { replace: true });
          return;
        }
        setProject(data);
      } catch {
        if (!cancelled) {
          setError('Not found');
          setProject(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [slug, navigate, props.project, collection]);

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
