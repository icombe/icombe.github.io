// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-primary-900 text-white shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="font-bold text-2xl">
          YourName.dev
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
