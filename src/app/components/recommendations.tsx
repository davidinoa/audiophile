import Image from 'next/image'
import { isValidProductId } from '~/lib/types'
import { idToCategoryMap, idToNameMap } from '../[category]/product-data'
import Button from './shared/button'

type Props = {
  productIds: string[]
}

const baseUrl =
  'https://res.cloudinary.com/dhm0lpxko/image/upload/c_lpad,h_400,w_400/v1706471496/recommendations'

export default function Recommendations({ productIds }: Props) {
  if (!productIds.length) return null
  return (
    <section
      aria-labelledby="recommendations-heading"
      className="grid gap-10 pt-20"
    >
      <h2
        id="recommendations-heading"
        className="text-center text-[1.75rem] font-bold uppercase leading-normal tracking-[0.85px]"
      >
        You May Also Like
      </h2>
      <ul className="grid gap-14 md:grid-cols-3 md:gap-3 lg:gap-8">
        {productIds.map((productId) => {
          if (!isValidProductId(productId)) return null
          const category = idToCategoryMap[productId]
          const kebabProductName = idToNameMap[productId]
          const productName = kebabProductName.split('-').join(' ')
          const href = `/${category}/${kebabProductName}`

          return (
            <li key={productId} className="grid justify-items-center gap-6">
              <div className="grid h-[120px] w-full place-items-center rounded-lg bg-frost-whisper md:h-80">
                <Image
                  width={80}
                  height={80}
                  alt={productName}
                  src={`${baseUrl}/${kebabProductName}-recommendation`}
                  className="h-20 w-20 bg-frost-whisper md:h-44 md:w-44 lg:h-52 lg:w-52"
                />
              </div>
              <h3 className="text-center text-2xl font-bold uppercase leading-normal tracking-[1.75px]">
                {productName}
              </h3>
              <Button href={href}>See product</Button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
