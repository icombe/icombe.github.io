import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withBase } from '../lib/paths';
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
  title?: string;       // Section title
  endpoint?: string;    // e.g. "/api/projects" or "/api/games"
  basePath?: string;    // e.g. "/projects" or "/games"
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
          {items.map((item) => (
            <Link
              key={item.id}
              to={`${basePath}/${item.slug}`}
              className={styles.projectCard}
              aria-label={`View ${item.title}`}
            >
              {item.thumbnail && (
                <div className={styles.projectThumbnail}>
                  <img
                    className={styles.projectThumbnailImage}
                    src={withBase(item.thumbnail)}
                    alt=""
                    loading="lazy"
                  />
                </div>
              )}

              <div className={styles.projectCardBody}>
                <h3 className={styles.projectTitle}>{item.title}</h3>
                {(item.abstract || item.description) && (
                  <p className={styles.projectDescription}>
                    {item.abstract || item.description}
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
