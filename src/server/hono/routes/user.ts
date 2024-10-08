import { auth } from "@/server/auth";
import { prisma } from "@/server/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { SessionVars } from "../types";
import { isImage, isLessThanThanFiveMB } from "@/utils";
import { deleteFile, isUploadedFile, uploadFile } from "../services/upload";

const userRoutes = new Hono<{ Variables: SessionVars }>();

userRoutes.put('/', zValidator('json', z.object({
  name: z.string().min(5).max(20),
  phone: z.string().min(0).max(20),
  bio: z.string().max(200),
}).strict()), async (c) => {
  const user = c.get('user');
  const data = c.req.valid('json');

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: data.name,
      phone: data.phone,
      bio: data.bio,
    }
  });

  return c.json({
    message: 'User updated'
  }, 200);
});

userRoutes.put('/image', zValidator('form', z.object({
  file: z.instanceof(File).refine(isImage, { message: 'Invalid image' }).refine(isLessThanThanFiveMB, { message: 'Image size is too large' }),
}).strict()), async (c) => {
  const user = c.get('user');
  const { file } = c.req.valid('form');

  await deletePreviouslyUploadedImage(user.id!);
  const url = await uploadFile(file);

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      image: url,
    },
    select: {
      image: true,
    }
  });

  return c.json({
    message: 'User image updated',
    data: {
      image: updatedUser.image,
    }
  }, 200);
});

userRoutes.delete('/image', async (c) => {
  const user = c.get('user');

  await deletePreviouslyUploadedImage(user.id!);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      image: null,
    }
  })

  return c.json({
    message: 'User image deleted'
  }, 200);
});

const deletePreviouslyUploadedImage = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      image: true,
    }
  });

  const existingFileURL = user?.image;

  if (existingFileURL && isUploadedFile(existingFileURL)) {
    await deleteFile(existingFileURL);
  }
}

export default userRoutes;