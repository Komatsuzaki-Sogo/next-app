'use client';

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
import { ASSETS, NAV_CONFIG } from '@/constants/navigation';
import { handleLogoutAction } from '@/lib/actions/user/signOut';

type Props = {
  userName: string;
  profileImage: string | null;
};

export function PrivateHeaderMenuClientPC({ userName, profileImage }: Props) {
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
                    {menu.id === 'user-menu' ? (
                      <div className="flex items-center gap-2">
                        <div className="relative size-7">
                          <Image
                            src={profileImage || ASSETS.avatarPlaceholder}
                            alt="プロフィール画像"
                            fill
                            className="rounded-full object-cover"
                            sizes="28px"
                            priority
                          />
                        </div>
                        <span>{userName}</span>
                      </div>
                    ) : (
                      <>
                        <Icon className="size-5" color="var(--foreground)" />
                        <span>{menu.label}</span>
                      </>
                    )}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <ul className="w-52 p-2 space-y-1">
                      {menu.items?.map((item, idx) => {
                        const SubIcon = item.icon;
                        const key = item.href ?? `menu-item-${idx}`;

                        return (
                          <li key={key}>
                            {item.isLogout ? (
                              <button
                                type="button"
                                onClick={() => handleLogoutAction()}
                                className="cursor-pointer flex flex-row items-center gap-2 w-full font-medium rounded-md px-3 py-2 text-sm text-destructive hover:bg-accent text-left"
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
                                  <SubIcon className="size-5" />
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
