import HeroScroll from "@/components/home/HeroScroll";
import EventsPreview from "@/components/home/EventsPreview";
import AboutPreview from "@/components/home/AboutPreview";
import VibeCheck from "@/components/features/VibeCheck";

export default function Home() {
  return (
    <>
      <HeroScroll />
      <div className="relative z-10 bg-obsidian">
        <AboutPreview />
        <EventsPreview />
        <VibeCheck />
      </div>
    </>
  );
}
