import FacebookIcon from '~/assets/svgs/icon-facebook.svg'
import InstagramIcon from '~/assets/svgs/icon-instagram.svg'
import TwitterIcon from '~/assets/svgs/icon-twitter.svg'
import Logo from '~/assets/svgs/logo.svg'
import MainNavigation from './main-navigation'
import Link from './shared/link'

const socialLinks = [
  {
    href: 'https://www.facebook.com/',
    icon: <FacebookIcon aria-label="Facebook icon" />,
  },
  {
    href: 'https://www.twitter.com/',
    icon: <TwitterIcon aria-label="Twitter icon" />,
  },
  {
    href: 'https://www.instagram.com/',
    icon: <InstagramIcon aria-label="Instagram icon" />,
  },
]

export default function Footer() {
  return (
    <footer className="grid-container | bg-eclipse-black px-6 py-12 text-white md:px-10 md:pb-11 md:pt-16">
      <div className="footer-grid | text-center">
        <Link href="/">
          <Logo aria-label="audiophile logo" />
        </Link>
        <MainNavigation
          orientation="horizontal"
          className="hidden md:col-span-2 md:block lg:col-span-1  lg:justify-self-end"
        />
        <MainNavigation orientation="vertical" className="md:hidden" />
        <p className="md:mx-lg:mb-7 max-w-[65ch] text-center text-sm-plus font-[500] leading-relaxed text-white/50 md:col-span-2 md:text-start lg:col-span-1">
          Audiophile is an all in one stop to fulfill your audio needs.
          We&apos;re a small team of music lovers and sound specialists who are
          devoted to helping you get the most out of personal audio. Come and
          visit our demo facility - we&apos;re open 7 days a week.
        </p>
        <p className="text-sm-plus font-bold text-white/50 lg:row-start-3">
          Copyright {new Date().getFullYear()}. All Rights Reserved
        </p>
        <ul className="flex items-center gap-4 md:items-end md:justify-self-end">
          {socialLinks.map(({ href, icon }) => (
            <li key={href}>
              <Link href={href}>{icon}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
