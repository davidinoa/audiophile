import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

const productRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) =>
      ctx.db.product.findUnique({
        where: { id: input.id },
      }),
    ),
})

export default productRouter
