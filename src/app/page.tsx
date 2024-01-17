import AboutSection from './components/about-section'
import CategoryNavigation from './components/category-navigation'
import FeaturedSection from './components/featured-section'
import Hero from './components/hero'

export default async function Home() {
  return (
    <main className="min-h-screen bg-snow-drift">
      <Hero />
      <div className="content-grid gap-y-28 pt-10 md:pt-20">
        <section>
          <CategoryNavigation />
        </section>
        <FeaturedSection />
        <AboutSection />
      </div>
    </main>
  )
}
