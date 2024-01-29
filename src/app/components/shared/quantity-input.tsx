import { Spinner } from '@nextui-org/spinner'
import Button from './button'

type Props<T> = {
  value: T
  isLoading: boolean
  onChange: (value: T) => void
}

const STEP = 1
const MIN_VALUE = 0
const MAX_VALUE = 99

export default function QuantityInput({
  value,
  isLoading,
  onChange,
}: Props<number | null>) {
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
        className="absolute left-4 top-1/2 -translate-y-1/2 text-black/25 hover:text-copper-canyon disabled:cursor-not-allowed data-[pressed=true]:scale-100 [&:hover]:bg-black/5"
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
          type="number"
          min={MIN_VALUE}
          max={MAX_VALUE}
          value={value ?? ''}
          onChange={(e) => {
            const nextValue = e.target.valueAsNumber
            onChange(Number.isNaN(nextValue) ? null : nextValue)
          }}
          onBlur={(e) => {
            const nextValue = e.target.valueAsNumber
            if (Number.isNaN(nextValue)) return onChange(null)
            const validatedValue = Math.max(
              MIN_VALUE,
              Math.min(MAX_VALUE, e.target.valueAsNumber),
            )
            return onChange(validatedValue)
          }}
          aria-busy={isLoading}
          disabled={isLoading}
          className="w-[120px] bg-frost-whisper px-10 py-4 text-center  font-bold tabular-nums leading-none disabled:text-black/50"
        />
      </label>
      <Button
        variant="icon"
        aria-label="Increase quantity"
        isDisabled={value === MAX_VALUE || isLoading}
        onPress={() =>
          onChange(
            value !== null ? Math.min(MAX_VALUE, value + STEP) : MIN_VALUE,
          )
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 text-black/25 hover:text-copper-canyon disabled:cursor-not-allowed data-[pressed=true]:scale-100 [&:hover]:bg-black/5"
      >
        <span className="w-[2ch] tracking-[-0.005px]">+</span>
      </Button>
    </div>
  )
}
