import { HeroSlider } from "@/components/home/HeroSlider"
import { ProjectsSection } from "@/components/home/ProjectsSection"
import { VolunteerCTA } from "@/components/home/VolunteerCTA"
import { BlogSection } from "@/components/home/BlogSection"
import { NewsSection } from "@/components/home/NewsSection"
import { events } from "@/data/events"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSlider />
      <ProjectsSection />
      <VolunteerCTA />
      <BlogSection />
      <NewsSection events={events} />
    </div>
  )
}
