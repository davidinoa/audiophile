'use client'

import { type ReactNode } from 'react'
import { mergeClassNames } from '~/lib/utils'

type ModalProps = {
  id: string
  isOpen: boolean
  children: ReactNode
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>
  classNames?: {
    dialog: string
  }
}

export default function Modal({
  id,
  children,
  classNames,
  isOpen,
  dialogRef,
}: ModalProps) {
  return (
    <div>
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
