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
    <section id="projects" className="py-16 px-4 bg-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-primary-500">
          Projects
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((proj) => (
            <a
              key={proj.id}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                block 
                p-6 
                bg-dark-100 
                rounded-lg 
                shadow-lg 
                border-l-4 border-primary-500
                hover:shadow-2xl 
                hover:-translate-y-1 
                transition-all 
                duration-300
                min-h-[300px]
              "
            >
              <div className="h-40 bg-gray-800 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-500">Thumbnail</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                {proj.title}
              </h3>
              <p className="text-gray-300">{proj.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}