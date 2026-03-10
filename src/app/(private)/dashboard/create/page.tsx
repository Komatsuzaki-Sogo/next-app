import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '新規作成 | ダッシュボード | パスワード管理アプリ',
  description: 'パスワード管理アプリのダッシュボードの新規作成ページです。',
};

import { CommonSection } from '@/components/layouts/CommonSection';
import { CreateDashboardPost } from '@/components/pages/dashboard/create/CreateDashboardPost';
import { ButtonBack } from '@/components/ui/button-back';

export default function CreatePage() {
  return (
    <CommonSection width="narrow">
      <CreateDashboardPost />
      <ButtonBack fallbackPath="dashboard" />
    </CommonSection>
  );
}
