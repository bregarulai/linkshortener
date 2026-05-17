"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ExternalLink, Link2, Edit3, Trash2 } from "lucide-react";
import { CreateLinkDialog } from "@/components/create-link-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateLinkAction, deleteLinkAction } from "./actions";

interface Link {
  id: number;
  userId: string;
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DashboardClientProps {
  initialLinks: Link[];
}

export function DashboardClient({ initialLinks }: DashboardClientProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [links, setLinks] = useState<Link[]>(initialLinks);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [deletingLink, setDeletingLink] = useState<Link | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editUrl, setEditUrl] = useState("");
  const [editShortCode, setEditShortCode] = useState("");

  const handleCreated = useCallback(() => {
    window.location.reload();
  }, []);

  const handleEditLink = (link: Link) => {
    setEditingLink(link);
    setEditUrl(link.originalUrl);
    setEditShortCode(link.shortCode);
  };

  const handleSaveEdit = async () => {
    if (!editingLink) return;

    setIsLoading(true);
    try {
      const result = await updateLinkAction({
        linkId: editingLink.id,
        originalUrl: editUrl,
        shortCode: editShortCode || undefined,
      });

      if (result && "success" in result && result.success) {
        setLinks((prev) =>
          prev.map((l) =>
            l.id === editingLink.id
              ? {
                  ...l,
                  originalUrl: editUrl,
                  shortCode: editShortCode || l.shortCode,
                }
              : l,
          ),
        );
        setEditingLink(null);
      }
    } catch (error) {
      console.error("Failed to update link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingLink) return;

    setIsLoading(true);
    try {
      await deleteLinkAction(deletingLink.id);
      setLinks((prev) => prev.filter((l) => l.id !== deletingLink.id));
      setDeletingLink(null);
    } catch (error) {
      console.error("Failed to delete link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col align-items justify-center w-6xl space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Dashboard</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className='mr-2 size-4' />
          <span>New Link</span>
        </Button>
      </div>

      <div className='mx-auto w-3xl'>
        {links.length === 0 ? (
          <Card>
            <CardContent className='pt-6'>
              <div className='flex flex-col items-center gap-2 text-center'>
                <Link2 className='size-8 text-muted-foreground' />
                <p className='text-muted-foreground'>
                  No links yet. Create your first short link.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className='grid gap-4'>
            {links.map((link) => (
              <Card key={link.id}>
                <CardHeader className='pb-3'>
                  <div className='flex items-center justify-between'>
                    <CardTitle className='text-base'>
                      <a
                        href={link.originalUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='hover:underline'
                      >
                        {`/${link.shortCode}`}
                      </a>
                    </CardTitle>
                    <div className='flex items-center gap-2'>
                      <Button
                        variant='ghost'
                        size='icon-xs'
                        onClick={() => handleEditLink(link)}
                      >
                        <Edit3 className='size-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon-xs'
                        className='text-destructive hover:text-destructive'
                        onClick={() => setDeletingLink(link)}
                      >
                        <Trash2 className='size-4' />
                      </Button>
                      <Button variant='ghost' size='icon-xs' asChild>
                        <a
                          href={`${link.originalUrl}`}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <ExternalLink className='size-4' />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground truncate'>
                    {link.originalUrl}
                  </p>
                  <p className='mt-2 text-xs text-muted-foreground'>
                    Created {new Date(link.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <CreateLinkDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreated={handleCreated}
      />

      {/* Edit Link Dialog */}
      {editingLink && (
        <Dialog open={!!editingLink} onOpenChange={() => setEditingLink(null)}>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Edit Link</DialogTitle>
              <DialogDescription>
                Update the URL or custom short code for this link.
              </DialogDescription>
            </DialogHeader>

            <div className='grid gap-4 py-4'>
              <div className='space-y-2'>
                <Label htmlFor='edit-originalUrl'>Destination URL</Label>
                <Input
                  id='edit-originalUrl'
                  type='url'
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='edit-shortCode'>
                  Custom short link{" "}
                  <span className='text-muted-foreground font-normal'>
                    (optional)
                  </span>
                </Label>
                <div className='flex gap-2'>
                  <span className='flex items-center px-3 py-2 text-sm text-muted-foreground border border-r-0 border-input rounded-l-md bg-muted'>
                    /
                  </span>
                  <Input
                    id='edit-shortCode'
                    type='text'
                    placeholder='short-link'
                    value={editShortCode}
                    onChange={(e) => setEditShortCode(e.target.value)}
                    className='rounded-l-none'
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline' onClick={() => setEditingLink(null)}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleSaveEdit}
                disabled={isLoading || !editUrl.trim()}
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {deletingLink && (
        <Dialog
          open={!!deletingLink}
          onOpenChange={() => setDeletingLink(null)}
        >
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Delete Link</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this link? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>

            <div className='space-y-2'>
              <p className='text-sm font-medium'>/{deletingLink.shortCode}</p>
              <p className='text-sm text-muted-foreground break-all'>
                {deletingLink.originalUrl}
              </p>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline' onClick={() => setDeletingLink(null)}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                variant='destructive'
                onClick={handleConfirmDelete}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
