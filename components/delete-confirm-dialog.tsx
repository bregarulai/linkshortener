"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Link {
  id: number;
  shortCode: string;
  originalUrl: string;
}

interface DeleteConfirmDialogProps {
  link: Link | null;
  open: boolean;
  onClose: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
}

export function DeleteConfirmDialog({ link, open, onClose, onConfirm, isLoading }: DeleteConfirmDialogProps) {
  const handleCancel = () => onClose(false);
  const handleConfirm = async () => {
    await onConfirm();
  };

  if (!link) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Link</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this link? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <p className="text-sm font-medium">/{link.shortCode}</p>
          <p className="text-sm text-muted-foreground break-all">{link.originalUrl}</p>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
