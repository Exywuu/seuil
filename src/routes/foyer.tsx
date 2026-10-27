import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/chrome";
import { FoyerGuide } from "@/components/foyer-guide";

export const Route = createFileRoute("/foyer")({
  head: () => ({
    meta: [{ title: "Le foyer — Le Seuil 2027" }],
  }),
  component: function FoyerPage() {
    return (
      <Shell>
        <FoyerGuide />
      </Shell>
    );
  },
});
