import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().trim().min(1, 'タイトルは必須です'),
  userName: z.string().optional(),
  email: z
    .string()
    .min(1, 'メールアドレスは必須です')
    .email('不正なメールアドレスです'),
  password: z.string().min(1, 'パスワードは必須です'),
  shared: z.boolean(),
});
