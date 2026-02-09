import Link from 'next/link';
import Image from 'next/image';
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
import { prisma } from '@/lib/prisma';

export async function PrivateHeaderMenu({ session }: { session: Session }) {
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('不正なリクエストです');
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      profileImage: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error('ユーザーが存在しません');
  }
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
                className="size-5 max-[400px]:size-6"
                color="var(--foreground)"
              />
              <span className="max-[400px]:hidden">ダッシュボード</span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={
              navigationMenuTriggerStyle() +
              'flex gap-1 item-center font-medium cursor-pointer'
            }
          >
            <div className="relative size-8 mx-auto">
              <Image
                src={user.profileImage ?? '/img/avatar-placeholder.png'}
                alt="プロフィール画像"
                fill
                className="rounded-full object-cover"
                sizes="100px"
                priority
              />
            </div>
            <span className="max-[400px]:hidden">{session.user?.name}</span>
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
