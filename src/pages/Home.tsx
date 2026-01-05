import LandingPage from '@/components/LandingPage';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import DotNavigation from '@/components/DotNavigation';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <>
      <DotNavigation />
      <div id="landing">
        <LandingPage />
      </div>
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
