import { prisma } from '@/lib/prisma';
export async function getOwnPosts(userId: string) {
  return await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      email: true,
      password: true,
      published: true,
      updatedAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getOwnPost(userId: string, postId: string) {
  return await prisma.post.findFirst({
    where: {
      AND: [{ authorId: userId }, { id: postId }],
    },
    select: {
      id: true,
      title: true,
      email: true,
      password: true,
      published: true,
      updatedAt: true,
    },
  });
}
