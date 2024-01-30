import Logo from '~/assets/svgs/logo.svg'
import MainNavigation from './main-navigation'
import MobileMenu from './mobile-menu'
import Link from './shared/link'

export default function Header() {
  return (
    <header className="content-grid | sticky top-0 z-[60] bg-eclipse-black font-bold text-white">
      <div className="header-grid | z-10 border-b border-white/10 py-8 md:h-[95px] md:px-0 lg:py-9">
        <MobileMenu />
        <Link href="/" className="flex">
          <Logo aria-label="audiophile logo" />
        </Link>
        <MainNavigation className="hidden lg:block" />
        {/* <Cart /> */}
      </div>
    </header>
  )
}
