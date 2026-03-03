import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { UserInfoClient } from './UserInfoClient';

export async function UserInfo() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('不正なリクエストです');

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      profileImage: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) throw new Error('ユーザーが存在しません');

  return <UserInfoClient user={user} />;
}
