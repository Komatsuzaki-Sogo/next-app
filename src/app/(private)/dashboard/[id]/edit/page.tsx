import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { getPost } from '@/lib/ownPost';

type Params = {
  params: Promise<{ id: string }>;
};
export default async function EditPage({ params }: Params) {
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
    <div>
      <h1 className="text-2xl font-bold mb-4">投稿の編集</h1>
      <div>{post.title}</div>
      <div>{post.email}</div>
      <div>{post.password}</div>
    </div>
  );
}
