import { TRPCError } from "@trpc/server";
import { cookies, headers as getHeaders } from "next/headers";

import { LoginSchema, RegisterSchema } from "@/app/(frontend)/(auth)/schemas";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import { AUTH_TOKEN } from "../constants";

export const authRouter = createTRPCRouter({
  login: baseProcedure.input(LoginSchema).mutation(async ({ ctx, input }) => {
    const data = await ctx.payload.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      },
    });

    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password",
      });
    }

    (await cookies()).set({
      httpOnly: true,
      name: AUTH_TOKEN,
      path: "/",
      value: data.token,
    });

    return data;
  }),

  logout: baseProcedure.mutation(async () => {
    (await cookies()).delete(AUTH_TOKEN);
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

      (await cookies()).set({
        httpOnly: true,
        name: AUTH_TOKEN,
        path: "/",
        value: data.token,
      });

      return data;
    }),

  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();

    const session = await ctx.payload.auth({ headers });

    return session;
  }),
});
