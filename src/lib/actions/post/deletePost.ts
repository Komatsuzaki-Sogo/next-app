'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function deletePost(postId: string): Promise<boolean> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId || !postId) {
    return false;
  }

  const result = await prisma.post.deleteMany({
    where: {
      id: postId,
      authorId: userId,
    },
  });

  return result.count > 0;
}
