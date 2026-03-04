import { PublicFooter } from '@/components/layouts/PublicFooter';
import { PublicHeader } from '@/components/layouts/PublicHeader';
import { Main } from '@/components/layouts/Main';
import { WrapLayout } from '@/components/layouts/WrapLayout';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WrapLayout>
      <PublicHeader />
      <Main>{children}</Main>
      <PublicFooter />
    </WrapLayout>
  );
}
