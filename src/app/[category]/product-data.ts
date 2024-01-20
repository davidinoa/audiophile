import { type Category } from '~/lib/types'

export const idToNameMap = {
  'edc4479c-226d-4d71-8fad-b804ff6368c2': 'xx99-mark-ii',
  'f9b0a3b9-9b39-4c9e-8a1b-7e3e0a9f5e87': 'xx99-mark-i',
  'e2f4c4d1-3b6d-4de9-8f3c-8e3e0a9f5e87': 'xx59',
  'f9b0a3b9-9b39-4c9e-8a1b-7e3e0a9f5e88': 'xx89',
} as const

const productsByCategory: ProductsByCategory = {
  headphones: [
    {
      id: 'xx99MarkTwo',
      name: 'XX99 Mark II',
      isNew: true,
      description:
        'The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.',
    },
    {
      id: 'xx99MarkOne',
      name: 'XX99 Mark I',
      description:
        'As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.',
    },
    {
      id: 'xx59',
      name: 'XX59',
      description:
        'Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.',
    },
  ],
  earphones: [
    {
      id: 'yx1',
      name: 'YX1 Wireless',
      isNew: true,
      description:
        'Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.',
    },
  ],
  speakers: [
    {
      id: 'zx9',
      name: 'ZX9',
      isNew: true,
      description:
        "Upgrade your sound system with the all new ZX9 active speaker. It's a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
    },
    {
      id: 'zx7',
      name: 'ZX7',
      description:
        'Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.',
    },
  ],
}

type ProductId = 'xx99MarkOne' | 'xx99MarkTwo' | 'xx59' | 'yx1' | 'zx9' | 'zx7'

type ProductInfo = {
  id: ProductId
  name: string
  description: string
  isNew?: boolean
}

type ProductsByCategory = Record<Category, ProductInfo[]>

export default productsByCategory
