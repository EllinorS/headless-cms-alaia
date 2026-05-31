import { Card, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

type ReviewCardProps = {
  icon: LucideIcon;  // any Lucide icon component passed as a prop
  name: string;
  quote: string;
};

// icon: Icon renames the prop to Icon (uppercase) so JSX treats it as a component
export default function ReviewCard({ icon: Icon, name, quote }: ReviewCardProps) {
  return (
    <Card className="bg-background text-center">
      <CardContent className="pt-6">
        <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
        <p className="font-bold mb-2">{name}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{quote}</p>
      </CardContent>
    </Card>
  );
}