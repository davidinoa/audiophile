import { createTRPCRouter } from '~/server/api/trpc'
import cartRouter from './routers/cart'
import categoryRouter from './routers/categories'
import orderRouter from './routers/orders'
import productRouter from './routers/products'

export const appRouter = createTRPCRouter({
  product: productRouter,
  cart: cartRouter,
  categories: categoryRouter,
  orders: orderRouter,
})

export type AppRouter = typeof appRouter
