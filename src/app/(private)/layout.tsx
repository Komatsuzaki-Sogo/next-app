import { PublicFooter } from '@/components/layouts/PublicFooter';
import { PrivateHeader } from '@/components/layouts/PrivateHeader';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PrivateHeader />
      {children}
      <PublicFooter />
    </>
  );
}
