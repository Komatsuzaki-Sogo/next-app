'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Plus } from '@deemlol/next-icons';

type Props = {
  name: string;
  profileImage: string | null;
};

export function EditUserForm({ name, profileImage }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(profileImage);
  const [userName, setUserName] = useState(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <form className="flex flex-col gap-4">
      {/* プロフィール画像 */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative h-25 w-25">
          <Image
            src={previewUrl ?? '/img/avatar-placeholder.png'}
            alt="プロフィール画像"
            fill
            className="rounded-full object-cover"
          />

          <label
            htmlFor="profileImage"
            className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            <Plus size={20} />
          </label>
        </div>

        <input
          id="profileImage"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {/* ユーザー名 */}
      <Input value={userName} onChange={(e) => setUserName(e.target.value)} />

      {/* ボタン */}
      <div className="flex justify-end gap-2">
        <Button type="submit">保存</Button>
      </div>
    </form>
  );
}
