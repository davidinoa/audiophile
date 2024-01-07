import CartIcon from '~/assets/svgs/icon-cart.svg'
import HamburgerIcon from '~/assets/svgs/icon-hamburger.svg'
import Logo from '~/assets/svgs/logo.svg'
import MainNavigation from './main-navigation'

export default function Header() {
  return (
    <header className="grid-container | sticky top-0 bg-eclipse-black font-bold text-white md:px-6">
      <h1 className="sr-only">Audiophile</h1>
      <div className="header-grid | border-b border-white/10 px-6 py-8 md:px-0 lg:py-9">
        <button type="button" aria-label="menu icon" className="lg:hidden">
          <HamburgerIcon />
        </button>
        <a href="/">
          <Logo aria-label="audiophile logo" />
        </a>
        <MainNavigation className="hidden lg:block" />
        <button type="button" aria-label="shopping cart icon">
          <CartIcon />
        </button>
      </div>
    </header>
  )
}
