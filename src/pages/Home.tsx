import Footer from '@/components/Footer';
import LandingPage from '@/components/LandingPage';
import SiteHeader from '@/components/SiteHeader';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-950">
      <SiteHeader />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
}
