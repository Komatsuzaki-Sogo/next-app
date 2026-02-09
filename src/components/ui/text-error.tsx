import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/* ---------- text ---------- */
const textWrapper = cva('text-red-500 text-sm');

/* ---------- strong ---------- */
const textStrong = cva('font-normal');

type TextProps = {
  children: React.ReactNode;
};

export function TextError({ children }: TextProps) {
  return (
    <p className={cn(textWrapper())}>
      <strong className={cn(textStrong())}>{children}</strong>
    </p>
  );
}
