'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { UserProps } from '@/types/user';
import UserInfoPreview from './UserInfoPreview';
import { updateUser } from '@/lib/actions/user/updateUser';
import { signupBaseSchema } from '@/validations/user';
import { TextSuccess } from '@/components/ui/text-success';
import { UserInfoEditForm } from './UserInfoEditForm';
import { LoadingUI } from '@/components/ui/loading';

export function UserInfoClient({ user }: UserProps) {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [isEditSuccess, setIsEditSuccess] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editPreviewUrl, setEditPreviewUrl] = useState<string | null>(
    user.profileImage,
  );
  const [clientError, setClientError] = useState<string | null>(null);

  const [state, formAction, isPending] = useActionState(updateUser, {
    success: false,
    errors: {},
  });

  // 更新成功時に編集モードを終了し、最新のユーザー情報を再取得する
  useEffect(() => {
    if (!state.success) return;

    setIsEdit(false);
    setIsEditSuccess(true);
    router.refresh();
  }, [state]);

  // router.refresh() 後に渡される最新の user を編集用 state に反映するため
  useEffect(() => {
    setEditName(user.name);
    setEditPreviewUrl(user.profileImage);
  }, [user.name, user.profileImage]);

  // blur バリデーション
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
    <>
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
            <UserInfoEditForm
              user={user}
              formAction={formAction}
              state={state}
              editName={editName}
              setEditName={setEditName}
              editPreviewUrl={editPreviewUrl}
              onImageChange={handleImageChange}
              onBlurName={handleBlur}
              clientError={clientError}
            />
          )}
        </CardContent>
      </Card>
      {isPending && <LoadingUI />}
    </>
  );
}
