import {
  Button as NextUiButton,
  ButtonProps as NextUiButtonProps,
} from '@nextui-org/button'
import { VariantProps, cva } from 'class-variance-authority'
import Link from 'next/link'
import { forwardRef } from 'react'
import { mergeClassNames } from '~/lib/utils'

const styles = cva(
  'h-fit w-fit min-w-fit px-8 py-4 text-xs-plus font-bold uppercase leading-tight tracking-[1px] data-[hover=true]:!opacity-100',
  {
    variants: {
      variant: {
        primary:
          'border border-copper-canyon bg-copper-canyon text-white hover:border-peachy-sunset hover:bg-peachy-sunset rounded-none',
        secondary:
          'border border-black bg-white text-black hover:bg-black hover:text-white rounded-none',
        icon: 'bg-transparent p-1 data-[hover=true]:!opacity-80',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

type Props = VariantProps<typeof styles> & Omit<NextUiButtonProps, 'variant'>

function BaseButton(
  { children, className, variant, href, ...props }: Props,
  ref?: React.Ref<HTMLButtonElement | null>,
) {
  return (
    <NextUiButton
      {...props}
      ref={ref}
      href={href}
      as={href ? Link : 'button'}
      className={mergeClassNames(styles({ variant }), className)}
    >
      {children}
    </NextUiButton>
  )
}

const Button = forwardRef(BaseButton)
export default Button
