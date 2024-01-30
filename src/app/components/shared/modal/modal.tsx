'use client'

import { useEffect, useState, type ReactNode } from 'react'
import useOutsideClick from '~/lib/hooks/use-outside-click'
import useEscapeKey from '~/lib/hooks/useEscapeKey'
import { mergeClassNames } from '~/lib/utils'
import { disableContentInteraction, enableContentInteraction } from './utils'

type ModalProps = {
  children: ReactNode
  renderTrigger: (toggle: () => void) => ReactNode
  classNames?: {
    dialog: string
  }
}

export default function Modal({
  children,
  classNames,
  renderTrigger,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  useEscapeKey(close)
  const dialogRef = useOutsideClick<HTMLDialogElement>(close)

  function close() {
    setIsOpen(false)
    enableContentInteraction()
  }

  function open() {
    if (isOpen) return
    setIsOpen(true)
    disableContentInteraction()
  }

  function toggle() {
    if (isOpen) close()
    else open()
  }

  useEffect(() => {
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const { target } = mutation
        if (target === dialogRef.current) return
        if (!(target instanceof HTMLElement)) return
        close()
      })
    })

    mutationObserver.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['open'],
    })

    return () => mutationObserver.disconnect()
  }, [dialogRef])

  return (
    <div>
      {renderTrigger(toggle)}
      <dialog
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
