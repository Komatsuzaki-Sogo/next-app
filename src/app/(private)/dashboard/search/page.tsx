import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '検索 | ダッシュボード | パスワード管理アプリ',
  description: 'パスワード管理アプリのダッシュボードの検索ページです。',
};

import { auth } from '@/auth';
import { getPosts } from '@/lib/ownPost';
import { CommonSection } from '@/components/layouts/CommonSection';
import { HeadingLevel01 } from '@/components/ui/heading-level01';
import { TextBase } from '@/components/ui/text-base';
import { DashboardPost } from '@/components/pages/dashboard/DashboardPost';
import { FilterDashboardPost } from '@/components/pages/dashboard/FilterDashboardPost';

type SearchParams = {
  keyword?: string;
  startDate?: string;
  endDate?: string;
};

export default async function DashBoardPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) {
    throw new Error('不正なリクエストです');
  }

  const { keyword, startDate, endDate } = await searchParams;

  const hasParams = !!(keyword?.trim() || (startDate && endDate));

  const posts = await getPosts(userId, keyword, startDate, endDate, true);

  return (
    <CommonSection>
      <HeadingLevel01 align="left">検索結果</HeadingLevel01>

      <FilterDashboardPost
        keywordProps={keyword}
        startDateProps={startDate}
        endDateProps={endDate}
      />

      <div className="space-y-4 mt-10 reset-margin md:space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => <DashboardPost key={post.id} post={post} />)
        ) : hasParams ? (
          <TextBase center>
            <p>
              検索に該当するデータがありません。
              <br />
              再度検索しなおしてください。
            </p>
          </TextBase>
        ) : null}
      </div>
    </CommonSection>
  );
}
