'use client'

import HamburgerIcon from '~/assets/svgs/icon-hamburger.svg'
import CategoryNavigation from './category-navigation'
import Button from './shared/button'
import Modal from './shared/modal/modal'
import useModal from './shared/modal/use-modal'

export default function MobileMenu() {
  const { isOpen, toggle, dialogRef } = useModal('mobile-menu')
  return (
    <div className="lg:hidden">
      <Button variant="icon" aria-label="menu icon" onPress={toggle}>
        <HamburgerIcon />
      </Button>
      <Modal
        id="mobile-menu"
        isOpen={isOpen}
        toggle={toggle}
        dialogRef={dialogRef}
        className="top-[93px] z-10 max-h-[calc(100vh-93px)] w-screen min-w-[22rem] overflow-auto rounded-b-lg px-6 py-8 md:px-10 md:py-14"
      >
        <CategoryNavigation
          onCategoryClick={({ target }) => {
            const isNav = 'tagName' in target && target.tagName === 'NAV'
            if (!isNav) toggle()
          }}
        />
      </Modal>
    </div>
  )
}
