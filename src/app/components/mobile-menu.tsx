'use client'

import { useRef } from 'react'
import HamburgerIcon from '~/assets/svgs/icon-hamburger.svg'
import CategoryNavigation from './category-navigation'
import Button from './shared/button'
import Modal from './shared/modal/modal'

export default function MobileMenu() {
  const toggleRef = useRef<() => void>()
  return (
    <Modal
      id="mobile-menu"
      renderTrigger={(toggle) => {
        toggleRef.current = toggle
        return (
          <Button
            variant="icon"
            aria-label="menu icon"
            className="lg:hidden"
            onPress={toggle}
          >
            <HamburgerIcon />
          </Button>
        )
      }}
      classNames={{
        dialog:
          'z-10 max-h-[calc(100vh-93px)] w-screen min-w-[22rem] rounded-b-lg px-6 py-8 md:px-10 md:py-14 top-[93px] overflow-auto',
      }}
    >
      <CategoryNavigation
        onCategoryClick={({ target }) => {
          const isNav = 'tagName' in target && target.tagName === 'NAV'
          if (!isNav) toggleRef.current?.()
        }}
      />
    </Modal>
  )
}
