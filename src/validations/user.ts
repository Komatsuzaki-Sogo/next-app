import { z } from 'zod';

export const signupBaseSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z
    .string()
    .min(1, 'メールアドレスは必須です')
    .email('不正なメールアドレスです'),
  password: z
    .string()
    .min(1, 'パスワードは必須です')
    .min(8, 'パスワードは最低8文字必要です')
    .max(32, 'パスワードは最大32文字以内にしてください'),
  confirmPassword: z
    .string()
    .min(1, '確認用パスワードは必須です')
    .min(8, '確認用パスワードは最低8文字必要です')
    .max(32, '確認用パスワードは最大32文字以内にしてください'),
});

// submit 用（password一致チェックあり）
export const signupSchema = signupBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
  },
);

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'メールアドレスは必須です' })
    .min(1, 'メールアドレスは必須です')
    .email('不正なメールアドレスです'),
  password: z
    .string({ required_error: 'パスワードは必須です' })
    .min(1, 'パスワードは必須です')
    .min(8, 'パスワードは最低8文字必要です')
    .max(32, 'パスワードは最大32文字以内にしてください'),
});

export const passwordChangeBaseSchema = z.object({
  password: z
    .string()
    .min(1, 'パスワードは必須です')
    .min(8, 'パスワードは最低8文字必要です')
    .max(32, 'パスワードは最大32文字以内にしてください'),
  newPassword: z
    .string()
    .min(1, '新しいパスワードは必須です')
    .min(8, '新しいパスワードは最低8文字必要です')
    .max(32, '新しいパスワードは最大32文字以内にしてください'),
  newConfirmPassword: z
    .string()
    .min(1, '新しいパスワード（確認）は必須です')
    .min(8, '新しいパスワード（確認）は最低8文字必要です')
    .max(32, '新しいパスワード（確認）は最大32文字以内にしてください'),
});

// submit 用（password一致チェックあり）
export const passwordChangeSchema = passwordChangeBaseSchema.refine(
  (data) => data.newPassword === data.newConfirmPassword,
  {
    message: 'パスワードが一致しません',
    path: ['newConfirmPassword'],
  },
);
