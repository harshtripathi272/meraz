import HeroScroll from "@/components/home/HeroScroll";
import EventsPreview from "@/components/home/EventsPreview";
import AboutPreview from "@/components/home/AboutPreview";
import VibeCheck from "@/components/features/VibeCheck";
import { ContentBackground } from "@/components/home/ScrollSequence";

export default function Home() {
  return (
    <>
      {/* Hero with first scroll sequence (0001.jpg - 0456.jpg) */}
      <HeroScroll />
      
      {/* 
        Content sections with second sequence as background (ezgif-frame-xxx.jpg).
        These scroll OVER the hero, with the second sequence playing subtly behind.
      */}
      <div className="relative z-10">
        {/* Transition gradient */}
        <div 
          className="h-48 bg-gradient-to-b from-transparent via-obsidian/50 to-obsidian"
          style={{ marginTop: '-12rem' }}
        />
        
        {/* Content with animated background */}
        <ContentBackground>
          <AboutPreview />
          <EventsPreview />
          <VibeCheck />
        </ContentBackground>
      </div>
    </>
  );
}
