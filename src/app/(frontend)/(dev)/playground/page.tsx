"use client";

import { Check, Loader2, Smile } from "lucide-react";

import { Logo } from "@/components/logo";
import { ThemeToggler } from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";

const variants = [
  "default",
  "destructive",
  "link",
  "neutral",
  "noShadow",
  "reverse",
] as const;

const sizes = ["sm", "default", "lg", "icon"] as const;

export default function Playground() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <Logo />
        <ThemeToggler />
      </div>
      <h1 className="text-2xl font-semibold">Buttons</h1>
      {/* Variants */}
      <div>
        <h2 className="mb-2 text-lg font-medium">Variants</h2>
        <div className="flex flex-wrap gap-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      </div>
      {/* Sizes */}
      <div>
        <h2 className="mb-2 text-lg font-medium">Sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map((size) => (
            <Button key={size} size={size} variant="default">
              {size === "icon" ? <Smile /> : size}
            </Button>
          ))}
        </div>
      </div>
      {/* Icons */}
      <div>
        <h2 className="mb-2 text-lg font-medium">With Icons</h2>
        <div className="flex flex-wrap gap-3">
          <Button size="sm" variant="default">
            <Check className="size-4" />
            Save
          </Button>
          <Button size="default" variant="neutral">
            Cancel
            <Check className="size-4" />
          </Button>
          <Button size="lg" variant="destructive">
            <Loader2 className="size-4 animate-spin" />
            Deleting
          </Button>
          <Button size="icon">
            <Check />
          </Button>
        </div>
      </div>
      {/* Disabled */}
      <div>
        <h2 className="mb-2 text-lg font-medium">Disabled</h2>
        <div className="flex flex-wrap gap-3">
          <Button disabled variant="default">
            Default
          </Button>
          <Button disabled variant="neutral">
            Neutral
          </Button>
          <Button disabled variant="link">
            Link
          </Button>
        </div>
      </div>
    </div>
  );
}
