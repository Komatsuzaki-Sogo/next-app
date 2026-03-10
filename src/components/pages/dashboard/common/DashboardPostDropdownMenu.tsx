'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
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

export function DashboardPostDropdownMenu({ post }: PostCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteDialogChange = (open: boolean) => {
    setShowDeleteDialog(open);
    if (!open) {
      setIsDropdownOpen(false);
    }
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
          {/* {post.shared && (
            <DropdownMenuItem className="text-primary" asChild>
              <Link href={`/share/${post.id}`} target="_blank">
                <Share className="text-primary" />
                <span>共有</span>
              </Link>
            </DropdownMenuItem>
          )} */}
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
          onDelete={() =>
            startTransition(() => {
              console.log('Delete post', post.id);
            })
          }
        />
      )}
      {isPending && <LoadingUI />}
    </>
  );
}
