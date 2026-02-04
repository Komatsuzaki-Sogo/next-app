import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import Setting from './Setting';
import { auth } from '@/auth';

export default async function PrivateHeader() {
  const session = await auth();
  if (!session?.user?.email) throw new Error('不正なリクエストです');

  return (
    <header className="border-b h-(--header-height) flex items-center">
      <div className="w-full mx-auto px-4 flex items-center justify-between max-w-(--section-width)">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="font-bold text-xl">
                <Link href="/dashboard">パスワード管理一覧</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Setting session={session} />
      </div>
    </header>
  );
}
