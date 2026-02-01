import HeroScroll from "@/components/home/HeroScroll";
import { SecondSequence, ContentSection } from "@/components/home/ScrollSequence";
import EventsPreview from "@/components/home/EventsPreview";
import AboutPreview from "@/components/home/AboutPreview";
import StatsSection from "@/components/home/StatsSection";
import PassesPreview from "@/components/home/PassesPreview";
import VibeCheck from "@/components/features/VibeCheck";

export default function Home() {
  return (
    <div className="bg-[#030303]">
      {/* SEQUENCE 1: Hero (456 frames) - 350vh scroll */}
      <HeroScroll />
      
      {/* SEQUENCE 2: More (165 frames) - 250vh scroll */}
      <SecondSequence />
      
      {/* CONTENT with animated particle background */}
      <ContentSection>
        {/* About Section - "The Story" */}
        <AboutPreview />
        
        {/* Stats - "The Scale" */}
        <StatsSection />
        
        {/* Events - "The Action" */}
        <EventsPreview />
        
        {/* Vibe Check - "The Interactive" */}
        <VibeCheck />

        {/* Passes - "The Gateway" */}
        <PassesPreview />
      </ContentSection>
    </div>
  );
}
