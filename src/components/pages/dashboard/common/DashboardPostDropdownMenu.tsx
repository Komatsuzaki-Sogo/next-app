'use client';

import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';
import { LoadingUI } from '@/components/ui/loading';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DeleteDashboardPostDialog } from './DeleteDashboardPostDialog';
import { MoreVertical, Share, Edit, Trash2 } from '@deemlol/next-icons';
import { Button } from '@/components/ui/button';
import type { PostCardProps } from '@/types/post';
import { deletePost } from '@/lib/actions/post/deletePost';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function DashboardPostDropdownMenu({ post }: PostCardProps) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [deleteResult, setDeleteResult] = useState<'success' | 'error' | null>(
    null,
  );

  useEffect(() => {
    if (isPending || !deleteResult) {
      return;
    }

    if (deleteResult === 'success') {
      router.push('/dashboard');
      toast.success('投稿を削除しました。');
    } else {
      toast.error('投稿の削除に失敗しました。');
    }

    setDeleteResult(null);
  }, [deleteResult, isPending, router]);

  const handleDeleteDialogChange = (open: boolean) => {
    setShowDeleteDialog(open);
    if (!open) {
      setIsDropdownOpen(false);
    }
  };

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const deleted = await deletePost(post.id);
        if (!deleted) {
          setDeleteResult('error');
          return;
        }

        setShowDeleteDialog(false);
        setDeleteResult('success');
      } catch {
        setDeleteResult('error');
      }
    });
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="more options">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20">
          {post.shared && (
            <DropdownMenuItem className="text-primary" asChild>
              <Link href={`/share/${post.id}`} target="_blank">
                <Share className="text-primary" />
                <span>共有</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="text-primary" asChild>
            <Link href={`/dashboard/${post.id}/edit`}>
              <Edit className="text-primary" />
              <span>編集</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button
              type="button"
              className="w-full text-destructive hover:text-destructive"
              onSelect={() => {
                setIsDropdownOpen(false);
                setShowDeleteDialog(true);
              }}
              onClick={() => {
                setIsDropdownOpen(false);
                setShowDeleteDialog(true);
              }}
            >
              <Trash2 className="text-destructive" />
              <span className="text-destructive">削除</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showDeleteDialog && (
        <DeleteDashboardPostDialog
          isOpen={showDeleteDialog}
          title={post.title}
          onOpenChange={handleDeleteDialogChange}
          onDelete={handleDelete}
        />
      )}
      {isPending && <LoadingUI />}
    </>
  );
}
