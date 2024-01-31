import { Spinner } from '@nextui-org/spinner'
import { useRef, type ComponentProps } from 'react'
import { mergeClassNames } from '~/lib/utils'
import Button from './button'

type Props<T> = {
  value: T
  isLoading: boolean
  minValue?: number
  onChange: (value: T) => void
} & Omit<ComponentProps<'input'>, 'value' | 'onChange'>

const STEP = 1
const MIN_VALUE = 0
const MAX_VALUE = 99

export default function QuantityInput({
  value,
  minValue = MIN_VALUE,
  isLoading,
  onChange,
  className,
  ...props
}: Props<number | null>) {
  const previousValue = useRef(value)
  return (
    <div className="relative block h-fit w-fit">
      <Button
        variant="icon"
        aria-label="Decrease quantity"
        isDisabled={value === MIN_VALUE || isLoading}
        onPress={() =>
          onChange(
            value !== null ? Math.max(MIN_VALUE, value - STEP) : MIN_VALUE,
          )
        }
        className="absolute left-2 top-1/2 -translate-y-1/2 text-black/25 hover:text-copper-canyon disabled:cursor-not-allowed data-[pressed=true]:scale-100 md:left-4 [&:hover]:bg-black/5"
      >
        <span className="w-[2ch] tracking-[-0.005px] ">-</span>
      </Button>
      <label>
        <span className="sr-only">Quantity input</span>
        {isLoading && (
          <Spinner
            color="default"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        )}
        <input
          {...props}
          type="number"
          min={minValue}
          max={MAX_VALUE}
          value={value ?? ''}
          onChange={(e) => {
            const nextValue = e.target.valueAsNumber
            if (value) previousValue.current = value
            if (Number.isNaN(nextValue)) return onChange(null)
            const validatedValue = Math.max(
              minValue,
              Math.min(MAX_VALUE, nextValue),
            )
            return onChange(validatedValue)
          }}
          onBlur={() => {
            if (!value) onChange(previousValue.current)
          }}
          aria-busy={isLoading}
          disabled={isLoading}
          className={mergeClassNames(
            'w-[120px] bg-frost-whisper px-10 py-4 text-center font-bold tabular-nums leading-none disabled:text-black/50',
            className,
          )}
        />
      </label>
      <Button
        variant="icon"
        aria-label="Increase quantity"
        isDisabled={value === MAX_VALUE || isLoading}
        onPress={() =>
          onChange(
            value !== null ? Math.min(MAX_VALUE, value + STEP) : minValue,
          )
        }
        className="absolute right-2 top-1/2 -translate-y-1/2 text-black/25 hover:text-copper-canyon disabled:cursor-not-allowed data-[pressed=true]:scale-100 md:right-4 [&:hover]:bg-black/5"
      >
        <span className="w-[2ch] tracking-[-0.005px]">+</span>
      </Button>
    </div>
  )
}
