import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/* ---------- wrapper ---------- */
const textWrapper = cva(
  'w-full flex flex-col gap-4 text-balance text-base text-foreground mt-6 md:mt-8',
  {
    variants: {
      center: {
        true: 'items-center text-center',
        false: '',
      },
    },
    defaultVariants: {
      center: false,
    },
  },
);

type TextProps = {
  children: React.ReactNode;
} & VariantProps<typeof textWrapper>;

export function TextBase({ children, center }: TextProps) {
  return <div className={cn(textWrapper({ center }))}>{children}</div>;
}
