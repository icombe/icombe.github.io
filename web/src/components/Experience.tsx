// src/components/Experience.jsx
import React, { useEffect, useState } from "react";

type ExperienceItem = {
  id: number;
  title: string;
  company: string;
  dates: string;
  bullets: string[];
};

export default function Experience() {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/experience/")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Work Experience</h2>
          <p>Loading experience…</p>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-16 bg-dark-200">
      <div className="container">
        <h2 className="text-4xl font-bold mb-8 text-primary-500">
          Work Experience
        </h2>
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="
                p-6 
                bg-dark-100 
                rounded-lg 
                shadow-lg 
                border-l-4 border-primary-500
                hover:shadow-2xl 
                hover:-translate-y-1 
                transition-all 
                duration-300
                min-h-[240px]
              "
            >
              <h3 className="text-xl font-semibold text-gray-100">
                {item.title}
              </h3>
              <p className="text-primary-500 mb-1">{item.company}</p>
              <p className="text-sm text-gray-400 mb-4">{item.dates}</p>
              <ul className="list-disc list-inside text-gray-300">
                {item.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}