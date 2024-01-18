import { type Category } from '~/lib/types'
import Button from './shared/button'
import ResponsiveImage from './shared/responsive-image'

type Props = {
  images: {
    desktop: StaticImageData
    tablet: StaticImageData
    mobile: StaticImageData
  }
  name: string
  category: Category
  description: string
  isNew?: boolean
}

export default function ProductPreview({
  images,
  name,
  category,
  description,
  isNew = false,
}: Props) {
  const href = `/${category}/${name.split(' ').join('-').toLowerCase()}`
  const singularCategory = category === 'speakers' ? 'speaker' : category

  return (
    <div className="col-start grid grid-flow-dense gap-8 md:gap-12 lg:grid-cols-2 lg:[&:nth-child(even)>picture]:col-start-2">
      <ResponsiveImage
        desktopImg={images.desktop}
        tabletImg={images.tablet}
        mobileImg={images.mobile}
        commonImgProps={{
          quality: 100,
          alt: `${name} ${category}`,
          className: 'rounded-lg w-full object-cover max-md:max-h-[35rem]',
        }}
      />
      <div className="grid justify-items-center gap-6 text-center md:gap-4 lg:content-center lg:justify-items-start lg:text-left">
        {isNew && (
          <p className="text-sm uppercase leading-snug tracking-[10px] text-copper-canyon">
            New Product
          </p>
        )}
        <h3 className="text-[1.75rem] font-bold uppercase leading-snug tracking-[1px] md:mb-4 md:text-[2.5rem] md:leading-[1.1] md:tracking-[1.5px]">
          {name}
          <br />
          {singularCategory}
        </h3>
        <p className="max-w-[36.5rem] leading-relaxed text-black/50 md:mb-2 md:font-medium lg:mb-8 lg:max-w-[28.5rem]">
          {description}
        </p>
        <Button href={href}>See Product</Button>
      </div>
    </div>
  )
}
