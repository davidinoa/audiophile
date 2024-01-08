import Link from 'next/link'
import CartIcon from '~/assets/svgs/icon-cart.svg'
import HamburgerIcon from '~/assets/svgs/icon-hamburger.svg'
import Logo from '~/assets/svgs/logo.svg'
import Button from './button'
import MainNavigation from './main-navigation'

export default function Header() {
  return (
    <header className="grid-container | sticky top-0 z-50 bg-eclipse-black font-bold text-white md:px-6">
      <h1 className="sr-only">Audiophile</h1>
      <div className="header-grid | border-b border-white/10 px-6 py-8 md:px-0 lg:py-9">
        <Button
          intent="icon"
          aria-label="menu icon"
          className="-ml-1 lg:hidden"
        >
          <HamburgerIcon />
        </Button>
        <Link href="/">
          <Logo aria-label="audiophile logo" />
        </Link>
        <MainNavigation className="hidden lg:block" />
        <Button intent="icon" aria-label="shopping cart icon" className="-mr-1">
          <CartIcon />
        </Button>
      </div>
    </header>
  )
}
