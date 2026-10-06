import type { Metadata } from 'next';
import Link from 'next/link';
import { KeyRound, Search, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { CommonSection } from '@/components/layouts/CommonSection';
import { HeadingLevel01 } from '@/components/ui/heading-level01';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'パスワード管理アプリ',
  description:
    'Webサービスのログイン情報をまとめて管理。必要な情報を検索し、共有設定も行えます。',
};

const features = [
  {
    icon: KeyRound,
    title: 'ログイン情報をまとめて管理',
    description:
      'サービス名、ユーザーID、メールアドレス、パスワードをひとつの場所に記録できます。',
    tone: 'text-indigo-700 bg-indigo-50',
  },
  {
    icon: Search,
    title: '必要な情報をすばやく検索',
    description:
      'タイトルや登録情報から検索。保存した情報を一覧からすぐに見つけられます。',
    tone: 'text-blue-700 bg-blue-50',
  },
  {
    icon: Share2,
    title: '共有する情報を自分で設定',
    description:
      '共有を有効にした情報は、専用URLから閲覧できます。共有のオン・オフはいつでも変更できます。',
    tone: 'text-amber-700 bg-amber-50',
  },
];

export default async function HomePage() {
  const session = await auth();

  return (
    <>
      <CommonSection>
        <div className="flex flex-col-reverse gap-2">
          <HeadingLevel01
            align="left"
            size="lg"
            className="gap-4 md:gap-5 pb-0 text-left!"
            subText="WebサービスのユーザーIDやパスワードをまとめて管理。必要なときに探しやすく、共有範囲も自分で決められます。"
          >
            パスワード管理を、シンプルに。
          </HeadingLevel01>
          <p className="mb-4 text-sm font-semibold text-indigo-700">
            毎日のログイン情報を、すっきり整理
          </p>
        </div>
        {!session?.user?.email && (
          <ButtonGroup
            marginTop="none"
            justifyCenter="none"
            className="flex-wrap pt-6 "
          >
            <Button size="lg" asChild>
              <Link href="/signup">アカウントを作成</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">ログイン</Link>
            </Button>
          </ButtonGroup>
        )}
        <h2 className="mt-10 mb-6 text-lg font-semibold text-foreground md:mt-15 md:mb-8">
          必要な情報を、必要な形で
        </h2>
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {features.map(({ icon: Icon, title, description, tone }) => (
            <article key={title} className="border-t border-gray-300 pt-4">
              <div
                className={`mb-4 flex size-10 items-center justify-center rounded-md ${tone}`}
                aria-hidden="true"
              >
                <Icon className="size-5" />
              </div>
              <h3 className="mb-2 font-semibold">{title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </CommonSection>
    </>
  );
}
