import { notFound } from 'next/navigation'
import BackButton from '~/app/components/back-button'
import ProductDetails from '~/app/components/product-details'
import Recommendations from '~/app/components/recommendations'
import { idToNameMap, recommendedProducts } from '../product-data'

type Props = {
  params: {
    productName: string
  }
}

export default function Page({ params }: Props) {
  const { productName } = params
  const productId = Object.entries(idToNameMap).find(
    ([_, name]) => name === productName,
  )?.[0]

  if (!productId) notFound()

  return (
    <div className="grid gap-6 pt-4 md:pt-8 lg:gap-14 lg:pt-20">
      <BackButton />
      <ProductDetails productId={productId} />
      <Recommendations productIds={recommendedProducts[productId] ?? []} />
    </div>
  )
}
