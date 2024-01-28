import { notFound } from 'next/navigation'
import { isValidCategory } from '~/lib/types'
import { api } from '~/trpc/server'
import ProductPreview from '../components/product-preview'

type Props = {
  params: {
    category: string
  }
}

export default async function Page({ params }: Props) {
  const categoryName = params.category
  const products = await api.categories.getProductsByCategoryName.query({
    categoryName,
  })
  if (!isValidCategory(categoryName)) return notFound()

  return (
    <>
      <h2 className="full-width bg-eclipse-black p-8 text-center text-[1.75rem] font-bold uppercase leading-snug tracking-[2px] text-white">
        {categoryName}
      </h2>
      <div className="pt-10 md:pt-20">
        <section className="grid gap-28">
          {products.map((product) => (
            <ProductPreview
              key={product.id}
              category={categoryName}
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
