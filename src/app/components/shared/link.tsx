import { Link as NextUiLink } from '@nextui-org/link'
import NextLink from 'next/link'

type Props = React.ComponentProps<typeof NextLink>

export default function Link({ href, children, className, ...props }: Props) {
  return (
    <NextLink href={href} className="leading-none" {...props}>
      <NextUiLink as="span" tabIndex={-1} className={className}>
        {children}
      </NextUiLink>
    </NextLink>
  )
}
