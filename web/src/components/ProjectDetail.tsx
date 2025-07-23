// src/components/ProjectDetail.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import styles from "../styles/index.module.scss"; // main stylesheet

type ProjectItem = {
  id: number;
  title: string;
  description: string;
  link: string;
  thumbnail: string;
  stack: string[];
  bullets: string[];
};

// Custom hook for intersection observer
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgZoomed, setImgZoomed] = useState(false);

  // Prevent body scrolling when image is fullscreen
  useEffect(() => {
    document.body.style.overflow = imgZoomed ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [imgZoomed]);

  // Fetch project data
  useEffect(() => {
    fetch(`http://localhost:8000/api/projects/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Project not found");
        return res.json();
      })
      .then((data) => setProject(data))
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "1.5rem" }}>Loading...</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "2rem", color: "#e11d48" }}>
          Project not found.
        </span>
      </div>
    );
  }

  return (
    <div
      className={
        `${styles.projectDetailPage}` +
        (imgZoomed ? ` ${styles.zoomedActive}` : "")
      }
    >
      <h1 className={styles.projectDetailTitle}>{project.title}</h1>

      {/* image wrapper to avoid sliding animation */}
      <div className={styles.imageWrapper}>
        <img
          src={project.thumbnail}
          alt={project.title}
          className={styles.projectDetailImage}
          onClick={() => setImgZoomed((z) => !z)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setImgZoomed((z) => !z);
            }
          }}
          tabIndex={0}
          style={{ cursor: imgZoomed ? "zoom-out" : "pointer" }}
        />
      </div>

      <div className={styles.projectBullets}>
        {project.bullets.map((point, idx) => {
          const Bullet = () => {
            const [ref, inView] = useInView(0.2);

            // Split off leading emphasis
            const colonIdx = point.indexOf(":");
            let first = "", rest = point;
            if (colonIdx !== -1) {
              first = point.slice(0, colonIdx + 1);
              rest = point.slice(colonIdx + 1);
            }

            return (
              <div
                ref={ref}
                className={[
                  styles.projectBullet,
                  idx % 2 === 0 ? styles.left : styles.right,
                  styles.centered,
                  inView ? styles.slideIn : styles.slideOut,
                ].join(" ")}
                style={{
                  animationDelay: inView ? `${idx * 0.25 + 0.2}s` : "0s",
                }}
              >
                {first && (
                  <span className={styles.bulletEmphasis}>{first}</span>
                )}
                {rest}
              </div>
            );
          };
          return <Bullet key={idx} />;
        })}
      </div>
    </div>
  );
}
