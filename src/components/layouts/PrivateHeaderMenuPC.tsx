import { Session } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { PrivateHeaderMenuClientPC } from './PrivateHeaderMenuClientPC';

export async function PrivateHeaderMenuPC({ session }: { session: Session }) {
  const userId = session?.user?.id;

  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { profileImage: true, name: true },
  });

  if (!user) return null;

  return (
    <PrivateHeaderMenuClientPC
      userName={user.name ?? 'ゲスト'}
      profileImage={user.profileImage}
    />
  );
}
