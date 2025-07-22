import { TRPCError } from "@trpc/server";
import { headers as getHeaders } from "next/headers";

import { LoginSchema, RegisterSchema } from "@/app/(frontend)/(auth)/schemas";
import { generateAuthCookie } from "@/shared/utils/auth";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const authRouter = createTRPCRouter({
  login: baseProcedure.input(LoginSchema).mutation(async ({ ctx, input }) => {
    try {
      const data = await ctx.payload.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (data.token) {
        await generateAuthCookie({
          prefix: ctx.payload.config.cookiePrefix,
          value: data.token,
        });

        return data;
      }
    } catch {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password",
      });
    }
  }),

  register: baseProcedure
    .input(RegisterSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password, username } = input;

      const existingUser = await ctx.payload.find({
        collection: "users",
        limit: 1,
        where: {
          username: {
            equals: username,
          },
        },
      });

      if (existingUser.totalDocs > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already exists",
        });
      }

      const { id } = await ctx.payload.create({
        collection: "users",
        data: {
          email,
          password,
          username,
        },
      });

      if (!id) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create user",
        });
      }

      const data = await ctx.payload.login({
        collection: "users",
        data: {
          email,
          password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }

      await generateAuthCookie({
        prefix: ctx.payload.config.cookiePrefix,
        value: data.token,
      });

      return data;
    }),

  session: baseProcedure.query(async ({ ctx }) => {
    try {
      const headers = await getHeaders();

      const session = await ctx.payload.auth({ headers });

      return session;
    } catch {
      return {
        user: null,
      };
    }
  }),
});
