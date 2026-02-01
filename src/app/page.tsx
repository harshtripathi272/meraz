import HeroNeon from "@/components/home/HeroNeon";
import AboutPreview from "@/components/home/AboutPreview";
import EventsPreview from "@/components/home/EventsPreview";
import PassesPreview from "@/components/home/PassesPreview";
import VibeCheck from "@/components/features/VibeCheck";
import AIGallery from "@/components/features/AIGallery";
import Testimonials from "@/components/features/Testimonials";

export default function Home() {
  return (
    <>
      <HeroNeon />
      <AboutPreview />
      <EventsPreview />
      <PassesPreview />
      <VibeCheck />
      <AIGallery />
      <Testimonials />
    </>
  );
}
