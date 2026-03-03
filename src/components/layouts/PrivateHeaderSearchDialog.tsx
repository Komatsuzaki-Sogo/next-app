'use client';

import { useState } from 'react';
import { Search } from '@deemlol/next-icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PrivateHeaderSearch } from '@/components/layouts/PrivateHeaderSearch';

export function PrivateHeaderSearchDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex flex-row items-center gap-2"
        >
          <Search className="size-5" />
          <span className="hidden md:block">Search</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            登録されているコンテンツを検索します。キーワードを入力してEnterキーを押してください。
          </DialogDescription>
        </DialogHeader>

        <PrivateHeaderSearch onSearch={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
