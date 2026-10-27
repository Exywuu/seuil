import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const LINKS = [
  { to: "/seuil", label: "Le seuil", hint: "Traverser" },
  { to: "/atelier", label: "L'atelier", hint: "Couper" },
  { to: "/foyer", label: "Le foyer", hint: "Entrer" },
] as const;

export function Disclaimer() {
  return (
    <p className="bg-ink px-4 py-2 text-center text-sm leading-relaxed text-paper">
      Concept indépendant et non officiel. Édition anniversaire 2027 entièrement fictive.
      <Link to="/sources" className="ml-2 underline decoration-gold underline-offset-4">
        Pourquoi ce choix
      </Link>
    </p>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="border-b border-ink/15 bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span
            aria-hidden
            className="grid size-11 place-items-center border border-cinnabar bg-cinnabar font-display text-xl leading-none text-paper"
          >
            阈
          </span>
          <span className="flex flex-col">
            <span className="font-display text-2xl leading-none tracking-wide">Le Seuil</span>
            <span className="text-xs uppercase tracking-widest text-ink-soft">Édition fictive 2027</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Modes">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex min-h-11 flex-col justify-center px-3 text-ink hover:text-cinnabar"
            >
              <span className="text-sm">{link.label}</span>
              <span className="text-xs text-ink-soft">{link.hint}</span>
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center border border-ink/20 md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
        </button>
      </div>

      {open ? (
        <nav id="menu-mobile" className="border-t border-ink/10 px-4 py-2 md:hidden" aria-label="Modes">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex min-h-11 items-baseline justify-between border-b border-ink/10 py-2"
              onClick={() => setOpen(false)}
            >
              <span>{link.label}</span>
              <span className="text-sm text-ink-soft">{link.hint}</span>
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink/15 bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-ink-soft md:flex-row md:items-end md:justify-between md:px-6">
        <div className="max-w-xl">
          <p className="font-display text-2xl text-ink">Le Seuil n'est pas Shen Yun.</p>
          <p className="mt-2">
            Concept indépendant et non officiel. Édition anniversaire 2027 entièrement fictive. Aucune
            billetterie réelle, aucune donnée personnelle, aucun partenariat.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Link to="/sources" className="min-h-11 text-ink underline decoration-gold underline-offset-4">
            Sources, comparaisons, limites
          </Link>
          <a
            className="min-h-11 text-ink underline decoration-gold underline-offset-4"
            href="https://www.shenyun.com"
            rel="noreferrer noopener"
            target="_blank"
          >
            Site officiel Shen Yun — hors de cette fiction
          </a>
        </div>
      </div>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-paper focus:px-3 focus:py-2"
      >
        Aller au contenu
      </a>
      <Disclaimer />
      <Header />
      <div id="contenu" className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}
