import React from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PricingSection from "@/components/landing/PricingSection";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  const productName = process.env.NEXT_PUBLIC_PRODUCTNAME || "BETA+";

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection productName={productName} />
      <HowItWorksSection />
      <PricingSection />
      <CtaSection productName={productName} />
      <Footer productName={productName} />
    </div>
  );
}
