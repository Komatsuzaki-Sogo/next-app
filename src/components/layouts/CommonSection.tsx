import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const containerVariants = cva(
  'grid grid-cols-[1fr_minmax(270px,var(--section-width))_1fr] w-full gap-x-4 md:gap-x-8',
  {
    variants: {
      fullHeight: {
        true: 'h-full',
        false: '',
      },
      width: {
        default: 'grid-cols-[1fr_minmax(270px,var(--section-width))_1fr]',
        narrow: 'grid-cols-[1fr_minmax(270px,var(--container-md))_1fr]',
      },
    },
    defaultVariants: {
      fullHeight: false,
      width: 'default',
    },
  },
);

const contentVariants = cva('col-start-2 col-end-3 reset-margin', {
  variants: {
    py: {
      default: 'py-6 md:py-8',
      sm: 'py-4 md:py-6',
      lg: 'py-8 md:py-10',
      none: 'py-0',
    },
    fullHeight: {
      true: 'h-full',
      false: '',
    },
  },
  defaultVariants: {
    py: 'default',
    fullHeight: false,
  },
});

type CommonSectionProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof containerVariants> &
  VariantProps<typeof contentVariants>;

export function CommonSection({
  children,
  py,
  fullHeight,
  width,
  className,
  ...props
}: CommonSectionProps) {
  return (
    <div
      className={cn(containerVariants({ fullHeight, width }), className)}
      {...props}
    >
      <div className={contentVariants({ py, fullHeight })}>{children}</div>
    </div>
  );
}
