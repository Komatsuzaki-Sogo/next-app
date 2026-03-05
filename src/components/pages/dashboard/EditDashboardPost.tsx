'use client';

import { useState, useActionState, useEffect } from 'react';
import type { PostCardProps } from '@/types/post';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoadingUI } from '../../ui/loading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputPassword } from '@/components/ui/input-password';
import { TextError } from '@/components/ui/text-error';
import { Badge } from '@/components/ui/badge';
import { ButtonGroup } from '@/components/ui/button-group';

export function EditDashboardPost({ post }: PostCardProps) {
  const [title, setTitle] = useState(post.title);
  const [userName, setUserName] = useState(post.userName);
  const [email, setEmail] = useState(post.email);
  const [password, setPassword] = useState(post.password);

  return (
    <>
      <Card className="h-fit w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>
            <h1>コンテンツの編集</h1>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">
                  タイトル<Badge variant="required">必須</Badge>
                </FieldLabel>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="タイトルを入力"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="username">ユーザーID</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="ユーザーIDを入力"
                  value={userName ?? ''}
                  onChange={(e) => setUserName(e.target.value)}
                />
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">
                  パスワード<Badge variant="required">必須</Badge>
                </FieldLabel>
                <InputPassword
                  id="password"
                  name="password"
                  placeholder="パスワードを入力"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <ButtonGroup marginTop="none">
                  <Button type="submit" size="lg">
                    編集を保存する
                  </Button>
                </ButtonGroup>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {/* {isPending && <LoadingUI />} */}
    </>
  );
}
