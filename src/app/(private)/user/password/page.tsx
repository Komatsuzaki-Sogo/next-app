import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'パスワード変更 | ユーザー情報 | パスワード管理アプリ',
  description: 'パスワード管理アプリのユーザー情報のパスワード変更ページです。',
};

import { PasswordChangeForm } from '@/components/pages/user/password/PasswordChangeForm';
import { CommonSection } from '@/components/layouts/CommonSection';
import { ButtonBack } from '@/components/ui/button-back';

export default function PasswordPage() {
  return (
    <CommonSection width="narrow">
      <PasswordChangeForm />
      <ButtonBack fallbackPath="user" />
    </CommonSection>
  );
}
