import Link from 'next/link';
import { User } from '@deemlol/next-icons';
import { Info } from '@deemlol/next-icons';
import { Tool } from '@deemlol/next-icons';
import { LogOut } from '@deemlol/next-icons';
import { Clipboard } from '@deemlol/next-icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { signOut } from '@/auth';
import { Session } from 'next-auth';

export function PrivateHeaderMenu({ session }: { session: Session }) {
  const handleLogout = async () => {
    'use server';
    await signOut();
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className="flex flex-row items-center gap-1 font-medium"
          >
            <Link href="/dashboard">
              <Clipboard
                className="size-5 max-[370px]:hidden"
                color="var(--foreground)"
              />
              ダッシュボード
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={
              navigationMenuTriggerStyle() +
              'flex gap-1 font-medium cursor-pointer'
            }
          >
            <User
              className="size-5 max-[370px]:hidden"
              color="var(--foreground)"
            />
            {session.user?.name}
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="w-46 p-2 space-y-1">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="/user"
                    className="flex flex-row item-center items-start gap-2 font-medium"
                  >
                    <Info color="var(--foreground)" className="size-5" />
                    ユーザー情報
                  </Link>
                </NavigationMenuLink>
              </li>

              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="/user/password"
                    className="flex flex-row item-center items-start gap-2 font-medium"
                  >
                    <Tool color="var(--foreground)" className="size-5" />
                    パスワード変更
                  </Link>
                </NavigationMenuLink>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="flex flex-row item-center items-start gap-2 w-full font-medium rounded-md px-3 py-2 text-sm text-destructive hover:bg-accent"
                >
                  <LogOut className="size-5" />
                  ログアウト
                </button>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
