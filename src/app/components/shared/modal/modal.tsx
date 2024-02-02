'use client'

import { type ReactNode } from 'react'
import CloseIcon from '~/assets/svgs/icon-close.svg'
import Button from '../button'

type ModalProps = {
  id: string
  isOpen: boolean
  toggle: () => void
  children: ReactNode
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>
  className?: string
}

export default function Modal({
  id,
  children,
  className,
  isOpen,
  dialogRef,
  toggle,
}: ModalProps) {
  return (
    <div
      aria-hidden
      hidden={!isOpen}
      className="fixed inset-0 -z-10 max-h-screen overflow-auto bg-black/50 duration-300 animate-in fade-in fill-mode-forwards"
    >
      <dialog
        id={id}
        ref={dialogRef}
        tabIndex={-1}
        open={isOpen}
        aria-modal="true"
        className={className}
      >
        <Button
          variant="icon"
          aria-label="close modal"
          onPress={toggle}
          className="absolute right-4 top-4 cursor-pointer text-black/50 hover:text-black/75"
        >
          <CloseIcon className="h-6 w-6" />
        </Button>
        {isOpen ? children : null}
      </dialog>
    </div>
  )
}
