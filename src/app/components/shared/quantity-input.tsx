import Button from './button'

type Props<T> = {
  value: T
  onChange: (value: T) => void
}

const STEP = 1
const MIN_VALUE = 1
const MAX_VALUE = 99

export default function QuantityInput({
  value,
  onChange,
}: Props<number | null>) {
  return (
    <div className="relative inline-block">
      <Button
        variant="icon"
        aria-label="Decrease quantity"
        disabled={value === MIN_VALUE}
        onPress={() =>
          onChange(value ? Math.max(MIN_VALUE, value - STEP) : MIN_VALUE)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 text-black/25 hover:text-copper-canyon disabled:cursor-not-allowed data-[pressed=true]:scale-100 [&:hover]:bg-black/5"
      >
        <span className="w-[2ch] tracking-[-0.005px] ">-</span>
      </Button>
      <label>
        <span className="sr-only">Quantity input</span>
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
          className="w-[120px] bg-frost-whisper px-10 py-4 text-center text-xs-plus font-bold tabular-nums leading-none"
        />
      </label>
      <Button
        variant="icon"
        aria-label="Increase quantity"
        disabled={value === MAX_VALUE}
        onPress={() =>
          onChange(value ? Math.min(MAX_VALUE, value + STEP) : MIN_VALUE)
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 text-black/25 hover:text-copper-canyon disabled:cursor-not-allowed data-[pressed=true]:scale-100 [&:hover]:bg-black/5"
      >
        <span className="w-[2ch] tracking-[-0.005px]">+</span>
      </Button>
    </div>
  )
}