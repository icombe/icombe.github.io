// src/components/Projects.jsx
import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/projects/")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <p>Loading projects…</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((proj) => (
            <a
              key={proj.id}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition"
            >
              <div className="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center">
                {/* Placeholder thumbnail */}
                <span className="text-gray-500">Thumbnail</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
              <p className="text-gray-700">{proj.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
