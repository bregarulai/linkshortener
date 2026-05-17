"use client";

import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Link {
  id: number;
  originalUrl: string;
  shortCode: string;
}

interface EditLinkDialogProps {
  link: Link | null;
  open: boolean;
  onClose: (open: boolean) => void;
  onSave: (url: string, shortCode: string) => Promise<void>;
}

export function EditLinkDialog({ link, open, onClose, onSave }: EditLinkDialogProps) {
  const [editUrl, setEditUrl] = useState("");
  const [editShortCode, setEditShortCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sync form values when link prop changes
  useEffect(() => {
    if (link) {
      setEditUrl(link.originalUrl);
      setEditShortCode(link.shortCode);
    }
  }, [link]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setEditUrl("");
      setEditShortCode("");
    }
  }, [open]);

  const handleSave = async () => {
    if (!link) return;
    setIsLoading(true);
    try {
      await onSave(editUrl, editShortCode);
    } finally {
      setIsLoading(false);
    }
  };

  if (!link) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>
            Update the URL or custom short code for this link.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-originalUrl">Destination URL</Label>
            <Input
              id="edit-originalUrl"
              type="url"
              value={editUrl}
              onChange={(e) => setEditUrl(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-shortCode">
              Custom short link{" "}
              <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <div className="flex gap-2">
              <span className="flex items-center px-3 py-2 text-sm text-muted-foreground border border-r-0 border-input rounded-l-md bg-muted">
                /
              </span>
              <Input
                id="edit-shortCode"
                type="text"
                placeholder="short-link"
                value={editShortCode}
                onChange={(e) => setEditShortCode(e.target.value)}
                className="rounded-l-none"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={isLoading || !editUrl.trim()}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
