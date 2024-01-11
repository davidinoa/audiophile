import { type ComponentProps } from 'react'
import { mergeClassNames } from '~/lib/utils'
import Link from './shared/link'

type Props = {
  orientation?: 'horizontal' | 'vertical'
} & ComponentProps<'nav'>

const links = [
  { href: '/', label: 'Home' },
  { href: '/headphones', label: 'Headphones' },
  { href: '/speakers', label: 'Speakers' },
  { href: '/earphones', label: 'Earphones' },
]

export default function MainNavigation({
  className,
  orientation = 'horizontal',
}: Props) {
  return (
    <nav className={className}>
      <ul
        className={mergeClassNames(
          'flex',
          orientation === 'vertical' ? 'flex-col gap-4' : 'gap-9',
        )}
      >
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              className="text-xs-plus font-bold uppercase leading-loose tracking-[0.125rem]"
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
