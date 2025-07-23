import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type ProjectItem = {
  id: number;
  title: string;
  description: string;
  link: string;
  thumbnail: string;
  stack: string[];
  bullets: string[];
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading)
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

  if (!project)
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "2rem", color: "#e11d48" }}>Project not found.</span>
      </div>
    );

  return (
    <div className="project-detail">
      <h1>{project.title}</h1>
      <img
        src={project.thumbnail}
        alt={project.title}
        className="project-image-large"
        style={{
          width: "100%",
          maxHeight: 400,
          objectFit: "cover",
          borderRadius: 16,
          marginBottom: "2rem",
        }}
      />
      <p className="project-description">{project.description}</p>
      <div className="project-bullets" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {project.bullets.map((point, idx) => (
          <div
            key={idx}
            className={`project-bullet ${idx % 2 === 0 ? "left" : "right"}`}
            style={{
              padding: "1.5rem 2rem",
              borderRadius: 12,
              background: idx % 2 === 0 ? "#e3f2fd" : "#fce4ec",
              fontSize: "1.15rem",
              maxWidth: "70%",
              alignSelf: idx % 2 === 0 ? "flex-start" : "flex-end",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            {point}
          </div>
        ))}
      </div>
    </div>
  );
}