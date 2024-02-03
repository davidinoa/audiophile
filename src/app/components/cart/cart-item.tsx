import Image from 'next/image'
import { useEffect, useState } from 'react'
import { idToNameMap } from '~/app/[category]/product-data'
import { CLOUDINARY_BASE_URL } from '~/lib/constants'
import useDebounce from '~/lib/hooks/use-debounce'
import { isValidProductId } from '~/lib/types'
import { formatPrice } from '~/lib/utils'
import { api } from '~/trpc/react'
import { type RouterOutputs } from '~/trpc/shared'
import QuantityInput from '../shared/quantity-input'

type Props = {
  data: RouterOutputs['cart']['getCart']['cartItems'][number]
}

export default function CartItem({ data }: Props) {
  const item = data
  const apiUtils = api.useUtils()
  const { mutate, isLoading } = api.cart.setItemQuantity.useMutation({
    onError: console.error,
    onSuccess: () => {
      apiUtils.cart.getCart.invalidate().catch(console.error)
    },
  })
  const [quantity, setQuantity] = useState<number | null>(item.quantity)
  const debouncedQuantity = useDebounce(quantity, 500)

  useEffect(() => {
    if (debouncedQuantity === null) return
    if (debouncedQuantity === item.quantity) return
    mutate({
      productId: item.product.id,
      quantity: debouncedQuantity,
    })
  }, [debouncedQuantity, item, mutate])

  const productId = item.product.id
  const slug = isValidProductId(productId) ? idToNameMap[productId] : ''

  return (
    <li key={item.id} className="flex items-center gap-x-6">
      <div className="grid grow grid-cols-[auto_1fr] gap-3 md:gap-4">
        <Image
          alt="xx99 mark ii headphones"
          src={`${CLOUDINARY_BASE_URL}/cart/${slug}-cart`}
          width={150}
          height={150}
          className="h-16 w-16 rounded-lg"
        />
        <div className="grid content-center overflow-clip">
          <h3
            title="XX99 Mark II Headphones"
            className="truncate text-sm-plus font-bold leading-snug"
          >
            {item.product.name}
          </h3>
          <p className="text-sm font-bold leading-[1.75] text-black/50">
            {formatPrice(item.product.price)}
          </p>
        </div>
      </div>
      <QuantityInput
        value={quantity}
        isLoading={isLoading}
        onChange={setQuantity}
        className="max-md:w-[5.25rem]"
      />
    </li>
  )
}
