import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '会員登録 | パスワード管理アプリ',
  description: 'パスワード管理アプリの会員登録ページです。',
};

import { CommonSection } from '@/components/layouts/CommonSection';
import { SignupForm } from '@/components/pages/auth/SignupForm';

export default function SignupPage() {
  return (
    <CommonSection fullHeight>
      <div className="flex flex-col justify-center h-full">
        <SignupForm />
      </div>
    </CommonSection>
  );
}
