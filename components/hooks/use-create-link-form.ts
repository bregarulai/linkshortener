"use client";

import { useState, useCallback } from "react";
import { createLinkAction } from "@/app/dashboard/actions";

export interface UseCreateLinkFormReturn {
  originalUrl: string;
  shortCode: string;
  isLoading: boolean;
  error: string | null;
  showSuccess: boolean;
  validationError: string | null;
  setOriginalUrl: (url: string) => void;
  setShortCode: (code: string) => void;
  resetForm: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const SHORT_CODE_MAX_LENGTH = 18;

function validateShortCode(code: string): string | null {
  if (code.trim().length > SHORT_CODE_MAX_LENGTH) {
    return "Short-link must be 18 characters or less";
  }
  return null;
}

export function useCreateLinkForm(onCreated: () => void): UseCreateLinkFormReturn {
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

      const validationError = validateShortCode(shortCode);
      if (validationError) {
        setValidationError(validationError);
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
            typeof result.error === "string" ? result.error : "Failed to create link",
          );
          return;
        }

        if ("success" in result && result.success) {
          setShowSuccess(true);
          setOriginalUrl("");
          setShortCode("");
          setTimeout(() => {
            onCreated();
          }, 1500);
        }
      } catch {
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [originalUrl, shortCode, onCreated],
  );

  const setShortCodeWithValidation = useCallback(
    (code: string) => {
      setShortCode(code);
      if (code.trim().length <= SHORT_CODE_MAX_LENGTH) {
        setValidationError(null);
      }
    },
    [],
  );

  const resetForm = useCallback(() => {
    setOriginalUrl("");
    setShortCode("");
    setError(null);
    setShowSuccess(false);
    setValidationError(null);
  }, []);

  return {
    originalUrl,
    shortCode,
    isLoading,
    error,
    showSuccess,
    validationError,
    setOriginalUrl,
    setShortCode: setShortCodeWithValidation,
    resetForm,
    handleSubmit,
  };
}
