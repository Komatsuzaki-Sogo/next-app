import Link from 'next/link';
import { User } from '@deemlol/next-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { signOut } from '@/auth';
import { Session } from 'next-auth';

export function Setting({ session }: { session: Session }) {
  const handleLogout = async () => {
    'use server';
    await signOut();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="font-medium">
          <User size={28} color="var(--foreground)" />
          {session.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild className="cursor-point">
          <Link href="/user">ユーザーページ</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-point">
          <Link href="/user/password">パスワード変更</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="cursor-point">
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
