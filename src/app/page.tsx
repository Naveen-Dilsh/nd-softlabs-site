import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Statement from "@/components/Statement";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import ContactCta from "@/components/ContactCta";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Showcase />
      <Statement />
      <CaseStudies />
      <Services />
      <Process />
      <Testimonials />
      <Pricing />
      <Faq />
      <ContactCta />
    </main>
  );
}
