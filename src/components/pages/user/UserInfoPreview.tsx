import Image from 'next/image';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import type { UserProps } from '@/types/user';

export default function UserInfoPreview({ user }: UserProps) {
  return (
    <>
      <div className="relative h-25 w-25 mx-auto">
        <Image
          src={user.profileImage ?? '/img/avatar-placeholder.png'}
          alt="プロフィール画像"
          fill
          className="rounded-full object-cover"
        />
      </div>

      <Table className="mt-4">
        <TableBody>
          <TableRow>
            <TableHead>ユーザー名</TableHead>
            <TableCell>{user.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>メールアドレス</TableHead>
            <TableCell>{user.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>作成日</TableHead>
            <TableCell>{user.createdAt.toLocaleDateString('ja-JP')}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
