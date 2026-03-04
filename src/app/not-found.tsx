import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '404 - Not Found',
  description: '404 - Not Found',
};
import Link from 'next/link';
import { auth } from '@/auth';
import { CommonSection } from '@/components/layouts/CommonSection';
import { PublicFooter } from '@/components/layouts/PublicFooter';
import { PublicHeader } from '@/components/layouts/PublicHeader';
import { PrivateHeader } from '@/components/layouts/PrivateHeader';
import { HeadingLevel01 } from '@/components/ui/heading-level01';
import { TextBase } from '@/components/ui/text-base';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { WrapLayout } from '@/components/layouts/WrapLayout';
import { Main } from '@/components/layouts/Main';

export default async function NotFound() {
  const session = await auth();
  return (
    <WrapLayout>
      {session?.user?.email ? <PrivateHeader /> : <PublicHeader />}
      <Main>
        <CommonSection fullHeight>
          <HeadingLevel01 subText="404">Not Found</HeadingLevel01>
          <TextBase center>
            <p>
              大変申し訳ございません。
              <br />
              アクセスされたページは、移動または削除された可能性があります。
              <br />
              お手数をお掛けしますが、ページ右上のメニューからサイト内検索をご利用いただくか、
              <br />
              以下のメニューよりトップページへお戻りください。
            </p>
          </TextBase>

          <ButtonGroup>
            <Button asChild>
              <Link href="/">トップページに戻る</Link>
            </Button>
          </ButtonGroup>
        </CommonSection>
      </Main>
      <PublicFooter />
    </WrapLayout>
  );
}
