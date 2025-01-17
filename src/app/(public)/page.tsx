'use client';

import Hero from "@/components/public/Hero";
import Testimonials from "@/components/public/Testimonials";
import Pricing from "@/components/public/Pricing/Pricing";
import CTA from "@/components/public/CTA";
import Container from "@/components/public/Container";
import Benefits from "@/components/public/Benefits/Benefits";
import Section from "@/components/public/Section";
import FAQ from "@/components/public/FAQ";
import Stats from "@/components/public/Stats";
import Logos from "@/components/public/Logos";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Logos />
      <Container>
        <Benefits />

        <Section
          id="pricing"
          title="Pricing"
          description="Simple, transparent pricing. No surprises."
        >
          <Pricing />
        </Section>

        <Section
          id="testimonials"
          title="What Our Clients Say"
          description="Hear from those who have partnered with us."
        >
          <Testimonials />
        </Section>

        <FAQ />

        <Stats />

        <CTA />
      </Container>
    </>
  );
};

export default HomePage;