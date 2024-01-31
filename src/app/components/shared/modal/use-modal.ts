import { useEffect, useState } from 'react'
import useOutsideClick from '~/lib/hooks/use-outside-click'
import useEscapeKey from '~/lib/hooks/useEscapeKey'
import { disableContentInteraction, enableContentInteraction } from './utils'

export default function useModal(id: string) {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useOutsideClick<HTMLDialogElement>(close)
  const customEvent = new CustomEvent('dialog-open', { detail: { source: id } })
  useEscapeKey(close)

  useEffect(() => {
    function handleDialogClose(e: CustomEvent<{ source: string }>) {
      if (e.detail.source !== id) setIsOpen(false)
    }

    const eventListenerObject = { handleEvent: handleDialogClose }
    document.addEventListener('dialog-open', eventListenerObject)
    return () => {
      document.removeEventListener('dialog-open', eventListenerObject)
    }
  }, [id])

  function close() {
    setIsOpen(false)
    enableContentInteraction()
  }

  function open() {
    setIsOpen(true)
    disableContentInteraction()
    document.dispatchEvent(customEvent)
  }

  function toggle() {
    if (isOpen) close()
    else open()
  }

  return { isOpen, toggle, dialogRef } as const
}
