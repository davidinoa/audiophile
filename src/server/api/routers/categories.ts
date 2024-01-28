import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

const categoryRouter = createTRPCRouter({
  getProductsByCategoryName: publicProcedure
    .input(z.object({ categoryName: z.string() }))
    .query(async ({ ctx, input }) => {
      const { categoryName } = input

      try {
        // Find the first category with the given name
        const category = await ctx.db.category.findFirst({
          where: { name: categoryName },
          include: {
            products: true, // Include the products related to this category
          },
        })

        if (!category) {
          // Throw an error if the category is not found
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `Category with name '${categoryName}' not found.`,
          })
        }

        // Return the products of the found category
        return category.products
      } catch (error) {
        // Generic error handling
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `An error occurred while fetching products for category '${categoryName}'.`,
        })
      }
    }),
})

export default categoryRouter
