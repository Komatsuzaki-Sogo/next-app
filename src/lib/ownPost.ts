import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

const postSelect = {
  id: true,
  title: true,
  userName: true,
  email: true,
  password: true,
  published: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.PostSelect;

export async function getPosts(userId: string, query?: string) {
  const filters: Prisma.PostWhereInput[] = [{ authorId: userId }];

  if (query) {
    filters.push({
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
        { password: { contains: query, mode: 'insensitive' } },
      ],
    });
  }

  return await prisma.post.findMany({
    where: {
      AND: filters,
    },
    select: postSelect,
    orderBy: { createdAt: 'desc' },
  });
}

export async function getPost(userId: string, postId: string) {
  return await prisma.post.findFirst({
    where: {
      authorId: userId,
      id: postId,
    },
    select: postSelect,
  });
}
