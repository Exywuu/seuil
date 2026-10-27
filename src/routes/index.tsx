import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/chrome";
import { TABLEAUX } from "@/lib/edition";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Le Seuil 2027 — concept fictif, non officiel" }],
  }),
  component: Home,
});

function Home() {
  const [split, setSplit] = useState(52);

  return (
    <Shell>
      <section className="mx-auto grid max-w-6xl items-end gap-8 px-4 py-10 md:px-6 md:py-16 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-gold">Danse classique chinoise · une lecture</p>
          <h1 className="mt-3 font-display text-6xl leading-none md:text-8xl">Le Seuil</h1>
          <p className="mt-6 max-w-md font-display text-3xl leading-snug italic">
            Ce soir-là, le décor fait un pas vers la salle.
          </p>
          <p className="mt-4 max-w-md">
            Édition fictive 2027 imaginée à partir de l'univers scénique de Shen Yun : un spectacle de danse,
            pas un festival. Vous pouvez traverser la frontière, préparer un costume, ou simplement lire les
            informations.
          </p>
          <p className="mt-4 max-w-md text-sm text-ink-soft">
            Shen Yun est une compagnie réelle fondée à New York en 2006. Ce site ne lui appartient pas, ne vend
            rien, et n'annonce pas sa saison.
          </p>
        </div>

        <div>
          <div className="relative h-80 overflow-hidden border border-ink/15 md:h-96" aria-hidden>
            <div className="absolute inset-y-0 left-0 bg-pine" style={{ width: `${split}%` }}>
              <div className="absolute bottom-10 left-1/2 h-40 w-16 -translate-x-1/2 bg-cinnabar" style={{ clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)" }} />
              <div className="absolute bottom-48 left-1/2 size-8 -translate-x-1/2 rounded-full bg-paper" />
            </div>
            <div className="absolute inset-y-0 right-0 bg-paper" style={{ width: `${100 - split}%` }}>
              <div className="absolute right-0 bottom-0 left-0 h-24 bg-ink" style={{ clipPath: "polygon(0 70%, 18% 40%, 34% 62%, 55% 22%, 78% 58%, 100% 30%, 100% 100%, 0 100%)" }} />
              <div className="absolute top-8 right-8 size-8 rounded-full border border-gold" />
            </div>
            <div className="absolute inset-y-0 w-0.5 bg-cinnabar" style={{ left: `${split}%` }} />
          </div>
          <label className="mt-3 block text-sm">
            <span className="mb-2 block">Essayez la frontière, puis entrez dans la scène.</span>
            <input
              suppressHydrationWarning
              className="w-full accent-cinnabar"
              type="range"
              min={18}
              max={82}
              value={split}
              onChange={(e) => setSplit(Number(e.target.value))}
            />
          </label>
        </div>
      </section>

      <section className="border-t border-ink/15" aria-labelledby="modes-title">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <h2 id="modes-title" className="font-display text-4xl">Trois façons d'entrer</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <Link
              to="/seuil"
              search={{ t: 1 }}
              className="flex min-h-64 flex-col justify-between border border-ink bg-ink p-6 text-paper hover:bg-pine"
            >
              <span className="text-xs uppercase tracking-widest text-gold">01 · Expérience principale</span>
              <span>
                <span className="block font-display text-4xl">Traverser</span>
                <span className="mt-2 block">
                  Sept tableaux. Le pointeur, le doigt ou un curseur déplace la frontière entre le corps costumé
                  et la peinture à l'encre.
                </span>
              </span>
            </Link>
            <Link
              to="/atelier"
              className="flex min-h-64 flex-col justify-between border border-ink p-6 hover:border-cinnabar"
            >
              <span className="text-xs uppercase tracking-widest text-gold">02 · Autre exploration</span>
              <span>
                <span className="block font-display text-4xl">Couper</span>
                <span className="mt-2 block">
                  L'atelier n'est pas la scène. Vous choisissez des étoffes et vous imposez un tempo : la manche
                  suit votre cadence, puis nomme un tableau.
                </span>
              </span>
            </Link>
            <Link
              to="/foyer"
              className="flex min-h-64 flex-col justify-between border border-ink/20 bg-paper-deep p-6 hover:border-ink"
            >
              <span className="text-xs uppercase tracking-widest text-gold">03 · Accès direct</span>
              <span>
                <span className="block font-display text-4xl">Entrer</span>
                <span className="mt-2 block">
                  Édition, programme, dates fictives, accès, accessibilité, questions, billet simulé. Sans jeu à
                  terminer.
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/15">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-4xl">Les sept seuils</h2>
            <p className="text-sm text-ink-soft">Titres inventés</p>
          </div>
          <ol className="mt-6 flex gap-3 overflow-x-auto pb-2">
            {TABLEAUX.map((item) => (
              <li key={item.id}>
                <Link
                  to="/seuil"
                  search={{ t: item.id }}
                  className="flex h-36 w-36 flex-col justify-between border border-ink/15 p-3 hover:border-cinnabar"
                >
                  <span className="font-display text-3xl" lang="zh-Hans">
                    {item.seal}
                  </span>
                  <span className="text-sm">{item.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </Shell>
  );
}
