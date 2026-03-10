import Image from 'next/image';
import Link from 'next/link';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field';
import type { UserProps } from '@/types/user';

export default function UserInfoPreview({ user }: UserProps) {
  console.log(user.profileImage);
  return (
    <>
      <div className="relative h-25 w-25 mx-auto">
        <Image
          src={user.profileImage || '/img/avatar-placeholder.png'}
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
          {user.createdAt.getTime() !== user.updatedAt.getTime() && (
            <TableRow>
              <TableHead>最終更新日</TableHead>
              <TableCell>
                {user.updatedAt.toLocaleDateString('ja-JP')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <FieldGroup className="mt-4">
        <Field>
          <FieldDescription className="text-center">
            パスワード変更は
            <Link href="/user/password">こちら</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </>
  );
}
