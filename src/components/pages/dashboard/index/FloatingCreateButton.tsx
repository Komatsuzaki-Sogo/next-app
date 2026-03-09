'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlusCircle } from '@deemlol/next-icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function FloatingCreateButton({ targetId }: { targetId: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    if (target) observer.observe(target);

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.innerHeight + window.scrollY;
      setIsAtBottom(scrollHeight - scrollPosition < 72);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [targetId]);

  const isActive = isVisible && !isAtBottom;

  return (
    <div
      className={cn(
        'w-fit fixed bottom-4 right-4 md:right-8 z-50 transition-all duration-300 ease-in-out',
        'min-[965px]:left-[calc(50%+(var(--section-width)/2)-40px)] min-[965px]:right-auto',
        isActive
          ? 'visible opacity-100'
          : 'invisible opacity-0 pointer-events-none',
      )}
    >
      <Button size="icon-lg" rounded="full" aria-label="新規作成" asChild>
        <Link href="/dashboard/create">
          <PlusCircle className="size-6" />
        </Link>
      </Button>
    </div>
  );
}
