'use client'

import { useRef, useState } from 'react'
import HamburgerIcon from '~/assets/svgs/icon-hamburger.svg'
import {
  LG_BREAKPOINT,
  MOBILE_MENU_ANIMATION_DURATION_MS,
} from '~/lib/constants'
import useEscapeKey from '~/lib/hooks/useEscapeKey'
import useOutsideClick from '~/lib/hooks/useOutsideClick'
import useWindowSize from '~/lib/hooks/useWindowSize'
import { mergeClassNames } from '~/lib/utils'
import CategoryNavigation from './category-navigation'
import Button from './shared/button'

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const ref = useOutsideClick<HTMLDialogElement>(closeMenu)
  const backdropRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()
  useEscapeKey(closeMenu)

  if (width >= LG_BREAKPOINT) closeMenu()

  function closeMenu() {
    if (isMenuOpen) toggleMenu()
  }

  function toggleMenu() {
    const body = document.querySelector('body')!
    const main = document.querySelector('main')!
    const footer = document.querySelector('footer')!
    const exitAnimationClasses = ['animate-out', 'fade-out']

    if (!isMenuOpen) {
      body.style.overflow = 'hidden'
      main.setAttribute('inert', 'true')
      footer.setAttribute('inert', 'true')
      setIsMenuOpen(!isMenuOpen)
    } else {
      body.style.overflow = 'auto'
      main.removeAttribute('inert')
      footer.removeAttribute('inert')

      ref.current?.classList.add(...exitAnimationClasses)
      backdropRef.current?.classList.add(...exitAnimationClasses)

      setTimeout(() => {
        ref.current?.classList.remove(...exitAnimationClasses)
        backdropRef.current?.classList.remove(...exitAnimationClasses)

        setIsMenuOpen(!isMenuOpen)
      }, MOBILE_MENU_ANIMATION_DURATION_MS)
    }
  }

  return (
    <>
      <Button
        variant="icon"
        aria-label="menu icon"
        className="lg:hidden"
        onPress={toggleMenu}
      >
        <HamburgerIcon />
      </Button>
      <div className="absolute left-0 top-[93px] lg:hidden">
        <dialog
          ref={ref}
          tabIndex={-1}
          open={isMenuOpen}
          aria-modal="true"
          className={mergeClassNames(
            'animate-in fade-in fill-mode-forwards z-10 max-h-[calc(100vh-93px)] w-screen min-w-[22rem] overflow-scroll rounded-b-lg px-6 py-8 duration-300 md:px-10 md:py-14',
          )}
        >
          <CategoryNavigation />
        </dialog>
        <div
          ref={backdropRef}
          hidden={!isMenuOpen}
          className="animate-in fade-in fill-mode-forwards min-w-screen fixed inset-0 -z-10 min-h-[100vh] bg-black/50 duration-300"
        />
      </div>
    </>
  )
}
