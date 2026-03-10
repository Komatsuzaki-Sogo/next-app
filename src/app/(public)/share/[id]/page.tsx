import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSharedPost } from '@/lib/actions/post/getPosts';
import { CommonSection } from '@/components/layouts/CommonSection';
import { DashboardPost } from '@/components/pages/dashboard/common/DashboardPost';

type Params = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const post = await getSharedPost(id);

  if (!post) {
    return {
      title: 'ページが見つかりません',
    };
  }

  return {
    title: `${post.title} | シェア | パスワード管理アプリ`,
    description: `パスワード管理アプリの「${post.title}」の共有ページです。`,
  };
}

export default async function SharePage({ params }: Params) {
  const { id } = await params;
  const post = await getSharedPost(id);

  if (!post) {
    notFound();
  }

  return (
    <CommonSection>
      <h1 className="sr-only">{post.title}</h1>
      <DashboardPost post={post} showMenu={false} />
    </CommonSection>
  );
}
