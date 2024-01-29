import Image from 'next/image'
import { CLOUDINARY_BASE_URL } from '~/lib/constants'
import useLocalStorage from '~/lib/hooks/use-local-storage'
import { convertValueToSlug, formatPrice } from '~/lib/utils'
import { api } from '~/trpc/react'
import Button from '../shared/button'

export default function OrderSummary() {
  const [cartId] = useLocalStorage<string>('cartId')

  const cartQuery = api.cart.getCart.useQuery(
    { cartId: cartId! },
    { enabled: !!cartId },
  )

  if (!cartId || !cartQuery.data?.cartItems.length) return null

  if (cartQuery.isLoading) {
    return (
      <div className="my-40 grid animate-pulse gap-8 rounded-lg bg-white p-8">
        <h2 className="text-lg font-bold uppercase leading-snug tracking-[1.285px]">
          Summary
        </h2>
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <div className="h-16 w-16 rounded-lg bg-frost-whisper" />
          <div className="grid grid-cols-[1fr_auto] items-start rounded-md">
            <div className="h-6 w-20 rounded bg-frost-whisper" />
            <div className="h-6 w-8 rounded bg-frost-whisper" />
            <div className="h-5 w-16 rounded bg-frost-whisper" />
          </div>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <div className="h-16 w-16 rounded-lg bg-frost-whisper" />
          <div className="grid grid-cols-[1fr_auto] rounded-md">
            <div className="h-6 w-20 rounded bg-frost-whisper" />
            <div className="h-6 w-8 rounded bg-frost-whisper" />
            <div className="h-5 w-16 rounded bg-frost-whisper" />
          </div>
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <div className="h-6 w-32 rounded bg-frost-whisper" />
          <div className="h-6 w-16 rounded bg-frost-whisper" />
          <div className="h-6 w-32 rounded bg-frost-whisper" />
          <div className="h-6 w-16 rounded bg-frost-whisper" />
          <div className="h-6 w-32 rounded bg-frost-whisper" />
          <div className="h-6 w-16 rounded bg-frost-whisper" />
          <div className="mt-6 h-6 w-32 rounded bg-frost-whisper" />
          <div className="mt-6 h-6 w-16 rounded bg-frost-whisper" />
        </div>
        <div className="h-12 w-full rounded bg-frost-whisper" />
      </div>
    )
  }

  if (!cartQuery.data || cartQuery.isError) return null

  const { data } = cartQuery

  return (
    <section className="my-40 grid gap-8 rounded-lg bg-white p-8 lg:max-w-[21.875rem]">
      <h2 className="text-lg font-bold uppercase leading-snug tracking-[1.285px]">
        Summary
      </h2>
      <ul className="grid gap-6">
        {data.cartItems.map((item) => (
          <li
            key={item.id}
            className="grid grid-cols-[auto_1fr] content-center gap-4"
          >
            <Image
              alt="xx99 mark ii headphones"
              src={`${CLOUDINARY_BASE_URL}/cart/${convertValueToSlug(
                item.product.name,
              )}-cart`}
              width={150}
              height={150}
              className="h-16 w-16 rounded-lg"
            />
            <div
              className="grid grid-cols-[1fr_auto] content-center justify-between
              gap-x-2 overflow-clip text-xs"
            >
              <h3 className="truncate text-sm-plus font-bold uppercase leading-relaxed">
                {item.product.name}
              </h3>
              <span className="text-sm-plus font-bold leading-snug text-black/50">
                x{item.quantity}
              </span>
              <p className="text-sm font-bold uppercase leading-relaxed text-black/50">
                {formatPrice(item.product.price)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <table className="grid gap-6">
        <thead className="sr-only">
          <caption>Cost Summary</caption>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody className="grid items-center gap-2">
          <tr className="grid grid-cols-[1fr_auto]">
            <th
              scope="row"
              className="text-left text-sm-plus font-normal uppercase leading-relaxed text-black/50"
            >
              Subtotal
            </th>
            <td className="text-right text-lg font-bold leading-snug">
              {formatPrice(data.subtotal)}
            </td>
          </tr>
          <tr className="grid grid-cols-[1fr_auto]">
            <th
              scope="row"
              className="text-left text-sm-plus font-normal uppercase leading-relaxed text-black/50"
            >
              Shipping
            </th>
            <td className="text-right text-lg font-bold leading-snug">
              {formatPrice(data.shipping)}
            </td>
          </tr>
          <tr className="grid grid-cols-[1fr_auto]">
            <th
              scope="row"
              className="text-left text-sm-plus font-normal uppercase leading-relaxed text-black/50"
            >
              Tax ({(data.tax / data.subtotal) * 100}%)
            </th>
            <td className="text-right text-lg font-bold leading-snug">
              {formatPrice(data.tax)}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="grid grid-cols-[1fr_auto]">
            <th
              scope="row"
              className="text-left text-sm-plus font-normal uppercase leading-relaxed text-black/50"
            >
              Total
            </th>
            <td className="text-right text-lg font-bold leading-snug text-copper-canyon">
              {formatPrice(data.total)}
            </td>
          </tr>
        </tfoot>
      </table>
      <Button className="w-full">Continue & Pay</Button>
    </section>
  )
}
