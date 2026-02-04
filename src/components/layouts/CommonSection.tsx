import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const commonSectionVariants = cva(
  'min-h-[calc(100dvh-var(--header-height)-var(--footer-height))] px-4 mx-auto max-w-[var(--section-width)] py-6 md:py-10',
  {
    variants: {
      center: {
        true: 'flex flex-col justify-center',
        false: '',
      },
    },
    defaultVariants: {
      center: false,
    },
  },
);

type CommonSectionProps = {
  children: React.ReactNode;
} & VariantProps<typeof commonSectionVariants>;

export default function CommonSection({
  children,
  center,
}: CommonSectionProps) {
  return (
    <main className={cn(commonSectionVariants({ center }))}>{children}</main>
  );
}
