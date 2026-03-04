export function WrapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen [grid-template-areas:'header'_'main'_'footer'] grid-rows-[auto_1fr_auto]">
      {children}
    </div>
  );
}
