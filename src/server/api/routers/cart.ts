import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

const cartRouter = createTRPCRouter({
  clearCart: publicProcedure
    .input(z.object({ cartId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { cartId } = input

      try {
        const cart = await ctx.db.cart.findUnique({
          where: { id: cartId },
        })

        if (!cart) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Cart not found',
          })
        }

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

        let subtotal = 0
        cart.cartItems.forEach((item) => {
          subtotal += item.quantity * item.product.price
        })

        const shipping = 5000
        const TAX_RATE = 0.08
        const tax = subtotal * TAX_RATE
        const total = subtotal + shipping + tax

        return {
          cartItems: cart.cartItems,
          subtotal,
          shipping,
          tax,
          total,
        }
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

        if (!cartId) {
          const newCart = await ctx.db.cart.create({ data: {} })
          cartId = newCart.id
        }

        const existingItem = await ctx.db.cartItem.findFirst({
          where: { cartId, productId },
        })

        if (existingItem) {
          if (quantity === 0) {
            await ctx.db.cartItem.delete({
              where: { id: existingItem.id },
            })
          } else {
            await ctx.db.cartItem.update({
              where: { id: existingItem.id },
              data: { quantity },
            })
          }
        } else if (quantity > 0) {
          await ctx.db.cartItem.create({
            data: { cartId, productId, quantity },
          })
        }

        return { cartId }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while updating the cart',
        })
      }
    }),
})

export default cartRouter
