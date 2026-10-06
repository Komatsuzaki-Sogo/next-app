'use client';

import { useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoadingUI } from '@/components/ui/loading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { InputPassword } from '@/components/ui/input-password';
import { TextError } from '@/components/ui/text-error';
import { Badge } from '@/components/ui/badge';
import { ButtonGroup } from '@/components/ui/button-group';
import { Switch } from '@/components/ui/switch';
import {
  createPost,
  type CreatePostState,
} from '@/lib/actions/post/createPost';
import { createPostSchema } from '@/validations/post';

type PostField = 'title' | 'userName' | 'email' | 'password';
type ClientErrors = Partial<Record<PostField, string>>;

const initialState: CreatePostState = { success: false, errors: {} };

export function CreateDashboardPost() {
  const [state, formAction, isPending] = useActionState(
    createPost,
    initialState,
  );
  const [form, setForm] = useState({
    title: '',
    userName: '',
    email: '',
    password: '',
  });
  const [shared, setShared] = useState(false);
  const [clientErrors, setClientErrors] = useState<ClientErrors>({});

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (!['title', 'userName', 'email', 'password'].includes(name)) {
      return;
    }

    const field = name as PostField;
    const validation = createPostSchema.safeParse({
      ...form,
      [field]: value,
      shared,
    });
    const message = validation.success
      ? undefined
      : validation.error.flatten().fieldErrors[field]?.[0];

    setClientErrors((previous) => ({ ...previous, [field]: message }));
  };

  const submit = (formData: FormData) => {
    const validation = createPostSchema.safeParse({ ...form, shared });
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      setClientErrors({
        title: errors.title?.[0],
        userName: errors.userName?.[0],
        email: errors.email?.[0],
        password: errors.password?.[0],
      });
      return;
    }

    formData.set('shared', String(shared));
    formAction(formData);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1>新規作成</h1>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form action={submit} className="flex flex-col gap-6">
            <FieldGroup>
              {state.errors.form && (
                <TextError>{state.errors.form.join(', ')}</TextError>
              )}
              <Field>
                <FieldLabel htmlFor="title">
                  タイトル<Badge variant="required">必須</Badge>
                </FieldLabel>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="タイトルを入力"
                  required
                  value={form.title}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      title: event.target.value,
                    }))
                  }
                  onBlur={handleBlur}
                />
                {(clientErrors.title || state.errors.title?.[0]) && (
                  <TextError>
                    {clientErrors.title || state.errors.title?.[0]}
                  </TextError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="userName">ユーザーID</FieldLabel>
                <Input
                  id="userName"
                  type="text"
                  name="userName"
                  placeholder="ユーザーIDを入力"
                  value={form.userName}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      userName: event.target.value,
                    }))
                  }
                  onBlur={handleBlur}
                />
                {(clientErrors.userName || state.errors.userName?.[0]) && (
                  <TextError>
                    {clientErrors.userName || state.errors.userName?.[0]}
                  </TextError>
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
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      email: event.target.value,
                    }))
                  }
                  onBlur={handleBlur}
                />
                {(clientErrors.email || state.errors.email?.[0]) && (
                  <TextError>
                    {clientErrors.email || state.errors.email?.[0]}
                  </TextError>
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
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      password: event.target.value,
                    }))
                  }
                  handleBlur={handleBlur}
                />
                {(clientErrors.password || state.errors.password?.[0]) && (
                  <TextError>
                    {clientErrors.password || state.errors.password?.[0]}
                  </TextError>
                )}
              </Field>

              <Field className="gap-1">
                <div className="flex items-center gap-2">
                  <FieldLabel htmlFor="shared">共有可否</FieldLabel>
                  <Switch
                    id="shared"
                    name="shared"
                    checked={shared}
                    onCheckedChange={setShared}
                  />
                </div>
                <FieldDescription>
                  オンにすると、URLを知っている方が内容を閲覧できるようになります。
                </FieldDescription>
              </Field>

              <Field>
                <ButtonGroup marginTop="none">
                  <Button type="submit" size="lg" disabled={isPending}>
                    新規作成
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
