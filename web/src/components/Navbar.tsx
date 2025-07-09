// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-primary-900 text-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        <Link
          to="/"
          className="
            bg-rainbow 
            bg-[length:200%_100%] 
            bg-left-top 
            bg-clip-text 
            text-transparent 
            animate-wave-text 
            text-2xl 
            font-bold
          "
        >
          IanCombe.dev
        </Link>
        <div className="flex space-x-4">
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
      </div>
    </nav>
  );
}
