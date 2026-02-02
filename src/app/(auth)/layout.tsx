import PublicHeader from '@/components/layouts/PublicHeader';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicHeader />
      <div className="min-h-screen flex items-center justify-center p-4">
        {children}
      </div>
    </>
  );
}
