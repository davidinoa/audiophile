'use client'

import CartIcon from '~/assets/svgs/icon-cart.svg'
import { FADE_OUT_DURATION_MS } from '~/lib/constants'
import { formatPrice } from '~/lib/utils'
import { api } from '~/trpc/react'
import Button from '../shared/button'
import Modal from '../shared/modal/modal'
import useModal from '../shared/modal/use-modal'
import CartItem from './cart-item'

export default function Cart() {
  const apiUtils = api.useUtils()
  const cartQuery = api.cart.getCart.useQuery()
  const clearCartMutation = api.cart.clearCart.useMutation()
  const modalId = 'cart-modal'
  const { isOpen, toggle, dialogRef } = useModal(modalId)

  if (cartQuery.isLoading || cartQuery.isError)
    return (
      <div>
        <Button
          variant="icon"
          aria-label="shopping cart icon"
          className="-mr-1"
        >
          <CartIcon />
        </Button>
      </div>
    )

  const { cartItems, total } = cartQuery.data
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const isEmpty = cartItemCount === 0

  const emptyCart = (
    <div className="grid h-full place-content-center place-items-center gap-6">
      <p className="text-xl font-bold leading-[1.75] text-black/50">
        Your cart is empty
      </p>
      <Button variant="link" onPress={toggle}>
        Continue shopping
      </Button>
    </div>
  )

  return (
    <div>
      <Button
        variant="icon"
        aria-label="shopping cart icon"
        className="z-20 -mr-1"
        onPress={toggle}
      >
        <CartIcon />
      </Button>
      <Modal
        id={modalId}
        isOpen={isOpen}
        toggle={toggle}
        dialogRef={dialogRef}
        classNames={{
          backdrop: 'z-20',
          dialog:
            'lg:mr-18 top-28 h-[30.5rem] w-[min(calc(100%-3rem),25rem)] overflow-auto rounded-lg p-6 md:mr-8 md:w-[25rem] md:p-8 xl:mr-[calc((100vw-1120px)/2)]',
        }}
      >
        {isEmpty ? (
          emptyCart
        ) : (
          <div className="top-2 grid h-full min-w-fit grid-rows-[auto_1fr_auto] gap-8 overflow-x-auto p-1">
            <header>
              <h2 className="grow text-lg font-bold uppercase leading-snug tracking-[1.285px]">
                Cart <span className="tabular-nums">({cartItemCount})</span>
              </h2>
            </header>
            <div className="grid content-start gap-4">
              <ul className="grid gap-6 overflow-y-auto">
                {cartItems.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <footer className="grid gap-6">
              <div>
                <p className="flex items-center justify-between">
                  <span className="text-sm-plus font-normal uppercase leading-relaxed text-black/50">
                    Total
                  </span>
                  <span className="text-lg font-bold leading-normal">
                    {formatPrice(total)}
                  </span>
                </p>
                {!isEmpty && (
                  <Button
                    variant="link"
                    className="text text-[0.9375rem] font-normal tracking-normal text-black/50 underline"
                    onPress={() =>
                      clearCartMutation.mutate(undefined, {
                        onSuccess: () => {
                          apiUtils.cart.getCart.invalidate().catch(() => {
                            console.error('Failed to invalidate cart')
                          })
                        },
                      })
                    }
                  >
                    Remove all
                  </Button>
                )}
              </div>

              <Button
                className="w-full"
                href="/checkout"
                onPress={() => {
                  setTimeout(toggle, FADE_OUT_DURATION_MS)
                }}
              >
                Checkout
              </Button>
            </footer>
          </div>
        )}
      </Modal>
    </div>
  )
}
