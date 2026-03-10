'use server';

import { auth } from '@/auth';
import { getPosts } from '@/lib/actions/post/ownPost';
import { DashboardPostType } from '@/types/post';
import { POST_CONFIG } from '@/constants/post';

export async function fetchMorePosts(
  skip: number,
): Promise<DashboardPostType[]> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return [];

  // 2件ずつ取得
  return await getPosts(
    userId,
    POST_CONFIG.INFINITE_SCROLL_LIMIT,
    skip,
    undefined,
    undefined,
    undefined,
    false,
  );
}
