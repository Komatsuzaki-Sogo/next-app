'use client';

import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { FieldLabel } from '@/components/ui/field';
import { Plus } from 'lucide-react';
import { TextError } from '@/components/ui/text-error';
import type { UserProps } from '@/types/user';

type Props = {
  user: UserProps['user'];
  formAction: (payload: FormData) => void;
  state: {
    success: boolean;
    errors: Record<string, string[]>;
  };
  editName: string;
  setEditName: (v: string) => void;
  editPreviewUrl: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurName: () => void;
  clientError: string | null;
};

export function UserInfoEditForm({
  user,
  formAction,
  state,
  editName,
  setEditName,
  editPreviewUrl,
  onImageChange,
  onBlurName,
  clientError,
}: Props) {
  return (
    <form action={formAction}>
      {/* hidden fields */}
      <input type="hidden" name="userId" value={user.id} />
      <input type="hidden" name="currentName" value={user.name} />
      <input
        type="hidden"
        name="currentImage"
        value={user.profileImage ?? ''}
      />

      {state.errors.form && (
        <TextError className="mb-4">{state.errors.form[0]}</TextError>
      )}

      {/* avatar */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative h-24 w-24">
          <Image
            src={editPreviewUrl ?? '/img/avatar-placeholder.png'}
            alt="プロフィール画像"
            fill
            className="rounded-full object-cover"
          />
          <FieldLabel
            htmlFor="profileImage"
            className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            <Plus size={20} />
          </FieldLabel>
        </div>

        <Input
          id="profileImage"
          type="file"
          name="profileImage"
          accept="image/*"
          className="hidden"
          onChange={onImageChange}
        />
      </div>

      {/* table */}
      <Table className="mt-4">
        <TableBody>
          <TableRow>
            <TableHead>ユーザー名</TableHead>
            <TableCell>
              <Input
                name="name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={onBlurName}
              />
              {(clientError || state.errors.name?.[0]) && (
                <TextError>{clientError ?? state.errors.name?.[0]}</TextError>
              )}
            </TableCell>
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

      <ButtonGroup>
        <Button type="submit" size="lg" disabled={!!clientError}>
          編集を完了する
        </Button>
      </ButtonGroup>
    </form>
  );
}
