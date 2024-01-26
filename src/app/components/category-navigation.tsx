'use client'

import earphonesThumbnail from '~/assets/images/category-thumbnail-earphones.png'
import headphonesThumbnail from '~/assets/images/category-thumbnail-headphones.png'
import speakersThumbnail from '~/assets/images/category-thumbnail-speakers.png'
import { mergeClassNames } from '~/lib/utils'
import CategoryCard from './category-card'

type Props = {
  onCategoryClick?: React.MouseEventHandler<HTMLElement>
} & React.ComponentProps<'nav'>

export default function CategoryNavigation({
  onCategoryClick,
  className,
}: Props) {
  return (
    <nav
      className={mergeClassNames('grid gap-4 md:grid-cols-3', className)}
      onClickCapture={onCategoryClick}
    >
      <CategoryCard name="headphones" thumbnail={headphonesThumbnail} />
      <CategoryCard name="speakers" thumbnail={speakersThumbnail} />
      <CategoryCard name="earphones" thumbnail={earphonesThumbnail} />
    </nav>
  )
}
