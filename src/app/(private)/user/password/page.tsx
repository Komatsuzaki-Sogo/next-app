import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'パスワード変更 | ユーザー情報 | パスワード管理アプリ',
  description: 'パスワード管理アプリのユーザー情報のパスワード変更ページです。',
};

import { PasswordChangeForm } from '@/components/pages/user/PasswordChangeForm';
import { CommonSection } from '@/components/layouts/CommonSection';

export default function PasswordPage() {
  return (
    <CommonSection>
      <PasswordChangeForm />
    </CommonSection>
  );
}
