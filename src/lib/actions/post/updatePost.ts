'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { createPostSchema } from '@/validations/post';
import { redirect } from 'next/navigation';

export type UpdatePostState = {
  success: boolean;
  errors: Record<string, string[]>;
};

export async function updatePost(
  _prevState: UpdatePostState,
  formData: FormData,
): Promise<UpdatePostState> {
  const session = await auth();
  const authorId = session?.user?.id;
  const postId = String(formData.get('postId') ?? '');

  if (!authorId || !postId) {
    return {
      success: false,
      errors: { form: ['投稿を更新できませんでした'] },
    };
  }

  const raw = {
    title: String(formData.get('title') ?? ''),
    userName: String(formData.get('userName') ?? ''),
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? ''),
    shared: formData.get('shared') === 'true',
  };

  const validation = createPostSchema.safeParse(raw);
  if (!validation.success) {
    const { fieldErrors, formErrors } = validation.error.flatten();
    return {
      success: false,
      errors: {
        ...fieldErrors,
        ...(formErrors.length > 0 ? { form: formErrors } : {}),
      } as Record<string, string[]>,
    };
  }

  try {
    const result = await prisma.post.updateMany({
      where: { id: postId, authorId },
      data: {
        title: validation.data.title,
        userName: validation.data.userName?.trim() || null,
        email: validation.data.email,
        password: validation.data.password,
        shared: validation.data.shared,
      },
    });

    if (result.count === 0) {
      return {
        success: false,
        errors: { form: ['投稿が見つからないか、更新する権限がありません'] },
      };
    }
  } catch {
    return {
      success: false,
      errors: { form: ['投稿の更新に失敗しました'] },
    };
  }

  redirect('/dashboard');
}
