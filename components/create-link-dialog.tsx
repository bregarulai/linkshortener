"use client";

import { useState, useCallback } from "react";
import { z } from "zod";
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
import { Loader2, Plus, X } from "lucide-react";
import { createLinkAction } from "@/app/dashboard/actions";

// Zod schema for short-code validation
const createLinkDialogSchema = z.object({
  shortCode: z
    .string()
    .refine(
      (val) => val.length === 0 || val.length <= 18,
      "Short-link must be 18 characters or less",
    ),
});

interface CreateLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

export function CreateLinkDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateLinkDialogProps) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!originalUrl.trim()) return;

      // Client-side validation for short-code length
      const validationResult = createLinkDialogSchema.safeParse({
        shortCode: shortCode.trim(),
      });
      if (!validationResult.success && shortCode.trim().length > 18) {
        setValidationError("Short-link must be 18 characters or less");
        return;
      }
      setValidationError(null);

      setIsLoading(true);
      setError(null);
      setShowSuccess(false);

      try {
        const result = await createLinkAction({
          originalUrl: originalUrl.trim(),
          shortCode: shortCode.trim() || undefined,
        });

        if (result.error) {
          setError(
            typeof result.error === "string"
              ? result.error
              : "Failed to create link",
          );
          return;
        }

        if ("success" in result && result.success) {
          setShowSuccess(true);
          setOriginalUrl("");
          setShortCode("");
          setTimeout(() => {
            onOpenChange(false);
            onCreated();
          }, 1500);
        }
      } catch {
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    [originalUrl, shortCode, onOpenChange, onCreated],
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      onOpenChange(open);
      if (!open) {
        setOriginalUrl("");
        setShortCode("");
        setError(null);
        setShowSuccess(false);
      }
    },
    [onOpenChange],
  );

  const handleShortCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setShortCode(value);
    // Clear validation error when user starts typing again
    if (validationError && value.trim().length <= 18) {
      setValidationError(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <div className='flex items-center justify-between'>
            <DialogTitle>Create New Short Link</DialogTitle>
            <DialogClose className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:cursor-not-allowed data-[state=open]:bg-gray-100 dark:ring-offset-gray-950 dark:focus:ring-gray-300 dark:data-[state=open]:bg-gray-800'>
              <span className='sr-only'>Close</span>
            </DialogClose>
          </div>
          <DialogDescription>
            Paste a URL to get a short link.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='originalUrl'>Destination URL</Label>
            <Input
              id='originalUrl'
              type='url'
              placeholder='https://example.com/very-long-url'
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='shortCode'>
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
                id='shortCode'
                type='text'
                placeholder='short-link'
                value={shortCode}
                onChange={handleShortCodeChange}
                className={`rounded-l-none ${validationError ? "border-red-500 focus-visible:ring-red-500" : ""} ${shortCode.trim().length > 18 ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                spellCheck={false}
              />
            </div>
            {validationError && (
              <p className='text-sm text-red-600'>{validationError}</p>
            )}
          </div>

          {error && <p className='text-sm text-red-600'>{error}</p>}

          {showSuccess && (
            <p className='text-sm text-green-600'>Link created successfully!</p>
          )}

          <DialogFooter className='pt-2'>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit' disabled={isLoading || !originalUrl.trim()}>
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className='mr-2 h-4 w-4' />
                  Create Link
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
