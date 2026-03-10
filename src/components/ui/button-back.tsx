'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftCircle } from '@deemlol/next-icons';
import { Button } from '@/components/ui/button';

type ButtonBackProps = {
  fallbackPath?: 'dashboard' | 'user';
  label?: string;
  variant?: 'ghost' | 'outline' | 'link' | 'default';
};

export function ButtonBack({
  fallbackPath,
  label = '戻る',
  variant = 'outline',
}: ButtonBackProps) {
  const router = useRouter();

  const handleBack = () => {
    const hasHistory =
      typeof window !== 'undefined' &&
      document.referrer.includes(window.location.host);

    if (hasHistory) {
      router.back();
      return;
    }

    const pathMap = {
      dashboard: '/dashboard',
      user: '/user',
    };

    const destination = (fallbackPath && pathMap[fallbackPath]) ?? '/';
    router.push(destination);
  };

  return (
    <div className="mt-6 md:mt-8">
      <Button variant={variant} onClick={handleBack}>
        <ArrowLeftCircle />
        <span>{label}</span>
      </Button>
    </div>
  );
}
