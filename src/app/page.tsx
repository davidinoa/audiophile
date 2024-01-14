import CategoryNavigation from './components/category-navigation'
import Hero from './components/hero'
import AboutSection from './components/shared/about-section'

export default async function Home() {
  return (
    <main className="min-h-screen bg-snow-drift">
      <Hero />
      <section className="content-grid pt-20">
        <CategoryNavigation className="grid gap-4 md:grid-cols-3" />
      </section>
      <AboutSection />
    </main>
  )
}
