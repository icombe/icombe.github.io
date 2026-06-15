import Footer from '@/components/Footer';
import LandingPage from '@/components/LandingPage';
import SiteHeader from '@/components/SiteHeader';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <SiteHeader />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
}
