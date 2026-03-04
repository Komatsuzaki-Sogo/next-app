import type { Metadata } from 'next';
import { auth } from '@/auth';
import { getPosts } from '@/lib/ownPost';
import { CommonSection } from '@/components/layouts/CommonSection';
import { HeadingLevel01 } from '@/components/ui/heading-level01';
import { TextBase } from '@/components/ui/text-base';
import { DashboardPost } from '@/components/pages/dashboard/DashboardPost';

type SearchParams = {
  keyword?: string;
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.keyword || '';

  const title = query
    ? `「${query}」の検索結果 | ダッシュボード`
    : '検索結果 | ダッシュボード';

  return {
    title: `${title} | パスワード管理アプリ`,
    description: `パスワード管理アプリのダッシュボード${query ? `で「${query}」を検索した` : ''}結果ページです。`,
  };
}

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

  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.keyword || '';

  const posts = await getPosts(userId, query);

  return (
    <CommonSection>
      <HeadingLevel01>
        {query ? `「${query}」の検索結果` : '検索結果'}
      </HeadingLevel01>

      <div className="space-y-4 reset-margin md:space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => <DashboardPost key={post.id} post={post} />)
        ) : (
          <TextBase center>
            <p>
              検索に該当するデータがありません。
              <br />
              再度検索しなおしてください。
            </p>
          </TextBase>
        )}
      </div>
    </CommonSection>
  );
}
