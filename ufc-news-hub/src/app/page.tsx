import { Header } from '@/components/ui/Header';
import HeroCinematico from '@/components/home/HeroCinematico';
import EnqueteWidget from '@/components/home/EnqueteWidget';
import { CTAExplorar } from '@/components/home/CTAExplorar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <main>
        <HeroCinematico />
        <div className="container mx-auto px-4 py-8 space-y-12">
          <EnqueteWidget />
          <CTAExplorar />
        </div>
      </main>
    </div>
  );
}
