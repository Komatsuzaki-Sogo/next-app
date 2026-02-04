'use server';

import { prisma } from '@/lib/prisma';
import { changePasswordSchema } from '@/validations/password';
import { ZodError } from 'zod';
import bcryptjs from 'bcryptjs';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

function handleValidationError(error: ZodError): ActionState {
  const { fieldErrors, formErrors } = error.flatten();
  if (formErrors.length > 0) {
    return {
      success: false,
      errors: { ...fieldErrors, confirmPassword: formErrors },
    };
  }
  return { success: false, errors: fieldErrors as Record<string, string[]> };
}

export async function changePassword(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await auth();
  if (!session?.user?.email) {
    return {
      success: false,
      errors: { currentPassword: ['認証エラーが発生しました'] },
    };
  }

  const rawFormData = {
    currentPassword: formData.get('currentPassword') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  };

  const validationResult = changePasswordSchema.safeParse(rawFormData);
  if (!validationResult.success) {
    return handleValidationError(validationResult.error);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return {
      success: false,
      errors: { currentPassword: ['ユーザーが存在しません'] },
    };
  }

  const isMatch = await bcryptjs.compare(
    rawFormData.currentPassword,
    user.password,
  );

  if (!isMatch) {
    return {
      success: false,
      errors: { currentPassword: ['現在のパスワードが正しくありません'] },
    };
  }

  const hashedPassword = await bcryptjs.hash(rawFormData.password, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  redirect('/dashboard');
}
