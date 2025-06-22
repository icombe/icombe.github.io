// src/components/Navbar.jsx
export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
        <span className="font-bold text-xl">Portfolio</span>
        <div className="space-x-4">
          <a href="#about" className="hover:underline">About</a>
          <a href="#experience" className="hover:underline">Experience</a>
          <a href="#projects" className="hover:underline">Projects</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </div>
      </div>
    </nav>
  );
}
