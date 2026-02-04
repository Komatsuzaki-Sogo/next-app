export default function ErrorText({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <p className="text-red-500 text-sm">
      <strong>{children}</strong>
    </p>
  );
}
