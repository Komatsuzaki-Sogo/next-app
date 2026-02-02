import { z } from 'zod';

export const registerBaseSchema = z.object({
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
  confirmPassword: z.string().min(1, '確認用パスワードは必須です'),
});

// submit 用（password一致チェックあり）
export const registerSchema = registerBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
  }
);

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'メールアドレスは必須です' })
    .min(1, 'メールアドレスは必須です')
    .email('不正なメールアドレスです'),
  password: z
    .string({ required_error: 'パスワードは必須です' })
    .min(1, 'パスワードは必須です'),
});
