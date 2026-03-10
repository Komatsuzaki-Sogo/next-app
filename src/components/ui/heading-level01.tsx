import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/* ---------- wrapper ---------- */
const headingWrapper = cva(
  'flex flex-col gap-2 pb-10 headingResetMargin md:gap-4',
  {
    variants: {
      align: {
        center: 'items-center text-center',
        left: 'items-center text-center md:items-start md:text-left',
      },
    },
    defaultVariants: {
      align: 'center',
    },
  },
);

/* ---------- h1 ---------- */
const headingTitle = cva(
  'text-balance font-bold leading-tight tracking-tight text-primary md:leading-[1.1]',
  {
    variants: {
      size: {
        default: 'text-3xl md:text-4xl',
        sm: 'text-2xl md:text-3xl',
        lg: 'text-4xl md:text-5xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

/* ---------- sub text ---------- */
const headingSubText = cva(
  'max-w-4xl text-balance text-base text-foreground sm:text-lg',
);

type HeadingVariants = VariantProps<typeof headingWrapper> &
  VariantProps<typeof headingTitle>;

type HeadingProps = HeadingVariants & {
  children: React.ReactNode;
  subText?: string;
  className?: string;
};

export function HeadingLevel01({
  children,
  subText,
  align,
  size,
  className,
}: HeadingProps) {
  return (
    <div className={cn(headingWrapper({ align }), className)}>
      <h1 className={cn(headingTitle({ size }))}>{children}</h1>
      {subText && <p className={cn(headingSubText())}>{subText}</p>}
    </div>
  );
}
