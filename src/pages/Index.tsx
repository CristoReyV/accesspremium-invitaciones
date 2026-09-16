import HeroSection from "@/components/landing/HeroSection";
import CategoryGrid from "@/components/landing/CategoryGrid";
import FeaturedInvitations from "@/components/landing/FeaturedInvitations";
import CharacterThemesSection from "@/components/landing/CharacterThemesSection";
import HowItWorks from "@/components/landing/HowItWorks";
import PricingSection from "@/components/landing/PricingSection";
import ComparisonTable from "@/components/landing/ComparisonTable";
import FAQSection from "@/components/landing/FAQSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* 1. Hero */}
      <HeroSection />
      
      {/* 2. Catálogo por evento */}
      <CategoryGrid />
      
      {/* 3. Catálogo Destacado (MVP prioritarios) */}
      <FeaturedInvitations />
      
      {/* 4. Personajes y temáticas infantiles */}
      <CharacterThemesSection />
      
      {/* 5. Cómo realizar tu compra */}
      <HowItWorks />
      
      {/* 6. Paquetes */}
      <PricingSection />
      
      {/* 7. Comparativa de paquetes */}
      <ComparisonTable />
      
      {/* 8. Preguntas Frecuentes */}
      <FAQSection />
      
      {/* 9. CTA Final */}
      <FinalCTA />
      
      {/* 10. Footer */}
      <Footer />
    </main>
  );
};

export default Index;
