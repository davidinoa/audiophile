import Hero from './components/hero'
import AboutSection from './components/shared/about-section'

export default async function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <AboutSection />
    </main>
  )
}
