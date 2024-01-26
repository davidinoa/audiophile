import { createTRPCRouter } from '~/server/api/trpc'
import cartRouter from './routers/cart'
import productRouter from './routers/product'

export const appRouter = createTRPCRouter({
  product: productRouter,
  cart: cartRouter,
})

export type AppRouter = typeof appRouter
