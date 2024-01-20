import { notFound } from 'next/navigation'
import { isCategory } from '~/lib/types'
import ProductPreview from '../components/product-preview'
import productsByCategory from './product-data'

type Props = {
  params: {
    category: string
  }
}

export default function Page({ params }: Props) {
  const { category } = params
  if (!isCategory(category)) return notFound()

  return (
    <>
      <h2 className="full-width bg-eclipse-black p-8 text-center text-[1.75rem] font-bold uppercase leading-snug tracking-[2px] text-white">
        {category}
      </h2>
      <div className="pt-10 md:pt-20">
        <section className="grid gap-28">
          {productsByCategory[category].map((product) => (
            <ProductPreview
              key={product.id}
              category={category}
              name={product.name}
              isNew={product.isNew}
              description={product.description}
            />
          ))}
        </section>
      </div>
    </>
  )
}
