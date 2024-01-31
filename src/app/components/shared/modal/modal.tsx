'use client'

import { useEffect, useState, type ReactNode } from 'react'
import useOutsideClick from '~/lib/hooks/use-outside-click'
import useEscapeKey from '~/lib/hooks/useEscapeKey'
import { mergeClassNames } from '~/lib/utils'
import { disableContentInteraction, enableContentInteraction } from './utils'

type ModalProps = {
  id: string
  children: ReactNode
  renderTrigger: (toggle: () => void) => ReactNode
  classNames?: {
    dialog: string
  }
}

export default function Modal({
  id,
  children,
  classNames,
  renderTrigger,
}: ModalProps) {
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

  return (
    <div>
      {renderTrigger(toggle)}
      <dialog
        id={id}
        ref={dialogRef}
        tabIndex={-1}
        open={isOpen}
        aria-modal="true"
        className={mergeClassNames(classNames?.dialog)}
      >
        {children}
      </dialog>
      <div
        aria-hidden
        hidden={!isOpen}
        className="fixed inset-0 -z-10 bg-black/50 duration-300 animate-in fade-in fill-mode-forwards"
      />
    </div>
  )
}
