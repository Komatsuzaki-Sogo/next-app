import Link from 'next/link';
import Image from 'next/image';
import { Menu } from '@deemlol/next-icons';
import { X } from '@deemlol/next-icons';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetOverlay,
} from '@/components/ui/sheet';
import { signOut } from '@/auth';
import { Session } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { ASSETS, NAV_CONFIG } from '@/constants/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export async function PrivateHeaderMenuSP({ session }: { session: Session }) {
  const userId = session?.user?.id;

  if (!userId) throw new Error('不正なリクエストです');

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { profileImage: true, name: true, email: true },
  });

  if (!user) throw new Error('ユーザーが存在しません');

  const handleLogout = async () => {
    'use server';
    await signOut();
  };

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
        className="w-[90%] max-w-100 z-200 gap-0"
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

        <div className="flex items-center gap-3 px-2 pb-4 border-b">
          <div className="relative size-10">
            <Image
              src={user.profileImage ?? ASSETS.avatarPlaceholder}
              alt="プロフィール画像"
              fill
              className="rounded-full object-cover"
              sizes="40px"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm line-clamp-1">{user.name}</span>
            <span className="text-xs text-muted-foreground line-clamp-1">
              {user.email}
            </span>
          </div>
        </div>

        <nav className="flex flex-col gap-4">
          {NAV_CONFIG.map((menu) => {
            const Icon = menu.icon;

            return (
              <div key={menu.id} className="flex flex-col pt-2 space-y-2">
                <div className="px-2">
                  {menu.type === 'link' ? (
                    <SheetClose asChild>
                      <Link
                        href={menu.href!}
                        className="flex items-center gap-3 text-md font-medium p-2 hover:bg-accent rounded-md transition-colors"
                      >
                        <Icon className="size-5" />
                        {menu.label}
                      </Link>
                    </SheetClose>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <p className="text-xs uppercase text-muted-foreground font-semibold px-2 mb-1">
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
                              onClick={handleLogout}
                              className="cursor-pointer flex items-center gap-3 w-full text-md font-medium p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
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
                              className="flex items-center gap-3 text-md font-medium p-2 hover:bg-accent rounded-md transition-colors"
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
      </SheetContent>
    </Sheet>
  );
}
