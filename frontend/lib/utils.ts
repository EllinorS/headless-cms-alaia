
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merges Tailwind classes safely — resolves conflicts (e.g. p-2 + p-4 → p-4)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Fallback image
export const PLACEHOLDER_IMG = '/assets/placeholder.webp';

// Returns true if the URL points to a video file
export function isVideo(url: string): boolean {
  return /\.(mp4|webm|ogg)$/i.test(url);
}

