import { Session } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { PrivateHeaderMenuClientSP } from './PrivateHeaderMenuClientSP';

export async function PrivateHeaderMenuSP({ session }: { session: Session }) {
  const userId = session?.user?.id;

  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { profileImage: true, name: true, email: true },
  });

  if (!user) return null;

  const userData = {
    name: user.name ?? 'ゲスト',
    email: user.email ?? '',
    profileImage: user.profileImage,
  };

  return <PrivateHeaderMenuClientSP user={userData} />;
}
