import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // --- PRIMARY (vert) ---
        // Plein
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // Outline
        "primary-outline": "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground",
        // Ghost
        "primary-ghost": "text-primary bg-transparent hover:bg-primary/10",

        // --- SECONDARY (bleu-gris) ---
        // Plein
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Outline
        "secondary-outline": "border-2 border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-secondary-foreground",
        // Ghost
        "secondary-ghost": "text-secondary bg-transparent hover:bg-secondary/10",

        // --- ACCENT (or) ---
        // Plein
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
        // Outline
        "accent-outline": "border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-accent-foreground",
        // Ghost
        "accent-ghost": "text-accent bg-transparent hover:bg-accent/10",

        // --- UTILITAIRES ---
        glass: "bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20",
        white: "bg-white text-secondary hover:bg-white/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        outline: "border border-input bg-background hover:bg-muted",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }