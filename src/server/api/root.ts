import { createTRPCRouter } from '~/server/api/trpc'
import cartRouter from './routers/cart'
import categoryRouter from './routers/categories'
import productRouter from './routers/products'

export const appRouter = createTRPCRouter({
  product: productRouter,
  cart: cartRouter,
  categories: categoryRouter,
})

export type AppRouter = typeof appRouter
