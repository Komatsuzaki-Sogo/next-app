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

export async function getPosts(
  userId: string,
  keyword?: string,
  startDate?: string,
  endDate?: string,
  emptyOnNoQuery: boolean = false, // クエリなしで空配列を返すオプション
) {
  const hasKeyword = !!keyword?.trim();
  const hasDateRange = !!(startDate && endDate);

  if (emptyOnNoQuery && !hasKeyword && !hasDateRange) {
    return [];
  }

  const filters: Prisma.PostWhereInput[] = [{ authorId: userId }];

  // 複数キーワード検索 (AND)
  if (keyword) {
    const words = keyword
      .trim()
      .split(/[\s　]+/)
      .filter(Boolean);
    words.forEach((word) => {
      filters.push({
        OR: [
          { userName: { contains: word, mode: 'insensitive' } },
          { title: { contains: word, mode: 'insensitive' } },
          { email: { contains: word, mode: 'insensitive' } },
          { password: { contains: word, mode: 'insensitive' } },
        ],
      });
    });
  }

  // 期間検索
  if (startDate && endDate) {
    filters.push({
      createdAt: {
        gte: new Date(`${startDate}T00:00:00Z`),
        lte: new Date(`${endDate}T23:59:59Z`),
      },
    });
  }

  return await prisma.post.findMany({
    where: { AND: filters },
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
