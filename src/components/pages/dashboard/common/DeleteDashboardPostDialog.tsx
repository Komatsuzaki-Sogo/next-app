'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type DeletePostProps = {
  isOpen: boolean;
  title: string;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
};

export function DeleteDashboardPostDialog({
  isOpen,
  title,
  onOpenChange,
  onDelete,
}: DeletePostProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}の削除</AlertDialogTitle>
          <AlertDialogDescription>
            こちらのコンテンツを本当に削除してもよろしいですか？
            <br />
            こちら操作は取り消せません。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>削除する</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
