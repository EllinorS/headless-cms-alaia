// The shared "frame" around every question.
// It draws the card, the question number, a small colored label for the type,
// the question text, and an optional subtitle. The actual answer UI (buttons,
// checkboxes, text box) is passed in as "children" by the parent.

import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CircleDot, ListChecks, PenLine } from 'lucide-react';
import type { FormField } from '@/lib/types';
import type { ReactNode } from 'react';

// For each question type: an icon, a short hint, and some colors for the label.
const TYPE_META: Record<string, { icon: typeof CircleDot; hint: string; accent: string }> = {
  SINGLE: { icon: CircleDot, hint: 'Pick one', accent: 'text-sky-600 bg-sky-50 border-sky-200' },
  MULTIPLE: { icon: ListChecks, hint: 'Select all that apply', accent: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  TEXT: { icon: PenLine, hint: 'Write your answer', accent: 'text-amber-600 bg-amber-50 border-amber-200' },
};

export function QuestionCard({
  field,
  index,
  children,
}: {
  field: FormField;
  index: number;
  children: ReactNode;
}) {
  // Pick the look for this type. If the type is unknown, use the TEXT look.
  const meta = TYPE_META[field.type] ?? TYPE_META.TEXT;
  const Icon = meta.icon;

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        {/* Top row: question number on the left, type label on the right. */}
        <div className="mb-1 flex items-center justify-between gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {index + 1}
          </span>
          <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium', meta.accent)}>
            <Icon className="h-3.5 w-3.5" />
            {meta.hint}
          </span>
        </div>
        {/* The question itself. */}
        <CardTitle>{field.label}</CardTitle>
        {/* Optional smaller line under the question. */}
        {field.subtitle && <CardDescription>{field.subtitle}</CardDescription>}
      </CardHeader>

      {/* The answer UI (buttons / checkboxes / text box) goes here. */}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
