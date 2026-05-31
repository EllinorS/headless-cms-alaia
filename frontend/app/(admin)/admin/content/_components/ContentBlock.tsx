'use client';

import { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { isVideo } from '@/lib/utils';
import type { ContentItem } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

function MediaPreview({ src, alt }: { src: string; alt: string }) {
  if (isVideo(src)) {
    return (
      <video
        src={src}
        className="w-20 h-20 object-cover rounded-md border"
        muted
        preload="metadata"
      />
    );
  }
  return (
    <Image src={src} alt={alt} width={80} height={80} className="object-cover rounded-md border" />
  );
}

// Renders a single editable content field.
// Switches between read mode (shows current value) and edit mode (shows input + save/cancel).
function ContentField({
  item,
  onSave,
}: {
  item: ContentItem;
  onSave: (keyName: string, value: string) => Promise<void>;
}) {
  // tracks whether the field is in edit mode
  const [editing, setEditing] = useState(false);
  // local copy of the value : changes as the user types, not saved until Save is clicked
  const [editValue, setEditValue] = useState(item.value || '');
  // true while the API call is in progress : disables the Save button
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // calls the parent's save function which hits the API
    await onSave(item.keyName, editValue);
    setSaving(false);
    // close edit mode after successful save
    setEditing(false);
  };

  // the value currently stored in the DB
  const displayValue = item.value;

  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <div className="flex-1 min-w-0">
        {/* Field label and type badge */}
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-medium">{item.label}</p>
          <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
            {item.type}
          </span>
        </div>

        {editing ? (
          <div className="space-y-2">
            {/* Show different input depending on field type */}
            {item.type === 'RICHTEXT' ? (
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                rows={3}
                autoFocus
                className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-ring"
              />
            ) : item.type === 'NUMBER' ? (
              <input
                type="number"
                min="0"
                step="1"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
                className="w-32 px-3 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
              />
            ) : (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
                // IMAGE_URL fields expect a Cloudinary URL pasted by the user
                placeholder={item.type === 'IMAGE_URL' ? 'Paste a Cloudinary URL' : ''}
                className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
              />
            )}

            {/* Live preview while pasting an image URL */}
            {item.type === 'IMAGE_URL' && editValue && (
              <MediaPreview src={editValue} alt={item.label} />
            )}

            <div className="flex gap-2">
              {/* disabled while saving to prevent double submit */}
              <Button size="sm" onClick={handleSave} disabled={saving}>
                <Check className="w-3 h-3" /> Save
              </Button>

              {/* reset editValue to original and close edit mode */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditing(false);
                  setEditValue(item.value || '');
                }}
              >
                <X className="w-3 h-3" /> Cancel
              </Button>
            </div>
          </div>
        ) : (
          // read mode — show image preview or text value
          <div className="flex items-center gap-3">
            {item.type === 'IMAGE_URL' && displayValue ? (
              <MediaPreview src={displayValue} alt={item.label} />
            ) : (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.value || <span className="italic">empty</span>}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Pencil button : only visible in read mode */}
      {!editing && (
        <button
          onClick={() => {
            setEditing(true);
            setEditValue(item.value || '');
          }}
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0 mt-0.5"
        >
          <Pencil className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default function ContentBlock({
  blockLabel,
  items,
  onSave,
}: {
  blockLabel: string;
  items: ContentItem[];
  onSave: (keyName: string, value: string) => Promise<void>;
}) {
  if (items.length === 0) return null;

  return (
    <Accordion
      type="single"
      collapsible
      className="bg-background rounded-lg border overflow-hidden mb-3"
    >
      <AccordionItem value={blockLabel} className="border-0">
        <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline hover:bg-muted/50">
          {blockLabel}
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-2 pt-0">
          {items.map((item) => (
            <ContentField key={item.keyName} item={item} onSave={onSave} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
