import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { type UseFormRegisterReturn } from 'react-hook-form'
import { formatPhoneNumber, mergeClassNames } from '~/lib/utils'

function TextInputField(
  {
    label,
    error,
    type,
    classNames,
    ...props
  }: {
    label: string
    error?: string
    type?: 'text' | 'email' | 'tel'
    classNames?: {
      base?: string
    }
  } & ComponentPropsWithoutRef<'input'> &
    Omit<UseFormRegisterReturn, 'ref'>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <label className={mergeClassNames('grid gap-2', classNames?.base)}>
      <div>
        <span className="text-xs font-bold">{label}</span>
        {error && (
          <p role="alert" className="text-xs font-medium text-crimson-tide">
            {error}
          </p>
        )}
      </div>
      <input
        ref={ref}
        autoComplete="true"
        className="h-fit self-end rounded-lg border px-6 py-4 text-sm font-bold leading-none caret-copper-canyon outline-copper-canyon transition-colors disabled:text-black/40 aria-invalid:border-crimson-tide aria-invalid:outline-crimson-tide"
        {...props}
        aria-invalid={Boolean(error)}
        onChange={(e) => {
          if (type === 'tel') {
            e.target.value = formatPhoneNumber(e.target.value)
          }
          return props.onChange?.(e)
        }}
      />
    </label>
  )
}

export default forwardRef(TextInputField)
