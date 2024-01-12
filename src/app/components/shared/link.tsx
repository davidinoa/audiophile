import { Link as NextUiLink } from '@nextui-org/link'
import NextLink from 'next/link'
import { mergeClassNames } from '~/lib/utils'

type Props = React.ComponentProps<typeof NextLink>

export default function Link({ href, children, className, ...props }: Props) {
  return (
    <NextLink href={href} className="group leading-none" {...props}>
      <NextUiLink
        as="span"
        tabIndex={-1}
        className={mergeClassNames(
          'hover:opacity-100 group-hover:text-copper-canyon group-hover:[&_path]:fill-copper-canyon',
          className,
        )}
      >
        {children}
      </NextUiLink>
    </NextLink>
  )
}
