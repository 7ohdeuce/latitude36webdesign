import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Cinematic from './sections/Cinematic';
import {
  CommercialCaseStudies,
  WebsiteCaseStudies,
  ToolCaseStudies,
} from './sections/CaseStudies';
import Technology from './sections/Technology';
import Architecture from './sections/Architecture';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import ChatBot from './chatbot/ChatBot';

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
      <CommercialCaseStudies />
      <WebsiteCaseStudies />
      <ToolCaseStudies />
      <Technology />
      <Architecture />
      <Contact />
      <Footer />
      <ChatBot />
    </div>
  );
}
