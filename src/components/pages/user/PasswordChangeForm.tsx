'use client';

import { useActionState, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingUI } from '@/components/ui/loading';
import { InputPassword } from '@/components/ui/input-password';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { TextError } from '@/components/ui/text-error';
import { passwordChangeBaseSchema } from '@/validations/user';
import { changePassword } from '@/lib/actions/user/changePassword';
import { TextSuccess } from '@/components/ui/text-success';
import { Badge } from '@/components/ui/badge';
import { ButtonGroup } from '@/components/ui/button-group';

type ClientErrors = {
  password?: string;
  newPassword?: string;
  newConfirmPassword?: string;
};

export function PasswordChangeForm() {
  const [state, formAction, isPending] = useActionState(changePassword, {
    success: false,
    errors: {},
  });

  const [form, setForm] = useState({
    password: '',
    newPassword: '',
    newConfirmPassword: '',
  });

  const [clientErrors, setClientErrors] = useState<ClientErrors>({});

  /**
   * blur 時：単一フィールドバリデーション（clientErrorsのみ）
   */
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (
      name !== 'password' &&
      name !== 'newPassword' &&
      name !== 'newConfirmPassword'
    )
      return;

    const result = passwordChangeBaseSchema.safeParse({
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
   * submit：server action に委譲（clientErrorsは触らない）
   */
  const submit = async (formData: FormData) => {
    formAction(formData);
  };

  /**
   * 成功時：input初期化＋clientErrorsリセット
   */
  useEffect(() => {
    if (state.success) {
      setForm({
        password: '',
        newPassword: '',
        newConfirmPassword: '',
      });
      setClientErrors({});
    }
  }, [state.success]);

  return (
    <>
      <Card className="h-fit w-full max-w-md mx-auto mt-8 md:mt-10">
        <CardHeader>
          <CardTitle>
            <h1>パスワード変更</h1>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form action={submit} className="flex flex-col gap-6">
            <FieldGroup>
              {state.errors.password && (
                <TextError>{state.errors.password.join(',')}</TextError>
              )}
              {state.errors.newPassword && (
                <TextError>{state.errors.newPassword.join(',')}</TextError>
              )}
              {state.errors.newConfirmPassword && (
                <TextError>
                  {state.errors.newConfirmPassword.join(',')}
                </TextError>
              )}
              {state.success && (
                <TextSuccess>パスワードを変更しました</TextSuccess>
              )}

              <Field>
                <FieldLabel htmlFor="password">
                  現在のパスワード<Badge variant="required">必須</Badge>
                </FieldLabel>
                <InputPassword
                  id="password"
                  name="password"
                  placeholder="現在のパスワード"
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
                  <TextError>{clientErrors.password}</TextError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="newPassword">
                  新しいパスワード<Badge variant="required">必須</Badge>
                </FieldLabel>
                <InputPassword
                  id="newPassword"
                  name="newPassword"
                  placeholder="新しいパスワード"
                  required
                  value={form.newPassword}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  handleBlur={handleBlur}
                />
                {clientErrors.newPassword && (
                  <TextError>{clientErrors.newPassword}</TextError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="newConfirmPassword">
                  新しいパスワード（確認）<Badge variant="required">必須</Badge>
                </FieldLabel>
                <InputPassword
                  id="newConfirmPassword"
                  name="newConfirmPassword"
                  placeholder="新しいパスワード（確認）"
                  required
                  value={form.newConfirmPassword}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      newConfirmPassword: e.target.value,
                    }))
                  }
                  handleBlur={handleBlur}
                />
                {clientErrors.newConfirmPassword && (
                  <TextError>{clientErrors.newConfirmPassword}</TextError>
                )}
              </Field>

              <Field>
                <ButtonGroup marginTop="none">
                  <Button type="submit" size="lg">
                    パスワードを変更する
                  </Button>
                </ButtonGroup>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {isPending && <LoadingUI />}
    </>
  );
}
