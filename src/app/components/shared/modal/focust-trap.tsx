import { useEffect, useRef } from 'react'

type Props = {
  children: React.ReactNode
  active: boolean
}

export default function FocusTrap({ children, active }: Props) {
  const focusTrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ]

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !active) return

      const focusableElements =
        focusTrapRef.current?.querySelectorAll<HTMLElement>(
          focusableSelectors.join(', '),
        ) ?? []

      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement?.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement?.focus()
        event.preventDefault()
      }
    }

    if (active) {
      document.addEventListener('keydown', handleKeyDown)
      focusTrapRef.current?.focus()
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [active])

  return (
    <div id="focus-trap" ref={focusTrapRef} tabIndex={-1}>
      {children}
    </div>
  )
}
