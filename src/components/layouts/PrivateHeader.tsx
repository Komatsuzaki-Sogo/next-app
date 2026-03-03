import Link from 'next/link';
import { House } from '@deemlol/next-icons';
import { PrivateHeaderMenuPC } from '@/components/layouts/PrivateHeaderMenuPC';
import { auth } from '@/auth';
import { PrivateHeaderMenuSP } from './PrivateHeaderMenuSP';
import { PrivateHeaderSearch } from '@/components/layouts/PrivateHeaderSearch';
import { PrivateHeaderSearchDialog } from '@/components/layouts/PrivateHeaderSearchDialog';

export async function PrivateHeader() {
  const session = await auth();
  if (!session?.user?.email) throw new Error('不正なリクエストです');

  return (
    <header className="h-(--header-height) flex items-center bg-background sticky top-0 z-100">
      <div className="w-full mx-auto px-4 flex items-center justify-between max-w-(--section-width)">
        <Link
          href="/"
          className="p-1.5 rounded-md hover:bg-accent transition-colors"
        >
          <House
            className="size-6"
            color="var(--foreground)"
            xlinkTitle="サイトトップ"
          />
        </Link>

        <div className="flex items-center gap-4 md:hidden">
          <PrivateHeaderSearchDialog />
          <PrivateHeaderMenuSP session={session} />
        </div>

        <div className="hidden md:flex items-center gap-4 w-[80%] max-w-160">
          <PrivateHeaderSearch />
          <PrivateHeaderMenuPC session={session} />
        </div>
      </div>
    </header>
  );
}
