import { Hero } from "@/components/landing/Hero";
import { ProblemDemo } from "@/components/landing/ProblemDemo";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { DemoSection } from "@/components/landing/DemoSection";
import { LanguageGrid } from "@/components/landing/LanguageGrid";
import { TrustPrivacy } from "@/components/landing/TrustPrivacy";
import { Footer } from "@/components/shared/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ProblemDemo />
      <HowItWorks />
      <DemoSection />
      <LanguageGrid />
      <TrustPrivacy />

      {/* Footer */}
      <Footer />
    </div>
  );
}
