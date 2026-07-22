import Hero from '../sections/Hero';
import Cinematic from '../sections/Cinematic';
import {
  CommercialCaseStudies,
  WebsiteCaseStudies,
  ToolCaseStudies,
} from '../sections/CaseStudies';
import Architecture from '../sections/Architecture';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

export default function Landing({ entranceComplete }: { entranceComplete: boolean }) {
  return (
    <>
      <Hero entranceComplete={entranceComplete} />
      <Cinematic />
      <CommercialCaseStudies />
      <WebsiteCaseStudies />
      <ToolCaseStudies />
      <Architecture />
      <Contact />
      <Footer />
    </>
  );
}
