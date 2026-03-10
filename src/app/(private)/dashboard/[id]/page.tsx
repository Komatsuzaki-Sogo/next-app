import { auth } from '@/auth';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPost } from '@/lib/actions/post/getPosts';
import { CommonSection } from '@/components/layouts/CommonSection';
import { DashboardPost } from '@/components/pages/dashboard/common/DashboardPost';
import { ButtonBack } from '@/components/ui/button-back';

type Params = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) {
    throw new Error('不正なリクエストです');
  }

  const { id } = await params;
  const post = await getPost(userId, id);

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
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) {
    throw new Error('不正なリクエストです');
  }

  const { id } = await params;
  const post = await getPost(userId, id);

  if (!post) {
    notFound();
  }

  return (
    <CommonSection>
      <h1 className="sr-only">{post.title}</h1>
      <DashboardPost post={post} />
      <ButtonBack fallbackPath="dashboard" />
    </CommonSection>
  );
}
