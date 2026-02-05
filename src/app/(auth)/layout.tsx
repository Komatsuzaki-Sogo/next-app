import { PublicFooter } from '@/components/layouts/PublicFooter';
import { PublicHeader } from '@/components/layouts/PublicHeader';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicHeader />
      {children}
      <PublicFooter />
    </>
  );
}
