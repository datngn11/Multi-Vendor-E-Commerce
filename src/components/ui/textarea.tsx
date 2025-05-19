import { cn } from "@/lib/utils";
import * as React from "react";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "rounded-base border-border bg-secondary-background selection:bg-primary selection:text-primary-foreground font-base text-foreground placeholder:text-foreground/50 flex min-h-[80px] w-full border-2 px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      data-slot="textarea"
      {...props}
    />
  );
}

export { Textarea };
