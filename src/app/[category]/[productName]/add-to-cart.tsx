'use client'

import { useState } from 'react'
import Button from '~/app/components/shared/button'
import QuantityInput from '~/app/components/shared/quantity-input'
import useLocalStorage from '~/lib/hooks/use-local-storage'
import { api } from '~/trpc/react'

type Props = {
  productId: string
}

export default function AddToCart({ productId }: Props) {
  const apiUtils = api.useUtils()
  const [cartId, setValue] = useLocalStorage<string>('cartId')
  const [quantity, setQuantity] = useState<number | null>(1)
  const cartMutation = api.cart.setItemQuantity.useMutation()

  return (
    <div className="flex items-center gap-4">
      <QuantityInput
        value={quantity}
        onChange={setQuantity}
        isLoading={cartMutation.isLoading}
      />
      <Button
        type="submit"
        onClick={() => {
          if (!quantity) return
          cartMutation.mutate(
            { quantity, cartId, productId },
            {
              onError: (error) => {
                console.error(error)
              },
              onSuccess: (data) => {
                setValue(data.cartId)
                apiUtils.cart.getCart.invalidate().catch(() => {
                  console.error('Failed to invalidate cart')
                })
              },
            },
          )
        }}
      >
        Add to cart
      </Button>
    </div>
  )
}
