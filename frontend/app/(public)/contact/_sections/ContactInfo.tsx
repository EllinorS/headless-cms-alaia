import { Mail, Phone, MapPin } from 'lucide-react';

const CONTACT_ITEMS = [
  { icon: Mail, text: 'hello@alaiasurfcoach.com' },
  { icon: Phone, text: '+64 21 000 0000' },
  { icon: MapPin, text: 'Raglan, Waikato, New Zealand' },
];

export function ContactInfo() {
  return (
    <div>
      <h2 className="text-3xl font-black mb-6">Get in touch</h2>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        Whether you have questions about lessons, surf trips, or just want to say hi — drop us a
        message and we&apos;ll get back to you as soon as possible.
      </p>
      <div className="space-y-4">
        {CONTACT_ITEMS.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3 text-sm">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
