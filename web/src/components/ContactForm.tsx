import React, { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission logic
    alert("Message sent!");
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-2 border rounded"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            className="w-full p-2 border rounded h-32"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
