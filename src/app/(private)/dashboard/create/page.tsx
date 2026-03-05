import { CommonSection } from '@/components/layouts/CommonSection';
import { CreateDashboardPost } from '@/components/pages/dashboard/CreateDashboardPost';
import { HeadingLevel01 } from '@/components/ui/heading-level01';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '新規作成 | ダッシュボード | パスワード管理アプリ',
  description: 'パスワード管理アプリのダッシュボードの新規作成ページです。',
};

export default function CreatePage() {
  return (
    <CommonSection>
      <CreateDashboardPost />
    </CommonSection>
  );
}
