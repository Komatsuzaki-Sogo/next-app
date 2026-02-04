'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LoadingUI from '@/components/ui/loading';
import InputPassword from '@/components/ui/input-password';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { useActionState } from 'react';
import { changePassword } from '@/lib/actions/changePassword';
import ErrorText from '@/components/ui/error-text';

export default function PasswordChangeForm() {
  const [state, formAction, isPending] = useActionState(changePassword, {
    success: false,
    errors: {},
  });

  return (
    <>
      <Card className="h-fit w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>
            <h1>パスワード変更</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex flex-col gap-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="currentPassword">
                  現在のパスワード
                </FieldLabel>
                <InputPassword id="currentPassword" name="currentPassword" />
                {state.errors.currentPassword && (
                  <ErrorText>
                    {state.errors.currentPassword.join(',')}
                  </ErrorText>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">新しいパスワード</FieldLabel>
                <InputPassword id="password" name="password" />
                {state.errors.password && (
                  <ErrorText>{state.errors.password.join(',')}</ErrorText>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  新しいパスワード（確認）
                </FieldLabel>
                <InputPassword id="confirmPassword" name="confirmPassword" />
                {state.errors.confirmPassword && (
                  <ErrorText>
                    {state.errors.confirmPassword.join(',')}
                  </ErrorText>
                )}
              </Field>

              <Field>
                <div className="text-center">
                  <Button type="submit" size="lg">
                    パスワードを変更する
                  </Button>
                </div>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {isPending && <LoadingUI />}
    </>
  );
}
