'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Submission } from '@/lib/types';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';
import { formatDate } from '@/lib/date-formatter';

type SubmissionDetail = {
  id: number;
  status: string;
  client: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
  };
  createdAt: string;
  answers: { question: string; value: string }[];
};

export default function SubmissionBlock({ submission }: { submission: Submission }) {
  const [detail, setDetail] = useState<SubmissionDetail | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleOpen() {
    if (detail) return;
    setLoading(true);
    try {
      const data = await apiClient.get(`/submissions/${submission.id}`);
      setDetail(data);
    } catch {
      toast.error('Failed to load submission details');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="bg-background rounded-lg border overflow-hidden mb-3"
    >
      <AccordionItem value={String(submission.id)} onClick={handleOpen}>
        <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline hover:bg-muted/50">
          {submission.clientFirstname} {submission.clientEmail}{' '}
          {formatDate(submission.createdAt)}
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-2 pt-0">
          {loading ? (
            <p>Loading...</p>
          ) : detail ? (
            <div className="space-y-4">
              {/* Client info */}
              <div className="text-sm">
                <p>
                  {detail.client.firstName} {detail.client.lastName}
                </p>
                <a href={`mailto:${detail.client.email}`} className="text-primary hover:underline">
                  {detail.client.email}
                </a>
                {detail.client.phone && <p>{detail.client.phone}</p>}
              </div>

              {/* Quiz answers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detail.answers.map((answer) => (
                  <div key={answer.question} className="bg-muted rounded-md p-3">
                    <p className="text-xs text-muted-foreground mb-1">{answer.question}</p>
                    <p className="text-sm font-medium">{answer.value || '—'}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </AccordionContent >
      </AccordionItem>
    </Accordion>
  );
}
