'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingUI from '../ui/loading';
import { useActionState, useState } from 'react';
import { createUser } from '@/lib/actions/createUser';
import { registerBaseSchema } from '@/validations/user';
import z from 'zod';
import InputPassword from '@/components/ui/input-password';

type ClientErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(createUser, {
    success: false,
    errors: {},
  });

  const [clientErrors, setClientErrors] = useState<ClientErrors>({});

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    try {
      if (name === 'name') {
        registerBaseSchema.pick({ name: true }).parse({ name: value });
      }

      if (name === 'email') {
        registerBaseSchema.pick({ email: true }).parse({ email: value });
      }

      if (name === 'password') {
        registerBaseSchema.pick({ password: true }).parse({ password: value });
      }

      if (name === 'confirmPassword') {
        registerBaseSchema
          .pick({ password: true, confirmPassword: true })
          .parse({
            password: (document.getElementById('password') as HTMLInputElement)
              ?.value,
            confirmPassword: value,
          });
      }

      // エラーなし → そのフィールドのエラーを消す
      setClientErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setClientErrors((prev) => ({
          ...prev,
          [name]: error.errors[0]?.message ?? '',
        }));
      }
    }
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="pt-6">
          <CardTitle>ユーザー登録</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">名前</Label>
              <Input
                id="name"
                type="text"
                name="name"
                required
                onBlur={handleBlur}
              />
              {state.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.name.join(',')}
                </p>
              )}
              {clientErrors.name && (
                <p className="text-red-500 text-sm mt-1">{clientErrors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                name="email"
                required
                onBlur={handleBlur}
              />
              {state.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.email.join(',')}
                </p>
              )}
              {clientErrors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {clientErrors.email}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <InputPassword
                id="password"
                name="password"
                required
                handleBlur={handleBlur}
              />
              {state.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.password.join(',')}
                </p>
              )}
              {clientErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {clientErrors.password}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">パスワード(確認)</Label>
              <InputPassword
                id="confirmPassword"
                name="confirmPassword"
                required
                handleBlur={handleBlur}
              />
              {state.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.confirmPassword.join(',')}
                </p>
              )}
              {clientErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {clientErrors.confirmPassword}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              登録
            </Button>
          </form>
        </CardContent>
      </Card>
      {isPending && <LoadingUI />}
    </>
  );
}
