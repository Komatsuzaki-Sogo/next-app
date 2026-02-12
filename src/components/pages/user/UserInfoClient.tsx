'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FieldLabel } from '@/components/ui/field';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ButtonGroup } from '@/components/ui/button-group';
import type { UserProps } from '@/types/user';
import UserInfoPreview from './UserInfoPreview';
import { updateUser } from '@/lib/actions/user/updateUser';
import { signupBaseSchema } from '@/validations/user';
import { TextError } from '@/components/ui/text-error';
import { TextSuccess } from '@/components/ui/text-success';

export function UserInfoClient({ user }: UserProps) {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [isEditSuccess, setIsEditSuccess] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editPreviewUrl, setEditPreviewUrl] = useState<string | null>(
    user.profileImage,
  );
  const [clientError, setClientError] = useState<string | null>(null);

  const [state, formAction] = useActionState(updateUser, {
    success: false,
    errors: {},
  });

  // 更新成功 → プレビュー表示
  useEffect(() => {
    if (state.success) {
      setIsEdit(false);
      router.refresh();
      setIsEditSuccess(true);
    }
  }, [state.success]);

  // blur バリデーション（会員登録と同じ）
  const handleBlur = () => {
    const result = signupBaseSchema.pick({ name: true }).safeParse({
      name: editName,
    });

    if (!result.success) {
      setClientError(result.error.flatten().fieldErrors.name?.[0] ?? null);
    } else {
      setClientError(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <Card className="h-fit w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <h1>ユーザー情報</h1>
          {!isEdit ? (
            <Button
              onClick={() => {
                setIsEdit(true);
                setIsEditSuccess(false);
              }}
            >
              編集
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                setIsEdit(false);
                setIsEditSuccess(false);
              }}
            >
              キャンセル
            </Button>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {isEditSuccess && (
          <TextSuccess className="mb-4">
            ユーザー情報の変更が完了しました。
          </TextSuccess>
        )}
        {!isEdit ? (
          <UserInfoPreview user={user} />
        ) : (
          <form action={formAction}>
            <input type="hidden" name="userId" value={user?.id} />
            <input type="hidden" name="currentName" value={user.name} />
            <input
              type="hidden"
              name="currentImage"
              value={user.profileImage ?? ''}
            />

            {state.errors.form && (
              <TextError className="mb-4">{state.errors.form[0]}</TextError>
            )}

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
                onChange={handleImageChange}
              />
            </div>

            <Table className="mt-4">
              <TableBody>
                <TableRow>
                  <TableHead>ユーザー名</TableHead>
                  <TableCell>
                    <Input
                      name="name"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={handleBlur}
                    />
                    {(clientError || state.errors.name?.[0]) && (
                      <TextError>
                        {clientError ?? state.errors.name?.[0]}
                      </TextError>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>メールアドレス</TableHead>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>作成日</TableHead>
                  <TableCell>
                    {user.createdAt.toLocaleDateString('ja-JP')}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <ButtonGroup>
              <Button type="submit" size="lg" disabled={!!clientError}>
                編集を完了する
              </Button>
            </ButtonGroup>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
