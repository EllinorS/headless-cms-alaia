'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { formatSessionDate, formatTime } from '@/lib/date-formatter';
import { toast } from 'sonner';
import type { Session } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Fixed list of session types shown in the dropdown — must match the backend schema enum
const SESSION_TYPES = ['Group - Adults', 'Group - Kids'];
// Fixed list of duration options shown in the dropdown
const DURATIONS = [
  '30min',
  '45min',
  '1h',
  '1h15',
  '1h30',
  '1h45',
  '2h',
  '2h15',
  '2h30',
  '2h45',
  '3h',
];

export default function SessionEditor({
  defaultPrices,
}: {
  defaultPrices: Record<string, number>;
}) {
  // Full list of sessions fetched from the API
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  // Form fields for adding a new session
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newType, setNewType] = useState(SESSION_TYPES[0]);
  const [newDuration, setNewDuration] = useState(DURATIONS[6]);
  const [newPrice, setNewPrice] = useState<number>(defaultPrices[SESSION_TYPES[0]] ?? 0);

  // Prevents double-submits while an API call is in progress
  const [saving, setSaving] = useState(false);

  // Fetch all sessions once when the component first renders
  // The empty [] dependency array means this only runs once (on mount)
  useEffect(() => {
    apiClient
      .get('/sessions')
      .then(setSessions)
      .catch(() => toast.error('Failed to load sessions'))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async () => {
    if (!newDate) return; // do nothing if no date is selected
    setSaving(true);
    try {
      // Send the new session to the API — it returns the new row's ID
      const created = await apiClient.post('/sessions', {
        date: newDate,
        time: newTime, // already in 12h format — no conversion needed
        type: newType,
        duration: newDuration,
        price: newPrice,
      });

      // Build the full Session object to add to local state (avoids a re-fetch)
      const newSession: Session = {
        id: created.sessionId,
        date: newDate,
        time: newTime,
        type: newType,
        duration: newDuration,
        price: newPrice,
      };

      // Append and re-sort so the list stays in chronological order
      setSessions((prev) => {
        const withNew = [...prev, newSession];
        const sorted = withNew.sort((a, b) => {
          const dateComparison = a.date.localeCompare(b.date);
          if (dateComparison !== 0) return dateComparison;
          return a.time.localeCompare(b.time);
        });
        return sorted;
      });

      toast.success('Session added');

      // Reset the form back to defaults
      setNewDate('');
      setNewTime('');
      setNewType(SESSION_TYPES[0]);
      setNewDuration(DURATIONS[2]);
      setNewPrice(defaultPrices[SESSION_TYPES[0]] ?? 0);
    } catch {
      toast.error('Failed to add session');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    setSaving(true);
    try {
      await apiClient.delete(`/sessions/${id}`);
      // Remove the deleted session from local state without re-fetching
      setSessions((prev) => {
        return prev.filter((session) => {
          // for each session, check if its id matches the one we want to delete
          if (session.id === id) {
            return false; // exclude this session it was deleted
          }
          return true; // keep all other sessions
        });
      });
      toast.success('Session deleted');
    } catch {
      toast.error('Failed to delete session');
    } finally {
      setSaving(false);
    }
  };

  // Shared Tailwind classes for all form inputs and selects
  const fieldClass =
    'px-3 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring';

  if (loading) return <p className="text-sm text-muted-foreground py-2">Loading sessions...</p>;

  return (
    <div className="space-y-4 py-2">
      {/* List of existing sessions */}
      <ul className="space-y-1.5">
        {sessions.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">No sessions added yet</p>
        ) : (
          sessions.map((s) => (
            <li
              key={s.id}
              className="flex items-center gap-3 bg-muted/50 border rounded-lg px-3 py-2 text-sm"
            >
              {/* Fixed widths (w-36, w-20) keep columns aligned across all rows */}
              <span className="font-medium w-36 shrink-0">{formatSessionDate(s.date)}</span>
              <span className="text-primary font-medium w-20 shrink-0">{formatTime(s.time)}</span>
              <span className="flex-1 text-muted-foreground">{s.type}</span>
              {s.price > 0 && (
                <span className="text-xs text-muted-foreground shrink-0">${s.price}</span>
              )}
              {s.duration && (
                <span className="text-xs bg-muted border rounded px-2 py-0.5 shrink-0">
                  {s.duration}
                </span>
              )}
              <button
                onClick={() => handleDelete(s.id)}
                disabled={saving}
                className="p-1 rounded text-muted-foreground hover:text-destructive transition-colors disabled:opacity-40"
                aria-label="Delete session"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </li>
          ))
        )}
      </ul>

      {/* Form to add a new session */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
        className="flex flex-wrap gap-2 items-end border-t pt-4"
      >
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground">Date</label>
          <Input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground">Time</label>
          <Input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground">Type</label>
          <select
            value={newType}
            onChange={(e) => {
              setNewType(e.target.value);
              // Auto-fill price from CMS default when type changes
              if (defaultPrices[e.target.value]) setNewPrice(defaultPrices[e.target.value]);
            }}
            className={fieldClass}
          >
            {SESSION_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground">Price (NZD / person)</label>
          <Input
            type="number"
            min="0"
            step="1"
            value={newPrice}
            onChange={(e) => setNewPrice(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground">Duration</label>
          <select
            value={newDuration}
            onChange={(e) => setNewDuration(e.target.value)}
            className={fieldClass}
          >
            {DURATIONS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        <Button type="submit" disabled={!newDate || saving} className="flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          Add session
        </Button>
      </form>
    </div>
  );
}
