import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] p-5 flex flex-col gap-8">
      <h1 className="text-7xl">Hello world</h1>

      <div className="flex gap-4">
        <Button>Button</Button>
        <Button variant="noShadow">noShadow</Button>

        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>

        <Button variant="reverse">Reverse</Button>
        <Button variant="neutral">Neutral</Button>
      </div>

      <Progress value={50} />

      <Input placeholder="Input" />

      <Textarea placeholder="Textarea" />

      <Checkbox />
    </div>
  );
}
