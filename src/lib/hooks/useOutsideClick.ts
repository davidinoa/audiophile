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

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  return elementRef
}
