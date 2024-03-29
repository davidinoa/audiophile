import { idToNameMap } from '~/app/[category]/product-data'
import { CATEGORIES, type BREAKPOINTS } from './constants'

export type Breakpoint = (typeof BREAKPOINTS)[number]

export type Category = (typeof CATEGORIES)[number]

export type ExternalImageData = {
  width: number
  height: number
  src: string
}

export type ImageSet = Record<Breakpoint, StaticImageData>

export type ResponsiveImageData = Record<Breakpoint, ExternalImageData>

export type ImageSize = { width: number; height: number }

export type ResponsiveImageSizes = Record<Breakpoint, ImageSize>

export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

export function isValidProductId(id: string): id is keyof typeof idToNameMap {
  return id in idToNameMap
}

export function isValidCategory(value: string): value is Category {
  return CATEGORIES.some((c) => c === value)
}
