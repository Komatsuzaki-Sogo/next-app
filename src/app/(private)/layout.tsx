import { PublicFooter } from '@/components/layouts/PublicFooter';
import { PrivateHeader } from '@/components/layouts/PrivateHeader';
import { Main } from '@/components/layouts/Main';
import { WrapLayout } from '@/components/layouts/WrapLayout';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WrapLayout>
      <PrivateHeader />
      <Main>{children}</Main>
      <PublicFooter />
    </WrapLayout>
  );
}
