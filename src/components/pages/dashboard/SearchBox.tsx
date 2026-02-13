'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import { Search } from '@deemlol/next-icons';

export function SearchBox() {
  // search
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const value = search.trim();

    if (value) {
      router.push(`/dashboard/?search=${encodeURIComponent(value)}`);
    }
  };
  return (
    <ButtonGroup>
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <Button variant="outline" aria-label="Search" onClick={handleSearch}>
        <Search size={20} />
      </Button>
    </ButtonGroup>
  );
}
