'use client'

import { useState } from 'react'
import Button from '~/app/components/shared/button'
import QuantityInput from '~/app/components/shared/quantity-input'
import { api } from '~/trpc/react'

type Props = {
  productId: string
}

export default function AddToCart({ productId }: Props) {
  const apiUtils = api.useUtils()
  const [quantity, setQuantity] = useState<number | null>(1)
  const cartMutation = api.cart.setItemQuantity.useMutation()

  return (
    <div className="flex items-center gap-4">
      <QuantityInput
        minValue={1}
        value={quantity}
        onChange={setQuantity}
        isLoading={cartMutation.isLoading}
      />
      <Button
        type="submit"
        onClick={() => {
          if (!quantity) return
          cartMutation.mutate(
            { quantity, productId },
            {
              onError: (error) => {
                console.error(error)
              },
              onSuccess: () => {
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
