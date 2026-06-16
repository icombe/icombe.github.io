import { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from '@/pages/Home';
import ProjectsPage from '@/pages/ProjectsPage';
import ProjectDetailPage from '@/pages/ProjectDetailPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route
          path="/projects/student-loan-tracker"
          element={<Navigate to="/projects/student-loan-analyzer" replace />}
        />
        <Route path="/projects/arcade-driving-game" element={<Navigate to="/projects/tipsy-taxi" replace />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
