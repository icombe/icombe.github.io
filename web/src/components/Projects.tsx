import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/components/Projects.module.scss";

const API_BASE = import.meta.env.VITE_API_BASE ?? ""; // e.g. https://api.yourdomain.com

type ProjectListItem = {
  id: number;
  slug: string;
  title: string;
  thumbnail?: string;
  description?: string;
  abstract?: string;
  stack?: string[];
};

type SectionProps = {
  title?: string;
  endpoint?: string; // e.g. "/api/projects" or "/api/games"
  basePath?: string; // e.g. "/projects" or "/games"
};

const Projects: React.FC<SectionProps> = ({
  title = "Projects",
  endpoint = "/api/projects",
  basePath = "/projects",
}) => {
  const [items, setItems] = useState<ProjectListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE}${endpoint}`);
        if (!res.ok) throw new Error(`fetch-failed:${res.status}`);
        const data: ProjectListItem[] = await res.json();
        if (!cancelled) setItems(Array.isArray(data) ? data.filter(p => !!p?.slug) : []);
      } catch {
        if (!cancelled) setError("Failed to load data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [endpoint]);

  if (loading) return <section>Loading {title.toLowerCase()}…</section>;
  if (error) return <section>{error}</section>;
  if (!items.length) return <section>No {title.toLowerCase()} found.</section>;

  return (
    <section className={styles.sectionBg}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{title}</h2>

        <div className={styles.projectsGrid}>
          {items.map((p) => (
            <Link
              key={p.id ?? p.slug}
              to={`${basePath}/${p.slug}`}
              className={styles.projectCard}
              onClick={() => {
                // Pre-emptively reset scroll before route transition
                window.scrollTo(0, 0);
              }}
            >
              {p.thumbnail && (
                <div className={styles.projectThumbnail}>
                  <img
                    className={styles.projectThumbnailImage}
                    src={p.thumbnail}
                    alt=""
                    loading="lazy"
                  />
                </div>
              )}
              <div className={styles.projectCardBody}>
                <h3 className={styles.projectTitle}>{p.title}</h3>
                {(p.abstract || p.description) && (
                  <p className={styles.projectDescription}>
                    {p.abstract || p.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
