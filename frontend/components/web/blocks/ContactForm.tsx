'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { ContactSchema } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Check } from 'lucide-react';

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const set = (key: keyof typeof EMPTY_FORM, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async () => {
    const result = ContactSchema.safeParse({ ...form, consent });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await apiClient.post('/contact', { ...form, phone: form.phone || undefined });
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-12">
        <div className="icon-circle mb-4">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">Message sent!</h3>
        <p className="text-muted-foreground">
          Thanks for reaching out. We&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="firstName" className="text-xs font-medium text-muted-foreground">First name *</Label>
          <Input id="firstName" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="lastName" className="text-xs font-medium text-muted-foreground">Last name *</Label>
          <Input id="lastName" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="email" className="text-xs font-medium text-muted-foreground">Email *</Label>
        <Input id="email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="phone" className="text-xs font-medium text-muted-foreground">Phone</Label>
        <Input id="phone" type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="subject" className="text-xs font-medium text-muted-foreground">Subject *</Label>
        <Input id="subject" value={form.subject} onChange={(e) => set('subject', e.target.value)} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="message" className="text-xs font-medium text-muted-foreground">Message *</Label>
        <Textarea id="message" value={form.message} onChange={(e) => set('message', e.target.value)} rows={5} className="resize-none" />
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="consent"
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked === true)}
          className="mt-0.5"
        />
        <Label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
          I agree that my personal data (name, email, phone) will be processed by ALAIA Surf Coach
          solely for the purpose of responding to my enquiry, in accordance with applicable data
          protection regulations. My data will not be shared with third parties.
        </Label>
      </div>

      {error && <p className="text-xs text-destructive" role="alert">{error}</p>}

      <Button onClick={handleSubmit} disabled={submitting} size="lg" className="w-full">
        {submitting ? 'Sending...' : 'Send message'}
      </Button>
    </div>
  );
}
