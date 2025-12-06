import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-target relative overflow-hidden group/btn transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md",
        destructive: "bg-destructive text-destructive-foreground shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0",
        outline: "border-2 border-input bg-background hover:bg-accent/10 hover:text-accent-foreground hover:border-primary/40 hover:-translate-y-0.5 active:translate-y-0",
        secondary: "bg-secondary text-secondary-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 shadow-2xl hover:-translate-y-0.5 active:translate-y-0",
        premium: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base min-w-[140px]",
        xl: "h-14 rounded-xl px-10 text-lg min-w-[160px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {/* Shine effect overlay */}
        <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
