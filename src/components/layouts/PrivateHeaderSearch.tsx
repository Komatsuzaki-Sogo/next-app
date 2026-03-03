'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from '@deemlol/next-icons';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';

type SearchBoxProps = {
  onSearch?: () => void;
};

export function PrivateHeaderSearch({ onSearch }: SearchBoxProps) {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const value = search.trim();

    if (value) {
      router.push(`/dashboard/search/?search=${encodeURIComponent(value)}`);
      onSearch?.();
    }

    setSearch('');
  };

  return (
    <ButtonGroup className="w-full mt-0! md:min-width-100">
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
          }
        }}
      />
      <Button
        type="button"
        variant="outline"
        aria-label="Search"
        onClick={handleSearch}
      >
        <Search size={20} />
      </Button>
    </ButtonGroup>
  );
}
