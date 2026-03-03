import Link from 'next/link';
import Image from 'next/image';
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
import { ASSETS, NAV_CONFIG } from '@/constants/navigation';

export async function PrivateHeaderMenuPC({ session }: { session: Session }) {
  const userId = session?.user?.id;

  if (!userId) throw new Error('不正なリクエストです');

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { profileImage: true, name: true },
  });

  if (!user) throw new Error('ユーザーが存在しません');

  // Server Action
  const handleLogout = async () => {
    'use server';
    await signOut();
  };

  return (
    <NavigationMenu className="flex-none">
      <NavigationMenuList>
        {NAV_CONFIG.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavigationMenuItem key={menu.id}>
              {menu.type === 'link' ? (
                <NavigationMenuLink
                  asChild
                  className="flex flex-row items-center gap-1 font-medium"
                >
                  <Link href={menu.href!}>
                    <Icon className="size-5" color="var(--foreground)" />
                    <span>{menu.label}</span>
                  </Link>
                </NavigationMenuLink>
              ) : (
                <>
                  <NavigationMenuTrigger
                    className={`${navigationMenuTriggerStyle()} flex gap-1 items-center font-medium cursor-pointer`}
                  >
                    <div className="relative size-7 mx-auto">
                      <Image
                        src={user.profileImage ?? ASSETS.avatarPlaceholder}
                        alt="プロフィール画像"
                        fill
                        className="rounded-full object-cover"
                        sizes="20px"
                        priority
                      />
                    </div>
                    <span>{user.name}</span>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <ul className="w-46 p-2 space-y-1">
                      {menu.items?.map((item, idx) => {
                        const SubIcon = item.icon;
                        const key = item.href ?? `menu-item-${idx}`;

                        return (
                          <li key={key}>
                            {item.isLogout ? (
                              <button
                                onClick={handleLogout}
                                className="flex flex-row item-center items-start gap-2 w-full font-medium rounded-md px-3 py-2 text-sm text-destructive hover:bg-accent"
                              >
                                <SubIcon className="size-5" />
                                {item.label}
                              </button>
                            ) : (
                              <NavigationMenuLink asChild>
                                <Link
                                  href={item.href!}
                                  className="flex flex-row items-center gap-2 font-medium px-3 py-2 rounded-md hover:bg-accent transition-colors"
                                >
                                  <SubIcon
                                    color="var(--foreground)"
                                    className="size-5"
                                  />
                                  {item.label}
                                </Link>
                              </NavigationMenuLink>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
