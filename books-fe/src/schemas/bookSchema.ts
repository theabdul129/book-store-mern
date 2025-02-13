import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string()
    .trim()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  author: z.string()
    .trim()
    .min(1, 'Author is required')
    .max(100, 'Author must be less than 100 characters')
    .regex(/^[a-zA-Z\s.'-]+$/, 'Author name can only contain letters, spaces, and basic punctuation'),
  isbn: z.string()
    .trim()
    .min(10, 'ISBN must be at least 10 characters')
    .max(13, 'ISBN must be less than 13 characters')
    .regex(/^[0-9-]+$/, 'ISBN must contain only numbers and hyphens')
    .refine((val) => {
      // Remove hyphens and check if the remaining string is valid
      const cleaned = val.replace(/-/g, '');
      return cleaned.length === 10 || cleaned.length === 13;
    }, 'ISBN must be either 10 or 13 digits (excluding hyphens)')
});

export type BookFormData = z.infer<typeof bookSchema>;