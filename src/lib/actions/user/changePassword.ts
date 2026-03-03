'use server';

import { passwordChangeSchema } from '@/validations/user';
import { prisma } from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
import { auth } from '@/auth';
import { ZodError } from 'zod';

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

function handleValidationError(error: ZodError): ActionState {
  const { fieldErrors, formErrors } = error.flatten();

  if (formErrors.length > 0) {
    return {
      success: false,
      errors: { ...fieldErrors, newConfirmPassword: formErrors },
    };
  }

  return {
    success: false,
    errors: fieldErrors as Record<string, string[]>,
  };
}

export async function changePassword(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await auth();
  if (!session?.user?.email) {
    return {
      success: false,
      errors: { password: ['認証情報が取得できません'] },
    };
  }

  const raw = Object.fromEntries(
    ['password', 'newPassword', 'newConfirmPassword'].map((k) => [
      k,
      formData.get(k) as string,
    ]),
  );

  const validation = passwordChangeSchema.safeParse(raw);
  if (!validation.success) {
    return handleValidationError(validation.error);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return {
      success: false,
      errors: { password: ['ユーザーが存在しません'] },
    };
  }

  const isValid = await bcryptjs.compare(raw.password, user.password);
  if (!isValid) {
    return {
      success: false,
      errors: { password: ['現在のパスワードが正しくありません'] },
    };
  }

  const hashed = await bcryptjs.hash(raw.newPassword, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashed },
  });

  return { success: true, errors: {} };
}
