import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { CommonSection } from '@/components/layouts/CommonSection';

export default async function UserPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('不正なリクエストです');
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error('ユーザーが存在しません');
  }

  return (
    <CommonSection>
      <h1 className="text-2xl font-bold mb-4">User</h1>
      <p>username: {user.name}</p>
      <p>email: {user.email}</p>
      <p>作成日: {user.createdAt.toLocaleDateString('ja-JP')}</p>
    </CommonSection>
  );
}
