export default function ErrorText({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <p className="text-red-500 text-sm">
      <strong className="font-normal">{children}</strong>
    </p>
  );
}
