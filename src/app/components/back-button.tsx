'use client'

import { useRouter } from 'next/navigation'
import Button from './shared/button'

export default function BackButton() {
  const router = useRouter()
  return (
    <Button
      variant="link"
      className="text-[0.9375rem]"
      onPress={() => router.back()}
    >
      Go Back
    </Button>
  )
}
