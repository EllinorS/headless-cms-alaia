'use client';
import { useState, useEffect } from 'react';
import SubmissionBlock from './_components/SubmissionBlock';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';
import { Submission } from '@/lib/types';

export default function SurfTripRequestPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get(`/submissions`)
      .then((data) => setSubmissions(data))
      .catch(() => toast.error('Failed to load submissions'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Surf Trip Requests</h1>
      <div>
        {submissions.map((s) => (
          <SubmissionBlock key={s.id} submission={s} />
        ))}
      </div>
    </div>
  );
}
