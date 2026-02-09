import Image from 'next/image';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export async function UserInfo() {
  const session = await auth();
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

  return (
    <>
      <Card className="h-fit w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>
            <h1>ユーザー情報</h1>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="relative h-25 w-25 mx-auto">
            <Image
              src={user.profileImage ?? '/img/avatar-placeholder.png'}
              alt="プロフィール画像"
              fill
              className="rounded-full object-cover"
              sizes="100px"
              priority
            />
          </div>
          <Table className="mt-2">
            <TableBody>
              <TableRow>
                <TableHead className="font-medium w-30">ユーザー名</TableHead>
                <TableCell>{user.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="font-medium w-30">
                  メールアドレス
                </TableHead>
                <TableCell>{user.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="font-medium w-30">作成日</TableHead>
                <TableCell>
                  {user.createdAt.toLocaleDateString('ja-JP')}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
