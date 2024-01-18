import { notFound } from 'next/navigation'
import { CATEGORIES } from '~/lib/constants'
import { type Category } from '~/lib/types'
import AboutSection from '../components/about-section'
import CategoryNavigation from '../components/category-navigation'
import ProductPreview from '../components/product-preview'
import productsByCategory from './product-data'
import productImages from './product-images'

type Props = {
  params: {
    category: string
  }
}

export default function Page({ params }: Props) {
  const { category } = params
  if (!isCategory(category)) return notFound()

  return (
    <main className="content-grid | bg-snow-drift">
      <h2 className="full-width bg-eclipse-black p-8 text-center text-[1.75rem] font-bold uppercase leading-snug tracking-[2px] text-white">
        {category}
      </h2>
      <div className="grid gap-y-28 pt-10 md:pt-20 lg:gap-y-40">
        <section className="grid gap-28">
          {productsByCategory[category].map((product) => (
            <ProductPreview
              key={product.id}
              category={category}
              name={product.name}
              isNew={product.isNew}
              images={productImages[product.id]}
              description={product.description}
            />
          ))}
        </section>
        <section>
          <CategoryNavigation />
        </section>
        <AboutSection />
      </div>
    </main>
  )
}

function isCategory(value: string): value is Category {
  return CATEGORIES.some((category) => category === value)
}
