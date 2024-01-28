import { type Category } from '~/lib/types'
import { generateResponsiveImageData } from '~/lib/utils'

export const smallGalleryResponsiveImageSizes = {
  mobile: { width: 654, height: 348 },
  tablet: { width: 554, height: 348 },
  desktop: { width: 445, height: 280 },
} as const

export const largeGalleryResponsiveImageSizes = {
  mobile: { width: 654, height: 736 },
  tablet: { width: 790, height: 736 },
  desktop: { width: 635, height: 592 },
} as const

export const productResponsiveImageSizes = {
  mobile: { width: 654, height: 654 },
  tablet: { width: 562, height: 960 },
  desktop: { width: 1080, height: 1120 },
}

export function generateGalleryImageDataSet({
  productName,
  category,
}: {
  productName: string
  category: Category
}) {
  return [
    generateResponsiveImageData({
      productName,
      category,
      fileName: 'gallery-1',
      responsiveImageSizes: smallGalleryResponsiveImageSizes,
    }),
    generateResponsiveImageData({
      productName,
      category,
      fileName: 'gallery-2',
      responsiveImageSizes: smallGalleryResponsiveImageSizes,
    }),
    generateResponsiveImageData({
      productName,
      category,
      fileName: 'gallery-3',
      responsiveImageSizes: largeGalleryResponsiveImageSizes,
    }),
  ]
}
