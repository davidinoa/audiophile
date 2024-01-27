import { useEffect, useLayoutEffect, useRef } from 'react'

export default function useOutsideClick<
  TElement extends HTMLElement = HTMLElement,
>(callback: (e: MouseEvent | TouchEvent) => void) {
  const elementRef = useRef<TElement>(null)
  const callbackRef = useRef(callback)

  useLayoutEffect(() => {
    callbackRef.current = callback
  })

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const element = elementRef.current
      if (element && !element.contains(event.target as Node)) {
        callbackRef.current(event)
      }
    }

    if (window.matchMedia('(hover: none)').matches) {
      document.addEventListener('touchstart', handleClickOutside)
    } else {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return elementRef
}
