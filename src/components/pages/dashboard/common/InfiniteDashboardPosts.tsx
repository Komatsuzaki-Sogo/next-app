'use client';

import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { DashboardPost } from '@/components/pages/dashboard/common/DashboardPost';
import { fetchMorePosts } from '@/lib/actions/post/getPostsInfinite';
import { DashboardPostType } from '@/types/post';
import { Loader2 } from 'lucide-react';
import { POST_CONFIG } from '@/constants/post';

export function InfiniteDashboardPosts({
  initialPosts,
}: {
  initialPosts: DashboardPostType[];
}) {
  const [posts, setPosts] = useState<DashboardPostType[]>(initialPosts);
  const [skip, setSkip] = useState(initialPosts.length);
  const [hasMore, setHasMore] = useState(
    initialPosts.length >= POST_CONFIG.INFINITE_SCROLL_LIMIT,
  );
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView({
    rootMargin: '200px',
  });

  const loadNextPosts = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPosts = await fetchMorePosts(skip);

      if (nextPosts.length < POST_CONFIG.INFINITE_SCROLL_LIMIT) {
        setHasMore(false);
      }

      if (nextPosts.length > 0) {
        setPosts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const uniqueNewPosts = nextPosts.filter(
            (p) => !existingIds.has(p.id),
          );
          return [...prev, ...uniqueNewPosts];
        });
        setSkip((prev) => prev + nextPosts.length);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [skip, hasMore, isLoading]);

  useEffect(() => {
    if (inView) {
      loadNextPosts();
    }
  }, [inView, loadNextPosts]);

  return (
    <>
      <div className="space-y-4 mt-10 reset-margin md:space-y-6">
        {posts.map((post) => (
          <DashboardPost key={post.id} post={post} isLink />
        ))}
      </div>

      {hasMore && (
        <div ref={ref} className="flex justify-center mt-8 py-4">
          <Loader2 className="animate-spin text-gray-400 size-6" />
        </div>
      )}
    </>
  );
}
