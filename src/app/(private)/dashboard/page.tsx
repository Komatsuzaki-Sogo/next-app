import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'ダッシュボード | パスワード管理アプリ',
  description: 'パスワード管理アプリのダッシュボードページです。',
};

import { auth } from '@/auth';
import { getPosts } from '@/lib/ownPost';
import { CommonSection } from '@/components/layouts/CommonSection';
import { HeadingLevel01 } from '@/components/ui/heading-level01';
import { DashboardPost } from '@/components/pages/dashboard/DashboardPost';
import { TextBase } from '@/components/ui/text-base';

export default async function DashBoardPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) {
    throw new Error('不正なリクエストです');
  }

  const posts = await getPosts(userId);

  return (
    <CommonSection>
      <HeadingLevel01>ダッシュボード</HeadingLevel01>

      <div className="space-y-4 reset-margin md:space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => <DashboardPost key={post.id} post={post} />)
        ) : (
          <TextBase center>
            <p>登録されているデータがありません。</p>
          </TextBase>
        )}
      </div>
    </CommonSection>
  );
}
