// src/components/Experience.jsx
import { useEffect, useState } from "react";

export default function Experience() {
  const [items, setItems] = useState([]);
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
    <section id="experience" className="py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Work Experience</h2>
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="p-6 bg-white rounded shadow">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-primary-500">{item.company}</p>
              <p className="text-sm text-gray-500 mb-2">{item.dates}</p>
              <ul className="list-disc list-inside text-gray-700">
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
