'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LoadingUI from '../../ui/loading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { useActionState, useState } from 'react';
import { authenticate } from '@/lib/actions/authenticate';
import { loginSchema } from '@/validations/user';
import z from 'zod';
import InputPassword from '@/components/ui/input-password';
import ErrorText from '@/components/ui/error-text';

type ClientErrors = {
  email?: string;
  password?: string;
};

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
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
      <Card className="h-fit w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>
            <h1>ログイン</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex flex-col gap-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">メールアドレス</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  onBlur={handleBlur}
                />
                {clientErrors.email && (
                  <ErrorText>{clientErrors.email}</ErrorText>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">パスワード</FieldLabel>
                <InputPassword
                  id="password"
                  name="password"
                  required
                  handleBlur={handleBlur}
                />
                {clientErrors.password && (
                  <ErrorText>{clientErrors.password}</ErrorText>
                )}
              </Field>
              <Field>
                <div className="text-center">
                  <Button type="submit" size="lg">
                    ログイン
                  </Button>
                </div>

                <FieldDescription className="text-center">
                  アカウントをお持ちでない方は
                  <Link href="/signup">こちら</Link>
                </FieldDescription>
              </Field>

              {errorMessage && (
                <div>
                  <div className="text-red-500">
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  </div>
                </div>
              )}
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      {isPending && <LoadingUI />}
    </>
  );
}
