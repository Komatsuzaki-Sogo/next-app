import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/* ---------- text ---------- */
const textWrapper = cva('text-red-500 text-sm');

/* ---------- strong ---------- */
const textStrong = cva('font-normal');

type TextProps = {
  children: React.ReactNode;
  className?: string;
};

export function TextError({ children, className }: TextProps) {
  return (
    <p className={cn(textWrapper(), className)}>
      <strong className={cn(textStrong())}>{children}</strong>
    </p>
  );
}
