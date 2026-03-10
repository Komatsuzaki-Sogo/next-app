'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from '@deemlol/next-icons';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetOverlay,
} from '@/components/ui/sheet';
import { ASSETS, NAV_CONFIG } from '@/constants/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { handleLogoutAction } from '@/lib/actions/user/signOut';

type Props = {
  user: {
    name: string | null;
    email: string | null;
    profileImage: string | null;
  };
};

export function PrivateHeaderMenuClientSP({ user }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="size-6" />
          <span className="sr-only">メニューを開く</span>
        </Button>
      </SheetTrigger>

      <SheetOverlay />

      <SheetContent
        side="right"
        className="w-[90%] max-w-80 z-200 gap-0 p-0"
        showCloseButton={false}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>メニュー</SheetTitle>
        </SheetHeader>

        <div className="h-(--header-height) flex items-center justify-end px-4">
          <SheetClose asChild>
            <Button variant="ghost" size="icon">
              <X className="size-6" />
              <span className="sr-only">メニューを閉じる</span>
            </Button>
          </SheetClose>
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-var(--header-height))]">
          <div className="flex items-center gap-3 px-4 pb-6 pt-2">
            <div className="relative size-12 flex-none">
              <Image
                src={user.profileImage || ASSETS.avatarPlaceholder}
                alt="プロフィール画像"
                fill
                className="rounded-full object-cover"
                sizes="48px"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm truncate">{user.name}</span>
              <span className="text-xs text-muted-foreground truncate">
                {user.email}
              </span>
            </div>
          </div>

          <Separator />

          <nav className="flex flex-col">
            {NAV_CONFIG.map((menu) => {
              const Icon = menu.icon;

              return (
                <div key={menu.id} className="flex flex-col">
                  <div className="px-2 py-4">
                    {menu.type === 'link' ? (
                      <SheetClose asChild>
                        <Link
                          href={menu.href!}
                          className="flex items-center gap-3 text-md font-medium p-3 hover:bg-accent rounded-md transition-colors"
                        >
                          <Icon className="size-5" />
                          {menu.label}
                        </Link>
                      </SheetClose>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <p className="text-xs uppercase text-muted-foreground font-semibold px-3 mb-2">
                          {menu.label}
                        </p>
                        {menu.items?.map((item, idx) => {
                          const SubIcon = item.icon;
                          const key = item.href ?? `sp-item-${idx}`;

                          if (item.isLogout) {
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => handleLogoutAction()}
                                className="cursor-pointer flex items-center gap-3 w-full text-md font-medium p-3 text-destructive hover:bg-destructive/10 rounded-md transition-colors text-left"
                              >
                                <SubIcon className="size-5" />
                                {item.label}
                              </button>
                            );
                          }

                          return (
                            <SheetClose key={key} asChild>
                              <Link
                                href={item.href!}
                                className="flex items-center gap-3 text-md font-medium p-3 hover:bg-accent rounded-md transition-colors"
                              >
                                <SubIcon className="size-5" />
                                {item.label}
                              </Link>
                            </SheetClose>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <Separator />
                </div>
              );
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
