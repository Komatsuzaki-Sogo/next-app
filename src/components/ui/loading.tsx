import React from 'react';

export function LoadingUI() {
  return (
    <div className="fixed inset-0 z-[100] bg-black/40 w-screen h-screen flex items-center justify-center">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"
        title="loading"
      />
    </div>
  );
}
