import React, { useEffect, useState } from "react";
import styles from "../styles/index.module.scss";

type Project = {
  id: number;
  title: string;
  description: string;
  link: string;
  thumbnail: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/projects/")
      .then((res) => res.json())
      .then((data: Project[]) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return (
      <section id="projects" className={styles.sectionBg}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Projects</h2>
          <p>Loading projects…</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className={styles.sectionBg}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <div className={styles.projectsGrid}>
          {projects.map((proj) => (
            <a
              key={proj.id}
              href={proj.link || undefined}
              target={proj.link ? "_blank" : undefined}
              rel={proj.link ? "noopener noreferrer" : undefined}
              className={styles.projectCard}
            >
              <div className={styles.projectThumbnail}>
                <img
                  src={proj.thumbnail}
                  alt={`${proj.title} thumbnail`}
                  className={styles.projectThumbnailImage}
                />
              </div>
              <h3 className={styles.projectTitle}>{proj.title}</h3>
              <p className={styles.projectDescription}>{proj.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
