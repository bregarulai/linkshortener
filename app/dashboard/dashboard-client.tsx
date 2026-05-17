"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Link2 } from "lucide-react";
import { CreateLinkDialog } from "@/components/create-link-dialog";
import { EditLinkDialog } from "@/components/edit-link-dialog";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import { LinkRow } from "@/components/link-row";
import { deleteLinkAction, updateLinkAction } from "./actions";

interface DashboardClientProps {
  initialLinks: {
    id: number;
    userId: string;
    originalUrl: string;
    shortCode: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export function DashboardClient({ initialLinks }: DashboardClientProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [links, setLinks] = useState(initialLinks);
  const [deletingLink, setDeletingLink] = useState<{
    id: number;
    shortCode: string;
    originalUrl: string;
  } | null>(null);
  const [editingLink, setEditingLink] = useState<{
    id: number;
    originalUrl: string;
    shortCode: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreated = () => {
    window.location.reload();
  };

  const handleDelete = async () => {
    if (!deletingLink) return;

    setIsLoading(true);
    try {
      await deleteLinkAction(deletingLink.id);
      setLinks((prev) => prev.filter((link) => link.id !== deletingLink.id));
      setDeletingLink(null);
    } catch (error) {
      console.error("Failed to delete link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (link: {
    id: number;
    originalUrl: string;
    shortCode: string;
  }) => {
    setEditingLink(link);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (url: string, shortCode: string) => {
    if (!editingLink) return;
    setIsLoading(true);
    try {
      await updateLinkAction({
        linkId: editingLink.id,
        originalUrl: url,
        shortCode: shortCode || undefined,
      });
      setLinks((prev) =>
        prev.map((link) =>
          link.id === editingLink.id
            ? {
                ...link,
                originalUrl: url,
                shortCode: shortCode || link.shortCode,
              }
            : link,
        ),
      );
      setIsEditDialogOpen(false);
      setEditingLink(null);
    } catch (error) {
      console.error("Failed to update link:", error);
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
          <div className='flex flex-col items-center gap-2 rounded-lg border border-dashed border-border/50 p-8 text-center'>
            <Link2 className='size-8 text-muted-foreground' />
            <p className='text-muted-foreground'>
              No links yet. Create your first short link.
            </p>
          </div>
        ) : (
          <div className='grid gap-4'>
            {links.map((link) => (
              <LinkRow
                key={link.id}
                link={link}
                onEdit={handleEdit}
                onDelete={(link) => setDeletingLink(link)}
              />
            ))}
          </div>
        )}
      </div>

      <CreateLinkDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreated={handleCreated}
      />

      <EditLinkDialog
        link={editingLink}
        open={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditingLink(null);
        }}
        onSave={handleSaveEdit}
      />

      <DeleteConfirmDialog
        link={deletingLink}
        open={!!deletingLink}
        onClose={() => setDeletingLink(null)}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
