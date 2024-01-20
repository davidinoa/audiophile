import AboutSection from '../components/about-section'
import CategoryNavigation from '../components/category-navigation'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <main className="content-grid | bg-snow-drift">
      {children}
      <div className="mt-28 grid gap-y-28 lg:mt-40 lg:gap-y-40">
        <section>
          <CategoryNavigation />
        </section>
        <AboutSection />
      </div>
    </main>
  )
}
