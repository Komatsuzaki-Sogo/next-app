'use client';

import { Trash2 } from '@deemlol/next-icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

type DeletePostProps = {
  title: string;
  onDelete: () => void;
};

export default function DeletePostDialog({ title, onDelete }: DeletePostProps) {
  return (
    // <AlertDialog>
    //   <AlertDialogContent>
    //     <AlertDialogHeader>
    //       <AlertDialogTitle>{title}の削除</AlertDialogTitle>
    //       <AlertDialogDescription>
    //         こちらのコンテンツを本当に削除してもよろしいですか？
    //         <br />
    //         こちら操作は取り消せません。
    //       </AlertDialogDescription>
    //     </AlertDialogHeader>
    //     <AlertDialogFooter>
    //       <AlertDialogCancel>キャンセル</AlertDialogCancel>
    //       <AlertDialogAction
    //         onClick={onDelete}
    //         className="bg-red-500 hover:bg-red-600"
    //       >
    //         削除する
    //       </AlertDialogAction>
    //     </AlertDialogFooter>
    //   </AlertDialogContent>
    // </AlertDialog>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="delete">
          <Trash2 className="text-destructive size-6" />
        </Button>
      </AlertDialogTrigger>
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
