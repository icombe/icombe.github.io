import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import ProjectsPage from '@/pages/ProjectsPage';
import ProjectDetailPage from '@/pages/ProjectDetailPage';

export default function App() {
  return (
    <Router>
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
