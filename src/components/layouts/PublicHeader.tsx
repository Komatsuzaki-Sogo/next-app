import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

export default function PublicHeader() {
  return (
    <header className="border-b h-(--header-height) flex items-center">
      <div className="w-full mx-auto px-4 flex items-center justify-between max-w-(--section-width)">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="font-bold text-xl">
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/login">ログイン</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">サインアップ</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
