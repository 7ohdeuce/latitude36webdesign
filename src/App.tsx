import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Cinematic from './sections/Cinematic';
import CaseStudies from './sections/CaseStudies';
import Technology from './sections/Technology';
import Architecture from './sections/Architecture';
import Footer from './sections/Footer';

export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setEntranceComplete(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-white" style={{ fontFamily: '"Space Mono", monospace' }}>
      <Navbar entranceComplete={entranceComplete} />
      <Hero entranceComplete={entranceComplete} />
      <Cinematic />
      <CaseStudies />
      <Technology />
      <Architecture />
      <Footer />
    </div>
  );
}
