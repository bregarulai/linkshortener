"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { useCreateLinkForm } from "@/components/hooks/use-create-link-form";
import { LinkFormFields } from "@/components/link-form-fields";

interface CreateLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

export function CreateLinkDialog({ open, onOpenChange, onCreated }: CreateLinkDialogProps) {
  const {
    originalUrl,
    shortCode,
    isLoading,
    validationError,
    error,
    showSuccess,
    handleSubmit,
    resetForm,
    setOriginalUrl,
    setShortCode,
  } = useCreateLinkForm(onCreated);

  const handleClose = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Create New Short Link</DialogTitle>
            <CloseButton onOpenChange={onOpenChange} />
          </div>
          <DialogDescription>
            Paste a URL to get a short link.
          </DialogDescription>
        </DialogHeader>

        <LinkFormFields
          originalUrl={originalUrl}
          shortCode={shortCode}
          isLoading={isLoading}
          validationError={validationError}
          onOriginalUrlChange={setOriginalUrl}
          onShortCodeChange={setShortCode}
          onSubmitted={handleSubmit}
          onReset={resetForm}
          onClose={handleClose}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}
        {showSuccess && (
          <p className="text-sm text-green-600">Link created successfully!</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CloseButton({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  return (
    <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:cursor-not-allowed data-[state=open]:bg-gray-100 dark:ring-offset-gray-950 dark:focus:ring-gray-300 dark:data-[state=open]:bg-gray-800">
      <span className="sr-only">Close</span>
    </DialogClose>
  );
}
