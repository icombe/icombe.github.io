import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-primary-900 text-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        {/* Brand on the left */}
        <Link to="/" className="text-4xl font-bold">
          IanCombe.dev
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-4">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-4 py-2 text-lg bg-primary-700 rounded hover:bg-primary-600 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden px-4 py-2 bg-primary-700 rounded hover:bg-primary-600 transition"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile links */}
      {open && (
        <div className="md:hidden bg-primary-800 px-4 pt-2 pb-4 space-y-2">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-4 py-2 text-lg bg-primary-700 rounded hover:bg-primary-600 transition"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
