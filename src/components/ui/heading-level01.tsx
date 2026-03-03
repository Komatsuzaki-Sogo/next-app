import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/* ---------- wrapper ---------- */
const headingWrapper = cva(
  'flex flex-col items-center gap-2 text-center pb-10 headingResetMargin md:gap-4',
);

/* ---------- h1 ---------- */
const headingTitle = cva(
  'max-w-4xl text-balance text-3xl font-bold leading-tight tracking-tight text-primary md:text-5xl md:leading-[1.1]',
);

/* ---------- sub text ---------- */
const headingSubText = cva(
  'max-w-4xl text-balance text-base text-foreground sm:text-lg',
);

type HeadingProps = {
  children: React.ReactNode;
  subText?: string;
};

export function HeadingLevel01({ children, subText }: HeadingProps) {
  return (
    <div className={cn(headingWrapper())}>
      <h1 className={cn(headingTitle())}>{children}</h1>
      {subText && <p className={cn(headingSubText())}>{subText}</p>}
    </div>
  );
}
