'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoadingUI } from '../../ui/loading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { useActionState, useState } from 'react';
import { authenticate } from '@/lib/actions/user/authenticate';
import { loginSchema } from '@/validations/user';
import { InputPassword } from '@/components/ui/input-password';
import { ErrorText } from '@/components/ui/error-text';
import { Badge } from '@/components/ui/badge';

type ClientErrors = {
  email?: string;
  password?: string;
};

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [clientErrors, setClientErrors] = useState<ClientErrors>({});

  /**
   * blur 時の単一フィールドバリデーション
   */
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name !== 'email' && name !== 'password') return;

    const result = loginSchema.safeParse({
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

    const result = loginSchema.safeParse(raw);
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
            <h1>ログイン</h1>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form action={submit} className="flex flex-col gap-6">
            <FieldGroup>
              {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
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
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {isPending && <LoadingUI />}
    </>
  );
}
