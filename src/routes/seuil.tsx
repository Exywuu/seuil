import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/chrome";
import { SeuilStage } from "@/components/seuil-stage";

type Search = { t?: number };

export const Route = createFileRoute("/seuil")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const n = Number(search.t);
    if (!Number.isFinite(n)) return {};
    const t = Math.round(n);
    if (t < 1 || t > 7) return {};
    return { t };
  },
  head: () => ({
    meta: [{ title: "Traverser — Le Seuil 2027" }],
  }),
  component: SeuilPage,
});

function SeuilPage() {
  const { t } = Route.useSearch();
  return (
    <Shell>
      <SeuilStage initialIndex={(t ?? 1) - 1} />
    </Shell>
  );
}
