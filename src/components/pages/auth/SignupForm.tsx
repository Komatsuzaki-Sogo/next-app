'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LoadingUI from '../../ui/loading';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { useActionState, useState } from 'react';
import { createUser } from '@/lib/actions/createUser';
import { signupBaseSchema } from '@/validations/user';
import z from 'zod';
import InputPassword from '@/components/ui/input-password';
import ErrorText from '@/components/ui/error-text';

type ClientErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(createUser, {
    success: false,
    errors: {},
  });

  const [clientErrors, setClientErrors] = useState<ClientErrors>({});

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    try {
      if (name === 'name') {
        signupBaseSchema.pick({ name: true }).parse({ name: value });
      }

      if (name === 'email') {
        signupBaseSchema.pick({ email: true }).parse({ email: value });
      }

      if (name === 'password') {
        signupBaseSchema.pick({ password: true }).parse({ password: value });
      }

      if (name === 'confirmPassword') {
        signupBaseSchema.pick({ password: true, confirmPassword: true }).parse({
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
      <Card className="h-fit w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>
            <h1>ユーザー登録</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex flex-col gap-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">名前</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  required
                  onBlur={handleBlur}
                />
                {state.errors.name && (
                  <ErrorText>{state.errors.name.join(',')}</ErrorText>
                )}
                {clientErrors.name && (
                  <ErrorText>{clientErrors.name}</ErrorText>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">メールアドレス</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  onBlur={handleBlur}
                />
                {state.errors.email && (
                  <ErrorText>{state.errors.email.join(',')}</ErrorText>
                )}
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
                {state.errors.password && (
                  <ErrorText>{state.errors.password.join(',')}</ErrorText>
                )}
                {clientErrors.password && (
                  <ErrorText>{clientErrors.password}</ErrorText>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  パスワード(確認)
                </FieldLabel>
                <InputPassword
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  handleBlur={handleBlur}
                />
                {state.errors.confirmPassword && (
                  <ErrorText>
                    {state.errors.confirmPassword.join(',')}
                  </ErrorText>
                )}
                {clientErrors.confirmPassword && (
                  <ErrorText>{clientErrors.confirmPassword}</ErrorText>
                )}
              </Field>
              <Field>
                <div className="text-center">
                  <Button type="submit" size="lg">
                    サインアップ
                  </Button>
                </div>

                <FieldDescription className="text-center">
                  アカウントをお持ちの方は
                  <Link href="/login">こちら</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      {isPending && <LoadingUI />}
    </>
  );
}
