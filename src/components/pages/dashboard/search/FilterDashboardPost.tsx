'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, RotateCcw } from '@deemlol/next-icons';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { TextError } from '@/components/ui/text-error';

type FilterDashboardPostProps = {
  keywordProps?: string;
  startDateProps?: string;
  endDateProps?: string;
};

export function FilterDashboardPost({
  keywordProps,
  startDateProps,
  endDateProps,
}: FilterDashboardPostProps) {
  const [search, setSearch] = useState(keywordProps || '');
  const [startDate, setStartDate] = useState(startDateProps || '');
  const [endDate, setEndDate] = useState(endDateProps || '');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = () => {
    const trimmedKeyword = search.trim();
    setError(null);

    if (!trimmedKeyword && !startDate && !endDate) {
      setError('検索キーワード、または検索期間を入力してください。');
      return;
    }

    if ((startDate && !endDate) || (!startDate && endDate)) {
      setError(
        '期間で検索する場合は、開始日と終了日の両方を入力してください。',
      );
      return;
    }

    if (startDate && endDate && startDate > endDate) {
      setError('開始日は終了日より前の日付を選択してください。');
      return;
    }

    const params = new URLSearchParams();
    if (trimmedKeyword) params.append('keyword', trimmedKeyword);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const queryString = params.toString();
    router.push(`/dashboard/search/?${queryString}`);
  };

  const handleClear = () => {
    setSearch('');
    setStartDate('');
    setEndDate('');
    setError(null);
    router.push('/dashboard/search');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>検索フィルター</CardTitle>
      </CardHeader>

      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="keyword">検索キーワード</FieldLabel>
            <Input
              id="keyword"
              placeholder="スペースで区切って複数キーワードを検索できます。"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
          </Field>

          <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-end">
            <Field className="flex-1">
              <FieldLabel htmlFor="startDate">開始日</FieldLabel>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Field>
            <span className="block h-fit md:pb-2">～</span>
            <Field className="flex-1">
              <FieldLabel htmlFor="endDate">終了日</FieldLabel>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Field>
          </div>
        </FieldGroup>

        <ButtonGroup>
          <ButtonGroup marginTop="none">
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={handleClear}
            >
              <RotateCcw size={20} />
              クリア
            </Button>
          </ButtonGroup>
          <ButtonGroup marginTop="none">
            <Button type="button" size="lg" onClick={handleSearch}>
              <Search size={20} />
              検索
            </Button>
          </ButtonGroup>
        </ButtonGroup>

        {error && <TextError className="mt-4">{error}</TextError>}
      </CardContent>
    </Card>
  );
}
