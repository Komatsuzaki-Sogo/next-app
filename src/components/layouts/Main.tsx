import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const commonSectionVariants = cva('[grid-area:main] m-0 w-full reset-margin', {
  variants: {},
  defaultVariants: {},
});

type MainProps = React.ComponentPropsWithoutRef<'main'> &
  VariantProps<typeof commonSectionVariants>;

export function Main({ children, className, ...props }: MainProps) {
  return (
    <main className={cn(commonSectionVariants(), className)} {...props}>
      {children}
    </main>
  );
}
