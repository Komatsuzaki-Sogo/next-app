'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoadingUI } from '../../ui/loading';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { useActionState, useState } from 'react';
import { createUser } from '@/lib/actions/createUser';
import { signupBaseSchema } from '@/validations/user';
import { InputPassword } from '@/components/ui/input-password';
import { ErrorText } from '@/components/ui/error-text';
import { Badge } from '@/components/ui/badge';

type ClientErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(createUser, {
    success: false,
    errors: {},
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [clientErrors, setClientErrors] = useState<ClientErrors>({});

  /**
   * blur 時の単一フィールドバリデーション
   */
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (
      name !== 'name' &&
      name !== 'email' &&
      name !== 'password' &&
      name !== 'confirmPassword'
    )
      return;

    const result = signupBaseSchema.safeParse({
      [name]: value,
    });

    if (result.success) {
      setClientErrors((prev) => ({ ...prev, [name]: '' }));
    } else {
      const message = result.error.flatten().fieldErrors[name]?.[0] ?? '';
      setClientErrors((prev) => ({ ...prev, [name]: message }));
    }
  };

  /**
   * submit 時の最終バリデーション
   */
  const submit = async (formData: FormData) => {
    const raw = Object.fromEntries(formData) as {
      email: string;
      password: string;
    };

    const result = signupBaseSchema.safeParse(raw);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setClientErrors({
        email: errors.email?.[0],
        password: errors.password?.[0],
      });
      return;
    }

    formAction(formData);
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
          <form action={submit} className="flex flex-col gap-6">
            <FieldGroup>
              {state.errors.name && (
                <ErrorText>{state.errors.name.join(',')}</ErrorText>
              )}
              {state.errors.password && (
                <ErrorText>{state.errors.password.join(',')}</ErrorText>
              )}
              {state.errors.email && (
                <ErrorText>{state.errors.email.join(',')}</ErrorText>
              )}
              {state.errors.confirmPassword && (
                <ErrorText>{state.errors.confirmPassword.join(',')}</ErrorText>
              )}
              <Field>
                <FieldLabel htmlFor="name">
                  ユーザー名<Badge variant="required">必須</Badge>
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="ユーザー名を入力"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  onBlur={handleBlur}
                />
                {clientErrors.name && (
                  <ErrorText>{clientErrors.name}</ErrorText>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">
                  メールアドレス<Badge variant="required">必須</Badge>
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="メールアドレスを入力"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  onBlur={handleBlur}
                />
                {clientErrors.email && (
                  <ErrorText>{clientErrors.email}</ErrorText>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">
                  パスワード<Badge variant="required">必須</Badge>
                </FieldLabel>
                <InputPassword
                  id="password"
                  name="password"
                  placeholder="パスワードを入力"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  handleBlur={handleBlur}
                />
                {clientErrors.password && (
                  <ErrorText>{clientErrors.password}</ErrorText>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  パスワード（確認）<Badge variant="required">必須</Badge>
                </FieldLabel>
                <InputPassword
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="パスワード（確認）を入力"
                  required
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  handleBlur={handleBlur}
                />
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
