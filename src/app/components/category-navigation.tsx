'use client'

import { mergeClassNames } from '~/lib/utils'
import CategoryCard from './category-card'

type Props = {
  onCategoryClick?: React.MouseEventHandler<HTMLElement>
} & React.ComponentProps<'nav'>

const headphonesThumbnailData = {
  src: 'https://res.cloudinary.com/dhm0lpxko/image/upload/v1706459627/thumbnails/category-thumbnail-headphones_y9eeuc.png',
  width: 438,
  height: 422,
}

const speakersThumbnailData = {
  src: 'https://res.cloudinary.com/dhm0lpxko/image/upload/v1706459626/thumbnails/category-thumbnail-speakers_tguyrg.png',
  width: 438,
  height: 408,
}

const earphonesThumbnailData = {
  src: 'https://res.cloudinary.com/dhm0lpxko/image/upload/v1706459626/thumbnails/category-thumbnail-earphones_ty142f.png',
  width: 438,
  height: 380,
}

export default function CategoryNavigation({
  onCategoryClick,
  className,
}: Props) {
  return (
    <nav
      className={mergeClassNames(
        'grid gap-4 md:grid-cols-3 md:gap-3 lg:gap-8',
        className,
      )}
      onClickCapture={onCategoryClick}
    >
      <CategoryCard name="headphones" thumbnail={headphonesThumbnailData} />
      <CategoryCard name="speakers" thumbnail={speakersThumbnailData} />
      <CategoryCard name="earphones" thumbnail={earphonesThumbnailData} />
    </nav>
  )
}
