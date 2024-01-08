import { Button as NextUIButton } from '@nextui-org/button'
import { VariantProps, cva } from 'class-variance-authority'
import { forwardRef } from 'react'
import { mergeClassNames } from '~/lib/utils'

const styles = cva(
  'h-fit w-fit min-w-fit rounded-none px-8 py-4 text-xs-plus font-bold uppercase leading-tight tracking-[1px] data-[hover=true]:opacity-100',
  {
    variants: {
      intent: {
        primary:
          'border border-copper-canyon bg-copper-canyon text-white hover:border-peachy-sunset hover:bg-peachy-sunset',
        secondary:
          'border border-black bg-white text-black hover:bg-black hover:text-white',
        icon: 'bg-transparent px-1 py-0',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  },
)

type Props = VariantProps<typeof styles> &
  React.ComponentProps<typeof NextUIButton>

function BaseButton(
  { children, className, intent, ...props }: Props,
  ref?: React.Ref<HTMLButtonElement | null>,
) {
  return (
    <NextUIButton
      {...props}
      ref={ref}
      className={mergeClassNames(styles({ intent }), className)}
    >
      {children}
    </NextUIButton>
  )
}

const Button = forwardRef(BaseButton)
export default Button
