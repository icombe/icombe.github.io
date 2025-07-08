import React, { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });

    if (res.status === 200) {
      setSubmitted(true);
      form.reset();
    } else {
      // Optionally handle error
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-6 bg-black rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-center text-white">Contact Me</h2>
      <p className="mb-6 text-lg text-center text-gray-300">
        Fill out the form below and I'll get back to you soon!
      </p>
      {submitted ? (
        <div className="text-green-400 text-center font-semibold">
          Thank you! Your message has been sent.
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input type="hidden" name="access_key" value="be284fdf-4eed-406f-931b-cbec43af9de6" />
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200" htmlFor="name">
              Name
            </label>
            <input
              className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="name"
              name="name"
              required
              autoComplete="off"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200" htmlFor="email">
              Email
            </label>
            <input
              className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              name="email"
              required
              autoComplete="off"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Type your message..."
            />
          </div>
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
