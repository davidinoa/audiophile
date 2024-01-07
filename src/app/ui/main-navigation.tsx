import Link from 'next/link'
import { type ComponentProps } from 'react'
import { mergeClassNames } from '~/lib/utils'

type Props = {
  orientation?: 'horizontal' | 'vertical'
} & ComponentProps<'nav'>

export default function MainNavigation({
  className,
  orientation = 'horizontal',
}: Props) {
  return (
    <nav className={className}>
      <ul
        className={mergeClassNames(
          orientation === 'vertical' ? 'flex-col gap-4' : 'gap-9',
          'text-xs-plus flex font-bold uppercase leading-loose tracking-[0.125rem]',
        )}
      >
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/headphones">Headphones</Link>
        </li>
        <li>
          <Link href="/speakers">Speakers</Link>
        </li>
        <li>
          <Link href="/earphones">Earphones</Link>
        </li>
      </ul>
    </nav>
  )
}
