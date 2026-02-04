export default function PublicFooter() {
  return (
    <footer className="border-b h-(--footer-height) flex items-center">
      <div className="w-full mx-auto px-4 flex items-center justify-between max-w-(--section-width)">
        <small className="block w-full  text-xs text-muted-foreground tracking-wide text-center">
          Copyright &copy; ○○○○○○○○ All Rights Reserved.
        </small>
      </div>
    </footer>
  );
}
