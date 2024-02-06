import Image from 'next/image'
import ConfirmationIcon from '~/assets/icon-order-confirmation.svg'
import { CLOUDINARY_BASE_URL } from '~/lib/constants'
import { convertValueToSlug, formatPrice } from '~/lib/utils'
import type { RouterOutputs } from '~/trpc/shared'
import Button from '../shared/button'
import Modal from '../shared/modal/modal'

type Props = {
  modalId: string
  isOpen: boolean
  toggle: () => void
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>
  orderData?: RouterOutputs['orders']['getOrder']
}

export default function OrderConfirmation({
  modalId,
  isOpen,
  toggle,
  dialogRef,
  orderData,
}: Props) {
  if (!orderData) return null
  const { orderItems, total } = orderData
  const orderItemsCount = orderItems.length
  const firstItem = orderItems[0]!

  return (
    <Modal
      id={modalId}
      isOpen={isOpen}
      toggle={toggle}
      dialogRef={dialogRef}
      withFocusTrap
      classNames={{
        dialog:
          'w-[min(calc(100%-3rem),25rem)] overflow-auto rounded-lg p-8 md:p-12 md:min-w-[33.75rem] top-1/2 -translate-y-1/2',
      }}
    >
      <div className="grid gap-6 md:gap-8">
        <ConfirmationIcon className="h-16 w-16" aria-hidden="true" />
        <div className="grid gap-4 md:gap-6">
          <h2 className="text-2xl font-bold uppercase leading-[1.15] tracking-[0.85px] md:text-[2rem]">
            Thank you
            <br /> for your order
          </h2>
          <p className="text-sm-plus leading-relaxed text-black/50">
            You will receive an email an email confirmation shortly.
          </p>
        </div>
        <div className="overflow-clip rounded-lg">
          <div className="grid gap-3 bg-frost-whisper p-6">
            <div className="grid grid-cols-[auto_1fr] content-center gap-4 ">
              <Image
                alt="xx99 mark ii headphones"
                src={`${CLOUDINARY_BASE_URL}/cart/${convertValueToSlug(
                  firstItem.product.name,
                )}-cart`}
                width={150}
                height={150}
                className="h-[3.125rem] w-[3.125rem] rounded-lg"
              />
              <div
                className="grid grid-cols-[1fr_auto] content-center justify-between
              gap-x-2 overflow-clip text-xs"
              >
                <h3 className="truncate text-sm-plus font-bold uppercase leading-relaxed">
                  {firstItem.product.name}
                </h3>
                <span className="text-sm-plus font-bold leading-snug text-black/50">
                  x{firstItem.quantity}
                </span>
                <p className="text-sm font-bold uppercase leading-relaxed text-black/50">
                  {formatPrice(firstItem.product.price)}
                </p>
              </div>
            </div>
            {orderItemsCount > 1 && (
              <>
                <hr />
                <p className="text-center text-xs font-bold leading-normal tracking-[-0.215px] text-black/50">
                  and {orderItemsCount - 1} other item(s)
                </p>
              </>
            )}
          </div>
          <div className="grid gap-2 bg-black px-6 py-4">
            <h3 className="text-sm-plus font-normal uppercase text-white/50">
              Total
            </h3>
            <p className="text-lg font-bold leading-[1.15] text-white">
              <strong>{formatPrice(total)}</strong>
            </p>
          </div>
        </div>
        <Button href="/" className="w-full md:mt-6">
          Back to home
        </Button>
      </div>
    </Modal>
  )
}
