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

export function formatPrice(priceInCents: number) {
  const priceInDollars = priceInCents / 100
  return priceInDollars.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

export const formatPhoneNumber = (input: string) => {
  const digits = input.replace(/\D/g, '')
  const validDigits =
    digits.startsWith('1') || digits.startsWith('0') ? digits.slice(1) : digits

  if (validDigits.length < 1) return ''

  const finalDigits = validDigits.slice(0, 10)
  const match = finalDigits.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/)

  if (match) {
    const [, areaCode, prefix, line] = match
    if (line) {
      return `(${areaCode}) ${prefix}-${line}`
    }
    if (prefix) {
      return `(${areaCode}) ${prefix}`
    }
    if (areaCode) {
      return `(${areaCode}`
    }
  }

  return input
}
