import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../prisma";
import Credentials from "next-auth/providers/credentials";
import { verify } from "@node-rs/argon2";
import { z } from "zod";
import { IncorrectPasswordError, InvalidCredentialsError, UserNotFoundError } from "./errors";

const loginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);

        if (parsed.error) {
          throw new InvalidCredentialsError();
        }

        const { email, password } = parsed.data;

        const user = await prisma.user.findFirst({
          where: {
            email: email as string,
          },
        });

        if (!user) {
          throw new UserNotFoundError();
        } else if (!user.password) {
          throw new IncorrectPasswordError();
        }

        const isMatching = await verify(user.password, password as string);

        if (!isMatching) {
          throw new IncorrectPasswordError();
        }

        return user
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      }
    }),
  },
  pages: {
    signIn: '/auth/signin',
  },
})