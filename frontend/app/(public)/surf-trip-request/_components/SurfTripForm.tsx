'use client';

// The Surf Trip Request questionnaire.
// This file does almost everything:
//   - keeps the answers + contact details (the "state")
//   - sends them to the backend
//   - draws each question with the right input (radio / checkbox / text box)
//
// The only thing it does NOT do itself is the card frame around each question:
// that lives in QuestionCard.tsx.

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { ClientInfoSchema, type FormField, type ClientInfo } from '@/lib/types';
import { QuestionCard } from './QuestionCard';

// The id of this form in the database. There is only one, so we hard-code it.
const FORM_ID = 1;

export function SurfTripForm({ fields }: { fields: FormField[] }) {
  const router = useRouter();

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [client, setClient] = useState<ClientInfo>({ firstName: '', lastName: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);

  const clientValid = useMemo(
  () => ClientInfoSchema.safeParse(client).success,
  [client]
);

  // Save answers.
  const setAnswer = (questionId: number, value: string) => {
    setAnswers((old) => ({ ...old, [questionId]: value }));
  };

  // MULTIPLE : Read the picked values as a real list. "A,B" -> ["A","B"]
  const getPicked = (questionId: number): string[] =>
    answers[questionId] ? answers[questionId].split(',') : [];

  // MULTIPLE : add or remove one option, then save it back as text.
  const toggleOption = (questionId: number, optionValue: string) => {
    // first read the current list of picked values
    const picked = getPicked(questionId);
    // then : if already included in the list, remove from list. if not, add to list and join back to string
    const next = picked.includes(optionValue)
      ? picked.filter((v) => v !== optionValue)
      : [...picked, optionValue];
    setAnswer(questionId, next.join(','));
  };


  const handleSubmit = async () => {
    // Validate contact info
    if (!ClientInfoSchema.safeParse(client).success) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    try {
      await apiClient.post('/submissions', {
        formId: FORM_ID,

        client: { ...client, phone: client.phone || undefined },
        // Turn the answers object into a list
        answers: Object.entries(answers).map(([questionId, value]) => ({
          fieldId: Number(questionId),
          value,
        })),
      });

      router.push('/surf-trip-request/success');
    } catch {
      toast.error('Something went wrong. Please try again');
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Show every question.*/}

      {fields.map((field, index) => (

        <QuestionCard key={field.id} field={field} index={index}>

          {/* SINGLE answer */}
          {field.type === 'SINGLE' && (
            <RadioGroup
              value={answers[field.id] ?? ''}
              onValueChange={(value) => setAnswer(field.id, value)}
              className="grid gap-3 sm:grid-cols-2"
            >

              {/* answer options */}
              {(field.options ?? []).map((option) => {

                const selected = answers[field.id] === option.value;
                
                return (
                  <Label
                    key={option.id}
                    htmlFor={`radio-${option.id}`}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-sm font-normal transition-colors',
                      selected ? 'border-sky-500 bg-sky-50 font-medium' : 'border-border hover:border-sky-300',
                    )}
                  >
                    <RadioGroupItem
                      id={`radio-${option.id}`}
                      value={option.value}
                      className="data-checked:border-sky-500 data-checked:bg-sky-500"
                    />
                    {option.label}
                  </Label>
                );
              })}
            </RadioGroup>
          )}

          {/* MULTIPLE answers */}
          {field.type === 'MULTIPLE' && (
            <div className="space-y-2">

              {/* answer options */}
              {(field.options ?? []).map((option) => {

                const checked = getPicked(field.id).includes(option.value);
                
                return (
                  <Label
                    key={option.id}
                    htmlFor={`check-${option.id}`}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-sm font-normal transition-colors',
                      checked ? 'border-emerald-500 bg-emerald-50 font-medium' : 'border-border hover:border-emerald-300',
                    )}
                  >
                    <Checkbox
                      id={`check-${option.id}`}
                      checked={checked}
                      onCheckedChange={() => toggleOption(field.id, option.value)}
                      className="data-checked:border-emerald-500 data-checked:bg-emerald-500"
                    />
                    {option.label}
                  </Label>
                );
              })}
            </div>
          )}

          {/* TEXT: free answer. A text box with an amber focus color. */}
          {field.type === 'TEXT' && (
            <Textarea
              value={answers[field.id] ?? ''}
              onChange={(e) => setAnswer(field.id, e.target.value)}
              placeholder={field.explanation || ''}
              rows={4}
              className="resize-none border-2 focus-visible:border-amber-400 focus-visible:ring-amber-200"
            />
          )}
        </QuestionCard>
      ))}

      {/* Contact details. These fields are fixed in the code, not from the DB. */}
      <div>
        <p className="font-semibold mb-4">Your details</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="firstName">First name *</Label>
            {/* Keep every old field, change only firstName. */}
            <Input
              id="firstName"
              value={client.firstName}
              onChange={(e) => setClient((old) => ({ ...old, firstName: e.target.value }))}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastName">Last name *</Label>
            <Input
              id="lastName"
              value={client.lastName}
              onChange={(e) => setClient((old) => ({ ...old, lastName: e.target.value }))}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={client.email}
              onChange={(e) => setClient((old) => ({ ...old, email: e.target.value }))}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={client.phone}
              onChange={(e) => setClient((old) => ({ ...old, phone: e.target.value }))}
            />
          </div>
        </div>
      </div>

      {/* The send button. Disabled while sending, or while contact details are invalid. */}
      <Button
        onClick={handleSubmit}
        disabled={submitting || !clientValid}
        size="lg"
        className="w-full"
      >
        {submitting ? 'Sending...' : 'Send my request →'}
      </Button>
    </div>
  );
}
