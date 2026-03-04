import Link from 'next/link';
import { House } from '@deemlol/next-icons';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { CommonSection } from '@/components/layouts/CommonSection';

export function PublicHeader() {
  return (
    <header className="[grid-area:header] h-(--header-height) flex items-center bg-background sticky top-0 z-100">
      <CommonSection py="none" fullHeight>
        <div className="flex items-center justify-between h-full">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <House
                className="size-7"
                color="var(--foreground)"
                xlinkTitle="サイトトップ"
              />
            </Link>
          </Button>

          <ButtonGroup marginTop="none" justifyCenter="none">
            <ButtonGroup marginTop="none" justifyCenter="none">
              <Button variant="outline" asChild>
                <Link href="/login">ログイン</Link>
              </Button>
            </ButtonGroup>
            <ButtonGroup marginTop="none" justifyCenter="none">
              <Button asChild>
                <Link href="/signup">サインアップ</Link>
              </Button>
            </ButtonGroup>
          </ButtonGroup>
        </div>
      </CommonSection>
    </header>
  );
}
