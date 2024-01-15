import { Link as NextUiLink } from '@nextui-org/link'
import { cva, type VariantProps } from 'class-variance-authority'
import NextLink from 'next/link'
import { mergeClassNames } from '~/lib/utils'

const styles = cva(
  'group-focus:outline-focus group-focus:outline-offset-2 hover:opacity-100 group-hover:text-copper-canyon hover:text-copper-canyon',
  {
    variants: {
      variant: {
        default: 'group-hover:[&_path]:fill-copper-canyon',
        wrapper: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type Props = VariantProps<typeof styles> & React.ComponentProps<typeof NextLink>

export default function Link({
  href,
  children,
  className,
  variant,
  ...props
}: Props) {
  const isWrapper = variant === 'wrapper'
  return (
    <NextLink
      {...props}
      href={href}
      className={mergeClassNames(
        'group flex leading-none outline-none',
        isWrapper && className,
      )}
    >
      {isWrapper ? (
        children
      ) : (
        <NextUiLink
          as="div"
          tabIndex={-1}
          className={mergeClassNames(styles({ variant }), className)}
        >
          {children}
        </NextUiLink>
      )}
    </NextLink>
  )
}
