export default function SuccessText({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <p className="text-green-500 text-sm">
      <strong className="font-normal">{children}</strong>
    </p>
  );
}
