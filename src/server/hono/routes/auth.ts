import { sendEmail } from "@/server/hono/services/mailer";
import { prisma } from "@/server/prisma";
import { zValidator } from "@hono/zod-validator";
import { hash, verify } from "@node-rs/argon2";
import { Hono } from "hono";
import { sign } from "jsonwebtoken";
import { z } from "zod";

const router = new Hono();

router.post('/signup', zValidator('json', z.object({
  email: z.string().email().toLowerCase(),
  name: z.string().min(5),
  password: z.string().min(8),
}).strict()), async (c) => {
  const { name, email, password } = c.req.valid('json');

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    }
  });

  if (existingUser) {
    return c.json({
      message: 'User already exists'
    }, 400);
  }

  const passwordHash = await hash(password);

  await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
    }
  });

  return c.json({
    message: 'User created',
  }, 201);
});

router.post('/forgot-password', zValidator('json', z.object({
  email: z.string().email(),
}).strict()), async (c) => {
  const { email } = c.req.valid('json');

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    }
  });

  if (!existingUser) {
    return c.json({
      message: 'User not found'
    }, 400);
  } else if (!existingUser.email) {
    throw new Error("User exists but email not found");
  }

  const token = sign({ email }, process.env.AUTH_SECRET!, {
    expiresIn: '1h',
  });

  await prisma.verificationToken.create({
    data: {
      token,
      identifier: existingUser.id,
      expires: new Date(), // We won't be using it either way
    }
  });

  const baseURL = process.env.VERCEL_URL ?? process.env.BASE_URL;
  const link = `${baseURL}/auth/reset-password?token=${token}`;

  await sendEmail(existingUser.email, 'Forgot Password', link);

  return c.json({ success: true }, 200);
});

router.post('/reset-password', zValidator('json', z.object({
  token: z.string(),
  password: z.string().min(8),
}).strict()), async (c) => {
  try {
    const { token, password } = c.req.valid('json');

    verify(token, process.env.AUTH_SECRET!);
    const existingToken = await prisma.verificationToken.delete({
      where: {
        token,
      }
    });

    if (!existingToken) {
      return c.json({
        message: 'Invalid token'
      }, 400);
    }

    const passwordHash = await hash(password);

    await prisma.user.update({
      where: {
        id: existingToken.identifier,
      },
      data: {
        password: passwordHash,
      }
    });

    return c.json({
      message: 'Password reset',
    }, 200);
  } catch (e) {
    console.error(e);
    return c.json({
      message: 'Something went wrong!'
    }, 500);
  }
});

export default router;