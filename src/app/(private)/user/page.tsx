import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'ユーザー情報 | パスワード管理アプリ',
  description: 'パスワード管理アプリのユーザー情報ページです。',
};

import { CommonSection } from '@/components/layouts/CommonSection';
import { UserInfo } from '@/components/pages/user/UserInfo';

export default function UserPage() {
  return (
    <CommonSection>
      <UserInfo />
    </CommonSection>
  );
}
