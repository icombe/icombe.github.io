import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // + Navigate
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
// import Testimonials from "./pages/Testimonials"; // removed
import ProjectDetail from "./components/ProjectDetail";
import ScrollToTop from "./components/ScrollToTop"; // NEW

export default function App() {
  return (
    <>
      {/* Background now comes from CSS (body::before) */}
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/games/:slug" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        {/* Redirect if someone manually visits /testimonials */}
        <Route path="/testimonials" element={<Navigate to="/" replace />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}


