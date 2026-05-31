'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { formatDate, formatSessionDate } from '@/lib/date-formatter';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { Session, Submission } from '@/lib/types';

export default function DashboardPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch sessions and submissions in parallel with fallback to empty array on error
    Promise.all([
      apiClient.get('/sessions/public').catch(() => []),
      apiClient.get('/submissions').catch(() => []),
    ]).then(([sessions, submissions]) => {
      setSessions(sessions);
      setSubmissions(submissions);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your upcoming sessions and latest surf trip requests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border bg-background ring-0 rounded-lg">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : sessions.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No upcoming sessions.</p>
            ) : (
              <ul className="space-y-2">
                {sessions.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center justify-between text-sm border-b pb-2 last:border-0 last:pb-0"
                  >
                    <span className="font-medium w-28 shrink-0">{formatSessionDate(s.date)}</span>
                    <span className="text-primary w-20 shrink-0">{s.time}</span>
                    <span className="flex-1 text-muted-foreground truncate">{s.type}</span>
                    {s.price > 0 && (
                      <span className="text-xs text-muted-foreground shrink-0">${s.price}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Recent surf trip requests */}
        <Card className="border bg-background ring-0 rounded-lg">
          <CardHeader>
            <CardTitle>Recent Surf Trip Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : submissions.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No requests yet.</p>
            ) : (
              <ul className="space-y-2">
                {submissions.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center justify-between text-sm border-b pb-2 last:border-0 last:pb-0"
                  >
                    <span className="font-medium flex-1 truncate">
                      {s.clientFirstname} {s.clientLastname}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full shrink-0 mx-2 ${
                        s.status === 'NEW'
                          ? 'bg-primary/10 text-primary'
                          : s.status === 'REPLIED'
                            ? 'bg-green-500/10 text-green-600'
                            : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {s.status}
                    </span>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {formatDate(s.createdAt)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
