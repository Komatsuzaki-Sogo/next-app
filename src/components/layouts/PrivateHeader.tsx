import Link from 'next/link';
import { House } from '@deemlol/next-icons';
import { PrivateHeaderMenuPC } from '@/components/layouts/PrivateHeaderMenuPC';
import { auth } from '@/auth';
import { PrivateHeaderMenuSP } from './PrivateHeaderMenuSP';
import { CommonSection } from '@/components/layouts/CommonSection';
import { Button } from '@/components/ui/button';

export async function PrivateHeader() {
  const session = await auth();
  if (!session?.user?.email) throw new Error('不正なリクエストです');

  return (
    <header className="[grid-area:header] h-(--header-height) flex items-center bg-background sticky top-0 z-100">
      <CommonSection py="none" fullHeight>
        <div className="flex items-center justify-between h-full">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <House
                className="size-7"
                color="var(--foreground)"
                xlinkTitle="サイトトップ"
              />
            </Link>
          </Button>

          <div className="block md:hidden">
            <PrivateHeaderMenuSP session={session} />
          </div>

          <div className="hidden md:block">
            <PrivateHeaderMenuPC session={session} />
          </div>
        </div>
      </CommonSection>
    </header>
  );
}
