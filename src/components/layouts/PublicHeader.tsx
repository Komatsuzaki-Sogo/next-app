import Link from 'next/link';
import { House } from '@deemlol/next-icons';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { ButtonGroup } from '@/components/ui/button-group';

export function PublicHeader() {
  return (
    <header className="h-(--header-height) flex items-center bg-background sticky top-0 z-100">
      <div className="w-full mx-auto px-4 flex items-center justify-between max-w-(--section-width)">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="font-medium text-xl">
                <Link href="/">
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
        <ButtonGroup marginTop="none" justifyCenter="none">
          <ButtonGroup marginTop="none" justifyCenter="none">
            <Button variant="outline" asChild>
              <Link href="/login">ログイン</Link>
            </Button>
          </ButtonGroup>
          <ButtonGroup marginTop="none" justifyCenter="none">
            <Button asChild>
              <Link href="/signup">サインアップ</Link>
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </div>
    </header>
  );
}
