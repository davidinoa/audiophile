import CartIcon from '~/assets/svgs/icon-cart.svg'
import HamburgerIcon from '~/assets/svgs/icon-hamburger.svg'
import Logo from '~/assets/svgs/logo.svg'

export default function Header() {
  return (
    <header className="grid-container | bg-eclipse-black sticky top-0 text-white md:px-6">
      <h1 className="sr-only">Audiophile</h1>
      <div className="header-grid | border-b border-white/10 px-6 py-8 md:px-0 lg:py-9">
        <button type="button" aria-label="menu icon" className="lg:hidden">
          <HamburgerIcon />
        </button>
        <a href="/">
          <Logo title="audiophile logo" />
        </a>
        <nav className="hidden lg:block">
          <ul className="flex gap-9 text-sm font-bold uppercase leading-none tracking-[0.125rem]">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">Headphones</a>
            </li>
            <li>
              <a href="/">Speaker</a>
            </li>
            <li>
              <a href="/">Earphones</a>
            </li>
          </ul>
        </nav>
        <button type="button" aria-label="shopping cart icon">
          <CartIcon />
        </button>
      </div>
    </header>
  )
}
