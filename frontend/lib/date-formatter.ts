import { format } from 'date-fns';

// For ISO timestamps from the DB (e.g. submission.created_at): "21 May 2026"
export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-NZ', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// For YYYY-MM-DD session dates: "Thu 21 May 2026"
// Appending T00:00:00 forces local-time parsing, without it JS parses as UTC and the day shifts.
export function formatSessionDate(dateStr: string): string {
  return format(new Date(dateStr + 'T00:00:00'), 'EEE d MMM yyyy');
}

export function formatTime(time: string): string {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}