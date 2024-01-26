import { useCallback, useEffect, useSyncExternalStore } from 'react'

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const getSnapshot = () => getLocalStorageItem(key)

  const store = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getLocalStorageServerSnapshot,
  )

  const setState = useCallback(
    (value: T) => {
      try {
        if (value == null) {
          removeLocalStorageItem(key)
        } else {
          setLocalStorageItem(key, value)
        }
      } catch (error) {
        console.error(error)
      }
    },
    [key],
  )

  useEffect(() => {
    if (
      getLocalStorageItem(key) === null &&
      typeof initialValue !== 'undefined'
    ) {
      setLocalStorageItem(key, initialValue)
    }
  }, [key, initialValue])

  return [store ? (JSON.parse(store) as T) : initialValue, setState] as const
}

function getLocalStorageItem(key: string) {
  return window.localStorage.getItem(key)
}
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

function getLocalStorageServerSnapshot(): string | null {
  throw new Error('useLocalStorage is client-only hook')
}

function setLocalStorageItem(key: string, value: unknown) {
  const serializedValue = JSON.stringify(value)
  window.localStorage.setItem(key, serializedValue)
  dispatchStorageEvent(key, serializedValue)
}

function removeLocalStorageItem(key: string) {
  window.localStorage.removeItem(key)
  dispatchStorageEvent(key, null)
}

function dispatchStorageEvent(key: string, newValue: string | null) {
  window.dispatchEvent(
    new StorageEvent('storage', {
      key,
      newValue,
    }),
  )
}
