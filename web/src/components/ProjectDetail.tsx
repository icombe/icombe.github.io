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
            const [shown, setShown] = useState(false);

            useEffect(() => {
              if (inView) setShown(true);
            }, [inView]);

            const colonIdx = point.indexOf(":");
            const first = colonIdx > -1 ? point.slice(0, colonIdx + 1) : "";
            const rest  = colonIdx > -1 ? point.slice(colonIdx + 1) : point;

            const sideClass = idx % 2 === 0 ? styles.left : styles.right;
            const innerClasses = [
              styles.projectBullet,
              sideClass,
              shown ? styles.inView : ""
            ].join(" ");

            return (
              <div ref={ref} className={styles.bulletWrapper}>
                <div
                  className={innerClasses}
                  style={{ transitionDelay: `${idx * 0.2}s` }}
                >
                  {first && (
                    <span className={styles.bulletEmphasis}>{first}</span>
                  )}
                  {rest}
                </div>
              </div>
            );
          };

          return <Bullet key={idx} />;
        })}
      </div>
    </div>
  );
}
