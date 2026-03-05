import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'ダッシュボード | パスワード管理アプリ',
  description: 'パスワード管理アプリのダッシュボードページです。',
};

import { Search, PlusCircle } from '@deemlol/next-icons';
import { auth } from '@/auth';
import { getPosts } from '@/lib/ownPost';
import { CommonSection } from '@/components/layouts/CommonSection';
import { HeadingLevel01 } from '@/components/ui/heading-level01';
import { DashboardPost } from '@/components/pages/dashboard/DashboardPost';
import { TextBase } from '@/components/ui/text-base';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ButtonGroup } from '@/components/ui/button-group';

export default async function DashBoardPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) {
    throw new Error('不正なリクエストです');
  }

  const posts = await getPosts(userId);

  return (
    <CommonSection>
      <div className="flex flex-col gap-6 items-center justify-between md:flex-row">
        <HeadingLevel01 align="left" className="pb-0">
          ダッシュボード
        </HeadingLevel01>

        <ButtonGroup marginTop="none">
          <ButtonGroup marginTop="none">
            <Button variant="outline" asChild>
              <Link href="/dashboard/search">
                <Search className="size-5" />
                検索
              </Link>
            </Button>
          </ButtonGroup>
          <ButtonGroup marginTop="none">
            <Button asChild>
              <Link href="/dashboard/create">
                <PlusCircle className="size-5" />
                新規作成
              </Link>
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </div>

      <div className="space-y-4 mt-10 reset-margin md:space-y-6">
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
