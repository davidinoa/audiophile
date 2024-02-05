import { z } from 'zod'

export const formSchema = z.object({
  name: z
    .string()
    .min(...getMinValidationArgs('name'))
    .max(...getMaxValidationArgs('name')),
  email: z
    .string()
    .email('Invalid email address')
    .max(...getMaxValidationArgs('email')),
  phone: z
    .string()
    .min(...getMinValidationArgs('phone', 14))
    .max(14, 'Phone can be at most 10 characters long'),
  address: z
    .string()
    .min(...getMinValidationArgs('address'))
    .max(...getMaxValidationArgs('address')),
  zipCode: z
    .string()
    .min(...getMinValidationArgs('ZIP Code'))
    .max(10, 'ZIP Code can be at most 9 characters long'),
  city: z
    .string()
    .min(...getMinValidationArgs('city'))
    .max(...getMaxValidationArgs('city')),
  country: z
    .string()
    .min(...getMinValidationArgs('country'))
    .max(...getMaxValidationArgs('country')),
  payment: z.union([z.literal('credit-card'), z.literal('paypal')]),
})

export type FormFields = z.infer<typeof formSchema>

function getMinValidationArgs(fieldName: string, length = 1) {
  return [length, `Enter your ${fieldName}`] as const
}

function getMaxValidationArgs(fieldName: string, length = 255) {
  return [
    length,
    `${fieldName} can be at most ${length} characters long`,
  ] as const
}
