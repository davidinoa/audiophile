import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { type UseFormRegisterReturn } from 'react-hook-form'
import { formatPhoneNumber } from '~/lib/utils'

function TextInputField(
  {
    label,
    error,
    type,
    ...props
  }: {
    label: string
    error?: string
    type?: 'text' | 'email' | 'tel'
  } & ComponentPropsWithoutRef<'input'> &
    Omit<UseFormRegisterReturn, 'ref'>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <div className="grid gap-1">
      <label className="grid gap-2">
        <span className="text-xs font-bold">{label}</span>
        <input
          ref={ref}
          className="aria-invalid:border-crimson-tide aria-invalid:outline-crimson-tide rounded-lg border px-6 py-4 text-sm font-bold leading-none caret-copper-canyon outline-copper-canyon transition-colors disabled:text-black/40"
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
      {error && (
        <p role="alert" className="text-xs font-medium text-crimson-tide">
          {error}
        </p>
      )}
    </div>
  )
}

export default forwardRef(TextInputField)
