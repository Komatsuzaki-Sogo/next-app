import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'ユーザー情報 | パスワード管理アプリ',
  description: 'パスワード管理アプリのユーザー情報ページです。',
};

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { CommonSection } from '@/components/layouts/CommonSection';
import { UserInfo } from '@/components/pages/user/index/UserInfo';

export default async function UserPage() {
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
  return (
    <CommonSection width="narrow">
      <UserInfo user={user} />
    </CommonSection>
  );
}
