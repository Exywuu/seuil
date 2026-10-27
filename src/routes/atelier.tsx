import { createFileRoute } from "@tanstack/react-router";
import { AtelierBench } from "@/components/atelier-bench";
import { Shell } from "@/components/chrome";

export const Route = createFileRoute("/atelier")({
  head: () => ({
    meta: [{ title: "L'atelier — Le Seuil 2027" }],
  }),
  component: function AtelierPage() {
    return (
      <Shell>
        <AtelierBench />
      </Shell>
    );
  },
});
