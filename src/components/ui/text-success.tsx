import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/* ---------- text ---------- */
const textWrapper = cva('text-green-500 text-sm');

/* ---------- strong ---------- */
const textStrong = cva('font-normal');

type TextProps = {
  children: React.ReactNode;
  className?: string;
};

export function TextSuccess({ children, className }: TextProps) {
  return (
    <p className={cn(textWrapper(), className)}>
      <strong className={cn(textStrong())}>{children}</strong>
    </p>
  );
}
