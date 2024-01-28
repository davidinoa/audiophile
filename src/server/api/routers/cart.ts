import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

const cartRouter = createTRPCRouter({
  clearCart: publicProcedure
    .input(z.object({ cartId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { cartId } = input

      try {
        // Check if the cart exists
        const cart = await ctx.db.cart.findUnique({
          where: { id: cartId },
        })

        if (!cart) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Cart not found',
          })
        }

        // Delete all items from the cart
        await ctx.db.cartItem.deleteMany({
          where: { cartId: cart.id },
        })

        return { message: 'Cart cleared successfully' }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while clearing the cart',
        })
      }
    }),
  getCart: publicProcedure
    .input(z.object({ cartId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { cartId } = input

      try {
        const cart = await ctx.db.cart.findUnique({
          where: { id: cartId },
          include: {
            cartItems: {
              include: {
                product: true,
              },
            },
          },
        })

        if (!cart) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Cart not found',
          })
        }

        return cart
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while retrieving the cart',
        })
      }
    }),
  setItemQuantity: publicProcedure
    .input(
      z.object({
        cartId: z.string().optional(),
        productId: z.string(),
        quantity: z.number().min(0),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        let { cartId } = input
        const { productId, quantity } = input

        // Create a new cart if cartId is not provided
        if (!cartId) {
          const newCart = await ctx.db.cart.create({ data: {} })
          cartId = newCart.id
        }

        // Check if the CartItem exists
        const existingItem = await ctx.db.cartItem.findFirst({
          where: { cartId, productId },
        })

        if (existingItem) {
          // Update the quantity if it exists
          await ctx.db.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity },
          })
        } else {
          // Create a new CartItem if it doesn't exist
          await ctx.db.cartItem.create({
            data: { cartId, productId, quantity },
          })
        }

        // Return the cartId for the frontend to save as a cookie
        return { cartId }
      } catch (error) {
        // Handle specific error types or throw a generic error
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while updating the cart',
        })
      }
    }),
})

export default cartRouter
