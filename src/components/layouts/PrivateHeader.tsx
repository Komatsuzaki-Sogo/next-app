import Link from 'next/link';
import { House } from '@deemlol/next-icons';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Setting } from './Setting';
import { auth } from '@/auth';

export async function PrivateHeader() {
  const session = await auth();
  if (!session?.user?.email) throw new Error('不正なリクエストです');

  return (
    <header className="h-(--header-height) flex items-center bg-background sticky top-0 z-100">
      <div className="w-full mx-auto px-4 flex items-center justify-between max-w-(--section-width)">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="font-bold text-xl">
                <Link href="/dashboard">
                  <House
                    className="size-6"
                    color="var(--foreground)"
                    xlinkTitle="サイトトップ"
                  />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Setting session={session} />
      </div>
    </header>
  );
}
