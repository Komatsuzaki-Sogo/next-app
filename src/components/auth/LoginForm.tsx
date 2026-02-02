'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingUI from '../ui/loading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useActionState, useState } from 'react';
import { authenticate } from '@/lib/actions/authenticate'; // ServerAction
import { loginSchema } from '@/validations/user';
import z from 'zod';
import InputPassword from '@/components/ui/input-password';

type ClientErrors = {
  email?: string;
  password?: string;
};

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  const [clientErrors, setClientErrors] = useState<ClientErrors>({});

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    try {
      if (name === 'email') {
        loginSchema.pick({ email: true }).parse({ email: value });
      }

      if (name === 'password') {
        loginSchema.pick({ password: true }).parse({ password: value });
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
          <CardTitle>ログイン</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                name="email"
                required
                onBlur={handleBlur}
              />
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
              {clientErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {clientErrors.password}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              ログイン
            </Button>
            <div className="flex h-8 items-end space-x-1">
              {errorMessage && (
                <div className="text-red-500">
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      {isPending && <LoadingUI />}
    </>
  );
}
