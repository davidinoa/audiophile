'use client'

import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import CloseIcon from '~/assets/icon-close.svg'
import { mergeClassNames } from '~/lib/utils'
import Button from '../button'
import FocusTrap from './focust-trap'

type ModalProps = {
  id: string
  isOpen: boolean
  toggle: () => void
  children: ReactNode
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>
  withFocusTrap?: boolean
  classNames?: {
    dialog?: string
    backdrop?: string
  }
}

export default function Modal({
  id,
  children,
  classNames,
  isOpen,
  dialogRef,
  toggle,
  withFocusTrap = false,
}: ModalProps) {
  const modal = (
    <div
      aria-hidden
      hidden={!isOpen}
      className={mergeClassNames(
        'fixed inset-0 z-40 max-h-screen overflow-auto bg-black/50 duration-300 animate-in fade-in fill-mode-forwards',
        classNames?.backdrop,
      )}
    >
      <FocusTrap active={isOpen && withFocusTrap}>
        <dialog
          id={id}
          ref={dialogRef}
          open={isOpen}
          aria-modal="true"
          className={mergeClassNames('focus:outline-none', classNames?.dialog)}
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
      </FocusTrap>
    </div>
  )

  return typeof document === 'undefined'
    ? modal
    : createPortal(modal, document.body)
}
