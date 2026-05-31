import type { LucideIcon } from 'lucide-react';

// One value card: an icon component, a title, and a description
type Value = {
  icon: LucideIcon;
  title: string;
  desc: string;
};
// Receives the section heading and the list of value cards from the parent page
type Props = {
  title: string;
  subtitle: string;
  values: Value[];
};

export function ValueSection({ title, subtitle, values }: Props) {
  return (
    <section className="py-16 px-4 bg-secondary text-secondary-foreground">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="eyebrow text-secondary-foreground/60 mb-4">Our Values</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-secondary-foreground/70 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ icon: Icon, title: valueTitle, desc }) => (
            <div
              key={valueTitle}
              className="rounded-2xl bg-secondary-foreground/10 border border-secondary-foreground/15 p-6 text-center hover:bg-secondary-foreground/15 transition-colors"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary-foreground/15 flex items-center justify-center">
                <Icon className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-bold text-xl mb-2">{valueTitle}</h3>
              <p className="text-sm text-secondary-foreground/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}