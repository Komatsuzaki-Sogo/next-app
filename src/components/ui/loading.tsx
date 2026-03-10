import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingUI() {
  return (
    <div className="fixed inset-0 z-[100] bg-black/40 w-screen h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-white size-12" />
    </div>
  );
}
