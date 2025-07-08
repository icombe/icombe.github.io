import React from "react";

export default function Footer() {
  return (
    <footer className="py-6 bg-dark-200 text-center text-gray-400">
      <p>&copy; {new Date().getFullYear()} Ian Combe. All rights reserved.</p>
    </footer>
  );
}
