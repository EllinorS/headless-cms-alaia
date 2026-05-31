'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  startOfISOWeek,
  addWeeks,
  addDays,
  eachDayOfInterval,
  format,
  isToday,
  startOfToday,
} from 'date-fns';

// One session passed in from page.tsx
export type CalendarSession = {
  dateStr: string;
  time: string;
  type: string;
  duration: string;
  price: number;
};

type Props = {
  sessions: CalendarSession[];
  emptyMessage: string; // shown when a week has no sessions
};

// Formats a Date as "YYYY-MM-DD" to match session.dateStr from the DB
function toDateStr(d: Date): string {
  return format(d, 'yyyy-MM-dd');
}

// Returns colour classes based on lesson type
function typeColor(type: string): string {
  const t = type.toLowerCase();
  if (t.includes('kids')) return 'bg-blue text-white';
  return 'bg-green text-white';
}

// Groups sessions by date string for fast lookup: { "2026-05-28": [session, ...] }
function groupByDate(sessions: CalendarSession[]): Record<string, CalendarSession[]> {
  const map: Record<string, CalendarSession[]> = {};
  for (const s of sessions) {
    if (!map[s.dateStr]) map[s.dateStr] = [];
    map[s.dateStr].push(s);
  }
  return map;
}

export function WeekCalendar({ sessions, emptyMessage }: Props) {
  const today = startOfToday();
  // weekStart = the Monday of the currently displayed week
  const [weekStart, setWeekStart] = useState(() => startOfISOWeek(today));
  // selectedDay = the tapped day on mobile
  const [selectedDay, setSelectedDay] = useState(toDateStr(today));

  // All 7 days of the displayed week (Mon–Sun)
  const weekDays = eachDayOfInterval({ start: weekStart, end: addDays(weekStart, 6) });
  const byDate = groupByDate(sessions);

  const goBack = () => setWeekStart((p) => addWeeks(p, -1));
  const goForward = () => setWeekStart((p) => addWeeks(p, 1));

  // "5 May – 11 May" label shown above the calendar
  const weekLabel = `${format(weekStart, 'd MMM')} – ${format(addDays(weekStart, 6), 'd MMM')}`;

  // Mobile: index and sessions for the selected day
  const selIdx = weekDays.findIndex((d) => toDateStr(d) === selectedDay);
  const selSessions = byDate[selectedDay] ?? [];

  // True if at least one session exists in the current week
  const hasAnyThisWeek = weekDays.some((d) => (byDate[toDateStr(d)]?.length ?? 0) > 0);

  return (
    <div>
      {/* Week navigation: prev button / week label / next button */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <button
          onClick={goBack}
          aria-label="Previous week"
          className="w-9 h-9 flex items-center justify-center rounded-full border hover:bg-muted transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-semibold w-44 text-center">{weekLabel}</span>
        <button
          onClick={goForward}
          aria-label="Next week"
          className="w-9 h-9 flex items-center justify-center rounded-full border hover:bg-muted transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile: tappable day strip + sessions for the selected day */}
      <div className="md:hidden">
        <div className="grid grid-cols-7 border-b pb-1 mb-6">
          {weekDays.map((day) => {
            const ds = toDateStr(day);
            const isSel = ds === selectedDay;
            const hasSessions = !!byDate[ds]?.length;
            return (
              <button
                key={ds}
                onClick={() => setSelectedDay(ds)}
                className="flex flex-col items-center gap-1.5 py-2"
              >
                <span className="text-[10px] font-medium text-muted-foreground">
                  {format(day, 'EEE')}
                </span>
                {/* Filled circle = selected, ring = today */}
                <span
                  className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold transition-colors ${isSel ? 'bg-primary text-primary-foreground' : isToday(day) ? 'ring-2 ring-primary' : ''}`}
                >
                  {format(day, 'd')}
                </span>
                {/* Dot indicator — visible only when the day has sessions */}
                <span
                  className={`w-1.5 h-1.5 rounded-full ${hasSessions ? 'bg-primary' : 'bg-transparent'}`}
                />
              </button>
            );
          })}
        </div>
        {selIdx >= 0 && (
          <p className="text-sm font-semibold mb-4">{format(weekDays[selIdx], 'EEEE d MMM')}</p>
        )}
        {selSessions.length > 0 ? (
          <div className="space-y-3">
            {selSessions.map((s, i) => (
              <MobileCard key={i} session={s} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4">{emptyMessage}</p>
        )}
      </div>

      {/* Desktop: 7-column grid, all days visible at once */}
      <div className="hidden md:block">
        <div className="grid grid-cols-7 border-b mb-4">
          {weekDays.map((day) => (
            <div key={toDateStr(day)} className="text-center pb-3">
              <p className="text-xs text-muted-foreground mb-2">{format(day, 'EEE')}</p>
              {/* Today's date gets a filled circle */}
              <span
                className={`inline-flex w-8 h-8 items-center justify-center rounded-full text-sm font-bold ${isToday(day) ? 'bg-primary text-primary-foreground' : ''}`}
              >
                {format(day, 'd')}
              </span>
            </div>
          ))}
        </div>
        {hasAnyThisWeek ? (
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => {
              const ds = toDateStr(day);
              const daySessions = byDate[ds] ?? [];
              return (
                <div key={ds} className="space-y-2 min-h-20">
                  {daySessions.map((s, j) => (
                    <DesktopCard key={j} session={s} />
                  ))}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4">{emptyMessage}</p>
        )}
      </div>
    </div>
  );
}

// Mobile card — larger, with a colour badge and a "Book →" link
function MobileCard({ session }: { session: CalendarSession }) {
  return (
    <div className="bg-background border rounded-2xl p-4">
      <p className="font-bold text-base mb-1">{session.type}</p>
      <p className="text-sm font-medium text-primary mb-1">{session.time}</p>
      {session.duration && <p className="text-xs text-muted-foreground mb-1">{session.duration}</p>}
      {session.price > 0 && (
        <p className="text-xs text-muted-foreground mb-4">${session.price} / person</p>
      )}
      {!session.duration && <div className="mb-4" />}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColor(session.type)}`}
        >
          {session.type}
        </span>
        {/* Scrolls down to the contact form */}
        <a href="#contact-form" className="text-sm font-bold hover:underline">
          Book →
        </a>
      </div>
    </div>
  );
}

// Desktop card — compact, entire card links to the contact form
function DesktopCard({ session }: { session: CalendarSession }) {
  return (
    <a
      href="#contact-form"
      className="block bg-background border rounded-xl p-2.5 hover:border-primary/60 hover:shadow-sm transition-all group"
    >
      <p className="text-xs font-semibold text-primary mb-0.5">{session.time}</p>
      {session.duration && (
        <p className="text-[10px] text-muted-foreground mb-0.5">{session.duration}</p>
      )}
      <span className={`w-fit text-[10px] font-semibold px-2 py-0.5 rounded-full ${typeColor(session.type)}`}>
  {session.type}
</span>
      {session.price > 0 && (
        <p className="text-[10px] text-muted-foreground mt-0.5">${session.price} / person</p>
      )}
      {/* "Book →" fades in on hover */}
      <p className="text-[10px] font-semibold text-primary mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        Book →
      </p>
    </a>
  );
}
