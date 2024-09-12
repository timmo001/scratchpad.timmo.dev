import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { scratchpads } from "~/server/db/schema";

const CreateScratchpadSchema = z.object({
  userId: z.string(),
  content: z.string().optional(),
});

export const scratchpadRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateScratchpadSchema)
    .mutation(async ({ ctx, input }) => {
      console.log("Create scratchpad:", input);
      await ctx.db.insert(scratchpads).values({
        userId: input.userId,
        content: input.content,
      });
    }),

  getOne: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      console.log("Get one scratchpad:", input);
      const scratchpad = await ctx.db.query.scratchpads.findFirst({
        where: (scratchpads, { eq }) => eq(scratchpads.userId, input.userId),
      });

      return scratchpad ?? null;
    }),

  updateContent: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        content: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(scratchpads)
        .set({
          content: input.content,
        })
        .where(eq(scratchpads.userId, input.userId));
    }),
});
