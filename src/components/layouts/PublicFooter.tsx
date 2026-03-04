import { CommonSection } from '@/components/layouts/CommonSection';

export function PublicFooter() {
  return (
    <footer className="[grid-area:footer] h-(--footer-height) w-full">
      <CommonSection py="none" fullHeight>
        <div className="flex flex-col justify-center h-full">
          <small className="block w-full text-xs text-muted-foreground tracking-wide text-center">
            Copyright &copy; ○○○○○○○○ All Rights Reserved.
          </small>
        </div>
      </CommonSection>
    </footer>
  );
}
