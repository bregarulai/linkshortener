'use client';

import { useState, useCallback } from 'react';
import type { SubmitEvent } from 'react';
import { z } from 'zod';
import { createLinkAction } from '@/app/dashboard/actions';

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
  handleSubmit: (e: SubmitEvent<HTMLFormElement>) => Promise<void>;
}

const SHORT_CODE_MAX_LENGTH = 18;

const shortCodeSchema = z.object({
  shortCode: z
    .string()
    .max(
      SHORT_CODE_MAX_LENGTH,
      `Short-link must be ${SHORT_CODE_MAX_LENGTH} characters or less`,
    ),
});

function validateShortCode(code: string): string | null {
  const result = shortCodeSchema.safeParse({ shortCode: code });
  if (!result.success) {
    const errorMessage = result.error.issues?.[0]?.message;
    return errorMessage || 'short-link should be less than 18 characters';
  }
  return null;
}

export function useCreateLinkForm(
  onCreated: () => void,
): UseCreateLinkFormReturn {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: SubmitEvent<HTMLFormElement>) => {
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
            typeof result.error === 'string'
              ? result.error
              : 'Failed to create link',
          );
          return;
        }

        if ('success' in result && result.success) {
          setShowSuccess(true);
          setOriginalUrl('');
          setShortCode('');
          setTimeout(() => {
            onCreated();
          }, 1500);
        }
      } catch {
        setError('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [originalUrl, shortCode, onCreated],
  );

  const setShortCodeWithValidation = useCallback((code: string) => {
    setShortCode(code);
    const error = validateShortCode(code);
    setValidationError(error);
  }, []);

  const resetForm = useCallback(() => {
    setOriginalUrl('');
    setShortCode('');
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
