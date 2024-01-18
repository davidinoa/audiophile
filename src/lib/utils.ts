/* eslint-disable import/prefer-default-export */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function mergeClassNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
