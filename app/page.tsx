import ConcernsMarqueeSection from "@/components/sections/ConcernsMarqueeSection";
import FAQSection from "@/components/sections/FAQSection";
import HeroSection from "@/components/sections/HeroSection";
import HighlightSection from "@/components/sections/HighlightSection";
import PortfolioHeroParallaxSection from "@/components/sections/PortfolioHeroParallaxSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillersZoneMethodSection from "@/components/sections/SkillersZoneMethodSection";
import Testimonials from "@/components/sections/TestimonialSection";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Box>
        <HeroSection />
        <HighlightSection />
        <ConcernsMarqueeSection />
        <div className="max-w-7xl mx-auto px-2 lg:px-0">
          <ProcessSection />
        </div>
        <ProjectsSection />
        <SkillersZoneMethodSection />
        <Testimonials />
        <PortfolioHeroParallaxSection />
        <FAQSection />
      </Box>
    </main>
  );
}
