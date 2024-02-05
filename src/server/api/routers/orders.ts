import { TRPCError } from '@trpc/server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

const orderRouter = createTRPCRouter({
  saveCartAsOrder: publicProcedure.mutation(async ({ ctx }) => {
    const cartId = cookies().get('cartId')?.value
    if (!cartId) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Cart not found in cookies.',
      })
    }

    try {
      const cart = await ctx.db.cart.findUnique({
        where: { id: cartId },
        include: {
          cartItems: {
            include: { product: true },
          },
        },
      })

      if (!cart) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Cart not found in database.',
        })
      }

      const order = await ctx.db.order.create({ data: {} })

      await Promise.all(
        cart.cartItems.map((item) =>
          ctx.db.orderItem.create({
            data: {
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
            },
          }),
        ),
      )

      await ctx.db.cart.delete({ where: { id: cartId } })
      cookies().delete('cartId')

      return {
        orderId: order.id,
        message: 'Order created successfully from cart.',
      }
    } catch (error) {
      console.error('Failed to save cart as order:', error)

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while creating the order.',
      })
    }
  }),

  getOrder: publicProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { orderId } = input

      try {
        const order = await ctx.db.order.findUnique({
          where: { id: orderId },
          include: {
            orderItems: {
              include: { product: true },
            },
          },
        })

        if (!order) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Order not found.',
          })
        }

        const total = order.orderItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        )

        return { ...order, total }
      } catch (error) {
        console.error('Failed to get order:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while retrieving the order.',
        })
      }
    }),
})

export default orderRouter
