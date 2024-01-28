import { notFound } from 'next/navigation'
import { isStringArray, isValidCategory, isValidProductId } from '~/lib/types'
import { formatPrice, generateResponsiveImageData } from '~/lib/utils'
import { api } from '~/trpc/server'
import AddToCart from '../[category]/[productName]/add-to-cart'
import {
  generateGalleryImageDataSet,
  productResponsiveImageSizes,
} from '../[category]/[productName]/gallery-images'
import { idToNameMap } from '../[category]/product-data'
import ResponsiveImage from './shared/responsive-image'

type Props = {
  productId: string
}

export default async function ProductDetails({ productId }: Props) {
  const product = await api.product.getById.query({ id: productId })
  if (!product || !isValidProductId(productId)) return notFound()

  const kebabProductName = idToNameMap[productId]
  const { name, features, accessories, description, isNew } = product
  const category = product.category?.name ?? ''
  const singularCategory = category === 'speakers' ? 'speaker' : category
  const accessoriesArray = isStringArray(accessories) ? accessories : []
  if (!isValidCategory(category)) return notFound()

  const productImageData = generateResponsiveImageData({
    category,
    fileName: 'product',
    productName: kebabProductName,
    responsiveImageSizes: productResponsiveImageSizes,
  })

  const baseImgProps = {
    quality: 100,
    alt: `${product.name} ${category}`,
  }

  return (
    <section
      aria-labelledby="product-heading"
      className="grid gap-20 lg:gap-40"
    >
      <div className="grid items-center gap-8 md:grid-cols-[minmax(auto,17.5rem)_1fr] md:gap-16 lg:grid-cols-[minmax(30rem,33.75rem)_minmax(21rem,1fr)] lg:gap-32">
        <ResponsiveImage
          desktopImg={productImageData.desktop}
          tabletImg={productImageData.tablet}
          mobileImg={productImageData.mobile}
          commonImgProps={{
            ...baseImgProps,
            className:
              'rounded-lg w-full object-cover max-h-[25rem] md:max-h-[30rem] lg:max-h-[35rem]',
          }}
        />
        <div>
          {isNew && (
            <p className="mb-4 text-sm uppercase leading-snug tracking-[10px] text-copper-canyon">
              New Product
            </p>
          )}
          <div className="mb-8 grid gap-6 md:gap-8 lg:mb-12">
            <h1
              id="product-heading"
              className="text-[1.75rem] font-bold uppercase leading-snug tracking-[1px] md:leading-[1.15] md:tracking-[1.5px] lg:text-[2.5rem]"
            >
              {name}
              <br />
              {singularCategory}
            </h1>
            <p className="text-sm-plus leading-relaxed text-black/50">
              {description}
            </p>
            <p className="text-lg font-bold uppercase leading-snug tracking-[1.285px] ">
              {formatPrice(product.price)}
            </p>
          </div>
          <AddToCart productId={productId} />
        </div>
      </div>
      <div className="grid gap-20 lg:grid-cols-[minmax(auto,39.5rem)_minmax(auto,21.875rem)] lg:gap-32">
        <section
          aria-labelledby="features-heading"
          className="grid gap-6 lg:gap-8"
        >
          <h2
            id="features-heading"
            className="text-2xl font-bold uppercase leading-[1.125] tracking-[1.145px] lg:text-[2rem]"
          >
            Features
          </h2>
          {features.split('\\n').map((paragraph) => (
            <p
              key={paragraph}
              className="text-medium text-sm-plus font-medium leading-relaxed text-black/50"
            >
              {paragraph}
            </p>
          ))}
        </section>
        <section
          aria-labelledby="accessories-heading"
          className="grid content-start gap-6 lg:gap-8"
        >
          <h2
            id="accessories-heading"
            className="text-2xl font-bold uppercase leading-[1.125] tracking-[1.145px] lg:text-[2rem]"
          >
            In The Box
          </h2>
          <ul className="grid gap-2">
            {accessoriesArray.map((value) => {
              const [quantity, accessory] = value.split('_')
              return (
                <li
                  key={value}
                  className="flex gap-6 text-sm-plus font-medium text-black/50"
                >
                  <span className="font-bold text-copper-canyon">
                    {quantity}
                  </span>{' '}
                  {accessory}
                </li>
              )
            })}
          </ul>
        </section>
      </div>
      <div className="grid gap-5 overflow-clip md:max-h-[27.375rem] md:grid-flow-col md:grid-cols-[2fr_3fr] md:grid-rows-2 md:gap-10 lg:max-h-[592px] md:[&>:nth-child(3)]:row-span-2">
        {generateGalleryImageDataSet({
          productName: kebabProductName,
          category,
        }).map((imgSet) => (
          <ResponsiveImage
            key={imgSet.mobile.src}
            desktopImg={imgSet.desktop}
            tabletImg={imgSet.mobile}
            mobileImg={imgSet.mobile}
            commonImgProps={{
              ...baseImgProps,
              className: 'rounded-lg w-full h-full object-cover',
            }}
          />
        ))}
      </div>
    </section>
  )
}
