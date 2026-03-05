'use client';

import { Edit, Copy } from '@deemlol/next-icons';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from '@/components/ui/table';
import type { PostCardProps } from '@/types/post';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import DeletePostDialog from './DeleteDashboardPostDialog';
import Link from 'next/link';

export function DashboardPost({ post }: PostCardProps) {
  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);

      toast.success(`${label}をコピーしました。`, {
        description: 'クリップボードに保存されました。',
      });
    } catch (error) {
      console.error(error);
      toast.error('コピーに失敗しました。');
    }
  };

  return (
    <Card className="gap-3">
      <CardHeader className="flex gap-2 justify-between">
        <CardTitle className="text-lg font-semibold text-gray-900 self-center">
          <h2>{post.title}</h2>
        </CardTitle>
        <ButtonGroup marginTop="none" justifyCenter="none">
          <ButtonGroup marginTop="none" justifyCenter="none">
            <Button variant="ghost" size="icon" aria-label="edit" asChild>
              <Link href={`/dashboard/${post.id}/edit`}>
                <Edit className="text-blue-500 size-6" />
              </Link>
            </Button>
          </ButtonGroup>
          <ButtonGroup marginTop="none" justifyCenter="none">
            <DeletePostDialog
              title={post.title}
              onDelete={() => {
                console.log('Delete post');
              }}
            />
          </ButtonGroup>
        </ButtonGroup>
      </CardHeader>

      <CardContent>
        <Table className="text-sm">
          <TableBody>
            {post.userName && (
              <TableRow className="border-none">
                <TableHead className="h-fit px-0 w-28 text-gray-500 font-medium">
                  ユーザーID
                </TableHead>
                <TableCell className="py-1">
                  <div className="flex items-center gap-1 group">
                    <span className="break-all">{post.userName}</span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="copy userName"
                      onClick={() => handleCopy(post.userName!, 'ユーザーID')}
                    >
                      <Copy className="text-gray-400 size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
            <TableRow className="border-none">
              <TableHead className="h-fit px-0 w-28">メールアドレス</TableHead>
              <TableCell className="py-1">
                <div className="flex items-center gap-1">
                  <span className="break-all">{post.email}</span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="copy email"
                    onClick={() => handleCopy(post.email, 'メールアドレス')}
                  >
                    <Copy className="text-gray-500 size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow className="border-none">
              <TableHead className="h-fit px-0 w-28">パスワード</TableHead>
              <TableCell className="py-1">
                <div className="flex items-center gap-1">
                  <span className="font-mono break-all">{post.password}</span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="copy password"
                    onClick={() => handleCopy(post.password, 'パスワード')}
                  >
                    <Copy className="text-gray-500 size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Separator className="my-4" />
        <div className="flex gap-3">
          <div className="text-xs text-gray-400">
            作成日: {new Date(post.createdAt).toLocaleDateString('ja-JP')}
          </div>
          {post.createdAt.getTime() !== post.updatedAt.getTime() && (
            <div className="text-xs text-gray-400">
              最終更新日: {post.updatedAt.toLocaleDateString('ja-JP')}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
