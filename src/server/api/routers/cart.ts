import { type Prisma, type PrismaClient } from '@prisma/client'
import { type DefaultArgs } from '@prisma/client/runtime/library'
import { TRPCError } from '@trpc/server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { SHIPPING_COST, TAX_RATE } from '~/lib/constants'
import { createTRPCRouter, publicProcedure } from '../trpc'

const cartRouter = createTRPCRouter({
  clearCart: publicProcedure.mutation(async ({ ctx }) => {
    const cartId = cookies().get('cartId')?.value
    if (!cartId) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Cart not found',
      })
    }

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

  getCart: publicProcedure.query(async ({ ctx }) => {
    try {
      let cartId = cookies().get('cartId')?.value
      if (!cartId) {
        const newCart = await createCart(ctx.db)
        cartId = newCart.id
      }

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

        const shipping = SHIPPING_COST
        const tax = subtotal * TAX_RATE
        const total = subtotal + shipping + tax

        return {
          ...cart,
          subtotal,
          shipping,
          tax,
          total,
        }
      } catch (error) {
        cookies().delete('cartId')

        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Cart not found',
        })
      }
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while retrieving or creating the cart',
      })
    }
  }),

  addItemToCart: publicProcedure
    .input(
      z.object({
        productId: z.string(),
        quantity: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        let cartId = cookies().get('cartId')?.value

        if (!cartId) {
          const newCart = await createCart(ctx.db)
          cartId = newCart.id
        }

        const existingItem = await ctx.db.cartItem.findFirst({
          where: {
            cartId,
            productId: input.productId,
          },
        })

        if (existingItem) {
          await ctx.db.cartItem.update({
            where: {
              id: existingItem.id,
            },
            data: {
              quantity: existingItem.quantity + input.quantity,
            },
          })
        } else {
          await ctx.db.cartItem.create({
            data: {
              cartId,
              productId: input.productId,
              quantity: input.quantity,
            },
          })
        }

        return {
          cartId,
          message: 'Item added to cart successfully',
        }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while adding the item to the cart',
        })
      }
    }),

  setItemQuantity: publicProcedure
    .input(
      z.object({
        productId: z.string(),
        quantity: z.number().min(0),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        let cartId = cookies().get('cartId')?.value
        const { productId, quantity } = input

        if (!cartId) {
          const newCart = await createCart(ctx.db)
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

async function createCart(
  db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
) {
  const cart = await db.cart.create({ data: {} })
  cookies().set('cartId', cart.id, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  })
  return cart
}

export default cartRouter
