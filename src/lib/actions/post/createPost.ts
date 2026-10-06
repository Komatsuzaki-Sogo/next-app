'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { createPostSchema } from '@/validations/post';
import { redirect } from 'next/navigation';

export type CreatePostState = {
  success: boolean;
  errors: Record<string, string[]>;
};

export async function createPost(
  _prevState: CreatePostState,
  formData: FormData,
): Promise<CreatePostState> {
  const session = await auth();
  const authorId = session?.user?.id;

  if (!authorId) {
    return {
      success: false,
      errors: { form: ['認証情報が取得できません'] },
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
    await prisma.post.create({
      data: {
        title: validation.data.title,
        userName: validation.data.userName?.trim() || null,
        email: validation.data.email,
        password: validation.data.password,
        shared: validation.data.shared,
        authorId,
      },
    });
  } catch {
    return {
      success: false,
      errors: { form: ['投稿の作成に失敗しました'] },
    };
  }

  redirect('/dashboard');
}
