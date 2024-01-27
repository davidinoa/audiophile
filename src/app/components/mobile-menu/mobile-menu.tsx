'use client'

import { useRef, useState } from 'react'
import HamburgerIcon from '~/assets/svgs/icon-hamburger.svg'
import { FADE_OUT_DURATION_MS, LG_BREAKPOINT } from '~/lib/constants'
import useOutsideClick from '~/lib/hooks/use-outside-click'
import useEscapeKey from '~/lib/hooks/useEscapeKey'
import useWindowSize from '~/lib/hooks/useWindowSize'
import { mergeClassNames } from '~/lib/utils'
import CategoryNavigation from '../category-navigation'
import Button from '../shared/button'
import {
  disableContentInteraction,
  enableContentInteraction,
  toggleExitAnimationClasses,
} from './utils'

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const backdropRef = useRef<HTMLDivElement>(null)
  const ref = useOutsideClick<HTMLDialogElement>(() => {
    if (isMenuOpen) toggleMenu()
  })

  useEscapeKey(() => isMenuOpen && toggleMenu())

  const { width } = useWindowSize()
  if (width >= LG_BREAKPOINT && isMenuOpen) {
    toggleMenu()
  }

  function toggleMenu() {
    const elementsWithExitAnimations = [ref, backdropRef]

    if (!isMenuOpen) {
      disableContentInteraction()
      setIsMenuOpen(!isMenuOpen)
    } else {
      enableContentInteraction()
      toggleExitAnimationClasses({
        isOpen: isMenuOpen,
        elementRefs: elementsWithExitAnimations,
      })

      setTimeout(() => {
        toggleExitAnimationClasses({
          isOpen: !isMenuOpen,
          elementRefs: elementsWithExitAnimations,
        })
        setIsMenuOpen(!isMenuOpen)
      }, FADE_OUT_DURATION_MS)
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
          id="mobile-menu-dialog"
          ref={ref}
          tabIndex={-1}
          open={isMenuOpen}
          aria-modal="true"
          className={mergeClassNames(
            'z-10 max-h-[calc(100vh-93px)] w-screen min-w-[22rem] overflow-scroll rounded-b-lg px-6 py-8 duration-300 animate-in fade-in fill-mode-forwards md:px-10 md:py-14',
          )}
        >
          <CategoryNavigation
            onCategoryClick={({ target }) => {
              const isNav = 'tagName' in target && target.tagName === 'NAV'
              if (isNav) return
              toggleMenu()
            }}
          />
        </dialog>
        <div
          ref={backdropRef}
          hidden={!isMenuOpen}
          className="min-w-screen fixed inset-0 -z-10 min-h-[100vh] bg-black/50 duration-300 animate-in fade-in fill-mode-forwards"
        />
      </div>
    </>
  )
}
