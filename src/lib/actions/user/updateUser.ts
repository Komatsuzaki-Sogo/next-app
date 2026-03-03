'use server';

import { signupBaseSchema } from '@/validations/user';
import { prisma } from '@/lib/prisma';
import { saveImage } from '@/lib/image';
import { ZodError } from 'zod';

export type UpdateUserState = {
  success: boolean;
  errors: Record<string, string[]>;
};

function handleValidationError(error: ZodError): UpdateUserState {
  return {
    success: false,
    errors: error.flatten().fieldErrors as Record<string, string[]>,
  };
}

export async function updateUser(
  prevState: UpdateUserState,
  formData: FormData,
): Promise<UpdateUserState> {
  const userId = formData.get('userId') as string;
  const name = formData.get('name') as string;
  const currentName = formData.get('currentName') as string;
  const currentImage = formData.get('currentImage') as string | null;

  // name バリデーション（会員登録と同じ）
  const nameSchema = signupBaseSchema.pick({ name: true });
  const nameResult = nameSchema.safeParse({ name });

  if (!nameResult.success) {
    return handleValidationError(nameResult.error);
  }

  // プロフィール画像
  let imageUrl: string | null = currentImage;
  const profileImage = formData.get('profileImage');

  if (
    profileImage instanceof File &&
    profileImage.size > 0 &&
    profileImage.name !== 'undefined'
  ) {
    const newImageUrl = await saveImage(profileImage);
    if (!newImageUrl) {
      return {
        success: false,
        errors: { profileImage: ['画像の保存に失敗しました'] },
      };
    }
    imageUrl = newImageUrl;
  }

  // 変更なしチェック
  if (name === currentName && imageUrl === currentImage) {
    return {
      success: false,
      errors: {
        form: ['ユーザー名・プロフィール画像は更新前と同じです。'],
      },
    };
  }

  // 更新
  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      profileImage: imageUrl,
    },
  });

  return { success: true, errors: {} };
}
