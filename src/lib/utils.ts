/* eslint-disable import/prefer-default-export */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { BREAKPOINTS, CLOUDINARY_BASE_URL } from './constants'
import {
  type Category,
  type ResponsiveImageData,
  type ResponsiveImageSizes,
} from './types'

export function mergeClassNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateResponsiveImageData({
  fileName,
  productName,
  category,
  responsiveImageSizes,
}: {
  fileName: string
  productName: string
  category: Category
  responsiveImageSizes: ResponsiveImageSizes
}): ResponsiveImageData {
  return BREAKPOINTS.reduce((acc, breakpoint) => {
    acc[breakpoint] = {
      ...responsiveImageSizes[breakpoint],
      src: `${CLOUDINARY_BASE_URL}/${category}/${productName}/${breakpoint}/${productName}-${breakpoint}-${fileName}`,
    }
    return acc
  }, {} as ResponsiveImageData)
}
