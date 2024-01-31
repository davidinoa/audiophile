'use client'

import HamburgerIcon from '~/assets/svgs/icon-hamburger.svg'
import CategoryNavigation from './category-navigation'
import Button from './shared/button'
import Modal from './shared/modal/modal'
import useModal from './shared/modal/use-modal'

export default function MobileMenu() {
  const { isOpen, toggle, dialogRef } = useModal('mobile-menu')
  return (
    <div>
      <Button
        variant="icon"
        aria-label="menu icon"
        className="lg:hidden"
        onPress={toggle}
      >
        <HamburgerIcon />
      </Button>
      <Modal
        id="mobile-menu"
        isOpen={isOpen}
        dialogRef={dialogRef}
        classNames={{
          dialog:
            'z-10 max-h-[calc(100vh-93px)] w-screen min-w-[22rem] rounded-b-lg px-6 py-8 md:px-10 md:py-14 top-[93px] overflow-auto',
        }}
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
