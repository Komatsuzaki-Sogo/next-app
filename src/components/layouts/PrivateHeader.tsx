import Link from 'next/link';
import { House } from '@deemlol/next-icons';
import { PrivateHeaderMenu } from './PrivateHeaderMenu';
import { auth } from '@/auth';

export async function PrivateHeader() {
  const session = await auth();
  if (!session?.user?.email) throw new Error('不正なリクエストです');

  return (
    <header className="h-(--header-height) flex items-center bg-background sticky top-0 z-100">
      <div className="w-full mx-auto px-4 flex items-center justify-between max-w-(--section-width)">
        <Link href="/">
          <House
            className="size-6"
            color="var(--foreground)"
            xlinkTitle="サイトトップ"
          />
        </Link>

        <PrivateHeaderMenu session={session} />
      </div>
    </header>
  );
}
