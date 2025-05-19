import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  endIcon?: LucideIcon;
  startIcon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, endIcon: EndIcon, startIcon: StartIcon, type, ...props },
    ref,
  ) => {
    return (
      <div className="relative w-full">
        {StartIcon && (
          <div className="absolute top-1/2 left-3.5 -translate-y-1/2 transform">
            <StartIcon className="text-muted-foreground" size={18} />
          </div>
        )}

        <input
          className={cn(
            "rounded-base border-border bg-secondary-background selection:bg-primary selection:text-primary-foreground font-base text-foreground file:font-heading placeholder:text-foreground/50 flex h-10 w-full border-2 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm disabled:cursor-not-allowed disabled:opacity-50",
            "focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            {
              "pl-10": StartIcon,
              "pr-10": EndIcon,
            },
            className,
          )}
          data-slot="input"
          ref={ref}
          type={type}
          {...props}
        />

        {EndIcon && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
            <EndIcon className="text-muted-foreground" size={18} />
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
