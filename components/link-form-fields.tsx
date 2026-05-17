"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface LinkFormFieldsProps {
  originalUrl: string;
  shortCode: string;
  isLoading: boolean;
  validationError: string | null;
  onOriginalUrlChange: (url: string) => void;
  onShortCodeChange: (code: string) => void;
  onSubmitted: (e: React.FormEvent) => Promise<void>;
  onReset: () => void;
  onClose?: () => void;
}

export function LinkFormFields({
  originalUrl,
  shortCode,
  isLoading,
  validationError,
  onOriginalUrlChange,
  onShortCodeChange,
  onSubmitted,
  onReset,
  onClose,
}: LinkFormFieldsProps) {
  return (
    <form onSubmit={onSubmitted} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="originalUrl">Destination URL</Label>
        <Input
          id="originalUrl"
          type="url"
          placeholder="https://example.com/very-long-url"
          value={originalUrl}
          onChange={(e) => onOriginalUrlChange(e.target.value)}
          required
          autoFocus
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="shortCode">
          Custom short link{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <div className="flex gap-2">
          <span className="flex items-center px-3 py-2 text-sm text-muted-foreground border border-r-0 border-input rounded-l-md bg-muted">
            /
          </span>
          <Input
            id="shortCode"
            type="text"
            placeholder="short-link"
            value={shortCode}
            onChange={(e) => onShortCodeChange(e.target.value)}
            className={`rounded-l-none ${validationError ? "border-red-500 focus-visible:ring-red-500" : ""} ${shortCode.trim().length > 18 ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            spellCheck={false}
          />
        </div>
        {validationError && (
          <p className="text-sm text-red-600">{validationError}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => { onClose?.(); onReset(); }}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || !originalUrl.trim()}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Create Link
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
