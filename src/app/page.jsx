"use client";

import {
  HeroSection,
  AboutSection,
  ProductsSection,
  HowWeWorkSection,
  RecentWorksSection,
  NewsletterSection,
  ContactSection,
} from "@components/landing";
import { landingData } from "@assets/placeholders";
import CatalogueSection from "@/components/landing/catalogueSection";

/* helper components */

/* sections */

/* landing page */
export default function Landing() {
  return (
    <>
      <HeroSection {...landingData.heroSection} />
      <AboutSection {...landingData.aboutSection} />
      <ProductsSection {...landingData.productsSection} />
      <HowWeWorkSection {...landingData.howWeWorkSection} />
      <RecentWorksSection {...landingData.recentWorksSection} />
      <NewsletterSection {...landingData.newsletterSection} />
      <CatalogueSection />
      <ContactSection {...landingData.contactSection} />
    </>
  );
}
