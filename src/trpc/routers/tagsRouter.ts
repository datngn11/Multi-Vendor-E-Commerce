import z from "zod";

import { DEFAULT_TAGS_LIMIT } from "@/shared/constants";

import { baseProcedure, createTRPCRouter } from "../init";

export const tagsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_TAGS_LIMIT),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;

      const tags = await ctx.payload.find({
        collection: "tags",
        depth: 1,
        limit,
        page: cursor,
      });

      return tags;
    }),
});
